
import request from '@/utils/request'

//搜索OBD列表
export const searchObdList = body => request.post('/orderShipment/searchObdList',  body )
//订单列表
export const getOrderList = body => request.post('/order/list',  body )
//创建订单
export const addOrderList = body => request.post('/order/entry',  body )
//在售商品列表
export const getGoodsList = body => request.post('/order/getGoodsList',  body )
//获取用户当前状态 是否首购、是否已注册
export const appUserStatus = body => request.post('/order/appUserStatus',  body )