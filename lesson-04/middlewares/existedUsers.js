import { users } from "../src/data/users.js";

export const existedUsers = (req, res, next) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);

  if (!user || user.password !== password) {
    return res
      .status(401)
      .send({ message: "username hoặc password không đúng" });
  }

  req.user = user;
  next();
};
