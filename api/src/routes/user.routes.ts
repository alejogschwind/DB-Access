import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/user.controller";

const router = Router();

// GET ALL USERS
router.get("/", getUsers);

// GET ONE USER
router.get("/:id", getUser);

// CREATE USER
router.post("/", createUser);

// UPDATE USER
router.patch("/:id", updateUser)

// DELETE USER
router.delete("/:id", deleteUser)

export default router;