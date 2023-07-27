import React from "react";

type Rainbow = "red" | "orange" | "yellow" | "green" | "blue" | "indigo" | "violet";

type Text2Props<C extends React.ElementType> = {
  as?: C;
  color: Rainbow | "black";
};

// First take all the given prop types via React.PropsWithChildren
// now omit<get all native props from the given element, except the given props>
type Props<C extends React.ElementType> = React.PropsWithChildren<Text2Props<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof Text2Props<C>>;

const Text2 = <C extends React.ElementType = "span">({
  as,
  style,
  color,
  children,
  ...restProps
}: Props<C>) => {
  const Component = as || "span";
  return (
    <Component style={style} color={color} {...restProps}>
      {children}
    </Component>
  );
};

export default Text2;
