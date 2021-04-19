import { Request, Response, NextFunction } from "express"
import { getRepository } from "typeorm"
import { Course } from "../models/Course"
import { User } from "../models/User";

export const getCourses = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const courseRepository = getRepository(Course);

    const courses = await courseRepository.find();
    return res.json(courses);
  }
  catch (err) {
    return next(err);
  }
}

export const getCourse = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const courseRepository = getRepository(Course);

    const course = await courseRepository.findOne(req.params.id);
    if (course) {
      return res.json(course);
    } else {
      return res.status(404).json({ msg: "Course Not Found", status: 404 })
    }
  } catch (err) {
    return next(err);
  }
}

export const createCourse = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const courseRepository = getRepository(Course);

    const newCourse = courseRepository.create(req.body);
    const saved: any = await courseRepository.save(newCourse);

    const course = await courseRepository.findOne(saved.id);

    return res.json(course);
  } catch (err) {
    return next(err);
  }
}

export const updateCourse = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const courseRepository = getRepository(Course);

    const course = await courseRepository.findOne(req.params.id);
    if (course) {
      courseRepository.merge(course, req.body)
      courseRepository.save(course);
      return res.json(course);
    }
    return res.status(404).json({ msg: "Course Not Found", status: 404 })
  } catch (err) {
    return next(err);
  }
}

export const deleteCourse = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const courseRepository = getRepository(Course);

    const result = await courseRepository.delete(req.params.id);
    if (result.affected) {
      return res.json({ msg: "Course Deleted", status: 200, id: +req.params.id })
    }
    return res.json({ msg: "Course Not Found", status: 404 })
  } catch (err) {
    return next(err);
  }
}

// Pisa el arreglo de instructores con el nuevo pasado por body.
export const updateInstructors = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const courseRepository = getRepository(Course);
    const userRepository = getRepository(User);

    const course = await courseRepository.findOne(req.params.courseId);
    // const user = await userRepository.findOne(req.params.userId);
    const users = await userRepository.find();

    let newInstructors = users.filter(user => req.body.instructors.includes(user.id))

    if (!course) {
      return res.status(404).json({ msg: "Course Not Found", status: 404 })
    }

    course.instructors = newInstructors;

    let updatedCourse = await courseRepository.save(course);

    return res.json(updatedCourse)
  } catch (err) {
    next(err)
  }
}

export const removeInstructor = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const courseRepository = getRepository(Course);
    const userRepository = getRepository(User);

    const course = await courseRepository.findOne(req.params.courseId);
    const user = await userRepository.findOne(req.params.userId);

    if (!course) {
      return res.status(404).json({ msg: "Course Not Found", status: 404 })
    }

    if (user) {
      course.instructors = course.instructors.filter(instructor => {
        return instructor.id !== user.id
      })
      let updatedCourse = await courseRepository.save(course);

      return res.json(updatedCourse)
    } else {
      return res.status(404).json({ msg: "User Not Found", status: 404 })
    }

  } catch (err) {
    next(err)
  }
}