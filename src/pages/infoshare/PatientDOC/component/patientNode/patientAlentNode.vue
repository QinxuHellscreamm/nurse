<template>
  <div :class= "{'title': this.nodeData.NODE_TYPE == 2}">
    <div v-if='nodeData.NODE_TYPE == 2' class='title node-item'>{{this.nodeData.NODE_NAME}}</div><!--标题-->
    <div v-if='nodeData.INPUT_MODE === 0' class='node-item'>{{nodeData.NODE_NAME}}</div><!--无 文本类型-->
    <div class='node-item item1' v-if='nodeData.INPUT_MODE == 1'><!--单行文本-->
      <label class='marg5'>
        <span v-if='nodeData.IS_REQUIRED == 1 '>*</span>
        {{nodeData.NODE_NAME}}
      </label>
      <el-input placeholder='请输入' v-model='nodeData.VALUE.content' v-if='nodeData.INPUT_TYPE == 2' :maxlength='nodeData.INPUT_LENGTH'><!--文本-->
        <span class="el-input__icon" slot="suffix">{{nodeData.NODE_UNIT}}</span>
      </el-input>
      <el-input placeholder='请输入' v-model='nodeData.VALUE.content' v-if='nodeData.INPUT_TYPE == 1' :maxlength='nodeData.INPUT_LENGTH' :min='nodeData.INPUT_RULES.min' :max='nodeData.INPUT_RULES.max' type='number'><!--数字-->
        <span class="el-input__icon" slot="suffix">{{nodeData.NODE_UNIT}}</span>
      </el-input>
      <el-time-picker v-model="nodeData.VALUE.content" placeholder="" v-if='nodeData.INPUT_TYPE == 3'></el-time-picker><!--时间-->
      <el-date-picker v-model="nodeData.VALUE.content" value-format='yyyy-MM-dd' type="date" placeholder="选择日期" v-if='nodeData.INPUT_TYPE == 4'><!--日期-->
      </el-date-picker>
    </div>
    <div class='node-item item2' v-if='nodeData.INPUT_MODE == 2'><!--多行文本-->
      <label class='marg5'>
        <span v-if='nodeData.IS_REQUIRED == 1 '>*</span>
        {{nodeData.NODE_NAME}}
      </label>
      <el-input type="textarea" placeholder="请输入" :maxlength='nodeData.INPUT_LENGTH' v-model='nodeData.VALUE.content'></el-input>
    </div>
    <div class="node-item" v-if='nodeData.INPUT_MODE == 3'><!--单选-->
      <label class='marg5'>
        <span v-if='nodeData.IS_REQUIRED == 1 '>*</span>
        {{nodeData.NODE_NAME}}
      </label>
      <el-radio-group v-model="nodeData.VALUE.option[0]" @change='computedScore'>
        <el-radio v-for="(item,index) of radios" :label="index + 1 + ''" :key='index'>{{item.title}}</el-radio>
      </el-radio-group>
    </div>
    <div class="node-item" v-if='nodeData.INPUT_MODE == 4'><!--多选-->
      <label class='marg5'>
        <span v-if='nodeData.IS_REQUIRED == 1 '>*</span>
        {{nodeData.NODE_NAME}}
      </label>
      <el-checkbox-group v-model="nodeData.VALUE.option" @change='checkboxComputedScore'>
        <el-checkbox v-for="(item,index) of radios" :label="index + 1 + ''" :key='index'>{{item.title}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="node-item" v-if='nodeData.INPUT_MODE == 5'><!--下拉选择-->
      <label class='marg5'>
        <span v-if='nodeData.IS_REQUIRED == 1 '>*</span>
        {{nodeData.NODE_NAME}}
      </label>
      <el-select v-model="nodeData.VALUE.option[0]" placeholder="请选择" @change='computedScore'>
        <el-option v-for="(item,index) in radios" :key="item.title" :label="item.title" :value="index + 1 + ''">
          <span style="float: left">{{ item.title }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ nodeData.NODE_UNIT }}</span>
        </el-option>
      </el-select>
    </div>
    <div class="node-item" v-if='this.nodeData.INPUT_MODE == 6'>
      <label class='marg5'>
        <span v-if='nodeData.IS_REQUIRED == 1 '>*</span>
        {{nodeData.NODE_NAME}}
      </label>
      <el-autocomplete
        class="inline-input"
        v-model="state1"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        @select="handleSelect"
      ></el-autocomplete>
    </div>
    <div class="node-item" v-if='this.nodeData.INPUT_MODE == 7'>
      <label class='marg5'>
        <span v-if='nodeData.IS_REQUIRED == 1 '>*</span>
        {{nodeData.NODE_NAME}}
      </label>
      <el-radio-group v-model="radio">
        <el-radio v-for="(item,index) of radios" :label="item.label" :key='index'>
          <template>
            <el-input v-model='item.title' v-if='item.custom' style="width: 50%;"></el-input>
            <span v-if='item.custom == undefined'>{{item.title}}</span>
          </template>
        </el-radio>
      </el-radio-group>
    </div>
    <div class="node-item item1" v-if='this.nodeData.NODE_TYPE == 6' @click='clickShow(nodeData.RELATE_TEMPLATE_ID)'><!--评估单模板-->
      <label class='marg5'>
        <span v-if='nodeData.IS_REQUIRED == 1'>*</span>
        {{nodeData.NODE_NAME}}
      </label>
      <el-input v-model='nodeData.VALUE.score' readonly v-if='nodeData.VALUE.score'></el-input>
      <el-input placeholder='点击弹出' value='' readonly v-if='!nodeData.VALUE.score'></el-input>
    </div>
    <div v-if='rander' style="display: flex;flex-wrap: wrap;">
      <patientAlentNode v-for='(child,index) of nodeData.CHILDS' :nodeData='child' :key=index :class='{"br":child.IS_NEWLINE == "1"}'></patientAlentNode>
    </div>
  </div>

