<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="书籍名称" width="200px">
        <el-col :span="11">
          <el-input v-model="bookInfo.book.book_name" placeholder="请输入内容" />
        </el-col>
      </el-form-item>
      <el-form-item label="书籍编码" width="200px">
        <el-col :span="11">
          <el-input v-model="bookInfo.book.book_code" placeholder="请输入内容" />
        </el-col>
      </el-form-item>
      <el-form-item label="书籍作者">
        <el-col :span="11">
          <el-input v-model="bookInfo.book.another" placeholder="请输入内容" />
        </el-col>
      </el-form-item>
      <el-form-item label="书籍版本">
        <el-col :span="11">
          <el-input v-model="bookInfo.book.version" placeholder="请输入内容" />
        </el-col>
      </el-form-item>

      <el-form-item label="书籍出版社">
        <el-col :span="11">
          <el-input v-model="bookInfo.book.publish_house" placeholder="请输入内容" />
        </el-col>
      </el-form-item>

      <el-form-item label="书籍分类">
        <el-col :span="11">
          <el-input v-model="bookInfo.cate.cate_name" placeholder="请输入内容" />
        </el-col>
      </el-form-item>

      <el-form-item label="书籍总数">
        <el-col :span="11">
          <el-input v-model="bookInfo.book.total" placeholder="请输入内容" />
        </el-col>
      </el-form-item>

      <el-form-item label="书籍剩余">
        <el-col :span="11">
          <el-input v-model="bookInfo.book.remain" placeholder="请输入内容" />
        </el-col>
      </el-form-item>
      <el-form-item label="位置">
        <el-col :span="11">
          <el-input v-model="bookInfo.cate.location" placeholder="请输入内容" />
        </el-col>
      </el-form-item>
      <el-form-item label="分类编码">
        <el-col :span="11">
          <el-input v-model="bookInfo.cate.cate_code" placeholder="请输入内容" />
        </el-col>
      </el-form-item>
      <el-form-item label="创建时间" width="200px">
        <el-col :span="11">
          <el-input v-model="bookInfo.book.created_at" placeholder="可不填" />
        </el-col>
      </el-form-item>
      <el-form-item label="更新时间" width="200px">
        <el-col :span="11">
          <el-input v-model="bookInfo.book.updated_at" placeholder="可不填" />
        </el-col>
      </el-form-item>

      <!--
  v-show：是否显示上传组件
  :key：类似于id，如果一个页面多个图片上传控件，可以做区分
  :url：后台上传的url地址
  @close：关闭上传组件
  @crop-upload-success：上传成功后的回调
    <input type="file" name="file"/>
  -->
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import book from '@/api/book/book'

export default {
  data() {
    return {
      bookInfo: {
        book: {
          id: '',
          book_name: '',
          another: '',
          version: '',
          publish_house: '',
          category_id: '',
          total: 0,
          remain: 0,
          book_code: '',
          category_name: '',
          created_at: '',
          updated_at: ''
        },
        cate: {
          id: 0,
          created_at: '',
          updated_at: '',
          cate_code: '',
          location: '',
          cate_name: ''
        }
      },
      BASE_API: process.env.BASE_API, // 获取dev.env.js里面端口号
      saveBtnDisabled: false// 避免多次提交表单
    }
  },
  watch: {
    $route(to, from) {
      this.init()
    }
  },
  created() {
    // 判断路径中是否由id值
    this.init()
  },
  methods: {
    close() { // 关闭上传弹框的方法
      this.imagecropperShow = false
      // 上传组件初始化
      this.imagecropperKey = this.imagecropperKey + 1
    },
    // 上传成功方法
    cropSuccess(data) {
      this.imagecropperShow = false
      // 上传之后接口返回图片地址
      this.book.avatar = data.url
      this.imagecropperKey = this.imagecropperKey + 1
    },

    // 清空代码抽取
    init() {
      if (this.$route.params && this.$route.params.id) {
        // 获取路径中的id值
        const id = this.$route.params.id
        // 调用数据会显得方法
        this.getInfo(id)
      } else { // 没有id值调用清空表单操作
        this.book = {}
      }
    },
    // 根据讲师id查询方法
    getInfo(id) {
      book.getBookInfo(id)
        .then(response => {
          this.bookInfo.book = response.data.book
          this.bookInfo.cate = response.data.cate
        })
    },
    // 保存或者修改
    saveOrUpdate() {
      // 判断是修改还是添加
      if (!this.book.id) {
        this.saveBook()// 调用保存的方法
      } else {
        this.updateBook()// 调用修改方法
      }
    },
    // 修改用户的方法
    updateBook() {
      book.updateBook(this.bookInfo)
        .then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 返回列表
          this.$router.push({ path: '/book/table' })
        })
    },
    // 添加讲师的方法
    saveBook() {
      book.addBook(this.book)
        .then(response => { // 添加成功
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          // 返回列表
          this.$router.push({ path: '/book/table' })// 路由跳转，地层为重定向
        })
    }
  }
}
</script>

<style scoped>

</style>
