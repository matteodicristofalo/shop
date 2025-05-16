import { closeServer } from "./utils";
import { test } from "@playwright/test";
import { type AddressInfo } from "net";
import { type Server, createServer } from "http";
import next from "next";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const nextFixture = test.extend<{}, { next: { port: number } }>({
  next: [
    async ({}, use) => {
      const nextDirectory = path.join(__dirname, "..", "..");
      const server = await setup(nextDirectory);

      const { port } = server.address() as AddressInfo;
      await use({ port });

      await teardown(server);
    },
    {
      scope: "worker",
      auto: true,
    },
  ],
});

async function setup(nextDirectory: string): Promise<Server> {
  const app = next({
    dev: false,
    dir: nextDirectory,
  });

  await app.prepare();
  const handler = app.getRequestHandler();

  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      handler(req, res);
    });

    server.listen((error: unknown) => {
      if (error) throw error;
      resolve(server);
    });
  });
}

async function teardown(server: Server): Promise<void> {
  return closeServer(server);
}
