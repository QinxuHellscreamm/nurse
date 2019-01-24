<template>
    <el-dialog width='787px' title='班次管理' :visible.sync="popshow">
      <el-table :data='shiftList' border>
        <el-table-column  prop="SORT" label="序号"  min-width="40"></el-table-column>
        <el-table-column  prop="NAME" label="名称" min-width="40"></el-table-column>
        <el-table-column  prop="BEGINT_TIME" label="开始时间" min-width="40"></el-table-column>
        <el-table-column  prop="END_TIME" label="结束时间" min-width="40"></el-table-column>
        <el-table-column  label="标识" min-width="40">
          <template slot-scope="{row}">
            <div :style="{background : row.FLAG_COLOR}"></div>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit"><i class='el-icon-edit'></i><span>编辑</span></el-button>
        <el-button @click="popshow = false">取消</el-button>
        <el-button @click="popshow = false">确定</el-button>
      </div>
      <shiftEdit ref='shiftEdit'></shiftEdit>
    </el-dialog>
</template>

<script>
  import shiftEdit from './shiftEdit'
    export default {
        name: "shiftManagement",

        components : { shiftEdit },

        data(){
          return {
            popshow : false,
            war_id : JSON.parse(localStorage.info).ward_id ,
            shiftList : [],
          }
        },

        methods : {
          getShift(){
            this.popshow = true
            this.getSer('datacenter/shift',{ war_id : this.war_id } , res => {
              console.log(res)
              this.shiftList = res.data.items
            })
          },
          edit(){
            if(this.shiftList.length > 0){

            }else{

            }
            this.$refs.shiftEdit.setData([...this.shiftList])
          }
        }
    }
</script>

<style scoped lang='stylus'>
  .dialog-footer
    .el-button
      &:nth-child(1)
        float left
        background-color #F9F9FB
        padding 12px 12px 12px 10px !important
        i
          margin-right 3px
          color #11C462
      &:nth-child(2)
        background-color #DDEFF9
        color #00B3DC
        border none
        padding 13px 30px!important
      &:nth-child(3)
        background-color #00B3DC
        color #FFFFFF
        border none
        padding 13px 56px !important


  .el-table >>> th
    text-align center
    line-height 34px
    border-color #A5DDE9
    background-color #DDEFF9
  .el-table >>> td
    padding 0
    .cell
      padding 0
      text-align center
      line-height 34px
      div
        width 27px
        height 27px
        margin 0 auto
        border-radius 50%
        border 2px solid #FFFFFF
        box-shadow 0 1px 2px 0 rgba(0,0,0,0.10)
</style>
