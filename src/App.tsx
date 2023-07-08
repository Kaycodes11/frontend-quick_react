// @ts-nocheck
import React from "react";
import { Document, Image, Page, View, StyleSheet, Font } from "@react-pdf/renderer";
import Header from "./components/Header";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    "@media max-width: 400": {
      flexDirection: "column",
    },
  },
  image: {
    marginBottom: 10,
  },
  leftColumn: {
    flexDirection: "column",
    width: 170,
    paddingTop: 30,
    paddingRight: 15,
    "@media max-width: 400": {
      width: "100%",
      paddingRight: 0,
    },
    "@media orientation: landscape": {
      width: 200,
    },
  },
  footer: {
    fontSize: 12,
    fontFamily: "Lato Bold",
    textAlign: "center",
    marginTop: 15,
    paddingTop: 5,
    borderWidth: 3,
    borderColor: "gray",
    borderStyle: "dashed",
    "@media orientation: landscape": {
      marginTop: 10,
    },
  },
});

Font.register({
  family: "Open Sans",
  src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
});

Font.register({
  family: "Lato",
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

Font.register({
  family: "Lato Italic",
  src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
});

Font.register({
  family: "Lato Bold",
  src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
});

const Resume: React.FC<{ size: string | string[]; orientation: string }> = (props) => (
  <Page {...props} style={styles.page}>
    <Header />
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Image
          src="/pallab-1.jpg"
          style={[styles.image, { height: "225px", objectFit: "cover" }]}
        />
        {/* <Education /> */}
        <Skills />
      </View>
      <Experience />
    </View>
    {/* <Text style={styles.footer}>This IS the candidate you are looking for</Text> */}
  </Page>
);

export default function App() {
  return (
    <Document
      author="Pallab Kayal"
      keywords="javascript, typescript, angular, react"
      subject="The developer resume of Pallab Kayal"
      title="Pallab Kayal"
    >
      <Resume size="A4" />
      {/* <Resume orientation="landscape" size="A4" /> */}
      {/* <Resume size={[380, 1250]} /> */}
    </Document>
  );
}
