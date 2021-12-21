<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="user.user_name" controls-position="right" min="0"/>
      </el-form-item>

      <el-form-item label="学号">
        <el-input-number v-model="user.student_card" controls-position="right" min="0"/>
      </el-form-item>

      <el-form-item label="电话号码">
        <el-select v-model="user.telephone" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>

      <el-form-item label="年级">
        <el-input v-model="user.garde"/>
      </el-form-item>
      <el-form-item label="年级">
        <el-input v-model="user.garde"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import user from '@/api/user/user'

export default {
  data() {
    return {
      user: {
        id: 0,
        user_name: '', // 姓名
        student_card: '', // 学号
        telephone: '', // 电话号码
        garde: '', // 年级
        address: '',
        professional: '',
        college: '',
        gender: '',
        email: ''
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
      this.user.avatar = data.url
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
        this.user = {}
      }
    },
    // 根据讲师id查询方法
    getInfo(id) {
      user.getUserInfo(id)
        .then(response => {
          this.user = response.data.user
        })
    },
    // 保存或者修改
    saveOrUpdate() {
      // 判断是修改还是添加
      if (!this.user.id) {
        this.saveUser()// 调用保存的方法
      } else {
        this.updateUser()// 调用修改方法
      }
    },
    // 修改用户的方法
    updateUser() {
      user.updateUser(this.user)
        .then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 返回列表
          this.$router.push({path: '/user/table'})
        })
    },
    // 添加讲师的方法
    saveUser() {
      user.addUser(this.user)
        .then(response => { // 添加成功
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          // 返回列表
          this.$router.push({path: '/user/table'})// 路由跳转，地层为重定向
        })
    }
  }
}
</script>

<style scoped>

</style>
