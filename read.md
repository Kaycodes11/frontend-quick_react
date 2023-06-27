# [ Reference ]: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/class_components

```ts
class App extends React.Component<{ message: string }, { count: number }> {
  state = { count: 0 };
  componentDidMount() {
    console.log(this.state);
  }
  render() {
    const greet = "Hello, TypeScript";
    return (
      <div onClick={() => this.increment(1)}>
        {this.props.message} {this.state.count}
      </div>
    );
  }

```

## ForwardRef and to customize the forwarded Ref's value , use the "useImperativeHandle hook"

```ts
// Main.tsx
import { useRef, forwardRef, useImperativeHandle } from "react";

export function Main() {
  const methodsRef = useRef();

  const focus = () => methodsRef.current.focus();
  const blur = () => methodsRef.current.blur();

  return (
    <>
      <FocusableInput ref={methodsRef} />
      <button onClick={focus}>Focus input</button>
      <button onClick={blur}>Blur input</button>
    </>
  );
}

// FocusableInput.tsx
const FocusableInput = forwardRef(function (props, ref) {
  const inputRef = useRef();

  useImperativeHandle(
    ref, // forwarded ref
    function () {
      return {
        focus() {
          inputRef.current.focus();
        },
        blur() {
          inputRef.current.blur();
        },
      }; // the forwarded ref value
    },
    []
  );

  return <input type="text" ref={inputRef} />;
});
```

```ts

type FramerDiv = JSX.IntrinsicElements["div"] & {marginX: string; marginY: string};



# extending a native HTML element as below::

declare namespace JSX {
  interface ExtendedButton
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    customAttribute?: string;
  }

  interface IntrinsicElements {
    button: ExtendedButton;
  }
}
```
