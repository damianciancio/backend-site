import { Router } from "express";
import { User } from "./user.entity.js";
import { orm } from "../shared/orm.js";
import { generateJwtToken } from "../encode.js";
import bcrypt from 'bcrypt';

const router = Router();

const em = orm.em;


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  try {
    const user = await em.findOne(User, { email });

    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const currentHash = await bcrypt.hash(password, user.salt!);

    if (user.hash !== currentHash) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const token = await generateJwtToken(user);

    res.status(200).send({ token });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

export {
  router
}