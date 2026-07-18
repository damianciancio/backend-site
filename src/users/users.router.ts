import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getOneUser, setUserBusiness } from "./users.controller.js";

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getOneUser);
router.delete('/:id', deleteUser);
router.post('/:id/business/:businessId', setUserBusiness)

export {
  router
};