import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { ScrollView, FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import HeaderBar from "../components/HeaderBar";
import AvatarCard from '../components/AvatarCard';

import { InstructorContext } from "../contexts/instructorContext";
import { CoursesContext } from '../contexts/courseContext';

import api from '../api';

function AddInstructorScreen({ navigation, route }) {
  const [selected, setSelected] = useState(route.params.instructors);

  const { instructors, setInstructors } = useContext(InstructorContext);
  const { courses, setCourses } = useContext(CoursesContext);

  const onSelect = (item) => {
    let deselected = false;

    setSelected(selected.filter(s => {
      let foundItem = s.id === item.id;

      if (foundItem) {
        deselected = true;
      }
      return !(foundItem);
    }));

    if (!deselected) {
      setSelected([
        ...selected,
        item
      ]);
    }
  };

  const handleSubmit = async () => {
    const updatedCourse = await api.addInstructors(route.params.courseId, selected.map(s => s.id));

    setCourses(() => courses.map(course => {
      if (course.id !== updatedCourse.id) {
        return course;
      }
      else {
        return updatedCourse;
      }
    }));

    navigation.navigate("Home");
  };

  const renderItem = ({ index, item }) => {
    return (
      <AvatarCard
        key={item.id}
        {...item}
        onPress={() => onSelect(item)}
        inRow={true}
        selected={(selected.findIndex(s => s.id === item.id) !== -1)}
      />);
  };

  useEffect(() => {
    setSelected(route.params.instructors);
  }, [route.params.instructors]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#6a51ae" />
      <HeaderBar title={"Select Instructors"} goBack={() => navigation.navigate("Home")} />

      <View style={styles.instructorList}>
        <Text style={styles.title}>All Instructors:</Text>
        <FlatList
          data={instructors}
          style={styles.list}
          renderItem={renderItem}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.text}>Make instructors ({selected.length}) </Text>
        </TouchableOpacity>
        {/* {instructors.map(instructor => <AvatarCard key={instructor.id} {...instructor} />)} */}
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  instructorList: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
    color: "#323232",
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: "5%",
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


export default AddInstructorScreen;