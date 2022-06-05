CREATE TABLE `chart_detail_info` (
  `chart_id` char(15) NOT NULL,
  `chart_detail` json DEFAULT NULL,
  PRIMARY KEY (`chart_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8