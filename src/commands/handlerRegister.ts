import { setUser } from "../lib/configurations/config";
import {createUser, getUser} from "../lib/db/queries/users"
export async function handlerRegister(cmdName:string,...args:string[]){
  if(args.length == 0){
    throw new Error("Missing Argument");
  }
  if(await getUser(args[0])){
     throw new Error("user exists");   
  }
  await createUser(args[0]);
  setUser(args[0]);
  console.log("user created!");
}