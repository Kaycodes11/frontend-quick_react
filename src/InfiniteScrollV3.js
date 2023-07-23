import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const list = Array.from({ length: 20 });

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const InfiniteScrollV3 = () => {
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
      <div id="scrollableDiv" style={{ height: 300, overflow: "auto" }}>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={loadMore}
          loader={<p>Loading....</p>}
          scrollableTarget="scrollableDiv"
          endMessage={<p>Yeah You have done scrolling</p>}
        >
          {items.map((item, index) => (
            <div key={`div-${index}`} style={style}>
              div - #{index}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default InfiniteScrollV3;
