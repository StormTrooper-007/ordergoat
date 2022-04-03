import cors from "cors";
import passport from "passport";
import passportLocal from "passport-local";
import cookieParser from "cookie-parser";
import session from "express-session";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";
import express, {Request, Response, NextFunction} from "express";
import User from "./models/User";
import {UserInterface} from "./interfaces/UserInterface"

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
app.post("/register", async(req:Request, res:Response, next:NextFunction) => {
           // checks if user already exists
        const {username, email, password} = req?.body
        if(!username|| !password || !email || typeof username !== "string"|| typeof password!=="string" || typeof email!=="string"){
            res.send("invalid values");
            return;
        }

        User.findOne({email}, async(err:Error, doc:UserInterface) => {
            if(err) throw err;
            if(doc) res.send("User already exists");
            if(!doc){
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({
                    username,
                    email,
                    password:hashedPassword
                })
                await newUser.save();
                res.send("user created successfully");
        }
    })
})

app.post("/login", passport.authenticate("local", { failureRedirect: '/login', failureMessage: true }), (req, res) => {
    res.send("Success");
});

app.get("/user", (req, res) => {
    res.send(req.user);
})
      
app.listen(3004, ()=>{
    console.log("start server at 3001");
})