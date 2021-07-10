import * as AWS from "aws-sdk";

async function getTodos() {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: process.env.TODOS_TABLE!,
  };
  try {
    const data = await docClient.scan(params).promise();
    return data.Items;
  } catch (error) {
    console.log("DynamoDB Error: ", error);
    return null;
  }
}

export default getTodos;
