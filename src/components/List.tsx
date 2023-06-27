import React from "react";

type ListingProps<TItemType = User> = {
  items: TItemType[];
  render: (item: TItemType) => React.ReactNode;
};

function Listing<Type extends User>(props: ListingProps<Type>) {
  const { items, render } = props;
  return (
    <>
      <ul>
        {items.map((item) => {
          console.log(item.id, item.name);
          return <li key={`item-${item.id}`}>{render(item)}</li>;
        })}
      </ul>
    </>
  );
}

// ---------------------------------------------------------------------------

interface User {
  id: number;
  name: string;
}

const allUsers: User[] = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

export default function List() {
  // render props: when sending data from between components through props & that prop's value is function
  return (
    <div>
      <Listing<User>
        items={allUsers}
        render={(item) => (
          <>
            <span>{item.name}</span>
          </>
        )}
      />
    </div>
  );
}
