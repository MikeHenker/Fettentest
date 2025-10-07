
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blog_posts" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" text NOT NULL,
	"content" text NOT NULL,
	"icon" text DEFAULT 'fas fa-utensils' NOT NULL,
	"taste_score" real NOT NULL,
	"appearance_score" real NOT NULL,
	"smell_score" real NOT NULL,
	"images" json DEFAULT '[]',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"author_id" varchar NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
