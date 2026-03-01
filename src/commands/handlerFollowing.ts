import { readConfig } from "../lib/configurations/config";
import { getFeedFollowsForUser } from "../lib/db/queries/feed_follows";
import { getUser } from "../lib/db/queries/users";
import { User } from "../lib/db/schema";

export async function handlerFollowing(cmdName:string,user:User,...args:string[]) {
    const follows = await getFeedFollowsForUser(user.name);
    for(const f of follows){
        console.log(f.feeds.name);
    }
    
}