<template>
    <div>
      <div class='out-top'>
        <el-date-picker v-model="week" type="week" :format='str' :clearable='false' :picker-options='pickerOption'></el-date-picker>
        <span class='btn-menu'>
          <el-button icon="el-icon-caret-left" class='up' @click.stop='upWeek'></el-button>
          <el-button icon="el-icon-caret-right" class='next' @click.stop='nextWeek'></el-button>
          <el-button class='today' @click='getWeek'>今天</el-button>
          <span class='btn-menu2'>
            <el-button @click='viewSwitch'>{{viewName}}</el-button>
            <el-button @click='shift'>班次管理</el-button>
          </span>
        </span>
      </div>
      <div class="out-main">
        <transition name="el-fade-in">
          <nurseView :weekDays='weekDays' :start='start' :end='end' ref='nurseView' v-if='viewName == "排班视图"' ></nurseView>
          <schedulingView :weekDays='weekDays' :start='start' :end='end' ref='nurseView' v-if='viewName == "护士视图"'></schedulingView>
        </transition>
      </div>
      <shiftManagement ref='shift'></shiftManagement>
    </div>
</template>

<script>
  import shiftManagement from './shiftManagement' //班次管理
  import nurseView from './nurseView'
  import schedulingView from './schedulingView/schedulingView'
  import { _debounce } from "@/global"
    export default {
        name: "nurseScheduling",

        components : { nurseView , shiftManagement ,schedulingView},

        data(){
          return{
            week : '',
            start : '',
            end : '',
            str :'',
            weekDays : [],
            pickerOption : {
              firstDayOfWeek : 1
            },
            viewName : '排班视图'
          }
        },

        methods : {
          getWeek(){
            let currentDate = new Date()
            let timesStamp = currentDate.getTime();
            let currenDay = currentDate.getDay();
            this.week = new Date(timesStamp + 86400000 * ( 0 - (currenDay + 6) % 7) )
          },
          upWeek(){
            let date = this.week
            let timesStamp = date.getTime()
            this.week = new Date(timesStamp - 604800000)
          },
          nextWeek(){
            let date = this.week
            let timesStamp = date.getTime();
            this.week = new Date(timesStamp + 604800000)
          },
          shift(){
            this.$refs.shift.getShift()
          },
          viewSwitch(){
            this.viewName == "护士视图" ? this.viewName = "排班视图" : this.viewName = "护士视图"
          },
          changefield:_debounce(function(){
            this.$refs.nurseView.getData()
          })
        },

        watch:{
          'week':function () {
            let date = new Date(Date.parse(this.week))
            let date2 = new Date(Date.parse(this.week) + 518400000)
            let Y = date.getFullYear()
            let M = date.getMonth() + 1
            let D = date.getDate()
            let Y2 = date2.getFullYear()
            let M2 = date2.getMonth() + 1
            let D2 = date2.getDate()
            let str = M + '/' + D + ' - ' + M2 + '/' + D2 + '   ' + Y
            this.start = Y +'-' + M + '-' + D
            this.end = Y2 +'-' + M2 + '-' + D2
            this.str = str
            this.weekDays = []
            for(let i = 0 ; i < 7 ; i++){
              let day = new Date(Date.parse(this.week) + ( ( i - 1) * 86400000))
              let strth = day.getMonth() + 1 + '/' + day.getDate()
              let month = day.getMonth() + 1 < 10 ? '0' + (day.getMonth()) : day.getMonth() + 1
              let date = day.getDate() < 10 ? '0' + (day.getDate()) : day.getDate()
              let strtd = day.getFullYear() + '-' + month + '-' + date
              if(i == 0) var dayStr = { strth : '周一 ' + strth , strtd }
              if(i == 1) var dayStr = { strth : '周二 ' + strth , strtd }
              if(i == 2) var dayStr = { strth : '周三 ' + strth , strtd }
              if(i == 3) var dayStr = { strth : '周四 ' + strth , strtd }
              if(i == 4) var dayStr = { strth : '周五 ' + strth , strtd }
              if(i == 5) var dayStr = { strth : '周六 ' + strth , strtd }
              if(i == 6) var dayStr = { strth : '周日 ' + strth , strtd }
              this.weekDays.push(dayStr)
            }
            console.log(this.weekDays)

            this.changefield()
          }
        },

        created(){
         window.timer =
          this.$nextTick(()=>{
            this.getWeek()
            let today = new Date()
            this.$store.state.today = today.getFullYear() + '-'+ (today.getMonth() + 1 > 9 ? today.getMonth() + 1 : '0' + today.getMonth() + 1 ) + '-' + today.getDate()
          })
        }
    }
</script>

<style scoped lang='stylus'>
  .out-main
    padding-bottom 30px
  .el-button+.el-button
    margin-left 5px
  .el-date-editor
    width 185px
  .el-date-editor>>>.el-input__inner
    padding-left 35px
    padding-right 20px
  .btn-menu
    margin-left 5px
    .btn-menu2
      margin-left 20px
      .el-button
        margin-left 5px
        color #00B3DC
        border none
        background-color #DDEFF9
    .up,.next
      font-size 22px
      padding 6px 11px 10px 11px
      line-height 22px
    .up >>>.el-icon-caret-left
      font-size 18px
      color #888
      &::before
        margin-top 10px
        position relative
        top 2px
    .next >>> .el-icon-caret-right
      font-size 18px
      color #888
      &::before
        margin-top 10px
        position relative
        top 2px
    .today
      background-color #11C462
      color #fff
      padding 12px 15px
</style>
