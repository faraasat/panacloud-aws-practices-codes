import * as AWS from "aws-sdk";
import Todo from "./Todo";

async function addTodo(todo: Todo): Promise<Todo | null> {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: process.env.TODOS_TABLE!,
    Item: todo,
  };

  try {
    const response = await docClient.put(params).promise;
    return response.arguments;
  } catch (error) {
    console.log("DynamoDB Error => ", error);
    return null;
  }
}

export default addTodo;
