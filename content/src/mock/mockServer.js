//引入mock模块
import Mock from 'mockjs'
//引入data.json
import data from './data.json'
//创建三个接口
Mock.mock("/ratings",'get',{code:0,data:data.ratings})
Mock.mock("/goods",'get',{code:0,data:data.goods})
Mock.mock("/info",'get',{code:0,data:data.info})