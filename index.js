const express = require("express");
const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const cookieParser = require('cookie-parser');
const { restriction } = require('./middleware/auth');

const path = require("path");
const { connectToMongoose } = require("./connect");
const URL = require("./models/url");

const app = express();
const port = 8001;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Fixed here

connectToMongoose('mongodb://localhost:27017/short-url')
  .then(() => console.log('Mongodb connected'));

app.use("/", staticRouter);
app.use("/url", restriction, urlRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log("server started");
});
