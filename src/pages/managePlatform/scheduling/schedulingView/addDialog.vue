<template>
    <el-dialog :visible.sync="popshow" width='595px'>
        <div slot='title'>
          <span class="el-dialog__title">排班</span>
          <span class="el-dialog__center">{{row.NAME}}</span>
          <button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button>
        </div>
        <div>
          <p>选择护士</p>
          <el-select v-model='nurseName' @change='log'>
            <el-option :label="item.NAME" :value="item.JOB_NUMBER" v-for='(item,i) of nurseList' :key='i'></el-option>
          </el-select>
        </div>
        <div class='week-select'>
          <button v-for='item of weeks' :class='{"selecttrue":item.val == item.value}' @click='item.val == item.value ? item.val = "" : item.val = item.value'>{{ item.str }}</button>
        </div>
        <div class='time'>
          <div class='time-start'>
            <div class='bottom'>开始时间</div>
            <el-date-picker
              v-model="start"
              type="date"
              value-format='yyyy-MM-dd'
              :picker-options="pickerOptions_star"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class='time-end'>
            <div class='bottom'>结束时间</div>
            <el-date-picker
              v-model="end"
              value-format='yyyy-MM-dd'
              type="date"
              v-if='flag'
              :picker-options="pickerOptions_end"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="popshow = false" class='close'>取 消</el-button>
          <el-button @click="save" class='save'>保 存</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import { _debounce } from "@/global"
    export default {
        name: "addDialog",

        data(){
          return{
            popshow : false,
            row : {},
            nurse : {},
            nurseName : '',
            nurseList : [],
            flag : true,
            weeks : [
              {str : '周一' , value : '1' , val : ''},
              {str : '周二' , value : '2' , val : ''},
              {str : '周三' , value : '3' , val : ''},
              {str : '周四' , value : '4' , val : ''},
              {str : '周五' , value : '5' , val : ''},
              {str : '周六' , value : '6' , val : ''},
              {str : '周日' , value : '0' , val : ''}
            ],
            start : '',
            end : '',
            today : this.$store.getters.getToday,
            thisDay : '',
            pickerOptions_star : {
              disabledDate : function (time) {
                return time.getTime() < Date.now() - 86400000
              }
            },
            pickerOptions_end : {

            },
          }
        },

        methods : {
          log(val){
            this.nurseList.forEach(item=>{
              val == item.JOB_NUMBER ? this.nurse = item : null
            })
            console.log(this.nurse);
          },
          setData(row,item){
            this.popshow = true
            this.row = row
            this.nurseName = ''
            this.thisDay = item.strtd
            let str = item.strth.substring('' , 2)
            this.start = item.strtd
            this.end = item.strtd
            this.weeks.forEach(item => {
              item.val = ''
              if(item.str == str) item.val = item.value
            })
          },
          editData(data,sort){
            this.popshow = true
            this.row = { ID : data.SHEET_ID , SORT : sort , NAME : data.SHEET_NAME}
            this.nurseName = data.JOB_NUMBER + ''
            this.thisDay = data.DATE
            this.start = data.DATE
            this.end = data.DATE
            this.weeks.forEach(item => {
              item.val = ''
              if(item.str == data.WEEK) item.val = item.value
            })
            this.nurseList.forEach(item => {
              this.nurseName == item.JOB_NUMBER ? this.nurse = item : null
            })
          },
          save:_debounce(function(){

            if(this.nurseName == ''){
              this.$message({type: 'warning', message: '请选择护士'})
              return
            }
            if(this.start == null){
              this.$message({type: 'warning', message: '开始时间不能为空'})
              return
            }
            if(this.end == null){
              this.$message({type: 'warning', message: '结束时间不能为空'})
              return
            }

            let weekarr = []
            this.weeks.forEach(item=>{
              if(item.value == item.val) weekarr.push(item.value)
            })
            if(weekarr.length == 0){
              this.$message({type: 'warning', message: '请选择星期'})
              return
            }
            let obj = {
              name : this.nurse.NAME ? this.nurse.NAME : '',
              number : this.nurse.JOB_NUMBER ? this.nurse.JOB_NUMBER : '',
              sheet_id : this.row.ID,
              sheet_sort : this.row.SORT,
              war_id : this.$store.state.userinfo.ward_id ,
              week : JSON.stringify(weekarr),
              startdate : this.start,
              enddate : this.end
            }
            this.post('datacenter/nursemanage', obj , res => {
              console.log(res)
              if(res.status < 400){
                this.$message({type: 'success', message: '保存成功'})
                this.$parent.flag = false
                this.$parent.getData()
                this.popshow = false
              }
            })
          })
        },

        mounted(){
          this.$nextTick(()=>{
            this.getSer('datacenter/nursemanage/nurses',{ war_id : this.$store.state.userinfo.ward_id }, res => {
              console.log('护士下拉')
              console.log(res);
              this.nurseList = res.data.items
            })
          })
        },

        watch : {
          'start' : function(to){
            this.flag = false
            if(new Date(to).getTime() > new Date(this.end).getTime()) this.end = to
            this.$nextTick(() => {
              this.flag = true
            })
            this.pickerOptions_end.disabledDate = function(time){
              return time.getTime() < new Date(to).getTime() - 86400000
            }
          }
        }
    }
</script>

<style scoped lang='stylus'>
  .el-dialog
    .el-dialog__center
      margin-left 220px
      font-size 18px
      color #00B3DC
    .el-dialog__body
      p
        font-size 16px
        color #2B3A50
      .el-select
        margin-top 15px
      .week-select
        margin-top 25px
        button
          padding 11.5px 14px
          border-radius 4px
          background-color #F9F9FB
          border 1px solid #D8E3E7
          margin-right 18px
          &.selecttrue
            border 1px solid #00CACF
            background-color #00CACF
            color #FFFFFF
      .time
        display flex
        margin-top 25px
        .bottom
          margin-bottom 15px
          color #2B3A50
          font-size 16px
        .el-input
          width 252px
        .time-end
          margin-left 50px
    .el-dialog__footer
      .close
        background-color #DDEFF9
        color #00B3DC
        border none
        padding 13px 30px!important
      .save
        background-color #00B3DC
        color #FFFFFF
        border none
        padding 13px 56px!important
        margin-left 15px

</style>
