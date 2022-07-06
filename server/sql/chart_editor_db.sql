SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `chart_editor_db`;
CREATE DATABASE `chart_editor_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `chart_editor_db`;

DROP TABLE IF EXISTS `chart_detail_info`;
CREATE TABLE `chart_detail_info` (
  `project_id` char(50) NOT NULL,
  `chart_id` char(50) NOT NULL,
  `chart_detail` json DEFAULT NULL,
  PRIMARY KEY (`chart_id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `chart_detail_info_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project_info` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `chart_detail_info` (`project_id`, `chart_id`, `chart_detail`) VALUES
('cb5befe2-dd5f-4cdb-df26-106527fe116e',	'b17c01d2-74fb-4b56-c895-cdb4f938e8a2',	'{\"uid\": \"b17c01d2-74fb-4b56-c895-cdb4f938e8a2\", \"basicData\": {\"x\": 36, \"y\": 51, \"type\": \"Bar\", \"index\": 3, \"width\": 271, \"height\": 253, \"rotate\": 0}, \"sourceData\": [{\"2015\": 43.3, \"2016\": 85.8, \"2017\": 93.7, \"product\": \"Matcha Latte\"}, {\"2015\": 83.1, \"2016\": 73.4, \"2017\": 55.1, \"product\": \"Milk Tea\"}, {\"2015\": 86.4, \"2016\": 65.2, \"2017\": 82.5, \"product\": \"Cheese Cocoa\"}, {\"2015\": 72.4, \"2016\": 53.9, \"2017\": 49.1, \"product\": \"Walnut Brownie\"}], \"optionsData\": {\"grid\": {\"show\": false, \"borderColor\": \"#FFFFFF\", \"borderWidth\": 1, \"backgroundColor\": \"transparent\"}, \"title\": {\"font\": {\"size\": \"10\", \"color\": \"#FFFFFF\", \"family\": \"sans-serif\"}, \"show\": true, \"text\": \"Bar\"}, \"xAxis\": {\"name\": \"\", \"show\": true, \"lineType\": \"solid\", \"nameFont\": {\"size\": \"10\", \"color\": \"#FFFFFF\", \"family\": \"sans-serif\"}, \"labelFont\": {\"size\": \"10\", \"color\": \"#FFFFFF\", \"family\": \"sans-serif\"}, \"lineColor\": \"#FFFFFF\", \"lineWidth\": 1}, \"yAxis\": {\"name\": \"\", \"show\": true, \"lineType\": \"solid\", \"nameFont\": {\"size\": \"10\", \"color\": \"#FFFFFF\", \"family\": \"sans-serif\"}, \"labelFont\": {\"size\": \"10\", \"color\": \"#FFFFFF\", \"family\": \"sans-serif\"}, \"lineColor\": \"#FFFFFF\", \"lineWidth\": 1}, \"legend\": {\"font\": {\"size\": \"10\", \"color\": \"#FFFFFF\", \"family\": \"sans-serif\"}, \"show\": true, \"orient\": \"horizontal\"}, \"chartStyle\": {\"isStack\": true, \"orientation\": \"horizontal\"}, \"seriseLabel\": {\"font\": {\"size\": \"10\", \"color\": \"#FFFFFF\", \"family\": \"sans-serif\"}, \"show\": true, \"position\": \"top\"}}}'),
('cb5befe2-dd5f-4cdb-df26-106527fe116e',	'f4aebc83-1338-4483-905b-c46fa10564e0',	'{\"uid\": \"f4aebc83-1338-4483-905b-c46fa10564e0\", \"basicData\": {\"x\": 351, \"y\": 93, \"type\": \"Bar\", \"index\": 2, \"width\": 388, \"height\": 187, \"rotate\": 0}, \"sourceData\": [{\"2015\": 43.3, \"2016\": 85.8, \"2017\": 93.7, \"product\": \"Matcha Latte\"}, {\"2015\": 83.1, \"2016\": 73.4, \"2017\": 55.1, \"product\": \"Milk Tea\"}, {\"2015\": 86.4, \"2016\": 65.2, \"2017\": 82.5, \"product\": \"Cheese Cocoa\"}, {\"2015\": 72.4, \"2016\": 53.9, \"2017\": 49.1, \"product\": \"Walnut Brownie\"}], \"optionsData\": {\"grid\": {\"show\": false, \"borderColor\": \"#FFFFFF\", \"borderWidth\": 1, \"backgroundColor\": \"transparent\"}, \"title\": {\"font\": {\"size\": \"10\", \"color\": \"#FFFFFF\", \"family\": \"sans-serif\"}, \"show\": true, \"text\": \"Bar\"}, \"xAxis\": {\"name\": \"\", \"show\": true, \"lineType\": \"solid\", \"nameFont\": {\"size\": \"10\", \"color\": \"#FFFFFF\", \"family\": \"sans-serif\"}, \"labelFont\": {\"size\": \"10\", \"color\": \"#FFFFFF\", \"family\": \"sans-serif\"}, \"lineColor\": \"#FFFFFF\", \"lineWidth\": 1}, \"yAxis\": {\"name\": \"\", \"show\": true, \"lineType\": \"solid\", \"nameFont\": {\"size\": \"10\", \"color\": \"#FFFFFF\", \"family\": \"sans-serif\"}, \"labelFont\": {\"size\": \"10\", \"color\": \"#FFFFFF\", \"family\": \"sans-serif\"}, \"lineColor\": \"#FFFFFF\", \"lineWidth\": 1}, \"legend\": {\"font\": {\"size\": \"10\", \"color\": \"#FFFFFF\", \"family\": \"sans-serif\"}, \"show\": true, \"orient\": \"horizontal\"}, \"chartStyle\": {\"isStack\": true, \"orientation\": \"horizontal\"}, \"seriseLabel\": {\"font\": {\"size\": \"10\", \"color\": \"#FFFFFF\", \"family\": \"sans-serif\"}, \"show\": true, \"position\": \"top\"}}}');

DROP TABLE IF EXISTS `project_basic`;
CREATE TABLE `project_basic` (
  `project_id` char(50) NOT NULL,
  `width` int(5) NOT NULL,
  `height` int(5) NOT NULL,
  `init_zoom` double NOT NULL DEFAULT '1',
  `bg_color` char(20) NOT NULL DEFAULT '#DCDCDC',
  `viewport_color` char(20) NOT NULL DEFAULT '#272C2C',
  KEY `project_id` (`project_id`),
  CONSTRAINT `project_basic_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project_info` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `project_basic` (`project_id`, `width`, `height`, `init_zoom`, `bg_color`, `viewport_color`) VALUES
('cb5befe2-dd5f-4cdb-df26-106527fe116e',	800,	450,	1,	'#DCDCDC',	'#272C2C');

DROP TABLE IF EXISTS `project_info`;
CREATE TABLE `project_info` (
  `project_id` char(50) NOT NULL,
  `project_name` char(15) DEFAULT NULL,
  `owner` char(15) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `last_modify` datetime DEFAULT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `project_info` (`project_id`, `project_name`, `owner`, `create_time`, `last_modify`) VALUES
('cb5befe2-dd5f-4cdb-df26-106527fe116e',	'test1',	'root',	'2022-07-05 17:26:55',	'2022-07-05 17:26:55');

DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `account` char(15) NOT NULL,
  `name` char(15) DEFAULT NULL,
  `pwd` char(15) DEFAULT NULL,
  `is_admin` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `user_info` (`account`, `name`, `pwd`, `is_admin`) VALUES
('luyuke',	'lyk',	'123456',	0),
('root',	'hehaonan',	'123456',	2);