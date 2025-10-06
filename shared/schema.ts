import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, real, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  icon: text("icon").notNull().default("fas fa-utensils"),
  tasteScore: real("taste_score").notNull(),
  appearanceScore: real("appearance_score").notNull(),
  smellScore: real("smell_score").notNull(),
  images: json("images").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  authorId: varchar("author_id").references(() => users.id).notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  authorId: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
