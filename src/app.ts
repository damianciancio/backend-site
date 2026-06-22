import express, { Request, Response, NextFunction } from "express";
import { users } from "./usersdata.js";
import { router as usersRouter } from "./routers/users.router.js";

const app = express();

app.use(express.json())


const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['user_id'];
  if (!authHeader) {
    next("unauthorized");
  }

  const currentUser: any = users.find(
    (user) => (user.id === parseInt(authHeader! as string))
  );
  (req as any).currentUser = currentUser;

  next();
};

const loadBusiness = (req: Request, res: Response, next: NextFunction) => {
  const businessId = parseInt(req.params.id);
  (req as any).currentBusinessId = businessId
  next();
};

app.use('/users', isLoggedIn, usersRouter);
app.use('/business/:id/users', isLoggedIn, loadBusiness, usersRouter);


const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err === "unauthorized") {
    res.status(401).send({ message: "Unauthorized" });
  } else {
    next();
  }
};

app.use(handleError);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});