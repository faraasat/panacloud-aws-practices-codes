# Kinesis Data Streams
###### Capture, process, and store data streams

Amazon Kinesis Data Streams is a scalable and durable real-time data streaming service that can continuously capture gigabytes of data per second from hundreds of thousands of sources. 

## Benefits

### Real-time
Amazon Kinesis enables you to ingest, buffer, and process streaming data in real-time, so you can derive insights in seconds or minutes instead of hours or days.

### Fully managed
Amazon Kinesis is fully managed and runs your streaming applications without requiring you to manage any infrastructure.

### Scalable
Amazon Kinesis can handle any amount of streaming data and process data from hundreds of thousands of sources with very low latencies.

# Dependencies:
npm i aws-sdk

# Implementation
We will be communicating with Cognito Identity Pool. Provide credentials in aws-exports.js file. To get these credentials backend code need to be deployed first. Once its deployed successfully then we can get identity-pool-id and stream-name from console. Replace the values in aws-exports.js file

// aws-exports.js;

const config = {
    'aws_project_region': 'us-east-1',
    'aws_cognito_identity_pool_id': 'us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    'aws_stream_name': 'my-first-stream'
};

export default config;

# Execution

open url in browser: http://localhost:8000

scroll the text to generate stream data. With every scroll a new record will be added in stream. After every second stream data will be send to backend