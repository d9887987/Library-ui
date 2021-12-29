import request from '@/utils/request'

export default {
  // 讲师列表
  getListRecord(page, size, recordQuery) {
    return request({
      url: `/library/book/pageRecord`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      method: 'post',
      params: { page, size },
      data: recordQuery// 把对象转换成json
    })
  },
  // 删除讲师
  deleteRecord(id) {
    return request({
      url: `/library/book/delRecord`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      params: { id },
      method: 'delete'
    })
  },
  // 添加讲师
  addRecord(record) {
    return request({
      url: `/library/book/addBook`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      method: 'post',
      data: record
    })
  },
  // 根据id查询
  getRecordInfo(id) {
    return request({
      url: `/library/book/recordInfo`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      params: { id },
      method: 'get'

    })
  },
  // 修改讲师的方法
  updateRecord(record) {
    return request({
      url: `/library/book/recordInfo`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      method: 'put',
      data: record
    })
  }
}
