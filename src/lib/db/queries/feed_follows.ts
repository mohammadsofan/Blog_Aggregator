import { db } from "..";
import { feed_follows, feeds, users } from "../schema";
import {eq,and} from "drizzle-orm"
import { getUser } from "./users";
import { getFeed } from "./feeds";
export async function createFeedFollow(feedId:string,userId:string){
    const [newFeedFollow] = await db.insert(feed_follows).values({userId:userId,feedId:feedId}).returning();
    const [result] = await db.select().from(feed_follows)
    .where(eq(feed_follows.id,newFeedFollow.id))
    .innerJoin(users,eq(users.id,feed_follows.userId))
    .innerJoin(feeds,eq(feeds.id,feed_follows.feedId));
    return {
        id:result.feed_follows.id,
        createdAt:result.feed_follows.createdAt,
        updatedAt:result.feed_follows.updatedAt,
        userName:result.users.name,
        feedName:result.feeds.name
    };
}
export async function deleteFeedFollow(userNmae:string,url:string){
    const user = await getUser(userNmae);
    if(!user){
        throw new Error("User not found.");
    }
    const feed = await getFeed(url);
    if(!feed){
        throw new Error("Feed not found.");
    }
    await db.delete(feed_follows).where(and(eq(feed_follows.userId,user.id),eq(feed_follows.feedId,feed.id)));
}
export async function getFeedFollows(){
    const result = await db.select().from(feed_follows)
    .innerJoin(users,eq(users.id,feed_follows.userId))
    .innerJoin(feeds,eq(feeds.id,feed_follows.feedId));
    return result;
}
export async function getFeedFollowsForUser(name:string) {
    const user = await getUser(name);
    if(!user){
        throw new Error("user not found.");
    }
     const result = await db.select().from(feed_follows).where(eq(feed_follows.userId,user.id))
    .innerJoin(feeds,eq(feeds.id,feed_follows.feedId));
    return result;   
}