import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const list = Array.from({ length: 20 });

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const InfiniteScrollV4 = () => {
  const [items, setItems] = React.useState(list);
  const [loadMore, setLoadMore] = React.useState(true);

  const fetchMoreData = () => {
    if (items.length >= 50) {
      setLoadMore(false);
      return;
    }
    setTimeout(() => {
      setItems((prev) => prev.concat(Array.from({ length: 20 })));
    }, 1000);
  };

  return (
    <div>
      <h1>demo: react-infinite-scroll-component</h1>
      <hr />
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={loadMore}
          loader={<p>Loading....</p>}
          height={400}
          endMessage={<p>Yeah You have done scrolling</p>}
        >
          {items.map((item, index) => (
            <div key={`div-${index}`} style={style}>
              div - #{index}
            </div>
          ))}
        </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollV4;
