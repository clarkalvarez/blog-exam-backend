const express = require("express");
const { authenticate, authorizeAdmin } = require("../middleware");
const Role = require("../models/roles");
const User = require("../models/users");
const Post = require("../models/posts");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", authenticate, async (req, res) => {
  try {
    const posts = await Post.getPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Post.getPostById(id);
    if (posts !== 0) {
      return res.status(404).json({ error: "Posts not found" });
    }
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", authenticate, async (req, res) => {
  const postData = req.body;

  try {
    const newPost = await Post.createPost({ ...postData, ...userId });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  try {
    const currentUser = await User.getUserById(id);

    if (userData.role) {
      const roleRecord = await Role.getRoleByName(userData.role);
      if (!roleRecord) {
        return res.status(400).json({ error: "Role doesn't exist" });
      }
      userData.roleId = roleRecord.id;
    } else {
      userData.roleId = currentUser.roleId;
    }

    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
    } else {
      userData.password = currentUser.password;
    }

    userData.name = userData.name || currentUser.name;
    userData.email = userData.email || currentUser.email;

    const updatedUser = await User.updateUser(id, userData);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", authenticate, authorizeAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await User.deleteUser(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
