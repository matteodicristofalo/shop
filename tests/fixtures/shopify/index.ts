import { closeServer, createServer } from "../utils";
import { getDefaultStubs } from "./stubs/defaults";
import { identifyRequest } from "./utils";
import { Server } from "http";
import { Stub } from "./types";
import express from "express";
import test from "@playwright/test";

export const shopifyFixture = test.extend<{
  shopify: {
    stub: (stubs: Stub | Stub[]) => void;
  };
}>({
  shopify: [
    async ({}, use) => {
      const { app, server } = await setup();

      await use({
        stub: (stubs) => stub(app, stubs),
      });

      await teardown(server);
    },
    {
      scope: "test",
      auto: true,
    },
  ],
});

async function setup() {
  const envCallback = (port: number) => ({
    SHOPIFY_BASE_URL: `http://localhost:${port}`,
    SHOPIFY_ACCESS_TOKEN: "access_token",
  });

  const server = await createServer(envCallback);

  stub(server.app);

  return server;
}

async function teardown(server: Server) {
  await closeServer(server);
}

function stub(app: express.Express, stubs?: Stub | Stub[]) {
  app.post("/", (req: express.Request, res: express.Response) => {
    const defaultStubs = getDefaultStubs();

    if (stubs) {
      if (Array.isArray(stubs)) {
        stubs.forEach((stub) => {
          defaultStubs[stub.request] = stub.response;
        });
      } else {
        const stub = stubs;
        defaultStubs[stub.request] = stub.response;
      }
    }

    const request = identifyRequest(req);

    const status = defaultStubs[request]?.status ?? 200;
    const payload = defaultStubs[request]?.payload ?? {};
    res.status(status).json(payload);
  });
}
