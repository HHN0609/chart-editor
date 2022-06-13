 CREATE TABLE `chart_basic_info` (
  `chart_id` int(5) NOT NULL AUTO_INCREMENT,
  `chart_name` char(15) DEFAULT NULL,
  `owner` char(15) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `last_modify` datetime DEFAULT NULL,
  PRIMARY KEY (`chart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 |