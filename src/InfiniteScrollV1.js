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

// This infinite scroll is never ending
// reference: https://codesandbox.io/s/yk7637p62z?file=/src/index.js

function InfiniteScrollV1() {
  const [dataSource, setDataSource] = React.useState(initialSource);

  // this fn will be called when it reaches the current end of viewpoint & hasMore = true
  const getTheNextItems = () => {
    // assume this an async request to fetch new data
    setTimeout(() => {
      setDataSource((prev) => {
        return prev.concat(Array.from({ length: 20 }).map((_, i) => i + 101));
      });
    }, 1500);
  };
  return (
    <div>
      <h1>This is react infinite scroll component</h1>
      <InfiniteScroll
        dataLength={dataSource.length}
        next={getTheNextItems}
        hasMore={true}
        loader={<p>Loading....</p>}
        // endMessage={<p style={{ textAlign: "center" }}>Yeah! U have done scrolling</p>}
      >
        {dataSource.map((data) => {
          // console.log(data);
          return (
            <div key={(Math.random() + 1).toString(36).substring(7)} style={style}>
              {data}
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

export default InfiniteScrollV1;
