<template>
  <div>
    <el-table style="width: 100%" :data='list'>
      <el-table-column fixed label="护士" >
        <template slot-scope="scope">
          <div>
            {{ scope.row.NURSE_NAME }}
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed  :label="item.strth" v-for='(item,index) of weekDays' :key='index' >
        <template slot-scope="scope">
          <div :style="{background:scope.row.items[index].FLAG_COLOR}" @click='cellClick(scope.row.items[index] , scope.row.NURSE_NAME , scope.row.JOB_NUMBER)'>
            {{ scope.row.items[index].NAME }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <editColumn ref='child' :classList='classList'></editColumn>
  </div>
</template>

<script>
  import editColumn from './editColumn'
    export default {
        name: "nurseView",

        props : ['weekDays','start','end'],

        data(){
          return{
            war_id : JSON.parse(localStorage.info).ward_id,
            list : [],
            classList : []
          }
        },

        components : { editColumn },

        methods : {
          getData(){
            this.getSer('datacenter/shift',{ war_id : this.war_id } , res => {
              console.log(res)
              this.classList = res.data.items
              this.classList.push({ NAME : '休息' , ID : 86 , SORT : 999 })
              console.log(this.classList);
            })
            this.getSer('datacenter/nursemanage',{ start : this.start , end : this.end , war_id : JSON.parse(localStorage.info).ward_id } , res => {
              this.list = res.data.items
              console.log(res)
            })
          },
          cellClick(column,NURSE_NAME,jobNumber){
            console.log(column,NURSE_NAME,jobNumber)
            if(new Date(this.$store.getters.getToday).getTime() > new Date(column.DATE).getTime()){
              return
            }
            let flag = true
            this.classList.forEach(item=>{
              item.ID == column.SHEET_ID || column.SHEET_ID == '' ? flag = false : null
            })
            if(flag){
              return
            }
            this.$refs.child.getData(column,NURSE_NAME,jobNumber)
          }

        },

        mounted(){
          this.$nextTick(()=>{
            setTimeout(()=>{
              this.getData()
            })
          })
        }
    }
</script>

<style scoped lang='stylus'>
  .el-table >>> td
    border-left 4px solid #FFFFFF
    .cell
      padding 0
      cursor pointer
      div
        padding 8px 15px
  .el-table
    &>>>.el-table__body .current-row > td
      background-color #F9F9FB
    &>>>.el-table__body .hover-row > td
      background-color #F9F9FB
</style>
