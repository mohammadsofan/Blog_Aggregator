import { db } from ".."
import { Feed, FeedInsert, feeds, User } from "../schema"
import {eq,sql} from "drizzle-orm"
export async function createFeed(feed:FeedInsert){
    const [result] = await db.insert(feeds).values({name:feed.name,url:feed.url}).returning();
    return result;
}
export async function getFeeds(){
    return await db.select().from(feeds);
}
export async function getFeed(url:string){
    const [feed] = await db.select().from(feeds).where(eq(feeds.url,url));
    return feed;  
}
export function printFeed(feed:Feed,user:User){
    console.log(`User name: ${user.name}`);
    console.log(`Feed name: ${feed.name}`);
    console.log(`Feed url: ${feed.url}`);
    console.log(`Feed created date: ${feed.createdAt}`);
}
export async function markFeedFetched(id:string){
    const result = await db.update(feeds).set({lastFetchedAt:new Date(),updatedAt:new Date()}).where(eq(feeds.id,id)).returning();
    return result;
}

export async function getNextFeedToFetch() {
  const [feed] = await db
    .select()
    .from(feeds)
    .orderBy(sql`${feeds.lastFetchedAt} ASC NULLS FIRST`)
    .limit(1);
  return feed;
}