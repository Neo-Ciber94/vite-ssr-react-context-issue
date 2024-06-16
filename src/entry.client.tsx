import App from "./app";
import { hydrateRoot } from "react-dom/client";
import Root from "./root";
import { Theme, ThemeContext } from "./context";

hydrateRoot(document, <ClientEntry />);

declare var initialTheme: Theme;

function ClientEntry() {
  return (
    <ThemeContext.Provider value={initialTheme}>
      <Root>
        <App />
      </Root>
    </ThemeContext.Provider>
  );
}
