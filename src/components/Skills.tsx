import { Text, View, StyleSheet } from "@react-pdf/renderer";

import Title from "./Title";
import List, { Item } from "./List";

const styles = StyleSheet.create({
  title: {
    fontFamily: "Lato Bold",
    fontSize: 12,
    marginBottom: 10,
  },
  skills: {
    fontFamily: "Lato",
    fontSize: 10,
    marginBottom: 10,
  },
});

const SkillEntry = ({ name, skills }: { name: string; skills: string[] }) => (
  <View>
    {name && <Text style={styles.title}>{name}</Text>}
    <List>
      {skills.map((skill, i) => (
        <Item key={i}>{skill}</Item>
      ))}
    </List>
  </View>
);

const Skills = () => (
  <View>
    <Title>Skills</Title>
    <SkillEntry
      name=""
      skills={[
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Next",
        "Angular",
        "Node",
        "Nest",
        "PostgreSQL",
        "MongoDB",
      ]}
    />

    <SkillEntry name="Interests" skills={["Open-source contribution", "Flutter"]} />
  </View>
);

export default Skills;
