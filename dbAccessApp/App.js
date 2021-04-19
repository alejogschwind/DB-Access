import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import api from "./api";

import HomeScreen from "./screens/HomeScreen";
import CreateInstructorScreen from "./screens/CreateInstructorScreen";
import CreateCourseScreen from "./screens/CreateCourseScreen";
import AddInstructorScreen from "./screens/AddInstructorScreen";

import { CoursesContext } from "./contexts/courseContext";
import { InstructorContext } from "./contexts/instructorContext";
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

export default function App() {

  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    (async () => {
      const courses = await api.getAllCourses();
      // Sort by last courses added
      setCourses(courses.sort((a, b) => b.id - a.id));
    })();
    (async () => {
      const instructors = await api.getAllInstructors();
      // Sort by last courses added
      setInstructors(instructors.sort((a, b) => (
        `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`))
      ));
    })();
  }, []);

  return (
    <CoursesContext.Provider value={{ courses, setCourses }}>
      <InstructorContext.Provider value={{ instructors, setInstructors }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen name="Create Instructor" component={CreateInstructorScreen} />
            <Stack.Screen name="Create Course" component={CreateCourseScreen} />
            <Stack.Screen name="Add Instructor" component={AddInstructorScreen} />
          </Stack.Navigator>
        </NavigationContainer >
      </InstructorContext.Provider>
    </CoursesContext.Provider >
  );
}
