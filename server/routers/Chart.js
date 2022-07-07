const express = require("express");
const connection = require("../db");
const ChartRouter = express.Router();

/**
 * 对project里的chart的操作
 */
 ChartRouter.route("/api/user/chartDetailInfo")
 .get((req, res) => {
   let {projectId,} = req.query;
   connection.query(`select * from chart_detail_info where project_id='${projectId}'`, (err, results) => {
     if (err) {
       res.status(500).send({
         message: "Mysql Error",
       })
     } else {
       res.status(200).send({
         message: results,
       })
     }
   });
 })
 .delete((req, res) => {
   let {projectId, chartId} = req.query;
   connection.query(`delete from chart_detail_info where project_id='${projectId}' and chart_id='${chartId}'`, (err, results) => {
     if (err) {
       res.status(500).send({
         message: "Mysql Error",
       })
     } else {
       res.status(200).send({
         message: "Delete Successfully",
       })
     }
   });
 })
 .post((req, res) => {
   let { body } = req;
   connection.query(`insert into chart_detail_info values('${body.projectId}', '${body.chartId}', '${body.chartDetail}')`, (err, results) => {
     if (err) {
       console.log(err);
       res.status(500).send({
         message: "Mysql Error",
       });
     } else {
       res.status(200).send({
         message: "Create Successfully",
       })
     }
   });
 })
 .put((req, res) => {
   let {body} = req;
   connection.query(`update chart_detail_info set chart_detail='${body.chartDetail}' where chart_id='${body.chartId}' and project_id='${body.projectId}'`, (err, results) => {
     if (err) {
       console.log(err);
       res.status(500).send({
         message: "Mysql Error",
       });
     } else {
       res.status(200).send({
         message: "Update Successfully",
       })
     }
   });
 });

module.exports = ChartRouter;