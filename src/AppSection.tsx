import Section from "./features/Section";

export default function AppSection() {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <Section key={index + 1} title={`${index + 1}`} />
      ))}
    </div>
  );
}
