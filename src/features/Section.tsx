import { useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const Section = (props: { title: string }) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(divRef, {});
  const isVisible = !!entry?.isIntersecting;

  console.log(`Render Section ${props.title}`, { isVisible });

  return (
    <div
      ref={divRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        border: "1px dashed #000",
        fontSize: "2rem",
      }}
    >
      <div style={{ margin: "auto" }}>{props.title}</div>
    </div>
  );
};

export default Section;
