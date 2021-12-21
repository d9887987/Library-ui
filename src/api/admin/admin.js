import request from '@/utils/request'

export default {
  // 管理员列表（分页查询）
  getListAdmin(size, page, adminQuery) {
    return request({
      url: `/v1/library/admin/pageAdmin`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      method: 'post',
      params: { size, page },
      data: adminQuery// 把对象转换成json
    })
  },
  // 删除管理员
  deleteAdmin(id) {
    return request({
      url: `/v1/library/admin`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      params: { id },
      method: 'delete'
    })
  },
  // 添加管理员
  addAdmin(admin) {
    return request({
      url: `/v1/library/admin`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      method: 'post',
      data: admin
    })
  },
  // 根据id查询
  getAdminInfo(id) {
    return request({
      url: `/v1/library/admin`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      params: { id },
      method: 'get'

    })
  },
  // 修改管理员的方法
  updateAdmin(admin) {
    return request({
      url: `/v1/library/admin`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      method: 'put',
      data: admin
    })
  }
}
