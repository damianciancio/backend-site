import { Request } from "express"
import { User } from "../user.js";

export class RequestWithCurrentUser extends Request {
  currentUser?: User;
}