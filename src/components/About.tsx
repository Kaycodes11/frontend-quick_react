import { Text, View, StyleSheet } from "@react-pdf/renderer";
import Title from "./Title";

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  school: {
    fontFamily: "Lato Bold",
    fontSize: 10,
  },
  degree: {
    fontFamily: "Lato",
    fontSize: 10,
  },
  candidate: {
    fontFamily: "Lato Italic",
    fontSize: 10,
  },
});

const About = () => {
  return (
    <View style={styles.container}>
      <Title>About</Title>
      <Text style={styles.school}>Front end developer</Text>
      <Text style={styles.degree}>UI developer</Text>
      <Text style={styles.candidate}>MEAN/MERN developer</Text>
    </View>
  );
};

export default About;
