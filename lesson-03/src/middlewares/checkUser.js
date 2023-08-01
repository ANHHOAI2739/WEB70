import { users } from "../data/users.js";

export const checkUser = (req, res, next) => {
  const { userId } = res.query;
  if (userId) {
    const user = users.find((user) => user.id === userId);
    if (user) {
      next();
      return;
    }
  }
  res.status(401).send("Người dùng không tồn tại");
};
