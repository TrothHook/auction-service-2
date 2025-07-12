import { createAuctionService, getAuctionService, getAuctionsService } from "./service/auctions.service.js";
import { middyfy } from "./middlewares/middyfy.js";

const createAuctionHandler = async (event, context) => {
  return await createAuctionService(event, context);
};
export const createAuction = middyfy(createAuctionHandler);

const getAuctionsHandler = async (event, context) => {
  return await getAuctionsService(event, context);
};
export const getAuctions = middyfy(getAuctionsHandler);

const getAuctionHandler = async (event, context) => {
  return await getAuctionService(event, context);
};
export const getAuction = middyfy(getAuctionHandler);
