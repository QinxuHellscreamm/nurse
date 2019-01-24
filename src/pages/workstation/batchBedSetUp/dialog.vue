<template>
    <el-dialog title="批量增减责任床" :visible.sync="dialogFormVisible" width='740px'>
      <div style="display: flex;">
        <div class='left-menu menu'>
          <el-input placeholder='搜索姓名' v-model='value' @change="getPatient"></el-input>
          <div class="scrollbar">
            <ul>
              <li v-for='(item,index) of LIST'>
                <div class='check' :class="{ 'checked' : item.IS_PRIMARY == 1 }" @click='customCheck(item)'></div>
                <div class='contnet'>
                  <div class='top'>
                    <div class='bed'>{{item.BED_NUMBER}}</div>
                    <div class='name'>{{item.NAME}}</div>
                    <div class='sex' :class="{'boy': item.SEX == '男'}"></div>
                    <div class='old'>{{item.PATIENT_AGE}}</div>
                  </div>
                  <div class='bottom'>
                    <div class='code'>{{item.MEDICAL_RECORD_NUM}}</div>
                    <div class='bed-type' v-if='item.NURSING_GRADE_ID != null' >{{item.NURSING_GRADE_ID | rank}}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>
        <div class='right-menu menu'>
          <div class='title'>已选择病人：{{selectNum}}人</div>
          <ul>
            <li v-for='(item,index) of LIST' v-if='item.IS_PRIMARY'>
              <div class='contnet'>
                <div class='top'>
                  <div class='bed'>{{item.BED_NUMBER}}</div>
                  <div class='name'>{{item.NAME}}</div>
                  <div class='sex' :class="{'boy': item.SEX == '男'}"></div>
                  <div class='old'>{{item.PATIENT_AGE}}</div>
                </div>
                <div class='bottom'>
                  <div class='code'>{{item.MEDICAL_RECORD_NUM}}</div>
                  <div class='bed-type' v-if='item.NURSING_GRADE_ID != null'>{{item.NURSING_GRADE_ID | rank}}</div>
                </div>
              </div>
              <div class='el-icon-delete' @click='customCheck(item)'></div>
            </li>
          </ul>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" class='cancel'>取 消</el-button>
        <el-button type="primary" @click="save()">保存</el-button>
      </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "batchDialog",

        data(){
          return{
            dialogFormVisible : false,
            LIST : [],
            selectNum : 0,
            value : ''
          }
        },

        methods:{
          getPatient(){
            console.log(1);
            this.dialogFormVisible = true
            this.getSer('/datacenter/bed', { filterfuc : 'in_hospital_bed_count',page_size : 1000,page : 1,is_onlyprimary : 0, inpatient_number : this.value } , res => {
              console.log("LIST",res);
              this.LIST = res.data.items
              this.selectNum = 0
              this.LIST.forEach(item => {
                item.IS_PRIMARY == 1 ? this.selectNum += 1 : null
              })
            })
          },
          customCheck(item){
            console.log(item);
            item.IS_PRIMARY = item.IS_PRIMARY == 0 ? 1 : 0
            item.IS_PRIMARY == 0 ? this.selectNum -= 1 : this.selectNum += 1
          },
          save(){
            let arr = []
            this.LIST.forEach(item => {
              item.IS_PRIMARY == 1 ? arr.push(item.INPATIENT_NUMBER) : null
            })
            this.post('datacenter/primarynurse',{ INPATIENT_NUMBER : JSON.stringify(arr) }, res => {
              console.log(res);
              if(res.status<400){
                  this.$message({
                    type: 'success',
                    message: '保存成功!',
                  });
                this.dialogFormVisible = false
                  this.$parent.getData();
              }

            })
          }
        },
    }
</script>

<style scoped lang='stylus'>
   .el-dialog
    .dialog-footer
      padding 0 10px
      .cancel
        background-color #DDEFF9
        padding 13px 31px
        color #00B3DC
        border none
      .el-button--primary
        padding 13px 55px
        background-color #00B3DC
        border none
    .el-dialog__body
      display flex
      padding: 30px 30px
      .menu
        width 340px
        border 1px solid #D8E3E7
        height 528px
        border-radius 4px
        >>>.el-input__inner
          background #F9F9FB
       /* overflow auto*/
/*        &::-webkit-scrollbar
          width 7px
          height 1px
        &::-webkit-scrollbar-thumb
          background-color #00B3DC
          border-radius 10px
        &::-webkit-scrollbar-track
          background-color #dff4f9*/
        .scrollbar
          height 445px
          overflow auto
          &::-webkit-scrollbar
            width 7px
            height 1px
          &::-webkit-scrollbar-thumb
            background-color #00B3DC
            border-radius 10px
          &::-webkit-scrollbar-track
            background-color #dff4f9
        ul
          width 300px
          margin 0 auto
          li
            display flex
            background-color #F9F9FB
            padding 15px 18px
            border-radius 4px
            margin-bottom 10px
            .check
              background-image url("../../../assets/images/icon/check.png")
              width 20px
              height 20px
              position relative
              z-index 999
              top 10px
              &.checked
                background-image url("../../../assets/images/icon/checked.png")
            .contnet
              display block
              margin-left 20px
              .top
                display flex
                color #2B3A50
                .bed
                  width 3em
                  max-width 3em
                  overflow hidden
                  white-space nowrap
                  font-size 16px
                  line-height 20px
                .name
                  width 4em
                  max-width 4em
                  overflow hidden
                  text-overflow ellipsis
                  white-space nowrap
                .sex
                  margin-right 8px
                  margin-left 8px
                  width 16px
                  height 16px
                  background-image url("../../../assets/images/icon/girl.png")
                  &.boy
                    background-image url("../../../assets/images/icon/boy.png")
                .old
                  color #6C8B97
                  margin-left 10px
              .bottom
                margin-top 5px
                display flex
                .bed-type
                  border 2px solid #2B3A50
                  line-height 14px
                  border-radius 5px
                  width 23px
                  text-align center
                  margin-left 2em
      .right-menu
        margin-left 15px
        overflow auto
        &::-webkit-scrollbar
          width 7px
          height 1px
        &::-webkit-scrollbar-thumb
          background-color #00B3DC
          border-radius 10px
        &::-webkit-scrollbar-track
          background-color #dff4f9
        .title
          color #2B3A50
          font-size 16px
          width 250px
          margin 20px auto
          line-height 40px
        li
          background-color #fff!important
          border 1px solid #D8E3E7
          box-sizing border-box
          .contnet
            margin-left 0!important
          .el-icon-delete
            font-size 26px
            color #E63922
            position relative
            top 7px
            left 55px
      .left-menu
        .el-input
          display block
          width 250px
          margin 20px auto
          .el-input__inner
            background-color #F9F9FB

</style>
