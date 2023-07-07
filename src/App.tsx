import { Text, Font, Page, View, Image, Document, StyleSheet } from "@react-pdf/renderer";
import Resume from "./components/Resume";

export default function App() {
  return (
    <div className="App">
      <Document
        author="Pallab Kayal"
        keywords="Full Stack developer +2.5 years experience"
        subject="The resume of Pallab Kayal"
        title="Resume"
      >
        <Resume size="A4" />
        <Resume orientation="landscape" size="A4" />
        <Resume size={[380, 1250]} />
      </Document>
    </div>
  );
}
