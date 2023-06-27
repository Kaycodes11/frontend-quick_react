import React, { HTMLAttributes } from "react";

// to extend HTML elements witout accepting the *ref and *key
export type ButtonProps2 = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  showIcon: boolean;
};

// to extend HTML elements without accepting the *ref and *key
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  showIcon: boolean;
}

// to accept HTML elements with ref and key

interface ButtonPropsWithKeyAndRef {
  options: React.DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
}

// spread the default props and destructure the given props as below
const Button: React.FC<ButtonProps> = ({ title, showIcon, ...props }) => {
  return (
    <button {...props}>
      {showIcon}
      {title}
    </button>
  );
};

// Usage:  <Button title="click me" onClick={() => {}}></Button>

type HTMLProps<T> = React.ClassAttributes<T> & React.HTMLAttributes<T>;

export interface BtProps extends HTMLProps<HTMLButtonElement> {
  variant: "primary" | "secondary";
}

const ButtonWithKeyAndRef = React.forwardRef<HTMLButtonElement, BtProps>((props, ref) => {
  return <button key={"key"} ref={ref} {...props}></button>;
});
