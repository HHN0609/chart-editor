| project_basic | CREATE TABLE `project_basic` (
  `project_id` int(5) NOT NULL,
  `width` int(5) NOT NULL,
  `height` int(5) NOT NULL,
  `init_zoom` double NOT NULL DEFAULT '1',
  `bg_color` char(20) NOT NULL DEFAULT 'rgb(220,220,220)',
  `viewport_color` char(20) NOT NULL DEFAULT 'rgb(39,44,44)',
  KEY `project_id` (`project_id`),
  CONSTRAINT `project_basic_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project_info` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8