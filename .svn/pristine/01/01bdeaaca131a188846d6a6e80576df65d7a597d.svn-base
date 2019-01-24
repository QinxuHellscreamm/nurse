<template>
  <div class='form_right' >
    <div class='input-item'>
      <label>节点配置</label>
      <el-select  placeholder="请选择" v-model='thisNode.NODE_TYPE' @change='nodeChange'>
        <el-option v-for="item in NODE_TYPE" :key="item.value" :label="item.label" :value="item.value" ></el-option>
      </el-select>
    </div>
    <div class='input-item'>
      <label>标　　题</label>
      <el-input class="width310 custom-item" placeholder="请输入内容" v-model="thisNode.NODE_NAME" ></el-input>
    </div>
    <div class='input-item' v-show='compute.title'>
      <label>题目方式</label>
      <el-select  placeholder="请选择" v-model='thisNode.INPUT_MODE' class='need-4 width310' @change='questionChange'>
        <el-option v-for="item in INPUT_MODE" :key="item.value" :label="item.label" :value="item.value" ></el-option>
      </el-select>
    </div>
    <div class="area" v-show='compute.select'>
      <div style='margin-top: 10px;'>
        <span style="margin-bottom: 10px;line-height: 36px;">选项内容</span>
      </div>
      <div>
        <el-input class="textarea" type="textarea" placeholder="输入选项值（每行一个）" v-model="thisNode.OPTIONS"></el-input>
      </div>
    </div>
    <div class='input-item' v-show='compute.text'><label>输入长度</label><el-input  class="length custom-item" placeholder="请输入内容" v-model="thisNode.INPUT_LENGTH"></el-input></div>
    <div class='input-item' v-show='compute.type'>
      <label>输入类型</label>
      <el-select  placeholder="请选择" v-model='thisNode.INPUT_TYPE' class='input-type' @change="questionChange">
        <el-option v-for="item in INPUT_TYPE" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <div class='input-item' v-show='thisNode.NODE_TYPE == 6'>
      <label>输入类型</label>
      <el-select  value="点击弹出该评估单"  class='input-type' disabled >
      </el-select>
    </div>
    <div class='input-item' v-show='thisNode.NODE_TYPE == 8'>
      <label>输入类型</label>
      <el-select  value="自动导入患者信息数据"  class='input-type' disabled >
      </el-select>
    </div>
    <div class='input-item flex' v-if='compute.num'>
      <label>输入范围</label>
      <div class="range">
        <el-input type="text" placeholder="" class="custom-item" v-model='thisNode.INPUT_RULES.min'></el-input>
        <span>--</span>
        <el-input type="text" placeholder="" class="custom-item" v-model='thisNode.INPUT_RULES.max'></el-input>
        <span>小数位数</span>
        <el-input type="text" placeholder="" class="custom-item" v-model='thisNode.INPUT_RULES.decimal'></el-input>
      </div>
    </div>
    <div class='input-item' v-show='compute.unit'><label>单　　位</label><el-input  class="length custom-item" placeholder="请输入内容" v-model="thisNode.NODE_UNIT"></el-input></div>

    <div class='radio-item' style='margin-top: 20px' v-show='compute.title'><label>是否必填</label>
      <el-radio-group v-model="thisNode.IS_REQUIRED">
        <el-radio label="1">是</el-radio>
        <el-radio label="2">否</el-radio>
      </el-radio-group>
    </div>
    <div class='radio-item'><label>是否换行</label>
      <el-radio-group v-model="thisNode.IS_NEWLINE">
        <el-radio label="1">是</el-radio>
        <el-radio label="2">否</el-radio>
      </el-radio-group>
    </div>
    <div class='radio-item' v-if='thisNode.NODE_TYPE != 8'><label>是否显示</label>
      <el-radio-group v-model="thisNode.IS_SHOW">
        <el-radio label="1">是</el-radio>
        <el-radio label="2">否</el-radio>
      </el-radio-group>
    </div>
    <div class='radio-item' v-if='thisNode.NODE_TYPE != 8'><label>是否在列表中显示</label>
      <el-radio-group v-model="thisNode.IS_SHOW_IN_TABLE">
        <el-radio label="1">是</el-radio>
        <el-radio label="2">否</el-radio>
      </el-radio-group>
    </div>
    <tplDialog :CATEGORY='CATEGORY' ref='child'></tplDialog>
  </div>
</template>

