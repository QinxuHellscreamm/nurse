<template>
  <div>
    <div class="out-top">
      <input type="search" placeholder="搜索标题" class="out-input marr20"  v-model='va'/>
      <el-button type='primary' @click="pageAjax()">搜索</el-button>
      <el-button type="success" @click="showSub">新增</el-button>
      <addAssessSub :opationType.sync="opationType" :CATEGORY="CATEGORY" ref='child'></addAssessSub>
    </div>

    <div class="out-main">
      <el-table :data="LIST" style="width: 100%">
        <el-table-column  prop='ID' label="ID" min-width="80"></el-table-column>
        <el-table-column prop="SUBJECT" label="标题" min-width="200"></el-table-column>
        <el-table-column prop="TYPE_STR" label="输入类型" min-width="100"></el-table-column>
        <el-table-column prop="INPUT_TYPE_STR" label="输入方式" min-width="100"></el-table-column>
        <!--
        <el-table-column label="输入类型" min-width="100">
          <template slot-scope="{row}"><div>{{row.IPNT_TYPE | Sub_IPNT_TYPE}}</div></template>
        </el-table-column>

        <el-table-column label="输入方式" min-width="100">
          <template slot-scope="{row}"><div>{{row.IPNT_TYPE | Sub_TYPE}}</div></template>
        </el-table-column>
        -->
        <el-table-column label="添加时间" width="180">
          <template slot-scope="{row}">
            <span>{{ row.UPDATED_AT | stampTotime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="OPERATOR" label="操作人" width="100"></el-table-column>
        <el-table-column prop="FATHER_NAME" label="操作" width="320">
          <template slot-scope="{row}">
            <el-button  type="text" size="small" @click='edit(row.ID)'>编辑</el-button>
            <el-button  type="text" size="small" @click='del(row.ID)'>删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="block" style="margin:20px 0;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-size="20"
          layout="total, prev, pager, next, jumper"
          :total="adicsCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import addAssessSub from './addAssessSub'
  export default {
    data(){
      return {
        currentPage1 : 1,
        pageSize : 20,
        adicsCount : 0,
        LIST : [],   //列表
        va : "",
        opationType : '',
      }
    },
    props : ['CATEGORY'],
    methods:{
      pageAjax(){
        this.getSer("datacenter/question" , {
          'SUBJECT' : this.va,
          'CATEGORY' : this.CATEGORY,
          'page' : this.currentPage1,
          'page_size' : this.pageSize
        },res=>{
          console.log(res)
          if(res.status <= 400){
            this.LIST = res.data.items;
            this.adicsCount = parseInt(res.data.meta.totalCount);
            console.log(this.adicsCount)
          }
        })
      },
      handleCurrentChange(val) {       //当前页变化的时候
        this.currentPage1 = val
        this.pageAjax();
      },
      showSub() {
        this.$refs.child.chang()
        this.$refs.child.showtext = '新增'
        this.opationType = 1
      },
      edit(id){
        this.opationType = 2
        this.$refs.child.edit(id)
        this.$refs.child.showtext = '编辑'
      },
      del(id){
        this.$confirm('是否删除该题目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this._delete('datacenter/question/' + id , {id : id} ,res => {
            console.log(res)
            if(res.status == 204){
              console.log(this.currentPage1)
              this.handleCurrentChange(this.currentPage1)
              this.$message({type: 'success', message: '删除成功!'})
            }
          })
        }).catch(()=>{

        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.pageAjax()
      })
    },
    components:{ addAssessSub }
  }
</script>

<style scoped lang="stylus">
  .el-button
    padding 12px 12px
  &.el-button--success
    float right
    margin-right 0
    background-color #11c462
    &:hover
      background-color #14d462

</style>
