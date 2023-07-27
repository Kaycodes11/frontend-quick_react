import React from "react";
import Text from "./components/Text";
import Text2 from "./components/Text2";

// https://github.com/mantinedev/mantine/commit/10e9c57101f5bd9ffe0c45ce4f02d0ff800205d2
function App() {
  return (
    <div className="App">
      <Text>This is a text node with no as prop</Text>
      <Text2 as="h2" color="green">This is heading 2</Text2>
      <Text as="h1" style={{ textAlign: "center" }}>
        Polymorphic Component
      </Text>
      <Text as="a" href="https://youtube.com/" style={{ fontSize: "2rem", textDecoration: "none"}}>
        Go to this link
      </Text>
    </div>
  );
}

export default App;
