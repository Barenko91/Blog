import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 }); // Cache avec expiration de 1 heure

export const getCache = (key: string) => {
  return cache.get(key);
};

export const setCache = (key: string, value: any, ttl: number) => {
  cache.set(key, value, ttl);
};