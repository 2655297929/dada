//src/api/index.js 保存项目所有请求方法
//1:引入刚才创建ajax函数
import ajax from "./ajax"
//2:创建常量保存请求服务器基础路径
//const BASE_URL = "http://127.0.0.1:4000"
//3:创建常量保存请求服务器基础路径--黄牛  17:30 完成
const BASE_URL = "/api"
//3:创建函数 reqPwdLogin 向服务器发请求完成登录    15:26完成代码
export const reqPwdLogin = ({name,pwd,captcha})=>ajax(BASE_URL+"/login_pwd",{name,pwd,captcha},"POST");
//4:创建函数 reqUserInfo 向服务器发请求完成用户信息获取
export const reqUserInfo = ()=>ajax(BASE_URL+"/userinfo");
//5:创建函数 reqLogout 向服务器发送请求完成用户退出操作
export const reqLogout = ()=>ajax(BASE_URL+"/logout")

//6:创建二个请求函数 05
export const reqShopInfo = ()=>ajax("/info");
export const reqShopGoods = ()=>ajax("/goods");
export const reqShopRatings = ()=>ajax("/ratings");

