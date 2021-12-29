<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="管理员名称" width="200px">
        <el-col :span="11">
          <el-input v-model="admin.name" placeholder="请输入名称" />
        </el-col>
      </el-form-item>

      <el-form-item label="管理员电话" width="200px">
        <el-col :span="11">
          <el-input v-model="admin.name" placeholder="请输入名称" />
        </el-col>
      </el-form-item>
      <el-form-item label="管理员账户" width="200px">
        <el-col :span="11">
          <el-input v-model="admin.name" placeholder="请输入账户" />
        </el-col>
      </el-form-item>
      <el-form-item label="管理员密码" width="200px">
        <el-col :span="11">
          <el-input v-model="admin.name" placeholder="请输入名称" />
        </el-col>
      </el-form-item>
      <el-form-item label="创建时间" width="200px">
        <el-col :span="11">
          <el-input v-model="admin.name" placeholder="可不填" />
        </el-col>
      </el-form-item>
      <el-form-item label="更新时间" width="200px">
        <el-col :span="11">
          <el-input v-model="admin.name" placeholder="可不填" />
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

import admin from '@/api/admin/admin'

export default {
  data() {
    return {
      admin: {
        name: '',
        account: 0,
        password: '',
        telephone: ''
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
      this.admin.avatar = data.url
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
        this.admin = {}
      }
    },
    // 根据讲师id查询方法
    getInfo(id) {
      admin.getAdminInfo(id)
        .then(response => {
          this.admin = response.data.admin
        })
    },
    // 保存或者修改
    saveOrUpdate() {
      // 判断是修改还是添加
      if (!this.admin.id) {
        this.saveAdmin()// 调用保存的方法
      } else {
        this.updateAdmin()// 调用修改方法
      }
    },
    // 修改用户的方法
    updateAdmin() {
      admin.updateAdmin(this.admin)
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
    saveAdmin() {
      admin.addAdmin(this.admin)
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
