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
          <div :style="{background:scope.row.items[index].FLAG_COLOR}" >
            {{ scope.row.items[index].NAME }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="本周工作时间" ></el-table-column>
      <el-table-column prop="name" label="本周欠时" ></el-table-column>
      <el-table-column prop="name" label="累计欠时" ></el-table-column>
    </el-table>

  </div>
</template>

<script>

    export default {
        name: "nurseView",

        props : ['weekDays','start','end'],

        data(){
          return{
            war_id : "" ,
            list : [],
            classList : []
          }
        },



        methods : {
          getData(){
            this.war_id = this.$store.state.userinfo.ward_id
            console.log("534354",this.war_id )
            this.getSer('datacenter/shift',{ war_id :  this.war_id } , res => {
              console.log(res)
              this.classList = res.data.items
              this.classList.push({ NAME : '休息' , ID : 86 , SORT : 999 })
              console.log(this.classList);
            })
            this.getSer('datacenter/nursemanage',{ start : this.start , end : this.end , war_id :  this.war_id  } , res => {
              this.list = res.data.items
              console.log("res",res)
            })
          },


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
