import { posts } from "../data/posts.js";

export const checkPost = (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.query;

  const postIndex = posts.findIndex(
    (post) => post.id === id && post.userId === userId
  );

  if (postIndex !== -1) {
    req.postIndex = postIndex;
    next();
    return;
  }
  res.status(400).send("Bài viết không tồn tại");
};
