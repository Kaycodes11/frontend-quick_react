import { Document, Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
// import { Svg, ClipPath, G } from "./patches/@react-pdf/renderer";
import Title from "./components/Title";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const App = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Title>Pallab Kayal</Title>
        {/* <View>
          <Text style={{}}>Section: Work History</Text>
        </View> */}
      </Page>
    </Document>
  );
};

export default App;

// https://www.youtube.com/watch?v=YZP5r7Uy_bU&ab_channel=gitname

// https://react-pdf.org/repl