</template>

<script>
  import patientAlentNode from './patientAlentNode'
  export default {
    data(){
      return{
        rander : false,
        INPUT_MODE : '',
        maxlength : '',
        radio : '',
        radios : [],
        unit : '',
        restaurants : [],
        state1 : '',
      }
    },

    name: 'patientAlentNode',

    components : { patientAlentNode},

    props : ['nodeData'],

    methods : {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      handleSelect(item) {
        console.log(item);
      },
      computedScore(value){
        console.log(value)
        this.nodeData.VALUE.score = this.radios[value-1].label - 0
      },
      clickShow(templateId){
        this.$refs.alertNode.getData(templateId)
      },
      checkboxComputedScore(arr){
        let score = 0
        this.nodeData.VALUE.option.forEach(item=>{
          this.radios.forEach((radio,index)=>{
            item == (index-1) ? score += Number(radio.label) : null
          })
        })
        this.nodeData.VALUE.score = score
      }
    },

    created(){
      if(this.nodeData.CHILDS)  this.rander = true
      this.unit = this.nodeData.NODE_UNIT ? this.nodeData.NODE_UNIT : ''
      if(this.nodeData.OPTIONS){
        console.log(this.nodeData);
        var arr = this.nodeData.OPTIONS.split('\n')
        console.log('arr')
        console.log(arr)
        arr.forEach( item => {

          if(item.split('||').length == 2){
            this.radios.push({ title : item.split('||')[0] + this.unit , label : item.split('||')[1] , custom : true })
          }else{
            this.radios.push({ title : item.split('|')[0] + this.unit , label : item.split('|')[1] })
          }
          //可填可下拉
          this.restaurants.push({"value":item.split('|')[1]})
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .node-item
    display block
    margin-top 10px
    line-height 40px
    margin-right 10px
    .marg5
      margin-right 5px
  .item1 >>> .el-input__inner
    width 210px
    &::-webkit-outer-spin-button,&::-webkit-inner-spin-button
      -webkit-appearance none
    &[type="number"]
      -moz-appearance textfield
  .item2 >>> .el-textarea__inner
    width 310px
    resize none
    background-color #F9F9FB
  .item1
    .el-input
      width 210px
  .br
    width 100%
  .title
    width 100%
    line-height 40px
</style>
