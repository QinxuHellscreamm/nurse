<template>
  <div>
    <div>
      <input type="search" placeholder="登录账号" class="out-input" v-model="username" >
      <button class="btn-small" @click="search()">搜索</button>
      <button class="btn-small color-red" style="float:right" @click="clearLog">清除日志</button>
    </div>
    <div class="out-main">
      <el-table
        :data="logmobData"
        style="width: 100%"
        height="574">
        <el-table-column
          prop="JOB_NUMBER"
          fixed
          label="登录账号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="NAME"
          label="用户姓名"
          width="320">
        </el-table-column>
        <el-table-column
          prop="IP"
          label="登录IP"
          width="340">
        </el-table-column>
        <el-table-column
          prop="CREATE_AT"
          label="登录时间"
          width="350">
        </el-table-column>
        <el-table-column
          prop="STATUS_DES"
          label="登录状态"
          width="320"
        >
        </el-table-column>
      </el-table>
      <div class="block" style="margin:4px 0;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="page_size"
          layout="total, prev, pager, next, jumper"
          :total="logmaCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        username:"",
        logmaCount:0,
        currentPage:1,
        page_size:20,
        logmobData:[]
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.getList("2")
      })
    },
    methods:{
      getList(type){
        this.getSer("datacenter/operationlog",{"PLATFORM_TYPE":type,"JOB_NUMBER":this.trim(this.username),"page":this.currentPage,"page_size":this.page_size},res =>{
          if(res.data)
          {
            this.logmaCount=parseInt(res.data.meta.totalCount);
            this.logmobData=res.data.items;
            console.log('res is ')
            console.log(res)
          }

        })
      },
      search(){
        this.currentPage = 1
        this.getList("2")
      },
      handleCurrentChange(val) {       //当前页变化的时候
        this.currentPage = val
        this.getList("2")
      },
      clearLog(){
      console.log('clearLog');
          this._delete("datacenter/operationlog/deleteall",{"PLATFORM_TYPE":"2"},res =>{
            if(res.status == 204){
                this.logmobData=[];
                this.$message({
                                type: 'success',
                                message: '清除成功!',
                              });
            }
            else
            {
                this.$message({
                                type: 'error',
                                message: '清除失败!',
                              });
            }

        })
      }
    }
  }
</script>
