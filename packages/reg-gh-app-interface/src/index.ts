export * from "./event-types";

export type GhAppServerInfo = {
  endpoint: string;
};

export function getGhAppInfo(): GhAppServerInfo {
  const { endpoint } = require("../endpoint.json");
  return { endpoint };
}
