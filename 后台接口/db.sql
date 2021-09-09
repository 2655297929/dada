-- 创建一个库   shopping
CREATE DATABASE shopping CHARSET=UFT8;
-- 进入库
USE shopping;
-- 创建表  dd_login  dd_user
CREATE TABLE dd_login(
  id INT  PRIMARY KEY AUTO_INCREMENT, 
  upname VARCHAR(25), 
  upwd VARCHAR(16)
);
CREATE TABLE dd_user(
  id INT  PRIMARY KEY AUTO_INCREMENT, 
  uid INT,
  rname VARCHAR(16),
  phone VARCHAR(11),
  address VARCHAR(200),
);
-- 添加测试
INSERT INTO dd_login VALUES (null, 'TOM',MD5('123456') );
INSERT INTO dd_user VALUES (null, 1, 'dd','17865894378','sd' );