<template>
  <div>
    <tempEcharts  :type='type' :yAxisLabel="yAxisLabel"></tempEcharts>
    <div class="orMin" >
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
    </div>
  </div>
</template>
<script>
  import tempEcharts from './tempEcharts'
  export default{

    data(){
      return {
        type:"EVENT_GRADE",
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
  .orMin
    background #fff
    padding 10px 20px 50px
    min-height 100px
    .el-table >>> td
      padding 6px 0
    .el-table >>> th
      padding 6px 0
      background #F9F9FB


</style>
