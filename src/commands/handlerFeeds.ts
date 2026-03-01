import { getFeeds } from "../lib/db/queries/feeds";
import { getUserByID } from "../lib/db/queries/users";

export async function handlerFeeds(cmdName:string,...args:string[]){
    const feeds = await getFeeds();
    for(const feed of feeds){
        const user = await getUserByID(feed.userID);
        console.log(`Feed name: ${feed.name}`);
        console.log(`Feed URL: ${feed.url}`);
        console.log(`Username: ${user.name}`);

    }
}