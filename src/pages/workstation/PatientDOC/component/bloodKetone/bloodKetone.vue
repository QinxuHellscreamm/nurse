<template>
  <div class="bloodKetone">
    <div class='list'>

      <div class='top-menu'>
        <!--<el-button class="trend">趋势图</el-button>-->
        <div class='right-button'>
          <el-button class="trend" @click='print_preview("preview")'>预览</el-button>
          <!--<div class='printing'></div>-->
          <print></print>
        </div>
      </div>

      <div class='out-main'>
        <el-table :data="tableData" style="width: 100%" @row-click="editSheet">
          <el-table-column  prop="NURSING_AT" label="日期">
            <template slot-scope="{row}"><div>{{row.NURSING_AT}}</div></template>
          </el-table-column>
          <el-table-column  prop="BLOOD_KETONE_RECORD" label="血酮值（mmol/L）"></el-table-column>
          <el-table-column  prop="ADMIN_NAME" label="签名"></el-table-column>
          <el-table-column  prop="REMARK" label="备注"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class='add'>
      <div class="title" v-if="showDeleteBtn">编辑</div>
      <div class="title" v-else="showDeleteBtn">新增</div>
      <div class='time'>
        <span>检测时间</span>
        <el-date-picker v-model="NURSING_AT" type="datetime" value-format='yyyy-MM-dd HH:mm' format='yyyy-MM-dd HH:mm' placeholder="选择日期时间"></el-date-picker>
      </div>
      <div class="blood">
        <div>血酮值（mmol/L）</div>
        <el-input v-model="BLOOD_KETONE_RECORD"></el-input>
      </div>
      <div class="remarks">
        <div>备注</div>
        <el-input v-model="REMARK" type='textarea'></el-input>
      </div>
      <div class='btn-menu' >
        <el-button class='save' @click="saveSheet()" v-if='$route.name != "infoshare"'>保存</el-button>
        <el-button class='empty'  @click="clearSheet()">清空</el-button>
        <el-button class='empty' v-if="showDeleteBtn && $route.name != 'infoshare'" @click="delSheetSubmit()" >删除</el-button>
      </div>
      <printView :INPATIENT_NUMBER='INPATIENT_NUMBER' ref='printView' :detile='detile'></printView>
    </div>
  </div>
</template>

