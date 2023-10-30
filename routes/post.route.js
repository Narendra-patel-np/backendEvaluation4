const express = require("express");
const { PostModel } = require("../model/posts.model");
const { auth } = require("../middleware/auth.middleware");
const postRouter = express.Router();

postRouter.use(auth);

postRouter.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

postRouter.post("/add", async (req, res) => {
  try {
    const post = new PostModel(req.body);
    await post.save();
    res.status(200).send({ msg: "new post added", newPost: req.body });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = {
  postRouter,
};
