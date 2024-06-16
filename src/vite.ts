import { ViteDevServer } from "vite";

let viteServer: ViteDevServer | undefined;

export function prepareViteServer(server: ViteDevServer) {
  viteServer = server;
}

export function getViteServer() {
  if (!viteServer) {
    throw new Error("Vite server is not available");
  }

  return viteServer;
}
