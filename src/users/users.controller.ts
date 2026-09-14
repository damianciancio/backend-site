import { Request, Response } from "express";
import { User } from "./user.entity.js";
import { orm } from "../shared/orm.js";
import { Business } from "./business.entity.js";
import bcrypt from 'bcrypt';

const em = orm.em;

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await em.find(User, {});
  res.status(200).send({
    data: users,
  })
};

export const createUser = async (req: Request, res: Response) => {

  const plainPassword = req.body.password;

  if (!plainPassword || plainPassword.length < 6) {
    return res.status(400).send({ message: "Password is required and must be at least 6 characters long" });
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(plainPassword, salt);


  try {
    const userObject = await em.create(User, {
      name: req.body.name as string,
      email: req.body.email as string,
      businessId: req.body.businessId as number,
      hash,
      salt
    });
    
    await em.flush();
    res.status(201).send({
      data: userObject
    });
  } catch (error: any) {
    console.log("had error");
    console.log(error)
    res.status(500).send({ message: error.message })
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const user = await em.findOne(User, {
      id: parseInt(req.params.id)
    });

    if (!user) {
      return res.status(404).send({
        message: `user with id ${req.params.id} not found`
      })
    }
    
    res.status(200).send({
      data: user,
    })
  } catch (error: any) {
    res.status(500).send({ message: error.message })
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {

    const deletedId = await em.nativeDelete(User, {
      id: parseInt(req.params.id)
    });
    
    await em.flush();
    res.status(204).send({ data: deletedId });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export const setUserBusiness = async (req: Request, res: Response) => {
  try {
    // prueba 1
    const business = await em.findOne(Business, {
      id: parseInt(req.params.businessId)
    });

    if (!business) {
      return res.status(404).send({
        message: `business with id ${req.params.businessId} not found`
      });
    }


    const user = await em.findOne(User, {
      id: parseInt(req.params.id)
    });


    if (!user) {
      return res.status(404).send({
        message: `user with id ${req.params.id} not found`
      });
    }

    user.business = business;
    await em.flush();

    const userFetched = await em.findOne(
      User,
      {
        id: parseInt(req.params.id)
      }, {
        populate: ["business"],
        fields: ["email"]
      }
    )

    res.status(200).send({
      data: userFetched,
    });


  } catch (error: any) {

  }
}