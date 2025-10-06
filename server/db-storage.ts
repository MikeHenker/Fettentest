
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { users, blogPosts } from "@shared/schema";
import { eq } from "drizzle-orm";
import type { User, InsertUser, BlogPost, InsertBlogPost } from "@shared/schema";
import type { IStorage } from "./storage";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

export class DbStorage implements IStorage {
  private db;

  constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    
    const pool = new Pool({ connectionString: databaseUrl });
    this.db = drizzle(pool);
  }

  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    const result = await this.db.select().from(blogPosts).orderBy(blogPosts.createdAt);
    return result.reverse();
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const result = await this.db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    return result[0];
  }

  async createBlogPost(blogPost: InsertBlogPost, authorId: string): Promise<BlogPost> {
    const result = await this.db.insert(blogPosts).values({
      ...blogPost,
      authorId,
      icon: blogPost.icon || "fas fa-utensils",
      images: blogPost.images || [],
    }).returning();
    return result[0];
  }

  async updateBlogPost(id: string, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const result = await this.db.update(blogPosts).set(blogPost).where(eq(blogPosts.id, id)).returning();
    return result[0];
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await this.db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return result.length > 0;
  }
}
