<template>
    <div class='test-recode'>
      <div class='test'>
        <h1>检验报告</h1>
        <el-table border :data='test_list' @row-click='getDetile'>
          <el-table-column  label="检验名称" prop='PROJECT_NAME' min-width='160'></el-table-column>
          <el-table-column  label="报告时间" prop='REPORT_TIME' min-width='170'>
            <template slot-scope="{row}"><div>{{row.REPORT_TIME | stampTotime}}</div></template>
          </el-table-column>
          <el-table-column  label="报告人" prop='REPORTER'></el-table-column>
        </el-table>
      </div>
      <div class='detile'>
        <h1>报告详情</h1>
        <el-table border :data='detile_list'>
          <el-table-column  label="项目名称" prop='NAME'></el-table-column>
          <el-table-column  label="结果类型" prop='VALUE'></el-table-column>
          <el-table-column  label="异常标志" prop='TAG'>
            <template slot-scope="{row}"><div style="color: red;">{{row.TAG}}</div></template>
          </el-table-column>
          <el-table-column  label="参考范围" prop='RANGE'></el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
    export default {
        name: "testRecode",

        props:['INPATIENT_NUMBER'],

        data(){
          return{
            test_list:[],
            detile_list:[]
          }
        },

        methods:{
          getDetile(row){
            console.log(row);
            this.getSer('datacenter/testdata/getdata',{medical_id:row.ID},res=>{
              console.log(res);
              this.detile_list = res.data.items
            })
          }
        },

        mounted(){
          this.$nextTick(()=>{
            this.getSer('datacenter/medicaladvice/sourceindex',{check_inpatient_number:JSON.stringify([this.INPATIENT_NUMBER]),type:JSON.stringify([4])},res=>{
              console.log(res);
              this.test_list = res.data.items
            })
          })
        }

    }
</script>

<style scoped lang='stylus'>
  .test-recode
    display flex
    .test
      width 422px
      min-height 500px
      border-right 1px solid #D8E3E7
      h1
        text-indent 15px
    .detile
      flex 1
      margin 0 15px
      .el-table
        width 100%
    h1
     font-weight bold
     line-height 36px
    .el-table
      &>>>.el-table__header
        th
          border 1px solid #A5DDE9
          border-left none
          .cell
            line-height 30px
            color #2B3A50
            font-weight 500
            background-color #DDEFF9
      &>>>.el-table__body
        td
          padding 0
          .cell
            line-height 30px
</style>
