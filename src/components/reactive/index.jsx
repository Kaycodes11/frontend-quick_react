import React from "react";
import "./style.scss";

const ReactiveAnimation = () => {
  const circleEl = React.useRef(null);
  const currentPoint = React.useRef({ x: 0, y: 0 });
  const targetPoint = React.useRef({ x: 0, y: 0 });

  function lerp() {
    // whereas currentPoint will be used track the moved distance from currentPoint to targetPoint

    // let's take an example of X axis

    // currentPoint.X =  2
    // pointer moved on X axis thus targetPoint.X = 10

    // X axis difference / distance = targetPoint.X - currentPoint.X = 8

    // 2 + 8 (which is the value of targetPoint.X) = 10 * 0.1 = 1

    const currentPointX = currentPoint.current.x + (targetPoint.current.x - currentPoint.current.x) * 0.1;
    const currentPointY = currentPoint.current.y + (targetPoint.current.y - currentPoint.current.y) * 0.1;

    currentPoint.current = { x: currentPointX, y: currentPointY };
    console.log(currentPoint.current, targetPoint.current);

    // This is what setProperty does
    // <div class="circle" style="--x: 789.0000000000005; --y: 341.0000000000002;"></div>
    circleEl.current?.style.setProperty("--x", currentPoint.current.x);
    circleEl.current?.style.setProperty("--y", currentPoint.current.y);

    window.requestAnimationFrame(lerp);
  }

  // now thanks to useRef, the component doesn't re-render even when currentPoint and targetPoint changes
  console.log("Re-rendering: ", currentPoint.current.x, targetPoint.current.x);

  // To run the given animation ( here i.e. lerp ) right before the next/upcoming repaint
  window.requestAnimationFrame(lerp);

  document.body.addEventListener("pointermove", (event) => {
    // targetPoint holds the latest X, Y values (basically where the pointer moved)
    targetPoint.current = { x: event.clientX, y: event.clientY };
  });

  return <div ref={circleEl} className="circle"></div>;
};

export default ReactiveAnimation;
