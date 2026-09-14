import { Migration } from '@mikro-orm/migrations';

export class Migration20260914201450 extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`create table "business" ("id" serial primary key, "description" varchar(255) not null);`);

    this.addSql(`create table "user" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null, "business_id" int null);`);

    this.addSql(`alter table "user" add constraint "user_business_id_foreign" foreign key ("business_id") references "business" ("id") on delete set null;`);
  }

}
