CREATE TABLE `chart_basic_info` (
  `chart_id` char(15) NOT NULL,
  `chart_name` char(15) DEFAULT NULL,
  `owner` char(15) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `last_modify` datetime DEFAULT NULL,
  PRIMARY KEY (`chart_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8