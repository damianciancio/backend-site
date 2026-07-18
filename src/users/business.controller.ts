import { Request, Response } from "express";
import { orm } from "../shared/orm.js";
import { Business } from "./business.entity.js";

const em = orm.em;

export const createBusiness = async (req: Request, res: Response) => {
  try {
    const businessObject = await em.create(Business, {
      description: req.body.description as string,
    });
    
    await em.flush();
    res.status(201).send({
      data: businessObject
    });
  } catch (error: any) {
    res.status(500).send({ message: error.message })
  }
};