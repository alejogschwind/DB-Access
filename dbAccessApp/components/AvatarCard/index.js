import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { SvgUri } from 'react-native-svg';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Feather } from "@expo/vector-icons";


const AvatarCard = ({ toAdd, onPress, firstName, lastName, avatar, inRow, selected }) => {
  return (
    <TouchableWithoutFeedback
      style={[
        styles.wrapper,
        inRow && styles.inRowWrapper,
        selected && styles.selectedCard
      ]}
      onPress={onPress}
    >
      {
        toAdd ? (
          <>
            <Feather name="plus-circle" color="#323232" size={18} />
            <Text style={{
              fontSize: 6,
              fontWeight: "300",
              textAlign: "center",
              marginTop: 10
            }}>Add Instructor</Text>
          </>
        ) : (
            <>
              <View style={[styles.photo, inRow && styles.inRowPhoto]}>
                <SvgUri
                  width="100%"
                  height="100%"
                  style={[styles.avatar]}
                  uri={avatar} />
              </View>
              <Text style={[styles.fullName, inRow && styles.inRowFullName]}>{firstName} {lastName}</Text>
            </>
          )
      }
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18,
    height: 80,
    padding: 2,
    width: 50,
    borderRadius: 6,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e1e0e1"
    // shadowColor: "#323232",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 1
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#2196f3"
  },
  inRowWrapper: {
    width: "98%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: "5%",
    marginTop: 4,
    marginHorizontal: "1%"
  },
  photo: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    marginBottom: 5,
    borderRadius: 6,
    backgroundColor: "#eaeaea"
  },
  inRowPhoto: {
    height: 60,
    width: 60,
    marginRight: 10,
  },
  fullName: {
    // height: "30%",
    fontSize: 7,
    fontWeight: "500",
    paddingHorizontal: 2.5,
    overflow: "hidden"
  },
  inRowFullName: {
    fontSize: 16,
    fontWeight: "400"
    // marginLeft: 10
  }
});

export default AvatarCard;
