import { MikroORM } from "@mikro-orm/core";
import { defineConfig } from "@mikro-orm/postgresql";
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';

const config = defineConfig({
  dbName: 'users_db',
  debug: true,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  clientUrl: 'postgresql://dsw:dsw@localhost:9929/users_db',
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