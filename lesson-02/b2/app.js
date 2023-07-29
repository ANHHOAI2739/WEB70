import express from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());

const users = [
  {
    id: "74d2e282-3229-44de-bb90-9f4d15354f04",
    username: "vanA",
    fullname: "Nguyen Van A",
    age: 19,
  },
  {
    id: "c99b9192-6dd2-4ef8-864e-37d2360a55a4",
    username: "nguyenvanB",
    fullname: "Nguyen Van B",
    age: 20,
  },
  {
    id: "36128291-709e-466f-8567-966deae2f1b2",
    username: "NVanC",
    fullname: "Nguyen Van C",
    age: 21,
  },
  {
    id: "63ae7e0d-2ea7-47f2-8dad-398b625911d8",
    username: "VAND",
    fullname: "Nguyen Van D",
    age: 22,
  },
];

app.get("/api/users", (req, res) => {
  const { username, sort } = req.query;

  try {
    let filteredUsers = [...users];
    if (username) {
      filteredUsers = filteredUsers.filter((user) =>
        user.username.toLowerCase().includes(username.toLowerCase())
      );
    }
    if (sort === "ASC") {
      filteredUsers.sort((a, b) => a.age - b.age);
    } else if (sort === "DESC") {
      filteredUsers.sort((a, b) => b.age - a.age);
    }

    res.json({
      data: filteredUsers,
      message: "Thành công",
      success: true,
    });
  } catch (error) {
    res.send({
      message: "Đã xảy ra lỗi",
      success: false,
    });
  }
});

app.post("/api/users/add", (req, res) => {
  const { username, fullname, age } = req.body;

  try {
    const checkExisted = users.some(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (checkExisted) {
      res.send({
        data: null,
        message: "Thất bại! User đã tồn tại",
        success: false,
      });
    } else {
      const newUser = {
        id: crypto.randomUUID(),
        username,
        fullname,
        age,
      };

      users.push(newUser);

      res.send({
        data: newUser,
        message: "Tạo mới user thành công",
        success: true,
      });
    }
  } catch (error) {
    res.send({
      message: "Đã xảy ra lỗi",
      success: false,
    });
  }
});

app.listen(5001, () => {
  console.log("server is running");
});
