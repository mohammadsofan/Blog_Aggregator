import { deleteFeedFollow } from "../lib/db/queries/feed_follows";
import { User } from "../lib/db/schema";

export async function handlerUnfollow(cmdName:string,user:User,...args:string[]){
    if(args.length === 0){
        throw new Error("Not enougth arguments provided.");
    }
    const url = args[0];
    await deleteFeedFollow(user.name,url);
}