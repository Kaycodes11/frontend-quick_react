import React from "react";

// Define an interface for the context value (type based on what is provided through .Provider value and children)
interface StepperContextType<T = any> {
  userData: T; // whatever given as for `userData` will be implicitly inferred by TypeScript at compile-time
  setUserData: React.Dispatch<React.SetStateAction<T>>;
  finalData: any[]; // Replace 'any' with a more specific type if possible
  setFinalData: React.Dispatch<React.SetStateAction<any[]>>; // Replace 'any' with a more specific type if possible
}

// since, StepperContextType has a default argument; no need to pass a type argument as StepperContextType<any> below
const StepperContext = React.createContext<StepperContextType | null>(null);

// Custom hook to consume context with type assertion
export function useStepperContext<T>() {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error(
      "useStepperContext must be used within a StepperContextProvider"
    );
  }

  // below line will take Type Argument from this custom hook and use in StepperContextType<T>
  return context as StepperContextType<T>;
}

export default StepperContext;
