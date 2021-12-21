<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="book.name"/>
      </el-form-item>

      <el-form-item label="讲师排序">
        <el-input-number v-model="book.sort" controls-position="right" min="0"/>
      </el-form-item>

      <el-form-item label="讲师头衔">
        <el-select v-model="book.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>

      <el-form-item label="讲师资历">
        <el-input v-model="book.career"/>
      </el-form-item>

      <el-form-item label="讲师简介">
        <el-input v-model="book.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <el-form-item label="讲师头像">

        <!-- 头衔缩略图 -->
        <pan-thumb :image="book.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
        </el-button>

        <!--
  v-show：是否显示上传组件
  :key：类似于id，如果一个页面多个图片上传控件，可以做区分
  :url：后台上传的url地址
  @close：关闭上传组件
  @crop-upload-success：上传成功后的回调
    <input type="file" name="file"/>
  -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/fileoss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import book from '@/api/book/book'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      book: {
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: '',
        avatar: ''
      },
      imagecropperShow: false,
      imagecropperKey: 0, // 上传组件的key值
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
          this.book = response.data.book
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
      book.updateBook(this.user)
        .then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 返回列表
          this.$router.push({ path: '/user/table' })
        })
    },
    // 添加讲师的方法
    saveBook() {
      book.addBook(this.user)
        .then(response => { // 添加成功
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          // 返回列表
          this.$router.push({ path: '/user/table' })// 路由跳转，地层为重定向
        })
    }
  }
}
</script>

<style scoped>

</style>
