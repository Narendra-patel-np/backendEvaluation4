const express = require("express");
const app = express();
const { connection } = require("./db");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");
require("dotenv").config();

app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.get("/", (req, res) => {
  res.send({ msg: "This is the home page for Post App." });
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to DB");
    console.log(`server is running at port ${process.env.port}`);
  } catch (error) {
    console.log(error);
  }
});
