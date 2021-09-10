var express = require('express');
var router = express.Router();
const md5 = require('blueimp-md5')
const models = require('../db/models')
//const UserModel = models.getModel('user')
const _filter = {'pwd': 0, '__v': 0} // 查询时过滤掉
const sms_util = require('../util/sms_util')
const users = {}
const ajax = require('../api/ajax')
var svgCaptcha = require('svg-captcha')
var pool = require("../util/pool");

/*
密码登陆
 */
router.post('/login_pwd', function (req, res) {
  const name = req.body.name
  const pwd = md5(req.body.pwd)
  const captcha = req.body.captcha.toLowerCase()
  //输出用户输入参数是否正确  captcha 你输入验证码字符串
  console.log('/login_pwd', name, pwd, captcha);
  //服务器中保存验证码    二个相同
  console.log("server_", req.session)

  // 可以对用户名/密码格式进行检查, 如果非法, 返回提示信息
  if(captcha!==req.session.captcha) {
    return res.send({code: -1, msg: '验证码不正确'})
  }
  // 删除保存的验证码
   delete req.session.captcha

   var sql = "SELECT  id FROM dd_login WHERE uname = ? AND upwd = ?";
   pool.query(sql,[name,pwd],(err,result)=>{
    if(err)throw err;
    if(result.length===0){
      res.send({code:-1,msg:"用户名或密码有误"})
    }else{ 
     var id = result[0].id;
     //登录成功在服务器端将登录凭证保存
     req.session.userid = id;
     return res.send({code: 1, msg: '登录成功',data:{id}})
    }
   })

})

/*
一次性图形验证码
 */
router.get('/captcha', function (req, res) {
  var captcha = svgCaptcha.create({
    ignoreChars: '0o1l',
    noise: 2,
    color: true
  });
  req.session.captcha = captcha.text.toLowerCase();
  console.log(2,req.session.captcha);
  res.type('svg');
  res.send(captcha.data)
});



/*
根据sesion中的userid, 查询对应的user
 */
router.get('/userinfo', function (req, res) {
  res.send({code: 1, msg: '正确',data:{id:1,name:"tom",phone:"13999999999"}})
})


router.get('/logout', function (req, res) {
  // 清除浏览器保存的userid的cookie
  delete req.session.userid
  // 返回数据
  res.send({code: 0})
})


module.exports = router;