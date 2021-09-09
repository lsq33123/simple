import request from '@/utils/request'


// 查询菜单详细
export function getMenu (menuId) {
  return request({
    url: '/system/menu/' + menuId,
    method: 'get'
  })
}

// 查询菜单下拉树结构
export function treeselect () {
  return request({
    url: '/system/menu/treeselect',
    method: 'get'
  })
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect (roleId) {
  return request({
    url: '/system/menu/roleMenuTreeselect/' + roleId,
    method: 'get'
  })
}

//模板列表数据
// export const getMenuList = params => request.get('/system/menu/' ,{params})
//获取菜单列表 list结构
export const getMenuList = body => request.post('/menu/list/', body)
//新增菜单
export const addMenuList = body => request.post('/menu/add', body)
//修改菜单
export const updateMenuList = body => request.post('/menu/update', body)
//删除菜单
export const delMenuList = body => request.post('/menu/delete', body)

