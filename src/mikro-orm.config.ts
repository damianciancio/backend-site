import "reflect-metadata";
import { defineConfig } from "@mikro-orm/postgresql";
import { ReflectMetadataProvider } from "@mikro-orm/decorators/legacy";
import { Migrator } from "@mikro-orm/migrations";
import { configDotenv } from "dotenv";

configDotenv();

export default defineConfig({
  dbName: process.env.DB_NAME || "users_db",
  debug: true,
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  clientUrl: process.env.DATABASE_URL,
  ...(process.env.DATABASE_URL?.includes("sslmode=require")
    ? { driverOptions: { ssl: { rejectUnauthorized: false } } }
    : {}),
  metadataProvider: ReflectMetadataProvider,
  extensions: [Migrator],
  migrations: {
    path: "dist/migrations",
    pathTs: "src/migrations",
  },
  schemaGenerator: {
    //never in production
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
});
