const express = require("express");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const config = require("./config");
const connection = require("./db");
const adminRouter = require("./routers/Admin");
const chartRouter = require("./routers/Chart");
const loginRouter = require("./routers/Login");
const projectsRouter = require("./routers/Projects");
const userRouter = require("./routers/User");
const { verifyToken } = require("./utils");
const app = express();
const port = config.express.port;

connection.connect((err) => {
  if(err){
    console.log("Connection error: ", err);
  }
});

//用中间件解析请求头里的body，为post做准备
app.use(bodyParser.json());

// 中间件解析请求头里的cookie
app.use(cookieParser());


// 中间件解析、验证token
app.use((req, res, next) => {
  console.log(req.method + " " + req.path);
  // 这里的用户登录和用户的注册都是不需要token的
  if(req.path === "/api/user/login" || (req.path === "/api/user/info" && req.method.toLocaleLowerCase() === "post")){
    next();
  } else {
    if(!verifyToken(req.headers.authorization)){
      res.status(401)
        .clearCookie("account")
        .clearCookie("username")
        .send({message: "Token Invalid!"});
    } else {
      next();
    }
  }
});

app.use(adminRouter);
app.use(loginRouter);
app.use(projectsRouter);
app.use(userRouter);
app.use(chartRouter);

app.listen(port, () => {
  console.log("Listening on port " + port);
});
