<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="adminQuery.name" placeholder="姓名"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="adminQuery.account" placeholder="账户"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="adminQuery.telephone" placeholder="电话"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
    >

      <el-table-column
        label="序号"
        width="90"
        align="center"
      >
        <template slot-scope="scope">
          {{ (adminQuery.page_num - 1) * adminQuery.page_size + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="姓名" width="200"/>

      <el-table-column prop="account" label="账户"/>

      <el-table-column prop="created_at" label="添加时间" width="240"/>

      <el-table-column prop="telephone" label="电话" width="200"/>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/admin/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="adminQuery.page_num"
      :page-size="adminQuery.page_size"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
    <!--@current-change="getList"表示每次在分页查找时，都调用getlist方法
-->

  </div>
</template>

<script>
import admin from '@/api/admin/admin'

export default {
  data() {
    return {
      list: null,
      total: 0, // 总记录数
      adminQuery: {
        name: '',
        account: '',
        telephone: '',
        page_size: 6,
        page_num: 1
      }, // 用于条件封装的对象
      id: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page_num = 1) { // 页码参数
      /* 每次在做分页后也要调用getlist方法*/
      this.page_num = page_num
      this.adminQuery.page_num = page_num
      // 做到分页的切换，要不然默认查询第一页数组，因为每次查询第几页页数不一样
      admin.getListAdmin(this.adminQuery)
        .then(response => {
          /* console.log(response)*/
          this.list = response.data.list
          this.total = response.data.count
          this.id = response.data.id
          console.log(this.list, this.total)
        })
        .catch(error => {
          console.log(error)
        })
    },
    resetData() { // 清空的方法
      // 表单输入项数据清空
      this.adminQuery = {}// 双向绑定
      // 查询所有讲师数据
      this.getList()
    },
    // 删除讲师的方法
    removeDataById(id) {
      this.$confirm('此操作将永久删除讲师记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        admin.deleteAdmin(id)
          .then(response => { // 删除成功，用户提示，提示信息，并重新查询结果
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()// 重新进行查询
          })
      })
    }
  }
}
</script>
