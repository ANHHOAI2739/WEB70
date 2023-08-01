import { users } from "../src/data/users.js";

export const checkUsername = (req, res, next) => {
  const { username } = req.body;
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: "username đã tồn tại" });
  }
  next();
};
