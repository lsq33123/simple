
import request from '@/utils/request'

//获取物流公司列表
export const getExpressCompanyList = body => request.post('/common/getExpressCompanyList',  body )
//获取订单渠道类型列表
export const getOrderChannelList = body => request.post('/orderChannel',  body )
//获取区号列表
export const getPhoneCodeList = body => request.post('/phoneCode/list',  body )
//获取省市区列表
export const getAddressList = body => request.post('/area/list',  body )
//获取代理商接口 - 下拉框
export const getSalesAgent = body => request.post('/salesAgent/optionList',  body )