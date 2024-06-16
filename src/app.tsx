import { Counter } from "./components";
import { useTheme } from "./context";

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
