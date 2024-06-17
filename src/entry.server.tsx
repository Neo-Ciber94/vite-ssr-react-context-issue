import { renderToPipeableStream } from "react-dom/server";

import Root from "./root";
import http from "http";
import { ComponentType } from "react";
import { ThemeContext } from "./context";
import { getViteServer } from "./vite";

function ServerEntry({ App }: { App: ComponentType }) {
  const theme = "dark";

  return (
    <ThemeContext.Provider value={theme}>
      <Root>
        <App />
      </Root>
      <script
        id="theme"
        dangerouslySetInnerHTML={{
          __html: `window.initialTheme = ${JSON.stringify(theme)}`,
        }}
      />
    </ThemeContext.Provider>
  );
}

export async function handleRequest(
  _req: http.IncomingMessage,
  res: http.ServerResponse
) {
  //   const { default: Component } = await import("./app");

  // const viteServer = getViteServer();
  // const { default: Component } = await viteServer.ssrLoadModule("virtual:app");
  const { default: Component } = await import("virtual:app" as string);

  const { pipe } = renderToPipeableStream(<ServerEntry App={Component} />, {
    bootstrapScripts: [],
    onShellReady() {
      res.setHeader("content-type", "text/html");
      pipe(res);
    },
    onError(error, info) {
      console.error(error, info);
    },
  });
}
