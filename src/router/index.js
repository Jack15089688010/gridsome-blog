export const constantRouterMap = [
  {
    path: '/',
    meta: {
      type: "user",
      icon: 'el-icon-star-off',
      title: '最新动态'
    }
  },
  {
    path: '/social',
    meta: {
      type: "user",
      icon: 'el-icon-mobile-phone',
      title: '社交圈'
    },
    children: [
      {
        path: '',
        meta: { title: '社交圈' }
      },
      {
        path: 'details/:name',
        meta: { title: '用户资料' }
      }
    ]
  }
]