import { Column, sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, text, uniqueIndex } from "drizzle-orm/pg-core";
export const users = pgTable("users",{
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt:timestamp("created_at").notNull().defaultNow(),
    updatedAt:timestamp("updated_at").notNull().defaultNow().$onUpdate(()=> new Date()),
    name: text("name").notNull().unique()
});
export const feeds = pgTable("feeds",{
    id:uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt:timestamp("created_at").notNull().defaultNow(),
    updatedAt:timestamp("updated_at").notNull().defaultNow().$onUpdate(()=>new Date()),
    lastFetchedAt:timestamp("last_fetched_at"),
    name:text().notNull().unique(),
    url:text().notNull().unique(),
});
export const feed_follows = pgTable("feed_follows",{
    id:uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt:timestamp("created_at").notNull().defaultNow(),
    updatedAt:timestamp("updated_at").notNull().defaultNow().$onUpdate(()=>new Date()),
    userId:uuid("user_id").references(()=>users.id).notNull(),
    feedId:uuid("feed_id").references(()=>feeds.id).notNull(),
},(table=>[
    uniqueIndex("user_feed_unique_constraint").on(table.feedId,table.userId)
]));
export const posts = pgTable("posts",{
    id:uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt:timestamp("created_at").notNull().defaultNow(),
    updatedAt:timestamp("updated_at").notNull().defaultNow().$onUpdate(()=>new Date()),
    title:text("title").notNull(),
    description:text("description"),
    url:text("url").unique().notNull(),
    published_at:timestamp("published_at"),
    feedId:uuid("feed_id").references(()=>feeds.id,{onDelete:"cascade"}).notNull()
});
export type Feed = typeof feeds.$inferSelect;
export type FeedInsert = typeof feeds.$inferInsert;
export type User = typeof users.$inferSelect;
export type FeedFollows = typeof feed_follows.$inferSelect;
export type FeedFollowsInsert = typeof feed_follows.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type PostInsert = typeof posts.$inferInsert;
