
import request from '@/utils/request'

//搜索OBD列表
export const searchObdList = body => request.post('/orderShipment/searchObdList',  body )
//订单列表
export const getOrderList = body => request.post('/order/list',  body )