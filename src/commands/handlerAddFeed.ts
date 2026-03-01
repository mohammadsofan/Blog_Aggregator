import { readConfig } from "../lib/configurations/config";
import { createFeedFollow } from "../lib/db/queries/feed_follows";
import { createFeed } from "../lib/db/queries/feeds";
import { getUser } from "../lib/db/queries/users";
import { User } from "../lib/db/schema";

export async function handlerAddFeed(cmdName:string,user:User,...args:string[]){
    if(args.length < 2){
        throw new Error("please provide feed name and url.");
    }
    const feedName = args[0];
    const feedURL = args[1];
    const addedFeed = await createFeed({name:feedName,url:feedURL});
    await createFeedFollow(addedFeed.id,user.id);
    console.log(user.name,"  ",addedFeed.name);
}