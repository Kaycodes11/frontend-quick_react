import React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  title: {
    fontFamily: "Oswald",
    fontSize: 14,
    // marginBottom: 10,
    // marginLeft: 10,
    // marginTop: 10,
    margin: "10 0 10 10",
    textTransform: "uppercase",
  },
  mail: {
    fontFamily: "Oswald",
    fontSize: 14,
    textTransform: "uppercase",
    display: "flex",
  },
});

const Title = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.title}>{children}</Text>
);

export default Title;
