import React, { useState, useContext } from 'react';
import { View, Text, Platform, StatusBar, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

import api from "../api";

import HeaderBar from '../components/HeaderBar';
import Input from '../components/Input';

import { CoursesContext } from "../contexts/courseContext";
import dayjs from 'dayjs';

function CreateCourseScreen({ navigation }) {
  const [course, setCourse] = useState({
    name: "",
    description: "",
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const isIOS = Platform.OS === "ios";
  const [showStart, setShowStart] = useState(isIOS);
  const [showEnd, setShowEnd] = useState(isIOS);

  const { courses, setCourses } = useContext(CoursesContext);

  const handleChange = (name, target) => {
    setCourse({
      ...course,
      [name]: target
    });
  };

  const handleStartDate = (event, selectedDate) => {
    setShowStart(isIOS);
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
  };

  const handleEndDate = (event, selectedDate) => {
    setShowEnd(isIOS);
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
  };

  const handleSubmit = async () => {
    try {
      const newCourse = await api.createCourse({ ...course, startDate, endDate });

      if (newCourse.id) {
        setCourses([newCourse, ...courses]);
        navigation.goBack();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />
      <HeaderBar title={"Create Course"} goBack={() => navigation.navigate("Home")} />

      <KeyboardAvoidingView behavior={isIOS ? "padding" : "height"} style={styles.container}>
        <ScrollView style={styles.inner}>

          <View style={styles.infoWrapper}>

          </View>
          <View>

            <Input
              label={"Name"}
              placeholder={"Insert a name"}
              defaultValue={course.name}
              onChangeText={text => handleChange('name', text)}
            />
            <Input
              label={"Description"}
              placeholder={"Insert a description"}
              defaultValue={course.description}
              onChangeText={text => handleChange('description', text)}
            />
            <View style={styles.datePickerWrapper}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.lable} >Course Start Date:</Text>
                <Text style={styles.date}>{dayjs(startDate).format("MMM D, YYYY")}</Text>
              </View>
              {showStart &&
                (
                  <DateTimePicker
                    style={styles.datePicker}
                    testID="startDate"
                    value={startDate}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={handleStartDate}
                  />
                )
              }
              <TouchableOpacity style={[styles.button, styles.buttonPicker]} onPress={() => setShowStart(true)}>
                <Text style={styles.text}>Change Start Date</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.datePickerWrapper}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.lable} >Course End Date:</Text>
                <Text style={styles.date}>{dayjs(endDate).format("MMM D, YYYY")}</Text>
              </View>
              {
                showEnd && (
                  <DateTimePicker
                    style={styles.datePicker}
                    testID="endDate"
                    value={endDate}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={handleEndDate}
                  />
                )

              }
              <TouchableOpacity style={[styles.button, styles.buttonPicker]} onPress={() => setShowEnd(true)}>
                <Text style={styles.text}>Change End Date</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.text}>Save Course</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={{ height: 40 }}></View>
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
    width: "100%",
    // flex: 0,
  },
  infoWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 10
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: "gray",
    marginBottom: 10
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
  buttonPicker: {
    backgroundColor: "#323232",
    width: "50%",
    height: 30
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "400"
  },
  datePickerWrapper: {
    marginVertical: 10,
    width: "90%",
    marginHorizontal: "5%"
  },
  lable: {
    color: "#323232",
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 5,
    marginLeft: 5
  },
  date: {
    fontSize: 18,
    fontWeight: "600",
    color: "#A11F33",
    marginLeft: 10
  },
  datePicker: {
    height: 40,
    backgroundColor: "white",
    color: "#323232",
    borderColor: "#262858",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});

export default CreateCourseScreen;