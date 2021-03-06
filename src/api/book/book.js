import request from '@/utils/request'

export default {
  // 讲师列表
  getListBook(bookQuery) {
    return request({
      url: `/library/book/pageBook`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      method: 'post',
      data: bookQuery// 把对象转换成json
    })
  },
  // 删除讲师
  deleteBook(id) {
    return request({
      url: `/library/book/delBook`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      params: { id },
      method: 'delete'
    })
  },
  // 添加讲师
  addBook(book) {
    return request({
      url: `/library/book/addBook`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      method: 'post',
      data: book
    })
  },
  // 根据id查询
  getBookInfo(id) {
    return request({
      url: `/library/book/bookInfo`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      params: { id },
      method: 'get'

    })
  },
  // 修改讲师的方法
  updateBook(book) {
    return request({
      url: `/library/book/bookInfo`,
      // url: '/eduservice/edu-teacher/pageTeacherCondition/'+current+"/"+limit,
      method: 'put',
      data: book
    })
  }
}
