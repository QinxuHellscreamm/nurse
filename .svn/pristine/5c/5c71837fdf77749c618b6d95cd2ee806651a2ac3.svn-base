<template>
  <div>
    <div class='serch-box'>
      <el-input type="search" placeholder="搜索医生工号或姓名" class="" v-model="va"></el-input>
      <el-button type='primary' @click="pageAjax">搜索</el-button>
    </div>
    <div class="out-main">
      <el-table
        :data="doctors"
        style="width: 100%">
        <el-table-column fixed prop="JOB_NUMBER" label="工号" min-width="200"></el-table-column>
        <el-table-column prop="NAME" label="姓名" width="300"></el-table-column>
        <el-table-column prop="DEPARTMENT_NAMES" label="科室" width="700"></el-table-column>
        <el-table-column prop="TELPHONE" label="移动电话" width="300"></el-table-column>
      </el-table>
      <div class="block" style="margin:20px 0;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="page_size"
          layout="total, prev, pager, next, jumper"
          :total="dcCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        va: "",
        currentPage: 1,
        doctors: [],
        dcCount: 0,
        page_size:20
      }
    },
    mounted(){
      this.$nextTick(() => {
        this.pageAjax()      //进入页面默认请求第一页
      })
    },
    methods: {
      pageAjax(){
        this.getSer("datacenter/doctor",{
          doctor_name : this.va,
          page : this.currentPage,
          page_size : this.page_size
        }, res =>{
          if(res.status <= 400){
            this.doctors = res.data.items
            this.dcCount = parseInt(res.data.meta.totalCount)
          }
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.pageAjax()
      }
    }
  }
</script>
<style scoped lang='stylus'>
  .serch-box
    margin 10px 0 20px
  .el-input
    width 310px
  .el-button
    margin-left 10px
    padding 12px 32px

</style>