<script>
  import  { _debounce , _YMDhms } from '@/global'
  import print from '@/components/print'
  import printView from './bloodKetoneView'
  export default {
    name: "bloodKetone",

    components : { print , printView },

    props: ['id','INPATIENT_NUMBER','detile'],

    data() {
      return {
        tableData : [],
        ID: '',
        NURSING_AT: '',
        BLOOD_KETONE_RECORD: '',
        REMARK: '',
        showDeleteBtn : false, //是否为编辑状态 如果是编辑状态  则显示删除按钮 并且修改提交方法为编辑
      }
    },

    created() {
      this.$nextTick(() => {
        this.NURSING_AT = _YMDhms()
        this.getSer('datacenter/bloodglucoseresh', { INPATIENT_NUMBER : this.INPATIENT_NUMBER }, res => {
          console.log(res)
          this.tableData = res.data.items
        })
      })
    },

    methods: {
      saveSheet:_debounce(function () {
          //为true  为编辑
        // if(isNaN(this.BLOOD_KETONE_RECORD)){
        //   this.$message({ type: 'warning', message: '血酮值必须为数字'})
        //   return
        // }
//        if(this.BLOOD_KETONE_RECORD == 0){
//          this.$message({ type: 'warning', message: '血酮值必须大于0'})
//          return
//        }
          if (this.showDeleteBtn) {
              var obj = {
                  id: this.ID,
                  INPATIENT_NUMBER: this.INPATIENT_NUMBER,
                  NURSING_AT: this.NURSING_AT,
                  BLOOD_KETONE_RECORD: this.BLOOD_KETONE_RECORD,
                  REMARK: this.REMARK
              }
              this._put('datacenter/bloodglucoseresh/'+ this.ID, obj, res => {
                  if (res.status < 400) {
                      this.$message({ type: 'success', message: '编辑成功!' })
                      this.clearSheet()
                      this.getSer('datacenter/bloodglucoseresh', { INPATIENT_NUMBER: this.INPATIENT_NUMBER }, res => {
                          this.tableData = res.data.items
                      })
                  }
              })
          }else {
              var obj = {
                  INPATIENT_NUMBER: this.INPATIENT_NUMBER,
                  NURSING_AT: this.NURSING_AT,
                  BLOOD_KETONE_RECORD: this.BLOOD_KETONE_RECORD,
                  REMARK: this.REMARK
              }

              this.post('datacenter/bloodglucoseresh', obj, res => {
                  if (res.status < 400) {
                      this.$message({type: 'success', message: '新增成功!'})
                      this.clearSheet()
                      this.getSer('datacenter/bloodglucoseresh', { INPATIENT_NUMBER : this.INPATIENT_NUMBER }, res => {
                          this.tableData = res.data.items
                      })
                  }
              })
          }
      }) ,
      //清空按钮
      clearSheet(){
        this.NURSING_AT = ''
        this.BLOOD_KETONE_RECORD = ''
        this.REMARK = ''
        this.showDeleteBtn = false
      },
      //表格数据 点击效果
      editSheet(vals){
        this.showDeleteBtn = true
        this.ID = vals.ID
        this.NURSING_AT = vals.NURSING_AT
        this.BLOOD_KETONE_RECORD = vals.BLOOD_KETONE_RECORD
        this.REMARK = vals.REMARK
      },
      //删除记录
      delSheetSubmit(){
        this._delete('datacenter/bloodglucoseresh/'+this.ID, { id : this.ID }, res => {
          if (res.status == 204)
          {
              this.$message({type: 'success', message: '删除成功!'})
              this.clearSheet()
              this.getSer('datacenter/bloodglucoseresh', { INPATIENT_NUMBER : this.INPATIENT_NUMBER }, res => {
                  this.tableData = res.data.items
              })
          }
        })
      },

      print_preview(print){
        this.$refs.printView.getData()
        print ? this.$refs.printView.type = print : this.$refs.printView.type = "print"
      },

    }
  }
</script>

<style scoped lang='stylus'>
  .bloodKetone
    display flex
    height 100%
    flex 1
    .list
      flex 1
      .out-main
        box-shadow 0 0 0 0 #FFFFFF
      .top-menu
        overflow hidden
        margin 12px 20px
        .trend
          padding 13px 20px!important
          border none
          background-color #DDEFF9
          color #00B3DC
          float left
        .right-button
          float right
          .printing
            width 40px
            height 40px
            float right
            background-image url("../../../../../assets/images/print.png")
            margin-left 10px
      .el-table::before
        height 0
    .add
      width 300px
      border 1px solid #D8E3E7
      height 100%
      box-sizing border-box
      padding 0 18px 15px
      overflow auto
      &::-webkit-scrollbar
        width 7px
        height 1px
      &::-webkit-scrollbar-thumb
        border-radius 7px
        -webkit-box-shadow inset 0 0 5px rgba(0,0,0,0.2)
        background #00B3DC
      &::-webkit-scrollbar-track
        -webkit-box-shadow inset 0 0 5px rgba(0,0,0,0.2)
        background-color #d8ebf4
      .title
        font-size 18px
        line-height 64px
      .time
        .el-input
          width 190px
          margin-left 5px
        .el-input >>>.el-input__inner
          background-color #F9F9FB
      .testing
        .el-radio
          line-height 40px
          width 48%
        .el-radio+.el-radio
          margin-left 0
      .blood
        margin-top 20px
        .el-input
          width 260px
          margin-top 10px
        .el-input >>>.el-input__inner
          background-color #F9F9FB
      .remarks
        margin-top 20px
        .el-textarea
          margin-top 10px
        .el-textarea >>>.el-textarea__inner
          resize none
          background-color #F9F9FB
          height 110px
      .btn-menu
        .el-button
          border none
          color #fff
          float right
          margin-top 30px
        .empty
          background-color #E63922
          padding 13px 16px!important
        .save
          background-color #00B3DC
          padding 13px 34px!important
          margin-left 10px
  .el-table
    &>>>.el-table__header-wrapper,&>>>.el-table__body-wrapper
      .cell
        font-size 12px
        div
          font-size 12px
</style>
