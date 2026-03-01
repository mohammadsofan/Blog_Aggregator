import { readConfig } from "../lib/configurations/config";
import { getPostsForUser } from "../lib/db/queries/posts";
import { User } from "../lib/db/schema";

export async function handlerBrowse(cmdName:string,user:User,...args:string[]) {
    let limit = 2;
    try{
        if(args.length > 0){
            limit = parseInt(args[0]);
        } 
    }
    catch(error){limit=2;}
    const config = readConfig();

    const items = await getPostsForUser(user.name,limit);
    console.log(`Found ${items.length} posts for user ${user.name}`);

    for(const item of items){
    console.log(`${item.posts.title} from ${item.feeds.name}`);
    console.log(`--- ${item.posts.published_at} ---`);
    console.log(`--- URL: ${item.posts.url} ---`);
    console.log(`${item.posts.description}`);
    console.log(`=====================================`);
    }
}