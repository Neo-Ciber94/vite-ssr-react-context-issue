import React, { Suspense } from "react";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My App</title>
        <ViteScripts />
      </head>
      <body>
        <Suspense>{children}</Suspense>
        <script type="module" src="/src/entry.client.tsx" />
      </body>
    </html>
  );
}

function ViteScripts() {
  return (
    <>
      <script type="module" src="/@vite/client" />
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: `
  import RefreshRuntime from '/@react-refresh'
  RefreshRuntime.injectIntoGlobalHook(window)
  window.$RefreshReg$ = () => {}
  window.$RefreshSig$ = () => (type) => type
  window.__vite_plugin_react_preamble_installed__ = true`,
        }}
      />
    </>
  );
}
