<template>
    <el-dialog :visible.sync="popshow" width='360px' title='选择录入项' append-to-body>
      <div class='advice'>
        <el-checkbox-group v-model="subList" >
          <el-checkbox :label="item.CODE" v-for='(item,index) of sub.SUB' :key='index'>{{item.NAME}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer" >
        <el-button type='primary' @click="ok">确定</el-button>
      </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "dialogComponent",

        props:['sub'],

        data(){
          return{
            popshow:false,
            subList:[],
          }
        },

       methods:{
          ok(){
            this.$parent.$parent.obj.subList = this.subList
            this.popshow = false
          },
         show(data){
            this.popshow = true
            this.subList = data
         }
       }

    }
</script>

<style scoped lang='stylus'>
  .advice
    width: 92%
    padding 10px 10px
    border 1px solid #ddd
    border-radius 5px
    .el-checkbox
      display block
      padding: 0 20px;
      background: #F9F9FB;
      line-height: 44px;
      color: #2B3A50;
      border: 5px solid #fff;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      position relative
      &>>>.el-checkbox__input
        position absolute
        top 15px
      &>>>.el-checkbox__label
        padding-left 22px
        overflow-wrap break-word
        word-break normal
    .el-checkbox+.el-checkbox
      margin-left 0
</style>
