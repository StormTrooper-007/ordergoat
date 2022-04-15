import express from "express";
import {
    createUser,
    loginUser,
    logoutUser,
    getUser, 
    getUsers, 
    deleteUser,
    updateUser,
    getSingleUserById, 
    updateUserByAdmin,
    isAdministratorMiddleWare
    } 
    from "../controllers/user";
import passport from "passport";

const router = express.Router();


router.get("/", getUsers);
router.get("/user", getUser);
router.get("/:userId", getSingleUserById);
router.put("/:userId", isAdministratorMiddleWare, updateUser);
router.delete("/:userId", isAdministratorMiddleWare, deleteUser);
router.post("/", createUser);
router.post("/login", passport.authenticate("local", { failureRedirect: "/login", failureMessage: true }), loginUser);
router.post("/logout", logoutUser);

export default router;