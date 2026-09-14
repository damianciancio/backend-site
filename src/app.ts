import 'reflect-metadata';
import express, { Request, Response, NextFunction } from "express";
import { users } from "./usersdata.js";
import { router as usersRouter } from "./users/users.router.js";
import { RequestContext } from "@mikro-orm/core";
import { orm, migrate } from "./shared/orm.js";
import { businessRouter } from './users/business.router.js';
import cors from 'cors';

const app = express();

app.use(cors(
  {
    origin: 'localhost:5173'
  }
));
app.use(express.json())

app.use((req, _res, next) => {
  console.log(req.method + ' ' + req.path);
  next();
})

// Terminan middlewares base
app.use((_req, _res, next) => {
  RequestContext.create(orm.em, next);
})
// Arrancan middlewares de negocio

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  // const authHeader = req.headers['user_id'];
  // if (!authHeader) {
  //   next("unauthorized");
  // }

  // const currentUser: any = users.find(
  //   (user) => (user.id === parseInt(authHeader! as string))
  // );
  // (req as any).currentUser = currentUser;

  next();
};

const loadBusiness = (req: Request, res: Response, next: NextFunction) => {
  const businessId = parseInt(req.params.id);
  (req as any).currentBusinessId = businessId
  next();
};

app.use('/users', isLoggedIn, usersRouter);
app.use('/business', businessRouter);
app.use('/business/:id/users', isLoggedIn, loadBusiness, usersRouter);


const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err === "unauthorized") {
    res.status(401).send({ message: "Unauthorized" });
  } else {
    next();
  }
};
app.use(handleError);

export default app;