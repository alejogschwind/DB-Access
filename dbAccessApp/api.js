import axios from "axios";

export default {
  getAllCourses: async () => {
    try {
      const res = await axios.get("http://192.168.1.36:5002/courses");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  createCourse: async (course) => {
    try {
      const res = await axios.post("http://192.168.1.36:5002/courses", { ...course });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  getAllInstructors: async () => {
    try {
      const res = await axios.get("http://192.168.1.36:5002/users");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  createInstructor: async (instructor) => {
    try {
      const res = await axios.post("http://192.168.1.36:5002/users", { ...instructor });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  addInstructors: async (courseId, instructors) => {
    try {
      const res = await axios.post(`http://192.168.1.36:5002/courses/${courseId}`, { instructors });
      console.log("RES)))", res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
};