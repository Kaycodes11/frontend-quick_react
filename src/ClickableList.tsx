// @ts-nocheck
type ClickableListProps<T> = {
  items: T[];
  onSelect: (item: T) => void;
  mRef?: React.Ref<HTMLUListElement | null>;
};

export function ClickableList<T>(props: ClickableListProps<T>) {
  return (
    <ul ref={props.mRef}>
      {props.items.map((item, i) => (
        <li key={i}>
          <button onClick={(el) => props.onSelect(item)}>Select</button>
          {item}
        </li>
      ))}
    </ul>
  );
}