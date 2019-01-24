<template>
  <div>
    <el-table style="width: 100%" :data='list' v-if='flag'>
      <el-table-column fixed>
        <template slot-scope="scope">
          <div class='center' :style='{backgroundColor:scope.row.FLAG_COLOR}'>
            {{ scope.row.NAME }}
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed :label='weekDays[i].strth' v-for='(xx,i) of weekDays' :key=i>
        <template slot-scope="scope">
          <div class='list center'>
            <ul>
              <li v-for="(item,index) of list[scope.$index]['week'+i].list" :key=index >{{item.NURSE_NAME}}</li>
             <!-- <li class='add' v-if='new Date($store.getters.getToday).getTime() <= new Date(xx.strtd).getTime()'>+</li>-->
            </ul>
          </div>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>

    export default {
        name: "scheduling",

        props : ['weekDays','start','end'],

        data(){
          return {
            flag :false,
            list : [],
            war_id : "" ,
            addData : {},
            today : '',
            weekDay : []
          }
        },

        methods : {
          getData(){
            this.flag = false
            this.war_id = this.$store.state.userinfo.ward_id
            this.weekDay = [...this.weekDays]
            this.getSer('datacenter/shift',{ war_id : this.war_id } , res => {// 班次
              console.log(res)
              this.list = res.data.items
              this.list.forEach(item=>{
                for(var i = 0;i < 7;i++){
                  item['week'+i] = {...this.weekDays[i]}
                  item['week'+i].list = []
                }
              })

              this.getSer('datacenter/nursemanage/schelist',{ war_id : this.war_id , start : this.start , end : this.end },res=>{
                console.log(res);
                res.data.items.forEach(item=>{
                  this.list.forEach(list_item=>{
                    if(list_item.ID == item.SHEET_ID){
                      if(item.WEEK == '周一') list_item.week0.list.push(item)
                      if(item.WEEK == '周二') list_item.week1.list.push(item)
                      if(item.WEEK == '周三') list_item.week2.list.push(item)
                      if(item.WEEK == '周四') list_item.week3.list.push(item)
                      if(item.WEEK == '周五') list_item.week4.list.push(item)
                      if(item.WEEK == '周六') list_item.week5.list.push(item)
                      if(item.WEEK == '周日') list_item.week6.list.push(item)
                    }
                  })
                })
                this.flag = true
                console.log(this.list);
              })
            })
          }
        },

        created(){
          this.$nextTick(() => {
            console.log(this.weekDay);
            this.getData()
          })
        },


    }
</script>

<style scoped lang='stylus'>
  .center
    text-align center
    height 116px
    line-height 116px
    overflow-y auto
    &::-webkit-scrollbar
      width 3px
    &::-webkit-scrollbar-thumb
      -webkit-box-shadow inset 0 0 5px rgba(0,0,0,0.2)
      background #11C462
      border-radius 5px
    &::-webkit-scrollbar-track
      -webkit-box-shadow inset 0 0 5px rgba(0,0,0,0.2)
      background-color #d8ebf4
      border-radius 5px
  .el-table
    &>>>.el-table__fixed-header-wrapper
      .cell
        text-align center
    &>>>.el-table__body
      .hover-row
        td
          background-color #F9F9FB
      .current-row
        td
          background-color #F9F9FB
    &>>>.el-table__row
      .cell
        padding 0
        border-right 2px solid #FFFFFF
        ul
          padding 10px
          li
            line-height 30px
            width calc(50% - 4px)
            height 30px
            float left
            box-sizing border-box
            background-color #DDEFF9
            cursor pointer
            font-size 12px
            &:nth-child(2n)
              margin-left 4px
            &:nth-child(n-2)
              margin-top 4px
            &.add
              border 1px dashed red
              background-color #F9F9FB
              color red

</style>
