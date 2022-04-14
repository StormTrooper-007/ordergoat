import User, {UserDoc} from "../models/User";

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

export default {
    delet,
    updateU, 
    findUserWithId,
}