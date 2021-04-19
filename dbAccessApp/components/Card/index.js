import React from 'react';
import dayjs from 'dayjs';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import AvatarCard from "../AvatarCard";

const Card = ({ id, name, description, startDate, endDate, instructors }) => {
  const navigation = useNavigation();


  return (
    <View style={styles.wrapper}>
      <View style={styles.topCard}>
        <View style={styles.leftCard}>
          <Text style={styles.name}>{name}</Text>
          <Text style={[styles.description]}>
            {description}
          </Text>
        </View>
        <View style={styles.rightCard}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>Enroll Now</Text>
          </TouchableOpacity>
          {
            startDate && endDate && (
              <>
                <Text style={styles.dateLable}>Start Date</Text>
                <Text style={styles.date}>{dayjs(startDate).format("MMM D, YYYY")}</Text>
                <Text style={styles.dateLable}>End Date</Text>
                <Text style={styles.date}>{dayjs(endDate).format("MMM D, YYYY")}</Text>
              </>
            )
          }
        </View>
      </View>
      <View style={styles.bottomCard}>
        <Text style={styles.lable}>Instructors</Text>
        <ScrollView horizontal={true}>
          <View style={styles.avatarsRow}>
            {
              instructors.map(instructor => <AvatarCard key={instructor.id} {...instructor} onPress={() => console.log(instructor.lastName)} />)
            }
            <AvatarCard toAdd onPress={() => navigation.navigate('Add Instructor', {
              courseId: id,
              instructors
            })} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 10,
    marginHorizontal: "5%",
    height: 250,
    borderRadius: 6,
    backgroundColor: "white",
    shadowColor: "#323232",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  topCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  leftCard: {
    width: "65%"
  },
  rightCard: {
    width: "30%"
  },
  name: {
    fontSize: 22,
    fontWeight: "500",
    color: "#262858",
    marginBottom: 5
  },
  description: {
    fontSize: 12,
    color: "gray",
    maxHeight: 82,
    overflow: "hidden",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 22,
    paddingHorizontal: 5,
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: "#262858",
  },
  textButton: {
    color: "white",
    fontWeight: "500",
    fontSize: 10
  },
  dateLable: {
    fontSize: 10,
    color: "#323232",
    marginBottom: 5
  },
  date: {
    fontSize: 12,
    fontWeight: "600",
    color: "#262858",
    marginBottom: 5
  },
  bottomCard: {

  },
  lable: {
    fontSize: 12,
    fontWeight: "500",
    color: "#323232",
    marginVertical: 3,
    paddingHorizontal: 12,
  },
  avatarsRow: {
    paddingHorizontal: 18,
    flexDirection: "row",
    height: 90,
  }
});

export default Card;
