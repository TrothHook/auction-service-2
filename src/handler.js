import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const createAuction = async (event, context) => {
  const { title } = JSON.parse(event.body);

  const auction = {
    id: uuid(),
    title,
    status: "OPEN",
    createdAt: new Date().toLocaleString("sv-SE"),
  };

  await dynamodb
    .put({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Item: auction,
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
};
