<template>
  <div>
    <div class='serch-box'>
      <el-input type="search" placeholder="搜索护士工号或姓名" v-model="va"  />
      <el-button type='primary' @click="pageAjax">搜索</el-button>
    </div>
    <div class="out-main">
      <el-table :data="nurses" style="width: 100%">
        <el-table-column fixed prop="JOB_NUMBER" label="工号" min-width="100"></el-table-column>
        <el-table-column prop="NAME" label="姓名" min-width="100"></el-table-column>
        <el-table-column prop="WARD_NAMES" label="病区" ></el-table-column>
        <el-table-column prop="TELPHONE" label="移动电话" min-width="100"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="editItem(scope.row.ID)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin:20px 0;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="page_size"
          layout="total, prev, pager, next, jumper"
          :total="nurCount">
        </el-pagination>
      </div>
    </div>
    <add ref='add' :restaurants='restaurants'></add>
  </div>

</template>
<script>
  import add from './editNurse'
  export default{
    data(){
      return {
        va:"",
        currentPage: 1,
        nurses: [],
        nurCount: 0,
        page_size:20,
        restaurants : [],
      }
    },
    components : { add },
    mounted(){
      this.$nextTick(() => {
        this.pageAjax()
        this.getSer("datacenter/ward", {'page': 1, 'page_size': 1000}, (res) =>{
          console.log("病区列表",res); //病区列表
          if( res.status <= 400 ){
            res.data.items.forEach((item , i) => {
              this.restaurants.push({'value' : item.NAME , "ID" : item.ID})
            })
          }
        })
    })
    },
    methods: {
      pageAjax(){
        this.getSer("datacenter/nurse",{
          'nurse_name' : this.va,
          'page' : this.currentPage,
          'page_size' : this.page_size
        }, res =>{
          if(res.status <= 400){
            this.nurses = res.data.items;
            this.nurCount = parseInt(res.data.meta.totalCount)
          }
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.pageAjax()
      },
      editItem(id){
          this.$refs.add.setData(id)
          this.$refs.add.title = '编辑'
          this.$refs.add.dialogFormVisible = true
        },
    }
  }
</script>
<style scoped lang='stylus'>
  .serch-box
    margin 10px 0 20px
    .el-input
      width 310px
    .el-button
      padding 12px 32px
      margin-left 10px
</style>
