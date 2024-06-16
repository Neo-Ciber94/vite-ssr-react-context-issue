import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import { handleRequest } from "./src/entry.server";
import { prepareViteServer } from "./src/vite";
import * as esbuild from "esbuild";
import fs from "fs";
import path from "path";

const virtualModule = "virtual:app";
const resolvedVirtualModule = "\0" + virtualModule;

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    {
      name: "virtual-modules",
      resolveId(id) {
        if (id === virtualModule) {
          return resolvedVirtualModule;
        }
      },
      async load(id) {
        if (id === resolvedVirtualModule) {
          console.log("Loaded virtual module");
          const code = await loadVirtualModule();
          const result = await esbuild.transform(code, {
            loader: "tsx",
          });

          return result.code;
        }
      },
    },
    {
      name: "dev-server",
      configureServer(server) {
        prepareViteServer(server);

        return async () => {
          server.middlewares.use(handleRequest);
        };
      },
    },
  ],
});

async function loadVirtualModule() {
  return `
import { Counter } from "/src/components";
import { useTheme } from "/src/context";

export default function App() {
  const theme = useTheme();

  return (
    <div>
      <h1>Hello World!</h1>
      <h2>Theme: {theme}</h2>
      <Counter />
    </div>
  );
}
`;
}
