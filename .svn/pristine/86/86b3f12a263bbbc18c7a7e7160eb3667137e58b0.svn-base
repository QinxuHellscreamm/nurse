<template>
  <div>
    <div class="out-top">
      <input type="search" placeholder="搜索生命体征" class="out-input marr20" v-model="value"  />
      <el-button type='primary' @click="pageAjax()">搜索</el-button>
      <addvital ref='child' :allList='allList'></addvital>
    </div>
    <div class="out-main">
      <el-table :data='vsdics'>
        <el-table-column prop="NAME" label="生命体征" min-width="50"></el-table-column>
        <el-table-column prop="UNIT" label="单位" min-width="20"></el-table-column>
        <el-table-column prop="INPUT_TYPE_NAME" label="输入类型" min-width="20"></el-table-column>
        <el-table-column prop="OPTION_LIST_SHOW" label="选择项内容" min-width="70"></el-table-column>
        <el-table-column prop="CODE" label="编号" min-width="40"></el-table-column>
        <el-table-column prop="" label="操作" min-width="20">
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
          :page-size="page_size"
          layout="total, prev, pager, next, jumper"
          :total="vsCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>

  import addvital from "./addvital.vue"
  export default{

    data(){
      return {
        vSearch : "",
        currentPage1 : 1,
        vsCount : 0,
        vsdics : [],
        options : [],
        value : "",
        page_size : 20,
        allList : []
      }
    },

    components:{ addvital },

    methods: {
      pageAjax(){
        this.getSer("datacenter/vs",{
          'vs_name' : this.value,
          'page' : this.currentPage1,
          'page_size' : this.page_size
        }, res =>{
          if(res.status <= 400){
            console.log(res);
            this.vsdics = res.data.items
            this.vsCount = parseInt(res.data.meta.totalCount)
          }
        })
      },
      allData(){
        this.getSer("datacenter/vs",{
          'page' : 1,
          'page_size' : 1000
        }, res =>{
          if(res.status <= 400){
            console.log(res);
            this.allList.push({NAME:'无',ID:0})
            res.data.items.forEach(item=>{
              item.PARENT_ID == 0 ? this.allList.push(item) : null
            })
          }
        })
      },
      handleCurrentChange(num) {       //当前页变化的时候
        console.log(num);
        this.currentPage1 = num
        this.pageAjax()
      },
      edit(item){
        this.$refs.child.getData(JSON.parse(JSON.stringify(item)))
      }
    },

    mounted(){
      this.$nextTick(() => {
        this.allData()
        this.pageAjax()//进入页面默认请求第一页
      })
    }
  }
</script>
<style scoped lang="stylus">
  .el-button--primary
    padding 12px 32px
</style>


