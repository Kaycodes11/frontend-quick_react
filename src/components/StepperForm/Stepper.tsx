import React from "react";

interface StepState {
  description: string;
  completed: boolean;
  highlighted: boolean;
  selected: boolean;
}

const Stepper: React.FC<{ steps: Array<string>; currentStep: number }> = ({
  steps,
  currentStep,
}) => {
  const [newStep, setNewStep] = React.useState<StepState[]>([]);
  const stepRef = React.useRef<StepState[] | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateStep = (stepNo: number, steps: StepState[]): StepState[] => {
    const newSteps = [...steps];
    let count = 0;

    while (count < newStep.length) {
      if (count === stepNo) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      } else if (count < stepNo) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }

    return newSteps;
  };

  React.useEffect(() => {
    const stepsState = steps.map((step, i) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: i === 0,
          selected: i === 0,
        }
      )
    );

    stepRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep, updateStep]);

  // This is just a multi-line JSX assigned to this variable
  const displaySteps = newStep.map((step, index) => {
    return (
      <div
        key={`${String(step) + String(index)}`}
        className={
          index !== newStep.length - 1
            ? "w-full flex items-center"
            : "flex items-center"
        }
      >
        <div className="relative flex flex-col items-center text-teal-600">
          <div
            className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${
              step.selected
                ? "bg-green-600 text-white font-bold border border-green-600"
                : ""
            }`}
          >
            {/* Display Number */}
            {step.completed ? (
              <span className="text-white font-bold text-xl">&#10003;</span>
            ) : (
              index + 1
            )}
          </div>

          <div
            className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${
              step.highlighted ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {step.description}
          </div>
        </div>

        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
            step.completed ? "border-green-600" : "border-gray-300"
          }`}
        >
          {/* Display line */}
        </div>
      </div>
    );
  });

  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {displaySteps}
    </div>
  );
};

export default Stepper;

// create virtual Dom -> real dom

// re-render: create virtual Dom and check against existing virtual dom

/*

prev = { type: Array, elements: [1, 2, 3, 4] }
now = { type: Array, elements: [1, 3, 4] } : since unifier of each element (i.e. here assume index) has changed so new array thus re-render



*/
