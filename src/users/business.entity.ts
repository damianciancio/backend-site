import { Collection } from "@mikro-orm/core";
import { Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/decorators/legacy";
import { User } from "./user.entity.js";

@Entity()
export class Business {
  @PrimaryKey({ type: "integer" })
  id?: number;

  @Property({ type: "string" })
  description!: string;

  @OneToMany(() => User, user => user.business)
  users = new Collection<User>([]);

}