CREATE TABLE `project_info` (
  `project_id` char(50) NOT NULL,
  `project_name` char(15) DEFAULT NULL,
  `owner` char(15) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `last_modify` datetime DEFAULT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8