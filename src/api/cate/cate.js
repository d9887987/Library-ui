import request from '@/utils/request'

export default {
  // 讲师列表
  getListCate(cateQuery) {
    return request({
      url: `/library/category/pageCate`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      method: 'post',
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
  },
  // 获取分类信息详情
  getCateInfo(id) {
    return request({
      url: `/library/category/cateInfo`,
      method: 'get',
      params: { id }
    })
  }
}
