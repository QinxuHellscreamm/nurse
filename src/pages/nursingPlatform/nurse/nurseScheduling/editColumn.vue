<template>
    <el-dialog :visible.sync="popshow" width='595px'>
      <div slot='title'>
        <span class="el-dialog__title">排班</span>
        <span class="el-dialog__center">{{name}}</span>
        <button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button>
      </div>
      <div>
        <p>排班类型</p>
        <el-select v-model='showText' @change='setValue'>
          <el-option :label='item.NAME' :value="item.ID" v-for='(item,i) of classList' :key='i'></el-option>
        </el-select>
      </div>
      <div class='week-select'>
        <button v-for='item of weeks' :class='{"selecttrue":item.val==item.value}' @click='item.val == item.value ? item.val = "" : item.val = item.value'>{{ item.str }}</button>
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
            v-if='flag'
            v-model="end"
            value-format='yyyy-MM-dd'
            :picker-options="pickerOptions_end"
            type="date"
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
        name: "editColumn",

        props:['classList'],

        data(){
          return{
            popshow : false,
            name : '',
            jobNumber : '',
            war_id : JSON.parse(localStorage.info).ward_id,
            showText : '',
            flag : true,
            class_obj : {},
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
            thisDate : '',
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
          getData(column,name,jobNumber){
            console.log('column');
            console.log(column);
            this.popshow = true
            this.jobNumber = jobNumber
            this.name = name
            let str = column.WEEK
            this.weeks.forEach(item => {
              item.val = ''
              if(item.str == str) item.val = item.value
            })
            this.showText = column.SHEET_ID != '' ? column.SHEET_ID - 0 : ''

            this.classList.forEach(item=>{
              this.showText == item.ID ? this.class_obj = item : null
            })

            this.start = column.DATE
            this.end = column.DATE
            this.thisDate = column.DATE
          },
          setValue(a){
            this.classList.forEach(item=>{
              a == item.ID ? this.class_obj = item : null
            })
          },
          save:_debounce(function(){
            if(this.showText == ''){
              this.$message({type: 'warning', message: '排班不能为空'})
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
              name : this.name,
              number : this.jobNumber,
              sheet_id : this.class_obj.ID,
              sheet_sort : this.class_obj.SORT,
              war_id : JSON.parse(localStorage.info).ward_id,
              week : JSON.stringify(weekarr),
              startdate : this.start,
              enddate : this.end
            }
            this.post('datacenter/nursemanage', obj , res => {
              console.log(res)
              if(res.status < 400){
                this.$message({ type: 'success', message : res.data.message});
                this.$parent.getData()
                this.popshow = false
              }
            })
          })

        },

        watch:{
          'start' : function (to) {
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
      position absolute
      left 0
      width 100%
      text-align center
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
