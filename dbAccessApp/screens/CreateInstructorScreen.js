import React, { useState, useContext } from 'react';
import { View, Text, StatusBar, Platform, StyleSheet, KeyboardAvoidingView, Keyboard, Image, ImageBackground } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { SvgUri } from 'react-native-svg';

import HeaderBar from "../components/HeaderBar";
import Input from "../components/Input";

import { InstructorContext } from '../contexts/instructorContext';

import api from "../api";

function CreateInstructorScreen({ navigation }) {

  const [instructor, setInstructor] = useState({
    firstName: "",
    lastName: "",
  });
  const isIOS = Platform.OS === "ios";
  const [avatar, setAvatar] = useState({ uri: `https://avatars.dicebear.com/api/human/asdsad.svg` });
  const { instructors, setInstructors } = useContext(InstructorContext);


  const handleChange = (name, target) => {

    setInstructor({
      ...instructor,
      [name]: target
    });
    setAvatar({
      uri: `https://avatars.dicebear.com/api/human/${instructor.firstName}+${instructor.lastName}.svg`
    });
  };

  const handleSubmit = async () => {
    const newInstructor = await api.createInstructor({ ...instructor, avatar: avatar.uri });

    setInstructors(instructors.concat(newInstructor).sort((a, b) => (
      `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`))
    ));
    navigation.navigate("Home");
  };

  const notFirstNameOrLastName = !(instructor.firstName.length || instructor.lastName.length);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />
      <HeaderBar title={"Create Instructor"} goBack={() => navigation.navigate("Home")} />

      <KeyboardAvoidingView behavior={isIOS ? "padding" : "height"} style={styles.container}>
        <ScrollView style={styles.inner}>

          <View style={styles.infoWrapper}>
            <View style={styles.avatar}>
              <SvgUri
                width="80%"
                height="80%"
                style={styles.image}
                uri={avatar.uri} />
            </View>
            <Text style={[styles.fullName, notFirstNameOrLastName && styles.placeholderName]}>
              {notFirstNameOrLastName ?
                "Instructor Name" :
                `${instructor.firstName} ${instructor.lastName}`
              }
            </Text>
          </View>
          <View>

            <Input
              label={"First Name"}
              placeholder={"Insert a first name"}
              defaultValue={instructor.firstName}
              onChangeText={text => handleChange('firstName', text)}
            />
            <Input
              label={"Last Name"}
              placeholder={"Insert a last name"}
              defaultValue={instructor.lastName}
              onChangeText={text => handleChange('lastName', text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.text}>Save Instructor</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 40 }}></View>
        </ScrollView>
      </KeyboardAvoidingView >
    </View >
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
  inner: {
    width: "100%"
  },
  infoWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 10
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 60,
    borderRadius: 60,
    borderWidth: 2,
    marginBottom: 10,
    overflow: "hidden",
    elevation: 3,
    zIndex: 3
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 60,
    zIndex: 1
  },
  fullName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#323232"
  },
  placeholderName: {
    color: "#cbcbcc"
  },
  button: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1B1C40",
    height: 40,
    borderRadius: 6,
    width: "90%",
    marginHorizontal: "5%"
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "400"
  }
});


export default CreateInstructorScreen;