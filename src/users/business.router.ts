import { Router } from "express";
import { createBusiness } from "./business.controller.js";

const businessRouter = Router();

businessRouter.post('/', createBusiness);

export {
  businessRouter
}