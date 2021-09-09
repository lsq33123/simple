
/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'   // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const customRoutes = [

  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: '/test1',
        component: (resolve) => require(['@/views/test/index'], resolve),
        name: 'Test1',
        meta: { title: '测试页面', icon: 'user' }
      }
    ]
  },
  {
    path: '/orderMgr',
    component: Layout,
    meta: { title: '订单管理',  icon: 'list'},
    children: [
      {
        path: '/orderMgr/orderList',
        component: (resolve) => require(['@/views/orderMgr/order/list'], resolve),
        name: 'OrderList',
        meta: { title: '订单列表', icon: 'build' }
      },
      {
        path: '/orderMgr/addOrderList',
        component: (resolve) => require(['@/views/orderMgr/order/add'], resolve),
        name: 'addOrderList',
        meta: { title: '创建订单', icon: 'build' }
      },
      {
        path: '/orderMgr/orderDet',
        component: (resolve) => require(['@/views/orderMgr/order/det'], resolve),
        name: 'OrderDet',
        meta: { title: '订单详情', icon: 'build' }
      },
      {
        path: '/orderMgr/sendList',
        component: (resolve) => require(['@/views/orderMgr/send/list'], resolve),
        name: 'SendList',
        meta: { title: '发货管理', icon: 'guide' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    meta: { title: '系统管理',  icon: 'system'},
    children: [
      {
        path: '/system/menuList',
        component: (resolve) => require(['@/views/system/menu'], resolve),
        name: 'MenuList',
        meta: { title: '菜单列表', icon: 'tree-table' }
      },
      {
        path: '/system/userList',
        component: (resolve) => require(['@/views/system/user'], resolve),
        name: 'UserList',
        meta: { title: '用户列表', icon: 'user' }
      },
    ]
  },
]

