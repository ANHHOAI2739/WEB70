import express from "express";
import crypto from "crypto";

import { checkInfo } from "./middlewares/checkInfo.js";
import { existedUsers } from "./middlewares/existedUsers.js";
import { checkUsername } from "./middlewares/checkUsername.js";
import { validateInput } from "./middlewares/validateInput.js";

const app = express();
app.use(express.json());

app.post("/api/auth/login", checkInfo, existedUsers, (req, res) => {
  const user = req.user;
  return res.status(200).send({
    message: "Đăng nhập thành công",
    apiKey: user.apiKey,
  });
});

app.post("/api/auth/register", validateInput, checkUsername, (req, res) => {
  const { username, password, fullname } = req.body;
  const apiKey = `${username}.${password}`;

  const newUser = {
    id: crypto.randomUUID(),
    username: username,
    password: password,
    fullname: fullname,
    apiKey: apiKey,
  };

  users.push(newUser);

  return res
    .status(201)
    .send({ message: "Đăng kí thành công", apiKey: apiKey });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