<script>
  import tplDialog from './dialog'
    export default {
        name : "nodeConfig",

        props : ['thisNode'],

        components : { tplDialog },

        data(){
          return{
            CATEGORY : '',//1评估单题目；2：记录单题目，3：交接单题目
            compute : {
              title : true,
              type : false,
              text : false,
              select : false,
              num : false,
              unit : false
            },
            NODE_TYPE : [],
            INPUT_MODE : [],
            INPUT_TYPE : [],//输入类型
          }
        },

        methods : {
          questionChange(){
            this.thisNode.INPUT_RULES = { min : '' , max : '' , decimal : '' }
            this.compute.num = false
            this.jisuan()
          },
          merge(data){
            for(var k in data){
              this.thisNode[k] = data[k]
            }
            this.jisuan()
            console.log(this.thisNode)
          },
          nodeChange(){
            console.log(this.thisNode.NODE_TYPE)
            //节点配置为标题的话隐藏表单并将值清空
            if(this.thisNode.NODE_TYPE == 2 || this.thisNode.NODE_TYPE == 6){
              this.thisNode.INPUT_MODE = ''
              this.thisNode.INPUT_TYPE = ''
              this.thisNode.NODE_UNIT = ''
              this.thisNode.INPUT_LENGTH = ''
              this.thisNode.OPTIONS = ''
              this.thisNode.INPUT_RULES = { min : '' , max : '' , decimal : ''}
              this.thisNode.RELATE_TEMPLATE_ID = ''
              this.thisNode.IS_REQUIRED = ''
              this.jisuan()
            } else{
              this.compute.title = true
            }
            if(this.thisNode.NODE_TYPE == 4 || this.thisNode.NODE_TYPE == 5 || this.thisNode.NODE_TYPE == 7 || this.thisNode.NODE_TYPE == 3 || this.thisNode.NODE_TYPE == 6 || this.thisNode.NODE_TYPE == 8){ //4、5、7节点类型为导入题库 3为导入生命体征
              this.$refs.child.show()
              if(this.thisNode.NODE_TYPE == 4) this.CATEGORY = 1
              if(this.thisNode.NODE_TYPE == 5) this.CATEGORY = 2
              if(this.thisNode.NODE_TYPE == 7) this.CATEGORY = 3
              if(this.thisNode.NODE_TYPE == 3) this.CATEGORY = 4//生命体征
              if(this.thisNode.NODE_TYPE == 6) this.CATEGORY = 5
              if(this.thisNode.NODE_TYPE == 8) this.CATEGORY = 8//导入患者信息字典
            }

          },
          jisuan (){
            if(this.thisNode.NODE_TYPE == 2 || this.thisNode.NODE_TYPE == 6 || this.thisNode.NODE_TYPE == 8){
              this.compute.title = false
              this.thisNode.INPUT_MODE = ''
            } else{
              this.compute.title = true
            }
            if(this.thisNode.INPUT_MODE == 1 || this.thisNode.INPUT_MODE == 2){
              this.compute.text = true
              this.compute.unit = true
              this.compute.select = false
              this.thisNode.OPTIONS = ''
              this.thisNode.INPUT_MODE == 1 ? this.compute.type = true : this.compute.type = false
            }else if(this.thisNode.INPUT_MODE == 3 || this.thisNode.INPUT_MODE == 4 || this.thisNode.INPUT_MODE == 5 || this.thisNode.INPUT_MODE == 8){
              this.compute.select = true
              this.compute.unit = true
              this.compute.text = false
              this.compute.type = false
              this.thisNode.INPUT_LENGTH = ''
              this.thisNode.INPUT_TYPE = ''
            }else if(this.thisNode.INPUT_MODE == 6 || this.thisNode.INPUT_MODE == 7){
              this.compute.select = true
              this.compute.unit = true
              this.compute.text = true
              this.thisNode.INPUT_MODE == 7 ? this.compute.type = true : this.compute.type = false
            }else{
              this.compute.text = false
              this.compute.select = false
              this.compute.unit = false
              this.compute.type = false
              this.thisNode.INPUT_LENGTH = ''
              this.thisNode.INPUT_TYPE = ''
              this.thisNode.OPTIONS = ''
            }
            console.log(this.thisNode.INPUT_TYPE)
            if(this.thisNode.INPUT_MODE == '1' && this.thisNode.INPUT_TYPE == '1'){
              this.compute.num = true
            }else{
              this.compute.num = false
            }
          },
        },

      mounted(){
        for(var k in this.$store.getters.getPublicDoc.NODE_TYPE){//节点类型
          this.NODE_TYPE.push({ value : k , label : this.$store.getters.getPublicDoc.NODE_TYPE[k]})
        }
        this.$store.getters.getPublicDoc.INPUT_MODE.forEach((item , i) => {//题目方式
          this.INPUT_MODE.push({'value' : i + '' , "label" : item})
        })
        this.$store.getters.getPublicDoc.INPUT_TYPE.forEach((item ,i) => {//输入类型
          this.INPUT_TYPE.push({'value' : i + '' , "label" : item})
        })
      }
    }
</script>

<style scoped lang='stylus'>
  .form_right
    float left
    width 420px
    .input-item
      line-height 36px
      padding-top 20px
      label
        margin 0 20px
    .area
      margin 0 20px 10px
    .width310
      width 290px
    .length
      width 110px
    .el-select
      left -4px
    .input-type
      width 210px
    .radio-item
      line-height 36px
      label
        margin 0 20px
    .flex
      display flex
      .range
        flex 1
        margin-left 1px
        .el-input
          width 60px
          height 36px
          input
            height 36px
        span
          margin 0 15px
  .textarea
    &>>>.el-textarea__inner
      resize none
      height 100px
      background #F9F9FB
</style>
