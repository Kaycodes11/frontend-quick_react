import React from "react";

function tuplify<T extends any[]>(...elements: T) {
  return elements;
}

function useArray() {
  const numberValue = React.useRef(3).current;
  const functionValue = React.useRef(() => {}).current;
  return [numberValue, functionValue]; // type is (number | (() => void))[]
}

function useTuple() {
  const numberValue = React.useRef(3).current;
  const functionValue = React.useRef(() => {}).current;
  return tuplify(numberValue, functionValue); // type is [number, () => void]
}

// React recommends to use object when returning more than two values
const useLoading = () => {
  const [isLoading, setLoading] = React.useState(false);
  const load = (aPromise: Promise<any>) => {
    setLoading(true);
    return aPromise.finally(() => setLoading(false));
  };
  // infers [typeof isLoading = boolean, typeof load = function ] instead of (boolean | function)[]
  return [isLoading, load] as const;

  // return [isLoading, load] as [boolean, (aPromise: Promise<any>) => Promise<any>];
};

export default useLoading;
