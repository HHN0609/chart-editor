const express = require("express");
const connection = require("../db");
const projectsRouter = express.Router();
const { generateUUID } = require("../utils");

/**
 * 用户查询自己的projects的接口
 * 1. 查询
 * 2. 新建
 * 3. 修改信息
 * 4. 删除信息
 */

projectsRouter.get("/api/user/projects", (req, res) => {
  const { account } = req.query;
  connection.query(`select * from project_info where owner='${account}'`, (error, results) => {
    if (error) {
      res.status(500).send({
        message: "Mysql Error",
      });
    } else {
      res.status(200).send(results);
    }
  });
});

projectsRouter.post("/api/user/projects", (req, res) => {
  const { body } = req;
  const { account, name, width, height, bgColor, viewportColor } = body;
  const uuid = generateUUID();
  let sqlArr = [
    `insert into project_info values('${uuid}', '${name}', '${account}', NOW(), NOW())`,
    `insert into project_basic values('${uuid}', ${width}, ${height}, ${1.0}, '${bgColor}', '${viewportColor}')`,
  ]
  // 这里需要用到事务的特性
  connection.beginTransaction((err) => {
    let proArr = sqlArr.map((sql) => {
      return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    });
    Promise.all(proArr)
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
});

projectsRouter.delete("/api/user/projects", (req, res) => {
  const { query } = req;
  const { projectId, account } = query;
  let sqlArr = [
    `delete from project_basic where project_id='${projectId}'`,
    `delete from chart_detail_info where project_id='${projectId}'`,
    `delete from project_info where project_id='${projectId}' and owner='${account}'`,
  ];
  connection.beginTransaction((err) => {
    if (err) return;
    let tasks = sqlArr.map((value) => {
      return new Promise((resolve, reject) => {
        connection.query(value, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        })
      })
    });
    Promise.all(tasks).then(() => {
      connection.commit();
      res.status(200).send({
        message: "Delete Successfully",
      });
    }).catch(() => {
      connection.rollback();
      res.status(500).send({
        message: "Mysql Error",
      });
    });
  });
});

projectsRouter.put("/api/user/projects", (req, res) => {
  connection.query(``, (error, results) => {
    if (error) {
      res.status(500).send({
        message: "Mysql Error",
      });
    } else {
      res.status(200).send({
        message: "Update Successfully",
      });
    }
  });
});

projectsRouter.get("/api/user/projectsBasic", (req, res) => {
  let { projectId } = req.query;
  connection.query(`select * from project_basic where project_id='${projectId}'`, (err, results) => {
    if (err) {
      res.status(500).send({
        message: "Mysql Error",
      });
    } else {
      res.status(200).send({
        message: results[0],
      });
    }
  });
});

projectsRouter.put("/api/user/projectsBasic", (req, res) => {
  let { body } = req;
  connection.query(`update project_basic set width=${body.width}, height=${body.height}, init_zoom=${body.initZoom}, bg_color='${body.bgColor}', viewport_color='${body.viewportColor}' where project_id='${body.projectId}'`, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: "Mysql Error",
      });
    } else {
      res.status(200).send({
        message: "Update Successfully",
      });
    }
  });
});

module.exports = projectsRouter;