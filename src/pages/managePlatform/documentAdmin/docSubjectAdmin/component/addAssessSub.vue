<template>
  <div>
    <transition name="info">
      <div class="setcon edit" v-show="popshow">
        <div class="partset2">
          <div class="partset-header">
            <h5>{{showtext}}</h5>
            <i class="el-icon-close" @click="chang()"></i>
          </div>

          <div class="selbox">

            <div class='selbox-div'>
              <span style="">题目方式</span>
              <el-select style='flex: 1;margin-left: 15px;' v-model="TYPE" @change="change">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
              </el-select>
            </div>

            <div class='selbox-div'>
              <span>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题</span>
              <input type="text" class="this_input" v-model='SUBJECT'>
            </div>

            <div style='margin-bottom: 10px;' v-show='compute.select'>
              <span style="margin-bottom: 10px;">选项内容</span>
            </div>
            <div class='selbox-div' v-show='compute.select'>
              <el-input class="textarea" type="textarea" placeholder="输入选项值（每行一个）" v-model="OPTIONS"></el-input>
            </div>

            <div class="selbox_bottom">
              <div class='selbox-div' v-show='compute.text'>
                <span>输入长度</span>
                <input type="text" placeholder="" class="this_input" v-model='INPUT_LENGTH'>
              </div>

              <div class='selbox-div' v-show='compute.type'>
                <span style="">输入类型</span>
                <el-select style='flex: 1;margin-left: 15px;' v-model='INPUT_TYPE' @change='change'>
                  <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </div>
              <div class='selbox-div2' v-show='compute.num'>
                <span >输入范围</span>
                <div class="range">
                  <input type="text" placeholder="" class="this_input" v-model='INPUT_RULES.min'>
                  <span>--</span>
                  <input type="text" placeholder="" class="this_input" v-model='INPUT_RULES.max'>
                  <span>小数位数</span>
                  <input type="text" placeholder="" class="this_input" v-model='INPUT_RULES.decimal'>
                </div>
              </div>

              <div class='selbox-div' v-show='compute.unit'>
                <span>单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位</span>
                <input type="text" style="width: 110px;flex: 0;" class="this_input" v-model='UNIT'>
              </div>

            </div>

          </div>

          <div class="partset-footer">
            <button class="btn-pop-sure"  @click="addsub(id)">确定</button>
            <button class="btn-pop-cancel" @click="popshow = false">取消</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default{
    props : ["CATEGORY" , 'opationType'],
    data(){
      return {
        showtext : '',
        id : '',//用于编辑功能
        popshow : false,
        options : [],//["无", "单行文本", "多行文本", "单选", "多选", "下拉筛选", "可选可填项", "选择并输入"]
        options2 : [],//["无", "数字", "文本", "时间", "日期", "单选", "年月"]
        SUBJECT : '',
        TYPE : '',
        INPUT_TYPE : '',
        OPTIONS : '',
        UNIT : '',
        INPUT_LENGTH : '',
        INPUT_RULES : {
          min : '', max : '', decimal : ''
        },
        compute : {
          type : false,
          text : false,
          select : false,
          num : false,
          unit : false
        }
      }
    },
    methods: {
      jisuan (){
        if(this.TYPE == 1 || this.TYPE == 2){
          this.compute.text = true
          this.compute.unit = true
          this.compute.select = false
          this.OPTIONS = ''
          this.TYPE == 1 ? this.compute.type = true : this.compute.type = false
        }else if(this.TYPE == 3 || this.TYPE == 4 || this.TYPE == 5){
          this.compute.select = true
          this.compute.unit = true
          this.compute.text = false
          this.compute.type = false
          this.INPUT_LENGTH = ''
          this.INPUT_TYPE = ''
        }else if(this.TYPE == 6 || this.TYPE == 7){
          this.compute.select = true
          this.compute.unit = true
          this.compute.text = true
          this.TYPE == 7 ? this.compute.type = true : this.compute.type = false
        }else{
          this.compute.text = false
          this.compute.select = false
          this.compute.unit = false
          this.compute.type = false
          this.INPUT_LENGTH = ''
          this.INPUT_TYPE = ''
          this.OPTIONS = ''
        }
        if(this.TYPE == 1 && this.INPUT_TYPE == 1){
          this.compute.num = true
        }else{
          this.compute.num = false
        }
      },
      addsub (id){
        var obj =  {
          "id" : id,
          "CATEGORY" : this.CATEGORY,
          "SUBJECT" : this.SUBJECT,
          "TYPE" : this.TYPE,
          "INPUT_TYPE" : this.INPUT_TYPE,
          "OPTIONS" : this.OPTIONS,
          "UNIT" : this.UNIT,
          "INPUT_LENGTH" : this.INPUT_LENGTH,
          "INPUT_RULES" : JSON.stringify(this.INPUT_RULES)
        }
        if (this.opationType === 2){
          this._put('datacenter/question/' + id , obj , res => {
            this.$message({
              message : res.data.message,
              duration : 1000,
              type : 'success'
            });
            this.popshow = !this.popshow
            this.$parent.pageAjax(this.$parent.currentPage1.va , this.$parent.currentPage1 , 9)
          })
        }else{
          this.post('datacenter/question' , obj , res => {
            this.$message({
              message: res.data.message,
              duration:1000,
              type: 'success'
            });
            this.popshow = !this.popshow
            this.$parent.pageAjax(this.$parent.currentPage1.va , this.$parent.currentPage1 , 9)
          })
        }
      },
      chang() {
        this.popshow = !this.popshow
        this.SUBJECT = ''
        this.TYPE = ''
        this.INPUT_TYPE = ''
        this.OPTIONS = ''
        this.UNIT = ''
        this.INPUT_LENGTH = ''
        this.jisuan()
      },
      tostr(arr) {
        var str = ''
        arr.forEach((item,i) => {
          str += item['TITLE'] +'|' +item['SCORE'] + "\n"
        })
        return str
      },
      edit(id) {
        this.id = id
        this.getSer('datacenter/question/'+id ,{ id : id } , res => {
          console.log(res);
          this.popshow = !this.popshow
          this.SUBJECT = res.data.SUBJECT
          this.TYPE = res.data.TYPE - 0,
          this.INPUT_TYPE = res.data.INPUT_TYPE - 0,
          this.OPTIONS = this.tostr(res.data.OPTIONS),
          this.UNIT = res.data.UNIT,
          this.INPUT_LENGTH = res.data.INPUT_LENGTH
          this.jisuan()
        })
      },
      change() {
        this.INPUT_RULES = { min : '' , max : '' , decimal : '' }
        this.compute.num = false
        this.jisuan()
      },
    },
    mounted(){
      this.$nextTick(() => {
        this.$store.getters.getPublicDoc.INPUT_MODE.forEach((item , i) => {
          this.options.push({'value' : i , "label" : item})
        })
        this.$store.getters.getPublicDoc.INPUT_TYPE.forEach((item ,i) => {
          this.options2.push({'value' : i , "label" : item})
        })
      })
    }
  }
