import { Migration } from '@mikro-orm/migrations';

export class Migration20260914231249 extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`alter table "user" add "hash" varchar(255) null, add "salt" varchar(255) null;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table "user" drop column "hash", drop column "salt";`);
  }

}
