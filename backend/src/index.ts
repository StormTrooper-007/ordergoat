import express from "express";
import cors from "cors";
import passport from "passport";
import passportLocal from "passport-local";
import cookieParser from "cookie-parser";
import session from "express-session";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/User";
import userRouter from "./routers/user";
import orderRouter from "./routers/order";
import {UserInterface} from "./interfaces/UserInterface";

const LocalStrategy = passportLocal.Strategy
// Mongoose 
mongoose.connect("mongodb+srv://todoAppUser:Slytherin007@cluster0.1prpl.mongodb.net/ordergoat?retryWrites=true&w=majority",
(err:Error) => {
    if(err) throw err;
    console.log("connected to mongodb");
})

//Middlewares
const app = express();

app.use(cors({origin:"http://localhost:3000", credentials:true}));
app.use(session({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//Passport 
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err:Error, user:any) => {
    if (err) throw err;
    if (!user) return done(null, false);
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw err;
      if (result === true) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
})
);

passport.serializeUser((user:any, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id: string, cb) => {
  User.findOne({ _id: id }, (err:Error, user:any) => {
    const userInformation = {
      username: user.username,
      isAdmin: user.isAdmin,
    };
    cb(err, userInformation);
  });
});

//Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
      
app.listen(3004, ()=>{
    console.log("start server at 3004");
})