import { View, Text, TextInput } from "react-native";
import React from "react";

const Searchbar = (props) => {
  return (
    <View
      style={{ width: "50%", height: 30, alignSelf: "center", marginTop: 20 }}
    >
      <TextInput
        style={{
          justifyContent: "center",
          padding: 10,
          borderColor: "white",
          color: "white",
          width: "100%",
          height: 40,
          alignSelf: "center",
          borderWidth: 2,
          borderRadius: 30,
        }}
        placeholder="enter city, Country"
        placeholderTextColor="white"
        value={props.Search}
        onChangeText={(text) => props.setSearch(text)}
        onSubmitEditing={props.onSubmit}
      />
    </View>
  );
};

export default Searchbar;
