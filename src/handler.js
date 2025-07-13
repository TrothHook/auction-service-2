import {
  createAuctionService,
  getAuctionService,
  getAuctionsService,
} from "./service/auctions.service.js";
import { middyfy } from "./middlewares/middyfy.js";
import {
  placeBidService,
  processAuctionsService,
} from "./service/place-bid.service.js";

/**
 *
 * @param {*} event
 * @param {*} context
 * @returns
 */
const createAuctionHandler = async (event, context) => {
  return await createAuctionService(event, context);
};
export const createAuction = middyfy(createAuctionHandler);

/**
 *
 * @param {*} event
 * @param {*} context
 * @returns
 */
const getAuctionsHandler = async (event, context) => {
  return await getAuctionsService(event, context);
};
export const getAuctions = middyfy(getAuctionsHandler);

/**
 *
 * @param {*} event
 * @param {*} context
 * @returns
 */
const getAuctionHandler = async (event, context) => {
  return await getAuctionService(event, context);
};
export const getAuction = middyfy(getAuctionHandler);

/**
 *
 * @param {*} event
 * @param {*} context
 * @returns
 */
const placeBidHandler = async (event, context) => {
  return await placeBidService(event, context);
};
export const placeBid = middyfy(placeBidHandler);

/**
 *
 * @param {*} event
 * @param {*} context
 * @returns
 */
const processAuctionsHandler = async (event, context) => {
  return await processAuctionsService(event, context);
};
export const processAuctions = processAuctionsHandler;
