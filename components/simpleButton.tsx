import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface SimpleButtonI {
  title: string;
  onPress: () => void;
}

const SimpleButton = ({ title, onPress }: SimpleButtonI) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#457DFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 16,
  },
  title: {
    fontWeight: "500",
    color: "#e5e5e5",
  },
});

export default SimpleButton;
