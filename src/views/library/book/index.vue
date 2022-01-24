<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="bookQuery.user_name" placeholder="书名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="bookQuery.user_name" placeholder="编码" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="bookQuery.user_name" placeholder="分类" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="bookQuery.user_name" placeholder="作者" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item></el-form>

    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
    >

      <el-table-column
        label="序号"
        align="center"
      >
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="书名" width="210" />
      <el-table-column prop="name" label="作者" width="190" />
      <el-table-column prop="name" label="版本" width="190" />
      <el-table-column prop="name" label="出版社" width="210" />
      <el-table-column prop="name" label="总数" width="100" />
      <el-table-column prop="name" label="剩余" width="100" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
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
import book from '@/api/book/book'

export default {
  data() {
    return {
      list: null,
      page: 1, // 当前页
      limit: 6, // 每页显示数据
      total: 0, // 总记录数
      bookQuery: {
        another: '',
        book_name: '',
        category_name: '',
        page_size: 6,
        page_num: 1
      }// 用于条件封装的对象
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page = 1) { // 页码参数
      /* 每次在做分页后也要调用getlist方法*/
      this.page = page
      // 做到分页的切换，要不然默认查询第一页数组，因为每次查询第几页页数不一样
      book.getListBook(this.page, this.limit, this.userQuery)
        .then(response => {
          /* console.log(response)*/
          this.id = response.data.id
          this.list = response.data.rows
          this.total = response.data.total
          console.log(this.list, this.total)
        })
        .catch(error => {
          console.log(error)
        })
    },
    resetData() { // 清空的方法
      // 表单输入项数据清空
      this.bookQuery = {}// 双向绑定
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
        book.deleteBook(id)
          .then(reponse => { // 删除成功，用户提示，提示信息，并重新查询结果
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
