CREATE TABLE `user_info` (
  `account` char(15) NOT NULL,
  `name` char(15) DEFAULT NULL,
  `pwd` char(15) DEFAULT NULL,
  `is_admin` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8