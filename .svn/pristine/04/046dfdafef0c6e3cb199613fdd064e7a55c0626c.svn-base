<template>
    <div>
      <tempEcharts  :type='type' :legend="legend" :yAxisLabel="yAxisLabel"></tempEcharts>
      <div class="inMin" >
        <div class="inTable">
          <ul>
            <li style="margin-right: 1%">
              <p>护理投诉</p>
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="日期"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址">
                </el-table-column>
              </el-table>
            </li>
            <li>
              <p>护理不良事件</p>
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="日期"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址">
                </el-table-column>
              </el-table>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
  import tempEcharts from './tempEcharts'
    export default{

        data(){
            return {
              type:"EVENT_GRADE",
              legend:true,
              people:"",
              yAxisLabel:"例",
              tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市弄'
              }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普'
              }]
            }
        },

      components : { tempEcharts},
    }
</script>
<style scoped  lang="stylus">
  .inMin
    background #fff
    padding 10px 20px 50px
    min-height 100px
    .inTable
      border-top 1px dashed #D8E3E7
      padding-top 30px
      min-height 100px
      ul li
        display inline-block
        width 49%
        p
          font-size 16px
          color #2B3A50
          font-weight 700
          padding-bottom 10px
        .el-table >>> td
            padding 6px 0
        .el-table >>> th
          padding 6px 0
          background #F9F9FB


</style>
