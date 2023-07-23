import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const initialSource = Array.from({ length: 100 }).map((_, i) => i + 1);

const style = {
  height: 40,
  border: "1px solid green",
  margin: 6,
  padding: 8,
  textAlign: "center",
};

// This infinite scroll limited to 500 items
// reference: https://codesandbox.io/s/439v8rmqm0?file=/src/index.js

function InfiniteScrollV2() {
  const [items, setItems] = React.useState(initialSource);
  const [loadMore, setLoadMore] = React.useState(true);

  // this fn will be called when it reaches the current end of viewpoint & hasMore = true
  const getTheNextItems = () => {
    // assume this an async request to fetch new data
    setTimeout(() => {
      // most likely however many items it may have currently, let's assume 40
      //  when the next items fetched and it totals >=50  then stop scrolling
      if (items.length >= 50) {
        setLoadMore(false);
        return;
      }
      setItems((prev) => {
        const newItems = Array.from({ length: 50 }).map((_, i) => i + 101);
        return prev.concat(newItems);
      });
    }, 500);
  };
  return (
    <div
      style={{
        height: 500,
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
        marginBottom: 6,
        padding: 8
      }}
    >
      <InfiniteScroll
        dataLength={items.length}
        next={getTheNextItems}
        hasMore={loadMore}
        loader={<p>Loading....</p>}
        endMessage={<p style={{ textAlign: "center" }}>Yeah! U have done scrolling</p>}
      >
        {items.map((data) => {
          // console.log(data);
          return <div key={(Math.random() + 1).toString(36).substring(7)}>{data}</div>;
        })}
      </InfiniteScroll>
    </div>
  );
}

export default InfiniteScrollV2;
