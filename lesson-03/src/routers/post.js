import { Router } from "express";
import { checkUser } from "../middlewares/checkUser.js";
import { checkPost } from "../middlewares/checkPost.js";
import { posts } from "../data/posts.js";
import crypto from "crypto";

const postRouter = Router();

postRouter.get("/", (req, res, next) => {
  console.log("Post");
});

postRouter.post("/", checkUser, (req, res, next) => {
  const { body, title } = req.body;

  const newPost = {
    ...body,
    id: crypto.randomUUID(),
    userId: userId,
  };

  posts.push(newPost);
});

postRouter.put("/:id", checkUser, checkPost, (req, res, next) => {
  const { postIndex } = req;
  const bode = req.body;

  posts[postIndex].title = title;
  posts[postIndex].body = body;

  res.status(200).send(posts);
});

postRouter.delete("/:id", checkUser, checkPost, (req, res, next) => {
  const { postIndex } = req;
  posts.splice(postIndex, 1);
  res.status(200).send(posts);
});

export default postRouter;
