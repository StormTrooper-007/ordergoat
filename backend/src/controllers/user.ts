import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt'
import User, { UserDoc } from "../models/User";
import { UserInterface } from 'src/interfaces/UserInterface';


async function delet(userId: string): Promise<UserDoc | null>{
    const foundUser = User.findByIdAndDelete(userId);
    if (!foundUser) {
     console.log(`User ${userId} not found`);
    }
  
    return foundUser;
  }

async function updateU(userId: string,
    update: Partial<UserDoc>):Promise<UserDoc | null>{
        const foundUser = await User.findByIdAndUpdate(userId, update, {
            new:true,
        })
        if (!foundUser) {
            console.log(`User ${userId} not found`);
        }
        return foundUser;
}

async function findUserWithId(userId:string):Promise<UserDoc | null>{
    const foundUser = await User.findById(userId);
    if (!foundUser) {
        console.log(`user  ${userId} not found`);
      }
    return foundUser;
}


function isAdministratorMiddleWare(req:Request, res:Response, next:NextFunction){
    const {user}:any = req;
    if(user){
        User.findOne({username:user.username}, (err:Error, doc:UserInterface) => {
            if(err) throw err;
            if(doc?.isAdmin){
                next();
            }else{
                res.send("sorry only admins can perform this")
            }
        })
    }
    res.send("sorry you are not logged in");
}


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

export async function getSingleUserById(req:Request, res:Response, next:NextFunction){
    try{
        res.send(await findUserWithId(req.params.userId));
    }catch(e){
        console.log(e)
    }
}

export function logoutUser(req:Request, res:Response, next:NextFunction){
   req.logout();
    res.send("successfully logged out");
}

export async function getUsers(req:Request, res:Response, next:NextFunction){
    res.send(await User.find().select('-password'));
}

export async function deleteUser(req:Request, res:Response, next:NextFunction){
    await delet(req.params.userId);
    res.send("user deleted successfully");
}

export async function updateUser( req: Request, res: Response, next: NextFunction){
    try{
        const update = req.body;
        const userId = req.params.userId;
        const updatedUser = await updateU(userId, update);
        res.send(updatedUser);
    }catch(e){
        console.log(e);
    }
}

