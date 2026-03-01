import { readConfig } from "../lib/configurations/config";
import { createFeedFollow } from "../lib/db/queries/feed_follows";
import { getFeed } from "../lib/db/queries/feeds";
import { getUser } from "../lib/db/queries/users";
import { User } from "../lib/db/schema";

export async function handlerFollow(cmdName:string,user:User,...args:string[]){
    if(args.length === 0 ){
        throw new Error ("Not enougth arguments provided.");
    }
    const url = args[0];
    const feed = await getFeed(url);
    const follow = await createFeedFollow(feed.id,user.id);
    console.log(follow.feedName,"  ",follow.userName);
}