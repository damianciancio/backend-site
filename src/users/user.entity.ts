import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/decorators/legacy";
import { Business } from "./business.entity.js";
import { Rel } from "@mikro-orm/core";

@Entity()
export class User {
  @PrimaryKey({ type: "integer" })
  id?: number;

  @Property({ type: "string", nullable: false })
  name!: string;

  @Property({ type: "string", nullable: false })
  email!: string;

  @ManyToOne(() => Business, { nullable: true })
  business?: Rel<Business>;


  businessId!: number;

  // businessId!: number;



}