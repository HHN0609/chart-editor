const express = require("express");
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken");
const express_jwt = require("express-jwt");
const config = require("./config");
const connection = require("./db");

const app = express();
const port = config.express.port;
const secretkey = config.express.secretkey;

// 用中间件解析响应头里的body，为post做准备
app.use(
  bodyParser.json()
);

// app.use(express_jwt({secret: secretkey}));

// app.use((err, req, res, next) => {
//   if(err.name === "UnauthorizedError"){
//     return res.status(401).send({
//       message: "Invalid Token"
//     })
//   }
//   res.status(500).send({
//     message: "Unkonw Error"
//   })
// });

// 用户初次登录的接口
app.post("/api/user/login", (req, res) => {
  const { body } = req;
  connection.query(`select * from user_info where account='${body.account}';`, (error, results) => {
    if (error) {
      res.status(500).send({
        message: "Internal Server Error"
      })
    } else {
      if(results.length === 0){
        // 查询不到信息
        res.status(401).json({
          message: "No Account!"
        });
      } else {
        // 核验密码是否正确
        if (results[0].pwd === body.password) {
          // 首次登录成功，返回一个token
          const tokenStr = jwt.sign({
            account: results[0].account,
            username: results[0].name,
            isAdmin: results[0].is_admin
          }, secretkey, {
            expiresIn:'30s',
            algorithm: "ES512",
          });
          res.status(200).json({
            message: "Login Successfully",
            account: results[0].account,
            username: results[0].name,
            isAdmin: results[0].is_admin,
            token: tokenStr
          });
        } else {
          // 密码错误
          res.status(401).json({
            message: "Incorrect Password",
          });
        }
      }
    }
  })
});

// token 验证的接口
app.post("/api/user/verify", (req, res) => {
  console.log(req.headers);
  res.send("verifying!");
});

// 用户的信息的接口
app.route("/api/user/info")
  .get((req, res) => {
    // 给相应用户查询自己的信息
    const queries = req.query;
    connection.query(`select * from user_info where account='${queries.account}'`, (error, results) => {
      if (error) {
        res.send(error);
      } else {
        res.send(results); 
      }
    });
  })
  .post((req, res) => {
    // 这个接口只能管理员用
  })
  .put((req, res) => {
    // 这个接接口在注册用户的时候用
  })
  .delete((req, res) => {
    // 留给管理员删除用户的
  });

app.listen(port, () => {
  console.log("Listening on port " + port);
});
