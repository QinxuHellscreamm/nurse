<template>
    <li class='stage-in'>
        <div class='hospitalization_operation'>
          <div class='hospitalization'>
            <label>住院持续天数</label>
            <el-input v-model='stage.FEW_DATS' @blur="fewDat">
              <span class="el-input__icon" slot="suffix">天</span>
            </el-input>
          </div>
          <div>
            <label>手术(分娩)本阶段第</label>
            <el-input v-model='stage.THAT_DAY.DAYS'  @blur="thaDat">
              <span class="el-input__icon" slot="suffix">天</span>
            </el-input>
          </div>
        </div>
        <div class='advice'>
          <div>
            <label>执行医嘱</label>
            <el-button class='icon-btn' @click='deletOrders'><i class='el-icon-delete'></i></el-button>
            <el-button class='icon-btn' @click='ditOrders '><i class='el-icon-edit'></i></el-button>
            <el-button class='icon-btn' @click='addOrders'><i class='el-icon-circle-plus-outline'></i></el-button>
          </div>
          <div v-if='title == "新增护理计划" '>
            <ul>
              <li v-for='(item,index) of stage.EXECUTE_ORDER' v-show="item.IS_DELETE!=1">
                <div :class="{'current': orders_current_class == index}" @click='focusOrdersDiv(item,index)' v-if='index != orders_current'>{{ item }}</div>
                <el-input v-if='orders_current == index && ohy==true' v-model='impinput' @blur='blurOrders'></el-input>
              </li>
              <el-input  v-model='impinputs' placeholder="新增内容" v-if="ohy==false"></el-input>
            </ul>
          </div>
          <div v-else>
            <ul>
              <li v-for='(item,index) of stage.EXECUTE_ORDER' :class="setClass(index)" v-show="item.IS_DELETE!=1">
                <div :class="{'current': orders_current_class == index}"  @click='focusOrdersDiv(item,index)' v-if='index != orders_current ' >{{ item.EXECUTE_ORDER }}</div>
                <el-input v-if='orders_current == index' v-model='item.EXECUTE_ORDER' @blur='orders_current = -1'></el-input>
              </li>
            </ul>
          </div>
        </div>
        <div class='notes'>
        <div>
          <label>护理与健康指导</label>
          <el-button class='icon-btn' @click='deletNotes'><i class='el-icon-delete'></i></el-button>
          <el-button class='icon-btn' @click='ditNotes'><i class='el-icon-edit'></i></el-button>
          <el-button class='icon-btn' @click='addNotes'><i class='el-icon-circle-plus-outline'></i></el-button>
        </div>
        <div v-if='title == "新增护理计划" '>
          <ul>
            <li v-for='(item,index) of stage.HEALTH_NOTES' v-show="item.IS_DELETE!=1">
              <div :class="{'current': notes_current_class == index}"  @click='focusNotesDiv(item,index)' v-if='index != notes_current'>{{ item }}</div>
              <el-input v-if='notes_current == index && ohyn==true' v-model='nurinput' @blur='blurNotes'></el-input>
            </li>
            <el-input  v-model='nurinputs' placeholder="新增内容" v-if="ohyn==false"></el-input>
          </ul>
        </div>
          <div v-else>
            <ul>
              <li v-for='(item,index) of stage.HEALTH_NOTES' v-show="item.IS_DELETE!=1">
                <div :class="{'current': notes_current_class == index}" @click='focusNotesDiv(item,index)' v-if='index != notes_current'>{{ item.HEALTH_NOTES }}</div>
                <el-input v-if='notes_current == index' v-model='item.HEALTH_NOTES' @blur='notes_current = -1'></el-input>
              </li>
            </ul>
          </div>

      </div>
    </li>
</template>

