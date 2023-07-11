import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import Title from "./Title";
import List, { Item } from "./List";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 15,
    "@media max-width: 400": {
      paddingTop: 10,
      paddingLeft: 0,
    },
  },
  entryContainer: {
    marginBottom: 10,
  },
  date: {
    fontSize: 11,
    fontFamily: "Lato Italic",
  },
  detailContainer: {
    flexDirection: "row",
  },
  detailLeftColumn: {
    flexDirection: "column",
    marginLeft: 10,
    marginRight: 10,
  },
  detailRightColumn: {
    flexDirection: "column",
    flexGrow: 9,
  },
  bulletPoint: {
    fontSize: 10,
  },
  details: {
    fontSize: 10,
    fontFamily: "Lato",
  },
  aboutTitle: {
    fontSize: 12,
    fontFamily: "Lato",
    marginBottom: 10,
  },

  headerContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  leftColumn: {
    flexDirection: "column",
    flexGrow: 9,
  },
  rightColumn: {
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "flex-end",
    justifySelf: "flex-end",
  },
  title: {
    fontSize: 11,
    color: "black",
    textDecoration: "none",
    fontFamily: "Lato Bold",
  },
});

interface iExperienceEntry {
  company: string;
  date: string;
  details: string[];
  position: string;
}

const ExperienceEntry: React.FC<iExperienceEntry> = ({ company, details, position, date }) => {
  const title = `${company} | ${position}`;
  return (
    <View style={styles.entryContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <List>
        {details.map((detail, i) => (
          <Item key={i} style={styles.detailContainer}>
            {detail}
          </Item>
        ))}
      </List>
    </View>
  );
};

const experienceData = [
  {
    company: "Ogma conceptions",
    date: "Aug 12, 2021 - present",
    details: [
      "Migrated a large legacy webapp to modern tech stack e.g. React, TypeScript, TailwindCSS, Redux Toolkit",
      "Woked closely with UI/UX, backend teams & co-lead a medical application that relies on stripe features heavily",
      "Built a component library for our UI team to use across different projects",
      "Audited and debugged exisiting webapps to find performance bottlenecks and improved without any breaking changes",
      "Added unit tests to some existing projects to reduce the repeatative bugs",
    ],
    position: "Front End Developer",
  },
  {
    company: "A1Future",
    date: "Feb 1, 2021 - July 30, 2021",
    details: [
      "Implemented realtime updates with Socket.io for social media webapp that handles huge traffic",
      "Increased the api performance across several project with in-memory Redis cache",
      "Worked with onshore teams to migreate old Angular.js app to latest Angular framework",
      "Migrated one of our major internal product to Next.js for better SEO and performance",
    ],
    position: "Front End Developer",
  },
  {
    company: "Touchstonetieup",
    date: "Nov 1, 2020 - Jan 31, 2021",
    details: [
      "Supported an existing project with Google Map integration and added the location tracking in it",
      "Handled Firebase push notification implementation across several projects",
      // "Worked on projects that involved integrating third-party libraries and RESTful APIs.",
      // "Worked with different Q/A teams for the manual Q/A testing",
    ],
    position: "Front End Developer",
  },
  // {
  //   company: "Tatooine Moisture Refinery",
  //   date: "A long time ago...",
  //   details: [
  //     "Replaced damaged power converters",
  //     "Performed menial labor thoughout the farm in order to ensure its continued operation",
  //   ],
  //   position: "Moisture Farmer",
  // },
];

const Experience = () => {
  return (
    <View style={styles.container}>
      <Title>About Me</Title>
      <Text style={styles.aboutTitle}>
        Logical and results-driven Front end developer dedicated to building user-engaging websites
        and applications. Judicious and creative when crafting effective and performant websites.
      </Text>

      <Title>Experience</Title>
      {experienceData.map(({ company, date, details, position }) => (
        <ExperienceEntry
          company={company}
          date={date}
          details={details}
          key={company + position}
          position={position}
        />
      ))}
    </View>
  );
};

export default Experience;
