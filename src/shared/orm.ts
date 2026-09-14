import { MikroORM } from "@mikro-orm/core";
import { defineConfig } from "@mikro-orm/postgresql";
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';
import { configDotenv } from "dotenv";

configDotenv();
console.log(process.env.DATABASE_URL);

const config = defineConfig({
  dbName: process.env.DB_NAME || 'users_db',
  debug: true,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  clientUrl: process.env.DATABASE_URL,
  metadataProvider: ReflectMetadataProvider,
  schemaGenerator: {
    //never in production
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
});

export const syncSchema = async () => {
  const schema = orm.schema;
  /*   
  await schema.drop()
  await schema.create()
  */
  await schema.update();
}

export const orm = await MikroORM.init(config);