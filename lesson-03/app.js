import express from "express";
import { users } from "./User.js";
import { posts } from "./Posts.js";
import crypto from "crypto";

const app = express();

// 1.Get danh sách các users
app.get("/api/users", (req, res) => {
  res.send(users);
});

// 2.Get danh sách các bài viết theo userId và cho phép tìm kiếm theo title, content, mặc định kết quả trả về được sort theo bảng chữ cái theo title
app.get("/api/posts/user/:userId", (req, res) => {
  try {
    const userId = req.params.userId;
    const titleQuery = req.query.title;
    const contentQuery = req.query.content;

    const userPosts = posts.filter((post) => post.userId === userId);

    let filteredPosts = userPosts;
    if (titleQuery) {
      filteredPosts = filteredPosts.filter((post) =>
        post.title.toLowerCase().includes(titleQuery.toLowerCase())
      );
    }

    if (contentQuery) {
      filteredPosts = filteredPosts.filter((post) =>
        post.body.content.toLowerCase().includes(contentQuery.toLowerCase())
      );
    }

    filteredPosts.sort((a, b) => a.title.localeCompare(b.title));

    if (filteredPosts.length === 0) {
      return res.json([]);
    }

    res.json(filteredPosts);
  } catch (error) {
    res.status(404).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
});

// 3.Get danh sách các post của users
app.get("/api/users/posts", (req, res) => {
  try {
    const userPosts = users.map((user) => ({
      user: {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
      },
      posts: posts.filter((post) => post.userId === user.id),
    }));

    res.json(userPosts);
  } catch (error) {
    res.status(404).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
});

// 4. Tạo mới post
app.post("/api/posts", (req, res) => {
  try {
    const userId = req.query.userId;

    const existedUsers = users.some((user) => user.id === userId);
    if (!existedUsers) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    const newPost = {
      id: crypto.randomUUID(),
      userId: userId,
      title: req.body.title,
      body: {
        content: req.body.content,
        image: req.body.image,
      },
    };

    posts.push(newPost);

    res.json(newPost);
  } catch (error) {
    res.status(404).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
});

// 5.Chỉnh sửa post
app.put("/api/posts/:id", (req, res) => {
  try {
    const userId = req.query.userId;
    const postId = req.params.id;

    const existedUsers = users.some((user) => user.id === userId);
    if (!existedUsers) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    const existedPostsId = posts.some((post) => post.id === postId);
    if (!existedPostsId) {
      return res.status(404).json({ message: "Bài viết không tồn tại" });
    }

    const oldPost = posts[existedPostsId];

    const updatedPost = {
      id: oldPost.id,
      userId: oldPost.userId,
      title: req.body.title || oldPost.title,
      body: {
        content: req.body.content || oldPost.body.content,
        image: req.body.image || oldPost.body.image,
      },
    };

    posts[existedPostsId] = updatedPost;

    res.json(updatedPost);
  } catch (error) {
    res.status(404).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
});

// Xoá bài viết
app.delete("/api/posts/:id", (req, res) => {
  try {
    const postId = req.params.id;

    const existedPostsId = posts.some((post) => post.id === postId);
    if (!existedPostsId) {
      return res.status(404).json({ message: "Bài viết không tồn tại" });
    }

    posts.splice(existedPostsId, 1);

    res.json({ message: "Xoá bài viết thành công" });
  } catch (error) {
    res.status(404).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
});

// Xoá người dùng và các bài viết liên quan
app.delete("/api/users/:id", (req, res) => {
  try {
    const userId = req.params.id;

    const existedUsers = users.some((user) => user.id === userId);
    if (!existedUsers) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    const deletedUser = users.splice(existedUsers, 1)[0];

    const deletedPosts = posts.filter((post) => post.userId === userId);
    deletedPosts.forEach((deletedPost) => {
      const postIndex = posts.indexOf(deletedPost);
      if (postIndex) {
        posts.splice(postIndex, 1);
      }
    });

    res.json({
      message: "Xoá người dùng và các bài viết liên quan thành công",
      deletedUser: deletedUser,
      deletedPosts: deletedPosts,
    });
  } catch (error) {
    res.status(404).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
