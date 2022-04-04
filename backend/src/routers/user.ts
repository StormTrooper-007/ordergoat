import express from "express";
import {createUser,loginUser,logoutUser,getUser, getUsers} from "../controllers/user";
import passport from "passport"

const router = express.Router();

router.post("/", createUser);
router.get("/user", getUser);
router.post("/login", passport.authenticate("local", { failureRedirect: "/login", failureMessage: true }), loginUser);
router.post("/logout", logoutUser);
router.post("/", getUsers);

export default router;