const express = require("express");
const connection = require("../db");

const userRouter = express.Router();
/**
* 用户的对自己信息的接口
* 1.查询自己信息
* 2.修改自己信息
* 3.注册新用户
* 4.注销
*/
userRouter.route("/api/user/info")
  .get((req, res) => {
    let { account } = req?.query;
    connection.query(`select name, account, is_admin from user_info where account='${account}'`, (error, results) => {
      if (error) {
        res.status(500).send({
          message: "Mysql Error",
        });
      } else {
        res.status(200).send(results[0]);
      }
    });
  })
  .post((req, res) => {
    // 注册用户
    const { body } = req;
    connection.query(`insert into user_info values('${body.account}', '${body.name}', '${body.password}', ${0})`, (error, result) => {
      if (error) {
        res.status(500).send({
          message: "Mysql Error",
        })
      } else {
        res.status(201).send({
          message: "Register Scuuessfully",
        })
      }
    });
  })
  .put((req, res) => {
    // 修改用户信息
    const { body } = req;
    let sql = `update user_info set name='${body.username}' where account='${body.account}';`;
    // 区分要不要改密码
    if (body.password && body.password.length <= 15) {
      sql = `update user_info set name='${body.username}', pwd='${body.password}' where account='${body.account}';`;
    }
    connection.query(sql, (error) => {
      if(error){
        res.status(500).send({
          message: "Mysql Error",
        })
      } else {
        res.status(200).send({
          message: "Update Successfully",
        })
      }
    });
  })
  .delete((req, res) => {
    // 注销用户
  });

  module.exports = userRouter;