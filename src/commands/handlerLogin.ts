import { setUser } from "../lib/configurations/config";
import { getUser } from "../lib/db/queries/users";

export async function handlerLogin(cmdName:string,...args:string[]): Promise<void>{
    if(args.length == 0){
        throw new Error("the login handler expects a single argument, the username.");
    }
    if(!await getUser(args[0])){
        throw new Error("User is not exists!");
    }
    setUser(args[0]);
    console.log("the user has been set.");
}