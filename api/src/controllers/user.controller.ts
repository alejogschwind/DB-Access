import { Request, Response, NextFunction } from "express"
import { getRepository } from "typeorm"
import { User } from "../models/User"

import axios from "axios";

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const userRepository = getRepository(User);

    const users = await userRepository.find();
    return res.json(users);
  }
  catch (err) {
    return next(err);
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(req.params.id);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ msg: "User Not Found", status: 404 })
    }
  } catch (err) {
    return next(err);
  }
}

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const userRepository = getRepository(User);

    const newUser = userRepository.create(req.body);
    const user = await userRepository.save(newUser);

    return res.json(user);
  } catch (err) {
    return next(err);
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(req.params.id);
    if (user) {
      userRepository.merge(user, req.body)
      userRepository.save(user);
      return res.json(user);
    }
    return res.status(404).json({ msg: "User Not Found", status: 404 })
  } catch (err) {
    return next(err);
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const userRepository = getRepository(User);

    const result = await userRepository.delete(req.params.id);
    if (result.affected) {
      return res.json({ msg: "User Deleted", status: 200, id: +req.params.id })
    }
    return res.json({ msg: "User Not Found", status: 404 })
  } catch (err) {
    return next(err);
  }
}