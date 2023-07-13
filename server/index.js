const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.internal_port || 8080;
const router = require("./router.js");
const session = require("express-session");

app.use(
  session({
    name: "uid",
    secret: "superdupersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
      sameSite:"none",
      domain:"picturingthis.netlify.app"
    },
  })
);

app.use(
  cors({
    origin:["http://localhost:3000", "https://picturingthis.netlify.app", "https://main--picturingthis.netlify.app"],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(router);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