<script>
    export default {
        name: "stageView",

        props:['stage','title'],

        data(){
          return{
            ohy:false,
            ohyn:false,
            orders_current : -1,
            orders_current_class : -1,
            notes_current:-1,
            notes_current_class:-1,
            deleteOrdersArr:[],
            deleteNotesArr:[],
            impinput:'',
            impinputs:'',
            nurinput:'',
            nurinputs:'',
            showOr:true,

          }
        },



        methods:{

          setClass(key) {
            let obj = {}
            obj[`face${key}`] = true
            return obj
          },

          fewDat(){
            this.$emit('childByValue', this.stage.FEW_DATS)},
          thaDat(){
            this.$emit('childthaValue', this.stage.THAT_DAY.DAYS)
          },
          focusOrdersDiv(item,index){
            console.log("aaaaaa",item,index)
            this.impinput = item
            this.orders_current_class = index
            this.orders_current = -1
          },
          focusNotesDiv(item,index){
            this.nurinput = item
            this.notes_current_class = index
            this.notes_current = -1
          },
          blurOrders(){
            this.orders_current = -1
            this.stage.EXECUTE_ORDER[this.orders_current_class] = this.impinput
            this.ohy=false
          },
          blurNotes(){
            this.notes_current = -1
            this.stage.HEALTH_NOTES[this.notes_current_class] = this.nurinput
            this.ohyn=false
          },
          ditOrders(){
            if(this.title == '编辑护理计划'){
              this.orders_current = this.orders_current_class
            }else {
              this.ohy=true
              this.orders_current = this.orders_current_class
            }
          },
          ditNotes(){
            if(this.title == '编辑护理计划'){
              this.notes_current = this.notes_current_class
            }else {
              this.ohyn=true
              this.notes_current = this.notes_current_class
            }
          },

          addOrders(){
            if(this.title == '编辑护理计划'){
              if(this.stage.EXECUTE_ORDER.length == 0){
                this.stage.EXECUTE_ORDER.push({ID:'', EXECUTE_ORDER:''})
              }else{
                this.stage.EXECUTE_ORDER[this.stage.EXECUTE_ORDER.length - 1].EXECUTE_ORDER != '' ? this.stage.EXECUTE_ORDER.push({ID:'', EXECUTE_ORDER:''}) : null
              }
              this.orders_current = this.stage.EXECUTE_ORDER.length - 1
            }else {
             this.stage.EXECUTE_ORDER.push(this.impinputs)
              this.impinputs = ""
            }
          },
          addNotes(){
            if(this.title == '编辑护理计划') {
              if (this.stage.HEALTH_NOTES.length == 0) {
                this.stage.HEALTH_NOTES.push({ID: '', HEALTH_NOTES: ''})
              } else {
                this.stage.HEALTH_NOTES[this.stage.HEALTH_NOTES.length - 1].HEALTH_NOTES != '' ? this.stage.HEALTH_NOTES.push({
                  ID: '',
                  HEALTH_NOTES: ''
                }) : null
              }
              this.notes_current = this.stage.HEALTH_NOTES.length - 1
            }else {
              this.stage.HEALTH_NOTES.push(this.nurinputs)
              this.nurinputs = ""
            }
          },
          deletOrders(){
            if(this.stage.EXECUTE_ORDER.length!=0){
              if(this.title == '编辑护理计划'){
                if(this.stage.EXECUTE_ORDER[this.orders_current_class].ID){ //有ID则表示是后台数据删除时需要加标记
                  this.stage.EXECUTE_ORDER[this.orders_current_class].IS_DELETE = 1
                  this.deleteOrdersArr.push(this.stage.EXECUTE_ORDER[this.orders_current_class])
                  /*                //this.showOr = !this.showOr
                   let higt = 'face'+this.orders_current_class
                   // let cNodes = document.getElementsByClassName(higt);
                   console.log("sssss")
                   // cNodes.style.display = "none";*/

                }
              }else {
                this.stage.EXECUTE_ORDER.splice(this.orders_current_class,1)
              }

              //this.stage.EXECUTE_ORDER.splice(this.orders_current_class,1)

              console.log("www",this.stage.EXECUTE_ORDER)
            }

          },
          deletNotes(){
            if(this.stage.HEALTH_NOTES.length!=0){
              if(this.title == '编辑护理计划') {
                if (this.stage.HEALTH_NOTES[this.notes_current_class].ID) { //有ID则表示是后台数据删除时需要加标记
                  this.stage.HEALTH_NOTES[this.notes_current_class].IS_DELETE = 1
                  this.deleteNotesArr.push(this.stage.HEALTH_NOTES[this.notes_current_class])
                }

              }else {
                this.stage.HEALTH_NOTES.splice(this.notes_current_class, 1)
              }
            }

          },
         /* fewData(){
            if(this.stage.FEW_DATS ==""){
              this.$message({type: 'warning', message: '住院天数不能为空!'})
            }
          },*/
        },

      created(){
        this.$nextTick(()=>{
          this.fewDat()

        })
      }

    }
</script>

<style scoped lang='stylus'>
  .stage-in
    border 1px solid #dddddd
    padding 12px 10px
    border-radius 4px
    .hospitalization_operation
      display flex
      .el-input
        width 120px
        &>>>.el-input__inner
          background-color #F9F9FB
        &>>>.el-input__icon
          margin-right 10px
      .hospitalization
        margin-right 30px
    .advice,.notes
      label
        font-size 16px
        font-weight bold
        line-height 40px
      .el-button
        float right
        border none
        padding 0
        margin 12px 8px
        i
          font-size 20px
        .el-icon-circle-plus-outline
          color #11C462
        .el-icon-edit
          color #00B3DC
        .el-icon-delete
          color #E63922
    ul
      background-color #F9F9FB
      border 1px solid #dddddd
      border-radius 4px
      min-height 40px
      li
        line-height 40px
        div
          padding 0 10px
        .current
          background-color #DDEFF9
          border none
          outline none
        .el-input
          width 640px
          margin 10px 0
</style>
