<template>
    <div>
      <div class="out-top">
        <el-input type='serch' v-model='value' placeholder='输入别名'></el-input>
        <el-button type='primary' @click='pageAjax'>搜索</el-button>
      </div>
      <div class="out-main">

        <el-table :data='vsdics'>
          <el-table-column prop="ITEM_NAME" label="字段名" min-width="60"></el-table-column>
          <el-table-column prop="ITEM_ALIAS" label="别名" min-width="60"></el-table-column>
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
             :current-page="currentPage"
             :page-size="page_size"
             layout="total, prev, pager, next, jumper"
             :total="vsCount">
          </el-pagination>
        </div>

      </div>
        <editPatientinfo ref='child'></editPatientinfo>
    </div>
</template>
<script>
    import editPatientinfo from "./editPatientinfo.vue"
    export default{

      data(){
        return {
          currentPage : 1,
          vsCount : 0,
          vsdics : [],
          value : "",
          page_size : 1000,
        }
      },

      components:{ editPatientinfo },

      methods: {
        pageAjax(){
          this.getSer("datacenter/patientinfodic",{
            'page' : this.currentPage,
            'page_size' : this.page_size
          }, res =>{
            if(res.status <= 400){
              if(this.value != ''){
                let arr = []
                res.data.items.forEach(item=>{
                  item.ITEM_ALIAS.indexOf(this.value) == -1 ? null : arr.push(item)
                })
                this.vsdics = arr
                this.vsCount = arr.length
              }else {
                this.vsdics = res.data.items
                this.vsCount = parseInt(res.data.meta.totalCount)
              }
            }
          })
        },
        handleCurrentChange(num) {
          this.currentPage = num
          this.pageAjax()
        },
        edit(item){
          this.$refs.child.getData(item)
        }
      },

      mounted(){
        this.$nextTick(()=> {
          this.pageAjax()
        })
      }
    }
</script>

<style scoped lang='stylus'>
  .out-top
    .el-input
      width 310px
    .el-button
      boder none
      padding 12px 32px
      margin-left 10px

</style>

