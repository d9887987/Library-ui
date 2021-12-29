import request from '@/utils/request'

export default {
  // 讲师列表
  getListCate(page, size, cateQuery) {
    return request({
      url: `/library/category/pageCate`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      method: 'post',
      params: { page, size },
      data: cateQuery// 把对象转换成json
    })
  },
  // 删除讲师
  deleteCate(id) {
    return request({
      url: `/library/category/delCate`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      params: { id },
      method: 'delete'
    })
  },
  // 添加讲师
  addCate(cate) {
    return request({
      url: `/library/category/addCate`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      method: 'post',
      data: cate
    })
  },
  // 修改讲师的方法
  updateCate(cate) {
    return request({
      url: `/library/category/cateInfo`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      method: 'put',
      data: cate
    })
  }
}
