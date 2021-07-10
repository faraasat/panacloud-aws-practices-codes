import * as AWS from "aws-sdk";
import Todo from "./Todo";

async function getTodos() {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: process.env.TODOS_TABLE!,
  };

  try {
    const response = await docClient.scan(params).promise();
    return response.Items;
  } catch (error) {
    console.log("DynamoDB Error => ", error);
    return null;
  }
}

export default getTodos;
