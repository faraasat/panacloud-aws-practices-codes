import * as cdk from "@aws-cdk/core";
import * as CodePipeline from "@aws-cdk/aws-codepipeline";
import * as CodePipelineAction from "@aws-cdk/aws-codepipeline-actions";
import * as CodeBuild from "@aws-cdk/aws-codebuild";

export class Ex02CiCdPipelineUpdateCdkTemplateStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Artifact from source stage. Artifact is where we put our things
    const sourceOutput = new CodePipeline.Artifact();

    // Artifact from build stage
    const CDKOutput = new CodePipeline.Artifact();

    //Code build action, Here you will define a complete build
    const cdkBuild = new CodeBuild.PipelineProject(this, "CdkBuild", {
      buildSpec: CodeBuild.BuildSpec.fromObject({
        // how project will run and its packages will installed
        version: "0.2",
        phases: {
          install: {
            "runtime-versions": {
              nodejs: 12,
            },
            commands: [
              // "cd step12_CI_CD_pipeline",
              // "cd Ex02_CI_CD_Pipeline_Update_Cdk_Template",
              "npm install",
            ],
          },
          build: {
            commands: ["npm run build", "npm run cdk synth -- -o dist"], // cdk synth makes cdk.out folder so we use it to create output without deploying code
          },
        },
        artifacts: {
          "base-directory": "./dist", // outputting our generated JSON CloudFormation files to the dist directory
          // "./step12_CI_CD_pipeline/step02_CI_CD_pipeline_update_cdk_template/dist",
          files: [`${this.stackName}.template.json`], // Which file to use, this represent class and stack name is the variable of it
        },
      }),
      environment: {
        // On which OS we want to install
        buildImage: CodeBuild.LinuxBuildImage.STANDARD_3_0, // BuildImage version 3 because we are using nodejs environment 12
      },
    });

    ///Define a pipeline
    const pipline = new CodePipeline.Pipeline(this, "CDKPipeline", {
      crossAccountKeys: false, // Pipeline construct creates an AWS Key Management Service (AWS KMS) which cost $1/month. this will save your $1. Also we have one account so crossAccountKeys is not required.
      restartExecutionOnUpdate: true, // Indicates whether to rerun the AWS CodePipeline pipeline after you update it.
    });

    // Adding stages to pipeline
    // First Stage, Source of Code
    pipline.addStage({
      stageName: "Source",
      actions: [
        new CodePipelineAction.GitHubSourceAction({
          actionName: "Checkout",
          owner: "panacloud-modern-global-apps", // name of repository account
          repo: "full-stack-serverless-cdk", // repository name
          oauthToken: cdk.SecretValue.secretsManager("GITHUB_TOKEN_AWS_SOURCE"), // Create token on github and save it on aws secret manager. Used if there is a private repo. We make token in our repo and we can give the token rights. Since, we can use it from Secret manager we can also use here it plain text
          output: sourceOutput, // Output will save in the sourceOutput Artifact. Here in this artifact files from github will be saved
          branch: "master", // Branch of your repo
        }),
      ],
    });

    // Second Stage, Code Building
    pipline.addStage({
      stageName: "Build",
      actions: [
        new CodePipelineAction.CodeBuildAction({
          actionName: "cdkBuild",
          project: cdkBuild, // Which steps of the project
          input: sourceOutput,
          outputs: [CDKOutput],
        }),
      ],
    });

    // Third Stage, Deployment
    pipline.addStage({
      stageName: "DeployCDK",
      actions: [
        new CodePipelineAction.CloudFormationCreateUpdateStackAction({
          // Here function shows where to deploy
          actionName: "AdministerPipeline",
          templatePath: CDKOutput.atPath(`${this.stackName}.template.json`), // Input artifact with the CloudFormation template to deploy
          stackName: this.stackName, ///Name of stack
          adminPermissions: true,
        }),
      ],
    });
  }
}
