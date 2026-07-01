const express = require("express");
const connection = require("../db");
const loginRouter = express.Router();
const { signToken } = require("../utils");

loginRouter.post("/api/user/login", (req, res) => {
  const { body } = req;
  connection.query(`select * from user_info where account='${body.account}';`, (error, results) => {
    if (error) {
      // 数据库查询错误
      res.status(500).send({
        message: "Mysql Error"
      })
    } else {
      if (results.length === 0) {
        // 查询不到账户信息
        res.status(401).json({
          message: "No Account"
        });
      } else {
        // 核验密码是否正确
        if (results[0].pwd === body.password) {
          // 首次登录成功，签发一个token
          const tokenStr = signToken({
            account: results[0].account,
            username: results[0].name,
            isAdmin: results[0].is_admin
          });
          res.status(200)
            .cookie("account", results[0].account, {
              maxAge: 3600000
            })
            .cookie("username", results[0].name, {
              maxAge: 3600000,
            })
            .json({
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

module.exports = loginRouter;