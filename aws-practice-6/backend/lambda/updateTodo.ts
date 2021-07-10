import * as AWS from "aws-sdk";

async function updateTodo(todo: any) {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const params: any = {
    TableName: process.env.TODOS_TABLE!,
    Key: {
      id: todo.id,
    },
    ExpressionAttributeValues: {},
    ExpressionAttributeNames: {},
    UpdateExpression: "",
    ReturnValues: "UPDATED_NEW",
  };

  let prefix = "set ";
  let attributes: any = Object.keys(todo);
  for (let i = 0; i < attributes.length; i++) {
    let attribute = attributes[i];
    if (attribute !== "id") {
      params["UpdateExpression"] +=
        prefix + "#" + attribute + " = :" + attribute;
      params["ExpressionAttributeValues"][":" + attribute] = todo[attribute];
      params["ExpressionAttributeNames"]["#" + attribute] = attribute;
      prefix = ", ";
    }
  }

  try {
    await docClient.update(params).promise;
    return todo;
  } catch (error) {
    console.log("DynamoDB Error => ", error);
    return null;
  }
}

export default updateTodo;
