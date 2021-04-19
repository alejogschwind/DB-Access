import { Router } from "express";
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  updateInstructors,
  removeInstructor
} from "../controllers/course.controller";

const router = Router();

// GET ALL USERS
router.get("/", getCourses);

// GET ONE USER
router.get("/:id", getCourse);

// CREATE USER
router.post("/", createCourse);

// UPDATE USER
router.patch("/:id", updateCourse);

// DELETE USER
router.delete("/:id", deleteCourse);

// UPDATE INSTRUCTOR
router.post("/:courseId", updateInstructors);

// REMOVE INSTRUCTOR
router.post("/:courseId/remove/:userId", removeInstructor);

export default router;