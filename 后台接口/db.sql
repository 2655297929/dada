DROP DATABASE IF EXISTS dada;

CREATE DATABASE dada CHARSET=UTF8;

USE dada;
CREATE TABLE dd_login(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(25),
  upwd  VARCHAR(32)
);
#添加二条数据
INSERT INTO dd_login VALUES(null,'tom',md5('123'));
INSERT INTO dd_login VALUES(null,'jerry',md5('123'));
INSERT INTO dd_login VALUES(null,'kobe',md5('73464'));
