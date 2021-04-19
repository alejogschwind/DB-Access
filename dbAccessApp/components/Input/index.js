import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from "react-native";

const Input = ({ label, ...otherProps }) => {

  const [focus, setFocus] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={[styles.textInput, focus && styles.textInputFocus]}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
    width: "90%",
    marginHorizontal: "5%"
  },
  label: {
    color: "#323232",
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 5,
    marginLeft: 5
  },
  textInput: {
    width: "100%",
    height: 40,
    color: "#323232",
    borderColor: "#262858",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  textInputFocus: {
    borderWidth: 2
  }
});

export default Input;
