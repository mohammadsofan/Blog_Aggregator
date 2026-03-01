import { eq } from "drizzle-orm";
import { fetchFeed } from "src/api/feed";
import { db } from "src/lib/db";
import { getNextFeedToFetch,markFeedFetched } from "src/lib/db/queries/feeds";
import { posts } from "src/lib/db/schema";

export async function scrapeFeeds(){
    const feed = await getNextFeedToFetch();
    await markFeedFetched(feed.id);
    const rssFeed = await fetchFeed(feed.url);
    for(const i of rssFeed.channel.item){
        const date = new Date(i.pubDate);
        const isExists = (await db.select().from(posts).where(eq(posts.url,i.link))).length === 0 ? false:true;
        if(isExists === false)
            await db.insert(posts).values({title:i.title,description:i.description,published_at:date,feedId:feed.id,url:i.link});
    }
}