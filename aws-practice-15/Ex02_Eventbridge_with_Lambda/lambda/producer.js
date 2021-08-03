const AWS = require("aws-sdk");

function helper(body) {
  const eventBridge = new AWS.EventBridge({ region: "us-east-1" });

  return eventBridge
    .putEvents({
      Entries: [
        {
          EventBusName: "default",
          // Source: "custom.api",
          Source: "demo",
          // DetailType: "order",
          DetailType: "demo",
          Detail: `{ "Event Body": "${body.country}" }`,
        },
      ],
    })
    .promise();
}

exports.handler = async function (event, context) {
  console.log("EVENT BODY: \n", event.body);
  const e = await helper(JSON.parse(event.body));
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: `<h1>Event Published to Eventbridge</h1>${JSON.stringify(
      e,
      null,
      2
    )}`,
  };
};
