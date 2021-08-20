## aws-practice-1
#### Created an S3 Bucket

## aws-practice-2
#### Added a Lambda Function
#### Created REST Link

## aws-practice-3
#### Created an S3 Bucket
#### Deployed Bucket
#### Created CloudFront
#### Deployed on Cloud front

## aws-practice-4 (AppSync as a DataSource)
#### GraphQL
#### AppSync

## aws-practice-5 (DynamoDB as a DataSource)
#### GraphQL
#### AppSync
#### DynamoDB

## aws-practice-6 (AWS Amplify)
#### GraphQL
#### AppSync
#### DynamoDB
#### Amplify

## aws-practice-6-subscription (AWS Amplify)
#### GraphQL
#### AppSync
#### DynamoDB
#### Amplify

## aws-practice-7 (GraphQL with Apollo)
#### GraphQL
#### AppSync
#### DynamoDB
#### Apollo

## aws-practice-8 (Appsync with DynamoDB using Mapping [without using lambda])
#### GraphQL
#### AppSync
#### DynamoDB

## aws-practice-9 (Appsync with DynamoDB using Mapping [without using lambda] using VTL)
#### GraphQL
#### AppSync
#### DynamoDB

## aws-practice-10 (Appsync with no data source)
#### GraphQL
#### AppSync

## aws-practice-11 (using cognito)
#### cognito

## aws-practice-12 (using iam)
#### iam
#### policies

## aws-practice-13 (using secret manager)
#### secret manager

## aws-practice-14 (using pipeline)
#### pipelines

## aws-practice-15 (using EventBridge)
#### EventBridge

## aws-practice-16 (using SES)
#### SES

## aws-practice-17 (using SNS)
#### SNS

## aws-practice-18 (using SQS)
#### SQS

## aws-practice-19 (using Pinpoint)
#### Pinpoint

## aws-practice-20 (using Step Functions)
#### Step Functions

## aws-practice-21 (using CloudWatch)
#### CloudWatch

## aws-practice-22 (using Timestream DB an Grafana)
#### Timestream DB
#### Grafana

## aws-practice-23 (using xray)
#### xray

## aws-practice-24 (using lambda Layers)
#### lambda Layers

## aws-practice-25 (using lambda Edged)
#### lambda Edged

## aws-practice-26 (using lambda Destinstion)
#### lambda Destinstion

## aws-practice-27 (using lambda Container)
#### lambda Container

## aws-practice-28 (using DynamoDB Stream)
#### DynamoDB Stream

## aws-practice-29 (using Constructs as Cloud Components)
#### Constructs as Cloud Components

## aws-practice-30 (using Multiple Stacks)
#### Multiple Stacks

## aws-practice-31 (using Route 53)
#### Route 53

## aws-practice-32 (using EFS)
#### Elastic File Storage

## aws-practice-33 (using Testing)
#### Testing CDK

## aws-practice-34 (using EDD)
#### Event Driven Development

## aws-practice-35 (using CDP)
#### CDK Design Patterns

## aws-practice-36 (using AWS RDS)
#### AWS RDS

## aws-practice-37 (using Redshift)
#### Redshift

## aws-practice-38 (using Aurora Serverless)
#### Aurora Serverless

## aws-practice-39 (using Aurora Serverless Data API)
#### Aurora Serverless Data API

## aws-practice-40 (using AWS WAF API Gateway)
#### AWS WAF API Gateway

## aws-practice-41 (using Lambda Extensions)
#### Lambda Extensions

## aws-practice-42 (using Lambda Power Tuning)
#### Lambda Power Tuning

## aws-practice-43 (using Kinesis)
#### Kinesis

## aws-practice-44 (using VPC)
#### VPC

## aws-practice-45 (using Neptune)
#### Neptune

## aws-practice-46 (using Fargate)
#### Fargate

## aws-practice-47 (using EC2)
#### EC2

## aws-practice-48 (using AWS MediaLive)
#### AWS MediaLive

## aws-practice-49 (using AWS IVC)
#### AWS IVC

## aws-practice-50 (using IoT Core)
#### IoT Core

## aws-practice-51 (using Green Grass V2)
#### Green Grass V2

## aws-practice-52 (using Doc DB)
#### Doc DB

## aws-practice-53 (using API Project One)
#### API Project One

## aws-practice-54 (using API Project Two)
#### API Project Two

# Learn Full Stack Serverless Apps and API Development with CDK in Baby Steps

