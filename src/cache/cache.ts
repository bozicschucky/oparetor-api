import NodeCache from "node-cache";

export const CACHE_TIME_TO_LEAVE = 2 * 60 * 60; // 2 hours in seconds (2 * 60 * 60)

export const dataCache = new NodeCache({
  stdTTL: CACHE_TIME_TO_LEAVE,
  checkperiod: 120,
});
