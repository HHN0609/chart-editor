const express = require("express");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const { signToken, verifyToken, generateUUID } = require("./utils");
const config = require("./config");
const connection = require("./db");
connection.connect((err) => {
  if(null){
    console.log("Connection error: ", err);
  }
})
const app = express();
const port = config.express.port;

/**
 * 用中间件解析请求头里的body，为post做准备
 */
app.use(bodyParser.json());

/**
 * 中间件解析请求头里的cookie
 */
app.use(cookieParser());

/**
 * 中间件解析、验证token
 */
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
        // .clearCookie("isAdmin")
        .send({message: "Token Invalid!"});
    } else {
      next();
    }
  }
});

/**
 * 中间件验证是否具有管理员权限
 */
app.use("/api/admin/", (req, res, next) => {
  // 通过token来验证权限
  const result = verifyToken(req.headers.authorization);
  if (result && result.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "No Permission" });
  }
})
  .get("/api/admin/usersInfo", (req, res) => {
    connection.query(`select account, name, is_admin from user_info`, (error, results) => {
      if(error){
        res.status(500).send({
          message: "Mysql Error"
        })
      } else {
        res.status(200).send(results);
      }
    });
  })
  .put("/api/admin/usersInfo", (req, res) => {
    const { body } = req;
    const { account, newAuth } = body;
    connection.query(`update user_info set is_admin=${newAuth} where account='${account}';`, (error, results) => {
      if(error){
        res.status(500).send({
          message: "Mysql Error"
        })
      } else {
        res.status(200).send({
          message: "Change successfully"
        });
      }
    });
  })
  .delete("/api/admin/usersInfo", (req, res) => {
    const { query } = req;
    const { account } = query;
    connection.query(`delete from user_info where account='${account}'`, (error, results) => {
      if(error){
        res.status(500).send({
          message: "Mysql Error"
        })
      } else {
        res.status(200).send({
          message: "Delete successfully"
        });
      }
    });
  });


/**
* 用户初次登录的接口
* 1.数据库查询错误 500
* 2.账户不存在 401
* 3.成功，返回数据 200
* 4.密码错误 401
 */
app.post("/api/user/login", (req, res) => {
  const { body } = req;
  connection.query(`select * from user_info where account='${body.account}';`, (error, results) => {
    if (error) {
      // 数据库查询错误
      res.status(500).send({
        message: "Mysql Error"
      })
    } else {
      if(results.length === 0){
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
            // .cookie("isAdmin", results[0].is_admin, {
            //   maxAge: 3600000,
            //   httpOnly: true
            // })
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

/**
 * 用户查询自己的projects的接口
 * 1. 查询
 * 2. 新建
 * 3. 修改信息
 * 4. 删除信息
 */
app.route("/api/user/projects")
  .get((req, res) => {
    const { account } = req.query;
    connection.query(`select * from project_info where owner='${account}'`, (error, results) => {
      if (error) {
        res.status(500).send({
          message: "Mysql Error",
        });
      } else {
        res.status(200).send(results);
      }
    })
  })
  .post((req, res) => {
    const {body} = req;
    const { account, name, width, height, bgColor, viewportColor} = body;
    const uuid = generateUUID();
    let sqlArr = [
      `insert into project_info values('${uuid}', '${name}', '${account}', NOW(), NOW())`,
      `insert into project_basic values('${uuid}', ${width}, ${height}, ${1.0}, '${bgColor}', '${viewportColor}')`,
    ]
    // 这里需要用到事务的特性
    connection.beginTransaction((err) => {
      let p1 = new Promise((resolve, reject) => {
        connection.query(sqlArr[0], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        })
      });
      let p2 = new Promise((resolve, reject) => {
        connection.query(sqlArr[1], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        })
      })
      Promise.all([p1, p2])
        .then((value) => {
          console.log(value);
          connection.commit();
          res.status(200).send({
            message: "Create Successfully",
          })
        })
        .catch((reason) => {
          console.log(reason);
          connection.rollback();
          res.status(500).send({
            message: "Mysql Error",
          })
        })
    });
  })
  .delete((req, res) => {
    const { query } = req;
    const { projectId } = query;
    connection.query(`delete from project_info where project_id='${projectId}'`, (error ,results) => {
      if (error) {
        res.status(500).send({
          message: "Mysql Error",
        });
      } else {
        res.status(200).send({
          message: "Delete Successfully",
        })
      }
    });
  })
  .put((req, res) => {
    connection.query(``, (error, results) => {
      if (error) {
        res.status(500).send({
          message: "Mysql Error",
        });
      } else {
        res.status(200).send({
          message: "Update Successfully",
        })
      }
    });
  })

/**
* 用户的对自己信息的接口
* 1.查询自己信息
* 2.修改自己信息
* 3.注册新用户
* 4.注销
*/
app.route("/api/user/info")
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

app.listen(port, () => {
  console.log("Listening on port " + port);
});
