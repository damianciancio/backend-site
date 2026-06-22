import { Router } from "express";
import { User } from "../user.js";
import { users } from "../usersdata.js";

const router = Router();


router.get('/', (req, res) => {

  let usersCopy = [...users];
  const businessId = (req as any).currentBusinessId;
  if (businessId) {
    usersCopy = usersCopy.filter((user) => user.businessId === businessId);
  }
  res.send({ data: usersCopy, message: "users" });
});


router.post('/', (req, res) => {
  res.send({ data: users, message: "users" });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    res.status(404).send({ message: "User not found" });
  } else {
    res.send({ data: user, message: "user" });
  }
});

export {
  router
};