<template>
    <div class="pro-ri">
      <div  class="pro-ribot">
        <!--<p style="line-height: 50px;padding-left: 20px;">医嘱执行记录</p>-->
        <el-table ref="multipleTable" :data="medicaladvice_list" tooltip-effect="dark"  >
          <el-table-column prop="AGING" label="属性" min-width="50"></el-table-column>
          <el-table-column prop="TYPE_NAME" label="类别" min-width="50"></el-table-column>
          <el-table-column prop="START_TIME" label="开始时间" min-width="170">
            <template slot-scope="{row}"><div>{{row.START_TIME | stampTotime}}</div></template>
          </el-table-column>
          <el-table-column prop="PROJECT_NAME" label="项目名称" min-width="150"></el-table-column>
          <el-table-column prop="SINGLE_DOSE" label="单次用量" min-width="50"></el-table-column>
          <el-table-column prop="TOTAL_USAGE" label="总用量" min-width="50"></el-table-column>
          <el-table-column prop="DOSE_UNIT" label="用量单位" min-width="50"></el-table-column>
        <el-table-column prop="USAGE" label="用法" min-width="170" show-overflow-tooltip></el-table-column>
        <el-table-column prop="CHANNEL" label="途径" min-width="80"></el-table-column>
        <el-table-column prop="SAMPLE" label="检验样本" min-width="80"></el-table-column>
        <el-table-column prop="PART" label="检验部位" min-width="80"></el-table-column>
        <el-table-column prop="DISPOSAL_DEPARTMENT" label="处置科室" min-width="80"></el-table-column>
        <el-table-column prop="DOCTOR" label="开嘱人" min-width="80"></el-table-column>
        <el-table-column prop="STOP_TIME" label="停止时间" min-width="170">
            <template slot-scope="{row}"><div>{{row.STOP_TIME | stampTotime}}</div></template>
        </el-table-column>
        <el-table-column prop="ADVICE_TIME" label="开嘱时间" min-width="170">
            <template slot-scope="{row}"><div>{{row.ADVICE_TIME | stampTotime}}</div></template>
        </el-table-column>
        <el-table-column prop="ENTRUST" label="嘱托" min-width="150"></el-table-column>
        </el-table>
      </div>
    </div>
</template>
<script>
    export default{
      props : ['medicaladvice_list'],

        data(){
            return {
              popshow : false,
              input:'',
              fixShow : false,
              startTime:"",
              obj:{},
            }
        },


      methods:{
        out(e){
          if(e.toElement.className == 'right' || e.toElement.className == 'cell' || e.toElement.lastChild.className == 'cell') this.fixShow = false
        }
      },
    }
</script>
<style scoped lang='stylus'>
  .pro-ri
    width 100%
    background #fff
  .botBtn
    text-align right
    margin 20px
  .el-table>>> td, .el-table>>> th.is-leaf
    border-bottom 4px solid #FFF
    padding 5px 0
  .el-table>>> tr
    background-color #F9F9FB
  .pairGod
    border 2px solid red
    width 12px
    height 10px
    display inline-block
    vertical-align middle
    border-right none
  .fixed
    position fixed
    width 80px
    height 30px
    background-color #FFFFFF
    border 1px solid #dddddd
    z-index 2000
    div
      height 30px
      line-height 30px
      text-align center
      &:hover
        background-color #ddeff9
    .edit
      border-bottom 1px solid #dddddd
</style>
