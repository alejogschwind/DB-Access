import React, { useState, useContext } from 'react';
import { View, Text, StatusBar, Button, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Card from "../components/Card";

import { CoursesContext } from '../contexts/courseContext';

function HomeScreen({ navigation }) {
  const { courses } = useContext(CoursesContext);

  console.log(courses);
  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <View style={styles.hero}>
        <LinearGradient
          start={{ x: 0.5, y: 0.1 }}
          end={{ x: 0.8, y: 0.8 }}
          colors={['#262858', '#1B1C40']}
          style={styles.background}
        />
        <View style={styles.iconsTop}>
          <Feather name="menu" size={22} color="white" />
          <Feather name="bell" size={22} color="white" />
        </View>
        <View style={[styles.circle, styles.circle1]}></View>
        <View style={[styles.circle, styles.circle2]}></View>
        <View style={[styles.circle, styles.circle3]}></View>
        <View style={styles.textWrapper}>
          <Text style={styles.hiText}>Hi There!</Text>
          <Text style={styles.welcomeText}>Welcome to DBAccess Academy</Text>
        </View>
      </View>
      <ScrollView style={{ marginBottom: 200 }}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Create Instructor')}
          >
            <Text style={styles.buttonText}>Create Instructor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => navigation.navigate('Create Course')}
          >
            <Text style={styles.buttonTextSecondary}>Create Course</Text>
          </TouchableOpacity>
        </View>
        {
          courses.length > 0 &&
          courses.map(course => <Card key={course.id} {...course} navigation={navigation} />)
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 1,
    zIndex: 1
  },
  hero: {
    height: 200,
    backgroundColor: "#262858",
    borderBottomRightRadius: 40,
    overflow: "hidden"
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 220,
    borderRadius: 40,
  },
  textWrapper: {
    position: "absolute",
    left: 24,
    bottom: 24,
  },
  hiText: {
    fontSize: 22,
    fontWeight: "600",
    color: "white"
  },
  welcomeText: {
    marginVertical: 5,
    fontSize: 14,
    fontWeight: "400",
    color: "white"
  },
  circle: {
    position: "absolute",
    height: 140,
    width: 140,
    borderRadius: 140,
    backgroundColor: "#1b1e41",
  },
  circle1: {
    bottom: -24,
    left: -24,
  },
  circle2: {
    bottom: 24,
    left: 24,
  },
  circle3: {
    height: 60,
    width: 60,
    borderRadius: 60,
    top: -10,
    right: -10,
  },
  iconsTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    width: "100%",
    paddingHorizontal: 24,
    top: 30,
    left: 0,
    elevation: 4,
    zIndex: 4,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginHorizontal: "5%",
    marginTop: 20
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 40,
    width: "100%",
    backgroundColor: "#A11F33",
    borderRadius: 6,
    shadowColor: "#323232",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.45,
    shadowRadius: 6
  },
  buttonSecondary: {
    backgroundColor: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500"
  },
  buttonTextSecondary: {
    color: "#323232",
    fontSize: 14,
    fontWeight: "500"
  },
});

export default HomeScreen;