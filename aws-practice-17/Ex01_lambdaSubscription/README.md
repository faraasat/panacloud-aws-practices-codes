# Subscribing Lambda to an SNS topic

## Code Explanation

### Creating a lambda function

First we created a lambda function

```javascript

    // create a lambda function
    const helloLambda = new lambda.Function(this, "HelloHandler", {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "hello.handler",
    });
    
```

### Lambda function's code

The lambda function logs the events received by SNS topic.

```javascript
import {SNSEvent , Context } from 'aws-lambda';

export async function handler(event: SNSEvent, context: Context){

  // logging the event generated by SNS
  console.log(event.Records[0].Sns)
 
}
```

### Creating a dead letter queue

We are using SQS to create a dead letter queue. The dead letter queue can be used in with SNS to store all the failed messages and perform some action on them.

```javascript

  // adding a dead letter queue
    const dlQueue = new sqs.Queue(this, "DeadLetterQueue", {
      queueName: "MySubscription_DLQ",
      retentionPeriod: cdk.Duration.days(14),
    });

```

### Creating an SNS topic

We then created an SNS topic so that our lambda function can subsribe to it

```javascript

    // create an SNS topic
    const myTopic = new sns.Topic(this, "MyTopic");
```

### Subscribing lambda function to the topic


Unlike the previous example, we have added a dead letter queue as well as a filter policy in this subscription. 

The filter policy here sets a rule that only those messages would be recieved by the lambda function that have a "message attribute" named "test" with a value between "100" and "200". 

```javascript
  // subscribe lambda function to the topic

    // we have also assinged a filter policy here. The SNS will only invoke the lambda function if the message published on 
    // the topic satisfies the condition in the filter.

    // We have also assigned a dead letter queue to store the failed events
    myTopic.addSubscription(
      new subscriptions.LambdaSubscription(helloLambda, {
        filterPolicy: {
          test: sns.SubscriptionFilter.numericFilter({
            between: { start: 100, stop: 200 },
          }),
        },
        deadLetterQueue: dlQueue,
      })
    );
```


## Usage

After deploying the code you can start publishing messages from the SNS console. Be mindful of the filer policy that we applied. You will have to add a message attribue named "test" with a value between "100" and "200" to your messages, otherwise, your lambda function would not be able to recieve them.

You can change the filter policy and play around with it to understand it better. There are many different filters that you can apply. You can find them in the documentations.