[This Repo is part of the reading material for Panacloud Bootcamp 2020](https://panacloud.github.io/bootcamp-2020/)

[Repo is also part of the reading material of Panacloud Bootcamp 2021](https://panacloud.github.io/bootcamp-2021/)

[The Serverless Future of Supercharged Applications](https://containerjournal.com/topics/container-ecosystems/the-serverless-future-of-supercharged-applications/)

[The impact of serverless on the future of cloud technology](https://cio.economictimes.indiatimes.com/news/cloud-computing/the-impact-of-serverless-on-the-future-of-cloud-technology/77275273)

In this repo we are focused on Serverless, because [it is the future](https://www.devopsonline.co.uk/is-serverless-the-future/). [Cloud 2.0: Serverless architecture and the next wave of enterprise offerings](https://www.mckinsey.com/business-functions/mckinsey-digital/our-insights/tech-forward/cloud-20-serverless-architecture-and-the-next-wave-of-enterprise-offerings). [Why Serverless is Cloud 2.0](http://serverlesscomputing.london/wp-content/uploads/2019/06/Paul-Johnston-Why-Serverless-is-Cloud-2.0.pdf).

"In a recent informal poll, more than 66% of developers chose AWS CDK as their technology of choice for building serverless applications on AWS."
[The CDK Patterns open source journey](https://aws.amazon.com/blogs/opensource/the-cdk-patterns-open-source-journey/)

In this repo we have used TypeScript for CDK development. Because we consider it the best language for CDK the reason are listed in this [article](https://awsmaniac.com/which-programming-language-is-the-best-for-aws-cdk/). Application and Business code in the steps is implemented in both Typescript and Python.

## AWS CDK

[AWS CDK](https://github.com/aws/aws-cdk) is an open source software development framework to model and provision your cloud application resources using familiar programming languages. With AWS CDK, you can define your infrastructure as code and provision it through AWS CloudFormation. AWS CDK is available to use in all AWS regions. In this learning repo we will use CDK with TypeScript.

[CDK Primer](https://www.aws.training/Details/Curriculum?id=64511)

[Why Amazon Is Bullish on AWS Cloud Development Kit](https://www.datacenterknowledge.com/amazon/why-amazon-bullish-aws-cloud-development-kit)

[What is the AWS CDK?](https://docs.aws.amazon.com/cdk/latest/guide/home.html)

We expect that Open Source AWS CDK will become the defacto standard for Infrastructure as Code (IAC) not just for AWS but other clouds as well. Thus becoming the standard IAC multicloud tool. It is already available for [Terraform](https://github.com/hashicorp/terraform-cdk) and [Kubernetes](https://cdk8s.io/). CDK has already become the de facto software development framework internally at AWS. AWS CDK is DevOps for Developers and is the Ultimate DevOps tool. 

[Infrastructure as Code: What Is It? Why Is It Important?](https://www.hashicorp.com/resources/what-is-infrastructure-as-code) 

[AWS CDK API Reference](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-construct-library.html)

Alternatives

[Pulumi vs CDK](https://www.pulumi.com/docs/intro/vs/cloud_template_transpilers/)

[Serverless Framework vs CDK](https://www.secjuice.com/aws-cdk-vs-serverless-framework/)

[CloudFormation, Terraform, or CDK? A guide to IaC on AWS](https://acloudguru.com/blog/engineering/cloudformation-terraform-or-cdk-guide-to-iac-on-aws)

[Will AWS CDK replace Terraform and the Serverless Framework?](https://blog.codecentric.de/en/2019/09/aws-cdk-versus-terraform-and-serverless-framework/)

[Amplify vs CDK](https://stackoverflow.com/questions/60087064/aws-cdk-vs-aws-amplify#:~:text=Amplify%20is%20ok%20for%20deploying,deploy%20static%20sites%20with%20CDK.)

[SAM vs CDK](https://aws.amazon.com/cdk/faqs/#:~:text=AWS%20CDK%20offers%20broad%20coverage,Python%2C%20C%23%2C%20and%20Java.&text=If%20you%20prefer%20defining%20your,SAM%20is%20the%20better%20fit.)


[Awesome CDK](https://github.com/kolomied/awesome-cdk)


## Event-Driven Architecture

[What is an Event-Driven Architecture?](https://aws.amazon.com/event-driven-architecture/)

[Operating Lambda: Design principles in event-driven architectures – Part 2](https://aws.amazon.com/blogs/compute/operating-lambda-design-principles-in-event-driven-architectures-part-2/)

[BUILDING EVENT-DRIVEN ARCHITECTURES WORKSHOP ON AWS](https://event-driven-architecture.workshop.aws/)

[10 Things Serverless Architects Should Know](https://aws.amazon.com/blogs/architecture/ten-things-serverless-architects-should-know/)

[What a typical 100% Serverless Architecture looks like in AWS!](https://medium.com/serverless-transformation/what-a-typical-100-serverless-architecture-looks-like-in-aws-40f252cd0ecb)

[EventBridge: The key component in Serverless Architectures](https://medium.com/serverless-transformation/eventbridge-the-key-component-in-serverless-architectures-e7d4e60fca2d)

[How to Use Amazon EventBridge to Build Decoupled, Event-Driven Architectures](https://pages.awscloud.com/AWS-Learning-Path-How-to-Use-Amazon-EventBridge-to-Build-Decoupled-Event-Driven-Architectures_2020_LP_0001-SRV.html)

[Rethinking Serverless Architectures With Eventbridge](https://blog.thundra.io/rethinking-serverless-architectures-with-eventbridge)

[Architecting Serverless Solutions (Must Do this Course)](https://www.aws.training/Details/eLearning?id=42594)

[Introduction to Messaging for Modern Cloud Architecture](https://aws.amazon.com/blogs/architecture/introduction-to-messaging-for-modern-cloud-architecture/)

[Moving to event-driven architectures](https://www.youtube.com/watch?v=h46IquqjF3E)

[Deep Dive on Amazon EventBridge - AWS Online Tech Talks](https://www.youtube.com/watch?v=28B4L1fnnGM)

[Integrating Amazon EventBridge into your serverless applications](https://aws.amazon.com/blogs/compute/integrating-amazon-eventbridge-into-your-serverless-applications/)

[Rethinking Serverless Architectures With Eventbridge](https://blog.thundra.io/rethinking-serverless-architectures-with-eventbridge)

[Deep Dive on Amazon EventBridge](https://pages.awscloud.com/Deep-Dive-on-Amazon-EventBridge_2019_0919-SRV_OD.html)


## CDK Construction Zone: For Advanced CDK Users Directly From the CDK Team

[CDK construction zone | S1 Ep 1](https://m.twitch.tv/videos/916591005)