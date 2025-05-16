import { Request } from "./types";
import express from "express";

export function identifyRequest(req: express.Request): Request {
  const { query } = req.body;

  const requests = Object.values(Request);
  const matchedRequest = requests.find((type) => query.includes(type));

  if (!matchedRequest) {
    throw new Error("Unknown request type");
  }

  return matchedRequest;
}
