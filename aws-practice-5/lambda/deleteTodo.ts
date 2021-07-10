import * as AWS from "aws-sdk";

async function deleteTodo(todoId: string): Promise<string | null> {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: process.env.TODOS_TABLE!,
    Key: {
      id: todoId,
    },
  };
  try {
    await docClient.delete(params).promise();
    return todoId;
  } catch (error) {
    console.log("DynamoDB Error: ", error);
    return null;
  }
}

export default deleteTodo;
