import { Link, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#112131",
    borderBottomStyle: "solid",
    alignItems: "stretch",
  },
  detailColumn: {
    flexDirection: "column",
    flexGrow: 9,
    textTransform: "uppercase",
  },

  name: {
    fontSize: 24,
    fontFamily: "Lato Bold",
  },
  subtitle: {
    fontSize: 10,
    justifySelf: "flex-end",
    fontFamily: "Lato",
    marginBottom: 5,
  },
  link: {
    fontFamily: "Lato",
    fontSize: 10,
    color: "black",
    textDecoration: "none",
    alignSelf: "flex-end",
    justifySelf: "flex-end",
  },

  linkColumn: {
    flexDirection: "column",
    flexGrow: 2,
    alignSelf: "flex-end",
    justifySelf: "flex-end",
    textDecorationStyle: "none"
  },
});

const Header = () => (
  <View style={styles.container}>
    <View style={styles.detailColumn}>
      <Text style={styles.name}>Pallab Kayal</Text>
      <Text style={styles.subtitle}>Front end developer</Text>
      <Text style={styles.subtitle}>Email: pallabk12@gmail.com</Text>
      <Text style={styles.subtitle}>Mobile: +91 9330095700</Text>

    </View>
    <View style={[styles.linkColumn, { marginBottom: 10 }]}>
      {/* <Link src="mailto:pallabk12@gmail.com">pallabk12@gmail.com</Link> */}
    </View>
  </View>
);

export default Header;
