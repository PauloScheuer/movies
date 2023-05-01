import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import SimpleButton from "./simpleButton";

interface SearchBarI {
  onSubmitSearch: (query: string) => void;
  onClearSearch: () => void;
}

const SearchBar = ({ onSubmitSearch, onClearSearch }: SearchBarI) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        placeholder="Search for a title"
      />
      <View style={styles.buttonContainer}>
        <SimpleButton
          title="Search"
          onPress={() => onSubmitSearch(searchQuery)}
        />
        <SimpleButton
          title="Clear"
          onPress={() => {
            setSearchQuery("");
            onClearSearch();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    marginTop: 12,
    width: "80%",
    height: 36,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  buttonContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});

export default SearchBar;
