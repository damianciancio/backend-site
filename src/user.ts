export class User {
  id: number;
  name: string;
  email: string;
  businessId: number;
  constructor(id: number, name: string, email: string, businessId: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.businessId = businessId;
  }
}