import { deleteAllUsers } from "../lib/db/queries/users";

export async function handlerReset(cmdName:string,...args:string[]){
    await deleteAllUsers();
    console.log("all users deleted.");
}