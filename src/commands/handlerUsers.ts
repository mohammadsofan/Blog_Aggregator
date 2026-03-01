import { readConfig } from "../lib/configurations/config";
import { getUsers } from "../lib/db/queries/users";

export async function handlerUsers(cmdName:string,...args:string[]){
    const users = await getUsers();
    const config = readConfig();
    
    for(const u of users){
        if(u.name === config.currentUserName){
            console.log(`${u.name} (current)`);
        }
        else{
            console.log(u.name);
        }
    }
}