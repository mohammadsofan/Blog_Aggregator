import { eq } from "drizzle-orm";
import { db } from "..";
import { feed_follows, feeds, PostInsert, posts } from "../schema";
import { getUser } from "./users";

export async function createPost(post:PostInsert){
    const [result] = await db.insert(posts)
    .values({
        title:post.title,
        description:post.description,
        published_at:post.published_at,
        url:post.url,
        feedId:post.feedId
    }).returning();
    return result;
}

export async function getPostsForUser(name:string,postsNum:number){
    const user = await getUser(name);
    if(!user){
        throw new Error("User not found.");
    }
    const result = await db.select()
    .from(posts)
    .innerJoin(feed_follows,eq(feed_follows.feedId,posts.feedId))
    .innerJoin(feeds,eq(feeds.id,feed_follows.feedId))
    .where(eq(feed_follows.userId,user.id))
    .limit(postsNum)
    .orderBy(posts.published_at);
    return result;
}