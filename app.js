const express = require("express");
const app = express();
app.use(express.json());

require("dotenv").config();
const port = process.env.PORT || 3000;

const connectDB = require("./config/db");
connectDB();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("HI");
});

app.use("/register", require("./routes/register.js"));
app.use("/login", require("./routes/login.js"));

app.post("/dashboard", require("./middleware/auth"), (req, res) => {
  return res.send(req.user);
});

app.listen(port, () => {
  console.log(`Server Up and Running on port ${port}`);
});
