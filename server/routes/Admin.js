const express = require("express");
const connection = require("../db");
const { verifyToken } = require("../utils");
const adminRouter = express.Router();

/**
 * 中间件验证是否具有管理员权限
 */
adminRouter.use("/api/admin/", (req, res, next) => {
    // 通过token来验证权限
    const result = verifyToken(req.headers.authorization);
    if (result && result.isAdmin) {
        next();
    } else {
        res.status(401).send({ message: "No Permission" });
    }
});

adminRouter.get("/api/admin/usersInfo", (req, res) => {
    connection.query(`select account, name, is_admin from user_info`, (error, results) => {
        if (error) {
            res.status(500).send({
                message: "Mysql Error"
            })
        } else {
            res.status(200).send(results);
        }
    });
});

adminRouter.put("/api/admin/usersInfo", (req, res) => {
    const { body } = req;
    const { account, newAuth } = body;
    connection.query(`update user_info set is_admin=${newAuth} where account='${account}';`, (error, results) => {
        if (error) {
            res.status(500).send({
                message: "Mysql Error"
            })
        } else {
            res.status(200).send({
                message: "Change successfully"
            });
        }
    });
});

adminRouter.delete("/api/admin/usersInfo", (req, res) => {
    const { query } = req;
    const { account } = query;
    connection.query(`delete from user_info where account='${account}'`, (error, results) => {
        if (error) {
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

module.exports = adminRouter;
