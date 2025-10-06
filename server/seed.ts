
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { users } from "@shared/schema";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const pool = new Pool({ connectionString: databaseUrl });
  const db = drizzle(pool);

  console.log("Seeding default user...");
  
  await db.insert(users).values({
    username: "fettiger fettsack",
    password: "fettbeharrt"
  }).onConflictDoNothing();

  console.log("Seeding completed!");

  await pool.end();
}

main().catch((err) => {
  console.error("Seeding failed!");
  console.error(err);
  process.exit(1);
});
