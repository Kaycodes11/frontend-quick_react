import { forwardRef, useRef, useEffect } from "react";

export default function AppParent() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(elementRef.current); // logs <div>Deep!</div>
  }, []);

  return <Child ref={elementRef} />
}

const Child = forwardRef<HTMLDivElement>(function (props, ref) {
  return <GrandChild ref={ref} />
})

const GrandChild = forwardRef<HTMLDivElement>(function (props, ref) {
  return <div ref={ref}>Deep! from the GrandChild component</div>
})