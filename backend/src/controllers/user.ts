import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt'
import User from "../models/User";
import { UserInterface } from 'src/interfaces/UserInterface';



export async function createUser(req:Request, res:Response, next:NextFunction){
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

}

export function loginUser(req:Request, res:Response, next:NextFunction){
  res.send("Success");
}

export function getUser(req:Request, res:Response, next:NextFunction){
 res.send(req.user);
}

export function logoutUser(req:Request, res:Response, next:NextFunction){
   req.logout();
    res.send("successfully logged out");
}

export async function getUsers(req:Request, res:Response, next:NextFunction){
    await User.find().select('-password')
}
