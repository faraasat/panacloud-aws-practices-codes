# Amazon Interactive Video Service (AWS IVS)!
Amazon Interactive Video Service (Amazon IVS) is a managed live streaming solution that is quick and easy to set up, and ideal for creating interactive video experiences. Send your live streams to Amazon IVS using streaming software and the service does everything you need to make low-latency live video available to any viewer around the world, letting you focus on building interactive experiences alongside the live video. You can easily customize and enhance the audience experience through the Amazon IVS player SDK and timed metadata APIs, allowing you to build a more valuable relationship with your viewers on your own websites and applications..

![AWS IVS Architecture](https://d1.awsstatic.com/awselemental/Workflows/product-page-diagram_AWS_Elemental_r16_INTERACTIVE_VIDEO_SERVICE_2x.05718cda8afec531df5e284d8797d511cb7d7f0c.png)


## AWS IVS API & Documentation Reference
- https://docs.aws.amazon.com/ivs/latest/userguide/what-is.html
- https://docs.aws.amazon.com/ivs/latest/APIReference/Welcome.html
- [AWS IVS CDK ] https://docs.aws.amazon.com/cdk/api/latest/docs/aws-ivs-readme.html

<br/>

## Careful!
 only basic streaming type is free at free tier, standard type stream will charge $2 per hour, <br/>
you can check the detail in below image.
![price](img/price.png)

## Pricing Chart.
https://aws.amazon.com/ivs/pricing/#Live_Video_Input_Costs

<br/>

## NPM install.
- npm install @aws-cdk/aws-ivs
- cdk bootstrap && npm run build && cdk deploy

<br/>

# After Deployment.

## Install Streaming Application
- [Desktop] :  install OBS Studeio https://obsproject.com/download    or
- [MobileApp] : Larix Broadcaster (Android)


## Setup the Streaming application !
    Copy the below information from AWS IVS console 

- Ingest server : use as url/server key in streaming application 
- Stream key : use as streaming key / secret key 
- Playback URL : for the streaming output 
![configuration](img/configuration.png)

### OBS Studio setup

Select the type of streaming source (camera/screen...) and click on "setting"
![obs1](img/obs1.png)
Copy the "Ingest Server key" and "Streaming Key" here 
![obs2](img/obs2.png)

## Testing
### Simple Stream Testing
change the Playback Url value
![linkTesting](img/linkTesting.png)

### Streaming with  with push_metaData
- Step 1 : change the Playback Url Vlue
![linkTesting](img/push_metaData.png)

- Step 2 : copy and paste bellow command in terminal .. <br />
 aws ivs put-metadata --channel-arn <your-channel-arn> --metadata <your-metadata> <br />
 e-g..__ aws ivs put-metadata --channel-arn arn:aws:ivs:us-east-1:abcd1234:channel/abcd1234 --metadata '{"question": "Best Streaming Service?", "correctIndex": 0, "answers": ["AWS MediaLive", "AWS IVS", "StreamYard"]}'
![linkTesting](img/metaData.png)

## Result, with push_metaData
![linkTesting](img/result.png)

<br/>


## Stream with Mobile Application

Setting > Connections > New Connection  <br />
Name : abcd<br />
URL : Ingest_Server_Key/Streaming key (rtmps://abcd1234.global-contribute.live-video.net:443/app/sk_us-east-1_abcdefg123456)<br />

save & start recording

<br/>

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template