import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";
import createError from "http-errors";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const createAuctionService = async (event, context) => {
  const { title } = event.body;

  const auction = {
    id: uuid(),
    title,
    status: "OPEN",
    createdAt: new Date().toLocaleString("sv-SE"),
  };

  try {
    await dynamodb
      .put({
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Item: auction,
      })
      .promise();
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
};

export const getAuctionsService = async (event, context) => {
  let auctions;

  try {
    const result = await dynamodb
      .scan({ TableName: process.env.AUCTIONS_TABLE_NAME })
      .promise();
    auctions = result.Items;
  } catch (error) {
    console.warn(error);
    throw new createError.InternalServerError("error");
  }

  return {
    statusCode: 200,
    body: JSON.stringify(auctions),
  };
};
