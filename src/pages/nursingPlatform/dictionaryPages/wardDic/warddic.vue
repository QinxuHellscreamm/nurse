<template>
  <div>
    <div class="out-top">
      <input type="search" placeholder="搜索病区" class="out-input marr20" v-model="va" />
      <el-button type='primary' @click="pageAjax(va,1)">搜索</el-button>
    </div>
    <div class="out-main">
      <el-table :data="wardics" style="width: 100%">
        <el-table-column prop="ID" fixed label="ID" min-width="60"></el-table-column>
        <el-table-column prop="NAME" fixed label="病区名称" min-width="100"></el-table-column>
        <el-table-column prop="DEPARTMENT_NAMES" label="包含科室" min-width="400"></el-table-column>
      </el-table>
      <div class="block" style="margin:20px 0;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-size="page_size"
          layout="total, prev, pager, next, jumper"
          :total="adicsCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        va:"",
        wardics:[],
        currentPage1:1,
        adicsCount:0,
        page_size : 50
      }
    },
    mounted(){
      this.$nextTick(()=> {
        this.pageAjax('',1);      //进入页面默认请求第一页
    })
    },
    methods:{
      pageAjax(va,page){
        this.getSer("datacenter/ward",{
          'ward_name' : va,
          'page' : page,
          'page_size' : this.page_size
        }, res =>{
          if(res.status <= 400){
            this.wardics = res.data.items;
            this.adicsCount = parseInt(res.data.meta.totalCount);
          }
        })
      },
      handleCurrentChange(val) {       //当前页变化的时候
        this.pageAjax(this.va,val);
      }
    }
  }
</script>
<style scoped lang='stylus'>
  .el-button
    padding 12px 32px
</style>
