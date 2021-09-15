
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
//获取订单发货信息列表
export const getOrderLogisticsList = body => request.post('/orderShipment/getOrderLogisticsList',  body )
//获取订单状态 - 下拉列表
export const getOrderStatus = body => request.post('/order/orderStatus',  body )
//获取获取发货详情
export const getLogisticsDetails = body => request.post('/orderShipment/logisticsDetails',  body )
//新增发货记录
export const addOrderShipment = body => request.post('/orderShipment/add',  body )
//订单详情
export const getOrderDetail = body => request.post('/order/detail',  body )
//订订单 - 备注
export const setOrderRemark = body => request.post('/order/remark',  body )
//订单 - 操作历史/快照
export const getOrderHistoryDetail = body => request.post('/order/history',  body )