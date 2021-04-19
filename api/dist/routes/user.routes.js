"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var router = express_1.Router();
// GET ALL USERS
router.get("/", user_controller_1.getUsers);
// GET ONE USER
router.get("/:id", user_controller_1.getUser);
// CREATE USER
router.post("/", user_controller_1.createUser);
// UPDATE USER
router.patch("/:id", user_controller_1.updateUser);
// DELETE USER
router.delete("/:id", user_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map