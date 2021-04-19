import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const HeaderBar = ({ title, goBack }) => {

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.buttonWrapper} onPress={goBack}>
        <Ionicons name="chevron-back" size={18} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 70,
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
    elevation: 2,
    zIndex: 2
  },
  buttonWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 35,
    borderRadius: 35,
    backgroundColor: "#A11F33"
  },
  title: {
    color: "#323232",
    fontSize: 22,
    fontWeight: "500",
    marginLeft: 10,
    color: "#323232"
  }
});

export default HeaderBar;
