import "./App.css";
import Menu from "./components/header/Menu";

const INITIAL_MENU = [
  {
    onclick: {},
    data: "מידע כללי",
  },
  {
    onclick: {},
    data: "פקולטות",
  },
];

const App = () => {
  return (
    <div className="App">
      <Menu items={INITIAL_MENU} />
    </div>
  );
};

export default App;
