import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  bulletPoint: {
    width: 10,
    fontSize: 12,
  },
  itemContent: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Lato',
  },
});

const List = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

type ItemType<T = any> = { children: React.ReactNode; style?: T };

export function Item({ children, style }: ItemType) {
  if (children) {
    return (
      <View style={styles.item}>
        <Text style={styles.bulletPoint}>•</Text>
        <Text style={styles.itemContent}>{children}</Text>
      </View>
    );
  } else return null;
}

export default List;
