import request from '@/utils/request'

export default {
  // 讲师列表
  getListUser(page, size, userQuery) {
    return request({
      url: `/library/user/pageUser`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      method: 'post',
      params: { page, size },
      data: userQuery// 把对象转换成json
    })
  },
  // 删除讲师
  deleteUser(id) {
    return request({
      url: `/library/user/delUser`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      params: { id },
      method: 'delete'
    })
  },
  // 添加讲师
  addUser(user) {
    return request({
      url: `/library/user/addUser`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      method: 'post',
      data: user
    })
  },
  // 根据id查询
  getUserInfo(id) {
    return request({
      url: `/library/user/userInfo`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      params: { id },
      method: 'get'

    })
  },
  // 修改讲师的方法
  updateUser(user) {
    return request({
      url: `/library/user/userInfo`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      method: 'put',
      data: user
    })
  }
}
