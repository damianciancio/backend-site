import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/decorators/legacy";
import { Business } from "./business.entity.js";
import { Rel } from "@mikro-orm/core";

@Entity()
export class User {
  @PrimaryKey()  
  id?: number;

  @Property({ nullable: false })
  name!: string;

  @Property({ nullable: false })
  email!: string;

  @ManyToOne(() => Business, { nullable: true })
  business?: Rel<Business>;


  businessId!: number;

  // businessId!: number;



}