<template>
  <div>
    <div class="out-top">
      <el-input type="search" placeholder="搜索疾病"  v-model="value"></el-input>
      <el-button @click="pageAjax" type='primary'>搜索</el-button>
      <adddisease ref='child' :restaurants='restaurants'></adddisease>
    </div>
    <div class="out-main">
      <el-table :data='vsdics'>
        <el-table-column prop="ID" label="ID" width="100"></el-table-column>
        <el-table-column prop="ICD_CODE" label="ICD-10 编码" min-width="100"></el-table-column>
        <el-table-column prop="NAME" label="疾病名称" min-width="100"></el-table-column>
        <el-table-column prop="ENGLISH" label="英文名称" min-width="100"></el-table-column>
        <el-table-column prop="" label="操作" min-width="60">
          <template slot-scope="{row}">
            <span @click="edit(row)" class="ver-btn">编辑</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="block" style="margin:5px 0;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="vsCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>

  import adddisease from "./adddisease.vue"
  export default{
    data(){
      return {
        currentPage1 : 1,
        vsCount : 0,
        vsdics : [],
        restaurants : [],
        value : "",
        pageSize:20
      }
    },
    components:{ adddisease },
    methods: {
      pageAjax(){
        this.getSer("datacenter/disease",{
          'keyword' : this.value,
          'page' : this.currentPage1,
          'per-page' : this.pageSize,
        }, res =>{
          console.log(res);
          if(res.status <= 400){
          this.vsdics = res.data.items
          this.vsdics.forEach(item => {
            this.restaurants.push({'NAME' : item.NAME , "ID" : item.ID})
          })
          this.vsCount = parseInt(res.data.meta.totalCount)
        }
      })
      },
      handleCurrentChange(num) {
        this.currentPage1 = num
        this.pageAjax(this.value , num)
      },
      edit(item){
        this.$refs.child.getData(item)
      }
    },
    mounted(){
      this.$nextTick(() => {
        this.pageAjax()//进入页面默认请求第一页
      })
    }
  }
</script>
<style scoped lang="stylus">
  .el-input
    width 310px
  .el-button
    padding 12px 32px
  &.el-button--primary
    margin-left 10px
</style>


