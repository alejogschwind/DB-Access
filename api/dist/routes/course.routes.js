"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var course_controller_1 = require("../controllers/course.controller");
var router = express_1.Router();
// GET ALL USERS
router.get("/", course_controller_1.getCourses);
// GET ONE USER
router.get("/:id", course_controller_1.getCourse);
// CREATE USER
router.post("/", course_controller_1.createCourse);
// UPDATE USER
router.patch("/:id", course_controller_1.updateCourse);
// DELETE USER
router.delete("/:id", course_controller_1.deleteCourse);
// UPDATE INSTRUCTOR
router.post("/:courseId", course_controller_1.updateInstructors);
// REMOVE INSTRUCTOR
router.post("/:courseId/remove/:userId", course_controller_1.removeInstructor);
exports.default = router;
//# sourceMappingURL=course.routes.js.map