 CREATE TABLE `project_basic` (
  `project_id` char(50) NOT NULL,
  `width` int(5) NOT NULL,
  `height` int(5) NOT NULL,
  `init_zoom` double NOT NULL DEFAULT '1',
  `bg_color` char(20) NOT NULL DEFAULT '#DCDCDC',
  `viewport_color` char(20) NOT NULL DEFAULT '#272C2C',
  KEY `project_id` (`project_id`),
  CONSTRAINT `project_basic_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project_info` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8