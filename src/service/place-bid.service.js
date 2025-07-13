import AWS from "aws-sdk";
import createError from "http-errors";
import { getAuctionById } from "./auctions.service.js";

const dynamodb = new AWS.DynamoDB.DocumentClient();

/**
 *
 * @param {*} event
 * @param {*} context
 * @returns
 */

export const placeBidService = async (event, context) => {
  let updateAuction;
  const { id } = event.pathParameters;
  const { amount } = event.body;
  const auction = await getAuctionById(id);

  if (amount <= auction.highestBid.amount) {
    throw new createError.Forbidden(
      `Your bid must be higher than ${auction.highestBid.amount}`
    );
  }

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    UpdateExpression: "set highestBid.amount = :amount",
    ExpressionAttributeValues: {
      ":amount": amount,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const result = await dynamodb.update(params).promise();
    updateAuction = result.Attributes;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  if (!updateAuction) {
    throw new createError.NotFound(`Auction with ID ${id} is not found!`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updateAuction),
  };
};

/**
 *
 */
export const processAuctionsService = async () => {};
