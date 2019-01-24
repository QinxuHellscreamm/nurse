<template>
  <div >
    <transition name="fade">
      <div class='right-bar' v-if='rightShow'>
        <div style="padding: 24px">
          <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="close"><i class="el-dialog__close el-icon el-icon-close"></i></button>
        </div>
        <div class="min">
          <ul>
            <li v-for='(item,index) of ruleForm' :key='index'>
              <p><span>{{item.RECEIVE_TIME | stampTotime}}</span>&nbsp;&nbsp;<span>{{item.RECEIVE_NURSE_NAME}}</span></p>
              <el-input v-model="item.CONTENT" readonly></el-input>
            </li>
          </ul>

        </div>
      </div>
    </transition>
  </div>
</template>

<script>
    export default {
        name: "PDAShiftRecord",
        props :['dateTime','pa_id'],
      data(){
        return {
          rightShow : false,
          ruleForm:[],
        }
      },

      methods:{
        init(){
          console.log("dddd",this.dateTime,this.pa_id)
          this.rightShow = true
          this.getSer("datacenter/changeshift/gethandover" ,{
            stamp:this.dateTime,
            pa_id:this.pa_id
          }, (res) => {
            this.ruleForm = res.data.items
        })
        },
        close(){
          this.rightShow = false
        },

      },


    }
</script>

<style scoped lang='stylus'>
  .right-bar
    position absolute
    top 0
    right -280px
    height 483px
    width 280px
    background-color #fff
    z-index 1
    opacity 1
    box-sizing border-box
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
    border-radius: 0 4px 4px 0
    padding 0 15px
    &>>>.el-input .el-input__inner
      background #F9F9FB
    .min ul li p
      line-height 36px
</style>
