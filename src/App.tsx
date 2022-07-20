import React from "react";
import Section from "./features/Section";
import useFetch from "./hooks/useFetch";
import useWindowSize from "./hooks/useWindowSize";
import useIsomorphicLayoutEffect from "./hooks/useIsomorphicLayoutEffect";
import useEventListener from "./hooks/useEventListener";
import useInterval from "./hooks/useInterval";
import useTimeout from "./hooks/useTimeout";
import useMediaQuery from "./hooks/useMediaQuery";
import useCounter from "./hooks/useCounter";
import useScript from "./hooks/useScript";
import useLocalStorage from "./hooks/useLocalStorage";
import useSessionStorage from "./hooks/useSessionStorage";
import "./App.css";
import useStep from "./hooks/useStep";

const url = `https://jsonplaceholder.typicode.com/posts`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const jQuery: any;

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function App() {
  const [isDarkTheme, setDarkTheme] = useLocalStorage(`darkTheme`, true);
  const status = useScript(`https://code.jquery.com/jquery-3.5.1.min.js`);
  const matches = useMediaQuery("(min-width: 768px)");
  const [value, setValue] = useSessionStorage("test-key", 0);
  const [count, setCount] = React.useState<number>(0);
  const [delay, setDelay] = React.useState<number>(1000);
  const { count: count1, setCount: setCount1, increment, decrement, reset: reset1 } = useCounter(0);
  const [visible, setIsvisible] = React.useState<boolean>(false);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const { width, height } = useWindowSize();
  const { data, error } = useFetch<Post[]>(url);
  const [currentStep, helpers] = useStep(5);
  const { canGoToPrevStep, canGoToNextStep, goToNextStep, goToPrevStep, reset, setStep } = helpers;
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const documentRef = React.useRef<Document>(document);
  const hide = () => setIsvisible(false);
  const toggleTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  const multiplyBy2 = () => setCount1((x) => x * 2);
  const onScroll = (event: Event) => {
    console.log("window scrolled", event);
  };
  const onClick = (event: Event) => {
    console.log("button clicked", event);
  };
  const onVisibilityChange = (event: Event) => {
    console.log("doc visibility changed!", {
      isVisible: !document.hidden,
      event,
    });
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(event.target.value));
  };

  useInterval(
    () => {
      setCount(count + 1);
    },
    isPlaying ? delay : null
  );
  useTimeout(hide, 5000);

  useIsomorphicLayoutEffect(() => {
    console.log(
      `within browser, using [useLayoutEffect] but when using ssr then it is the [useEffect]`
    );
  }, []);

  // example with window based event
  useEventListener("scroll", onScroll);

  // example with document based event
  useEventListener("visibilitychange", onVisibilityChange, documentRef);

  // example with element based event
  useEventListener("click", onClick, buttonRef);

  React.useEffect(() => {
    if (typeof jQuery !== "undefined") {
      // jQuery is loaded => print the jquery version
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      alert(jQuery.fn.jquery);
    }
  }, [status]);

  if (error) return <p>There is an error.</p>;
  if (!data) return <p>Loading...</p>;
  return (
    <div style={{ minHeight: "200vh" }}>
      <button ref={buttonRef}>click</button>
      <p>{data[0].title}</p>
      <h1>{count}</h1>
      <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? "pause" : "play"}</button>
      <p>
        <label htmlFor="delay">Delay: </label>
        <input type="number" name="delay" onChange={handleChange} value={delay} />
      </p>
      The current window dimension are: <code>{JSON.stringify({ width, height })}</code>
      <p>{visible ? "This is visible for 5000ms" : "this is invisible now"}</p>
      <div>{`The view port is ${matches ? "at least" : "less than"} 768 pixels wide`}</div>
      {/* Section */}
      {/*{Array.from({length: 5}).map((_, index) => (*/}
      {/*    <Section key={index + 1} title={`${index + 1}`}/>*/}
      {/*))}*/}
      <p>Count is {count1}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset1}>Reset</button>
      <button onClick={multiplyBy2}>Multiply by 2</button>
      <button onClick={toggleTheme}>{`The current theme is ${
        isDarkTheme ? `dark` : `light`
      }`}</button>
      <p>value: {value}</p>
      <button onClick={() => setValue((x) => x + 1)}>increment</button>
      <button onClick={() => setValue((x) => x - 1)}>decrement</button>
      <br />
      <p>Current step is {currentStep}</p>
      <p>Can go to previous step {canGoToPrevStep ? "yes" : "no"}</p>
      <p>Can go to next step {canGoToNextStep ? "yes" : "no"}</p>
      <button onClick={goToNextStep}>Go to next step</button>
      <button onClick={goToPrevStep}>Go to previous step</button>
      <button onClick={reset}>Reset</button>
      <button onClick={() => setStep(3)}>Set to step 3</button>
    </div>
  );
}
