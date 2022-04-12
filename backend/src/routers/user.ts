import express from "express";
import {createUser,loginUser,logoutUser,getUser, getUsers, deleteUser, updateUser, getSingleUserById} from "../controllers/user";
import passport from "passport";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/user", getUser);
router.get("/:userId", getSingleUserById);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.post("/login", passport.authenticate("local", { failureRedirect: "/login", failureMessage: true }), loginUser);
router.post("/logout", logoutUser);

export default router;