export * from "./event-types";

export type GhAppServerInfo = {
  endpoint: string;
};

export function getGhAppInfo(): GhAppServerInfo {
  return require("../endpoint.json").endpoint as GhAppServerInfo;
}
