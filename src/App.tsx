import React from "react";
import "./App.css";

type User = { name: string; id: string };
type LoadingStatus = { loading: "STARTED" | "DONE" };

function doInterval() {
  console.log("do something");
}

// React + TypeScript usage guide: https://react-typescript-cheatsheet.netlify.app
// https://fettblog.eu/typescript-react-extending-jsx-elements/
// https://stackoverflow.com/questions/64867112/difference-between-react-htmlpropshtmldivelement-and-react-detailedhtmlpropsr
// https://www.saltycrane.com/cheat-sheets/typescript/react/latest/
// https://stackoverflow.com/questions/66348283/to-extend-the-react-select-interface-property-in-typescript?rq=4
function App() {
  const [user, setUser] = React.useState<User | null>(null);
  const [status, setStatus] = React.useState<LoadingStatus>({} as LoadingStatus);
  const intervalRef = React.useRef<number | null>(null);
  // it's standard to initialize `useRef` with null, but tell TypeScript we're looking for HTMLInputElement
  const inputEl = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (intervalRef.current) {
      intervalRef.current = window.setInterval(doInterval, 2500);
    }
    return () => {
      clearInterval(intervalRef.current!);
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (inputEl && inputEl.current) inputEl.current.focus();
  };

  const handleInput = (event: React.ChangeEventHandler<HTMLInputElement>) => {};

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex", gap: "0.2rem" }}>
          <input ref={inputEl} type="text" />
          <button onClick={handleClick}>focus input</button>
        </div>
      </header>
    </div>
  );
}

export default App;
