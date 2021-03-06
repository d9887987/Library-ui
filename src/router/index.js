import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Library', icon: 'dashboard' }
    }]
  },

  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/table',
    name: '管理员',
    meta: { title: '管理员', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: '管理员列表',
        component: () => import('@/views/library/admin/index'),
        meta: { title: '管理员列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '管理员添加',
        component: () => import('@/views/library/admin/save'),
        meta: { title: '管理员添加', icon: 'form' }
      },
      {
        path: 'edit/:id',
        name: '管理员编辑',
        component: () => import('@/views/library/admin/save'),
        meta: { title: '管理员编辑', icon: 'form' },
        hidden: true
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/table',
    name: '用户',
    meta: { title: '用户', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: '用户列表',
        component: () => import('@/views/library/user/index'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '用户添加',
        component: () => import('@/views/library/user/save'),
        meta: { title: '用户添加', icon: 'form' }
      },
      {
        path: 'edit/:id',
        name: '用户编辑',
        component: () => import('@/views/library/user/save'),
        meta: { title: '用户编辑', icon: 'form' },
        hidden: true
      }
    ]
  },
  {
    path: '/book',
    component: Layout,
    redirect: '/book/table',
    name: '书籍',
    meta: { title: '书籍', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: '书籍列表',
        component: () => import('@/views/library/book/index'),
        meta: { title: '书籍列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '书籍添加',
        component: () => import('@/views/library/book/save'),
        meta: { title: '书籍添加', icon: 'form' }
      },
      {
        path: 'edit/:id',
        name: '书籍编辑',
        component: () => import('@/views/library/book/save'),
        meta: { title: '书籍编辑', icon: 'form' },
        hidden: true
      }
    ]
  },
  {
    path: '/record',
    component: Layout,
    redirect: '/record/table',
    name: '借阅',
    meta: { title: '借阅', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: '记录列表',
        component: () => import('@/views/library/record/index'),
        meta: { title: '记录列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '记录添加',
        component: () => import('@/views/library/record/save'),
        meta: { title: '记录添加', icon: 'form' }
      },
      {
        path: 'edit/:id',
        name: '记录编辑',
        component: () => import('@/views/library/record/save'),
        meta: { title: '记录编辑', icon: 'form' },
        hidden: true
      }
    ]
  },
  {
    path: '/cate',
    component: Layout,
    redirect: '/cate/table',
    name: '分类',
    meta: { title: '分类', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: '分类列表',
        component: () => import('@/views/library/cate/index'),
        meta: { title: '分类列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '分类添加',
        component: () => import('@/views/library/cate/save'),
        meta: { title: '分类添加', icon: 'form' }
      },
      {
        path: 'edit/:id',
        name: '分类编辑',
        component: () => import('@/views/library/cate/save'),
        meta: { title: '分类编辑', icon: 'form' },
        hidden: true
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
