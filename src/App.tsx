import React from 'react';

const Dummy: React.FC<{ onClick: () => void }> = React.memo(function MyDummy() {
  // eslint-disable-next-line no-console
  console.log('Rendering DUMMY');

  return <div>{new Date().getTime()}</div>;
});

type UseBooleanFunction = (initial: boolean) => [boolean, UseBooleanActions];

export type UseBooleanActions = {
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
};

export type UseBoolean = [boolean, UseBooleanActions];

export const useBoolean: UseBooleanFunction = (initial) => {
  const [value, setValue] = React.useState<boolean>(initial);

  // The below three functions modifies the state (i.e. value)

  // NOTE: to prevent the function from being re-created on the subsequent re-renders(unless dependencies changes or clicked)

  const toggle = React.useCallback(() => setValue((v) => !v), []);
  const setTrue = React.useCallback(() => setValue(true), []);
  const setFalse = React.useCallback(() => setValue(false), []);

  // To prevent the value from being re-calculated, React.useMemo() is used but since none of action's method does any heavy calculation so their value may or may not be memoized
  const actions = React.useMemo(
    () => ({ setValue, toggle, setTrue, setFalse }),
    [setFalse, setTrue, toggle]
  );

  return [value, actions];
};

function OpenClosedSign() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
  const [isOpen, isOpenActions] = useBoolean(true);
  // eslint-disable-next-line no-console
  console.log(' Rendering MAIN');

  return (
    <div>
      <Dummy onClick={isOpenActions.toggle} />
      <hr />

      {/* 0. when function passed as prop, then keep in mind followings: */}

      {/* 1. When clicked on button, it changes the state (value of the isOpen) and so it makes the component re-render */}
      {/* 2. during re-render if function as a prop exists (like here: by default it will re-create the function) which is why <Dummy /> component will re-render */}
      {/* 3. during re-render, I know no dependencies has changed and button won't be clicked during "re-render", so just prevent function from being re-created , so wrap the said function with "useCallback" */}

      <button type="button" onClick={isOpenActions.toggle}>
        Toggle
      </button>
      {isOpen ? 'Closed!' : 'Open!'}
    </div>
  );
}

export default OpenClosedSign;