</script>
<style scoped lang="stylus">

  .setcon
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.10);
    position: absolute;
    left: 0;
    top: 0;
    z-index:2000;
    .selbox
      .selbox-div2
        margin-bottom 20px
        display flex
        span
          line-height 40px
        .range
          margin-left 15px
          flex 1
          .this_input
            width 60px
            background-color #f9f9fb
            height 40px
            padding:0 12px
            line-height 40px
            border 1px solid #D8E3E7
            border-radius 4px
            color #6C8B97
            -webkit-box-sizing border-box
            box-sizing border-box
            vertical-align middle
          span
            margin 0 12.5px;
      .selbox-div
        margin-bottom 20px
        display flex
        span
          line-height 40px
        .this_input
          flex 1
          background-color #f9f9fb
          margin-left 15px
          height 40px
          padding:0 12px
          line-height 40px
          border 1px solid #D8E3E7
          border-radius 4px
          color #6C8B97
          -webkit-box-sizing border-box
          box-sizing border-box
          vertical-align middle
      .selbox_bottom
        margin-top 30px
      .t_bd
        border-bottom 1px solid #eee
        line-height 30px
        display flex
        label
          width 40px
          border-left 1px solid #eee
          border-right 1px solid #eee
          box-sizing border-box
          -webkit-box-sizing border-box
        div
          flex 1
          box-sizing border-box
          -webkit-box-sizing border-box
          border-right 1px solid #eee

  .partset2
    width 444px
    padding 0 30px 80px 30px
    background #fff
    -webkit-box-shadow 0 0 10px 0 rgba(0, 0, 0, 0.10)
    box-shadow 0 0 10px 0 rgba(0, 0, 0, 0.10)
    border-radius 4px
    -webkit-box-sizing: border-box
    box-sizing border-box
    position absolute
    left 0
    top 10%
    right 0
    margin auto
    z-index 999
    .partset-footer
      &>button
        float right

  .textarea >>> .el-textarea__inner
    resize none
    height 180px
    background-color #f9f9fb


</style>
