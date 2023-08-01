import { Router } from "express";
import { users } from "../data/users.js";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.status(200).send(users);
});
userRouter.get("/:id", (req, res) => {
  res.status(200).send(users);
});

export default userRouter;
