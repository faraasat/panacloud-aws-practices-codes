import * as AWS from "aws-sdk";
import Todo from "./Todo";

async function addTodo(todo: Todo): Promise<Todo | undefined> {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: process.env.TODOS_TABLE!,
    Item: todo,
  };
  try {
    const response: any = await docClient.put(params).promise();
    return response?.Attributes["id"] || null;
  } catch (error) {
    console.log("DynamoDB Error: ", error);
    return undefined;
  }
}

export default addTodo;
