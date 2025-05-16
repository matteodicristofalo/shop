/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type AddressInfo } from "net";
import { type Env, resetEnv, updateInitialEnv } from "@next/env";
import express, { Express, Request, Response } from "express";
import http, { type Server } from "http";

type EnvCallback = (targetServerPort: number) => Env;

export async function createServer(
  envCallback: EnvCallback
): Promise<{ app: Express; server: Server }> {
  const app = express();
  app.use(express.json());

  const server = await startServer(app);
  const { port } = server.address() as AddressInfo;

  const env = envCallback(port);
  updateInitialEnv(env);
  resetEnv();

  return {
    app: proxiedApp(app),
    server,
  };
}

async function startServer(app: Express): Promise<Server> {
  return new Promise((resolve) => {
    const server = http.createServer(app).listen(() => {
      resolve(server);
    });
  });
}

export async function closeServer(server: Server): Promise<void> {
  return new Promise((resolve) => {
    server.close(() => {
      resolve();
    });
  });
}

type Handler = (req: Request, res: Response) => void;

function proxiedApp(app: Express): Express {
  const getHandlers = new Map<string, Handler>();
  const postHandlers = new Map<string, Handler>();

  const handle = (
    httpVerb: unknown,
    httpVerbHandlers: Map<string, Handler>
  ) => {
    return (path: string, handler: Handler) => {
      httpVerbHandlers.set(path, handler);

      const callback = (req: Request, res: Response) => {
        httpVerbHandlers.get(path)?.(req, res);
      };

      // @ts-ignore
      httpVerb.call(app, path, callback);
    };
  };

  const customApp = {
    get: handle(app.get, getHandlers),
    post: handle(app.post, postHandlers),
  };

  return new Proxy(customApp, {
    get(target, prop, receiver) {
      // @ts-ignore
      if (customApp[prop]) return Reflect.get(target, prop, receiver);
      // @ts-ignore
      return app[prop].bind(app);
    },
  }) as unknown as Express;
}
