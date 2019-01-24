<template>
    <span>
      <el-button @click="editEvent" type="text" size="small">编辑</el-button>
      <el-dialog :visible.sync="popshow"  append-to-body width='556px'>
        <div class="el-dialog__header" slot='title'>
          <span class="el-dialog__title">事件{{ eventIndex + 1 | chineseNumber}}</span>
          <button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button>
        </div>

        <div class='condition'>
          <span>符合</span>
          <el-select v-model='item.CONDITIONS.type' @change='' >
            <el-option label="全部" value="AND"></el-option>
            <el-option label="任何" value="OR"></el-option>
          </el-select>
          <span>以下条件</span>
        </div>

        <div class="events">
          <ul>
            <li v-for="(event,index) of item.CONDITIONS.items" :key=index>
              <label>{{name}}</label>
              <el-select v-model='event.symbol' class='symbol'>
                 <el-option :label="symbol.label" :value="symbol.value" v-for='(symbol,i) of symbols' :key='i'></el-option>
              </el-select>
              <el-select v-model='event.input_type' class='input-type'>
                  <el-option label="值" value="2"></el-option>
                  <!--<el-option label="选项" value="1"></el-option>-->
              </el-select>
              <el-input v-model='event.val' v-if='event.input_type ==2' class='val'></el-input>
              <el-select v-model='event.val' v-if='event.input_type ==1' class='val'>
                  <el-option :label="opation.name" :value="opation.code" v-for='(opation,ii) of opations' :key='ii'></el-option>
              </el-select>
              <i class='el-icon-delete' @click='deleteEvent(index)'></i>
            </li>
          </ul>
          <el-button @click='addEvent' class='add'>
            <i class='el-icon-circle-plus-outline'></i>
            <span>新增</span>
          </el-button>
        </div>
        <div class="nursing-measures">
          <div class='top'>
            <span>护理措施</span>
            <el-button @click="rightShow = !rightShow" type="text" size="small">选择护理措施</el-button>
          </div>
          <el-input type="textarea" placeholder="请输入内容" v-model="textarea" readonly></el-input>
        </div>
        <transition name="fade">
          <div class='right-bar' v-if='rightShow'>
            <span>护理措施</span>
            <el-input @change="getEventTitle" placeholder="搜索关键字" v-model="event_title"></el-input>
            <el-checkbox-group v-model="checkList">
              <el-checkbox :label="check.ID" v-for='(check,index) of nursingMeasures' :key='index'>{{check.CONTENT}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </transition>
        <div slot="footer" class="dialog-footer">
          <el-button @click="popshow=false" class='close'>取 消</el-button>
          <el-button @click="popshow=false">确 定</el-button>
        </div>
      </el-dialog>
    </span>
</template>

<script>
  export default {
    name: "event",

    props:['item','eventIndex','name','opations','nursingMeasures'],

    data(){
      return{
        popshow : false,
        symbols: [{value: '>',label: '>'}, { value: '<',label: '<'}, {value: '=', label: '='}, {value: '≠', label: '≠'}, {value: '>=', label: '>='}, {value: '<=', label: '<='}],
        textarea : '',
        rightShow : false,
        checkList : [],
        event_title : '',
      }
    },

    methods:{
      editEvent(){
        this.popshow = true
        this.item.TYPE =='ADD'?null:this.item.TYPE =='UPDATE'
      },
      addEvent(){
        this.item.CONDITIONS.items.push({ symbol : ">" , val : '' ,input_type : '2'})
      },
      deleteEvent(index){
        this.item.CONDITIONS.items.splice(index,1)
      },
      getEventTitle(){
        console.log(this.$parent)

        this.getSer('datacenter/measurebank',{ keyword : this.event_title , page : 1 , 'per-page' :1000 }, res => {
            if(res.status <= 400){
                this.nursingMeasures = res.data.items;
                console.log('this.checkList');
                console.log(this.checkList);
            }
        })
      }
    },

    created(){
      this.$nextTick(()=>{
        let arr = []
        this.item.NURSING_MEASURES.forEach(item=>{
          arr.push(item.id)
        })
        this.checkList = arr
      })
    },

    watch:{
      'checkList' : function (This) {
        let str = ''
        this.item.NURSING_MEASURES = []
        This.forEach((item,i)=>{
          this.nursingMeasures.forEach((label,index)=>{
            if(label['ID'] == item){
              str += (label.CONTENT+'\n')
              this.item.NURSING_MEASURES.push({id:item,content:label.CONTENT})
            }
          })
        })

        this.textarea = str
      }
    }
  }
</script>

<style scoped lang='stylus'>
  .el-dialog
    z-index 2
    .el-dialog__body
      padding 0 24px 30px
    .el-dialog__header
      padding 10px 10px 15px
    .el-dialog__footer
      .el-button
        background-color #00B3DC;
        color #FFFFFF
        padding 12px 40px
        &.close
          background-color #DDEFF9
          color #00B3DC
          padding 12px 31px
  .condition
    color #6C8B97
    .el-select
      width 100px
      margin 0 5px
  .events
    overflow auto
    border 1px solid #D8E3E7
    border-radius 4px
    margin-top 20px
    width 506px
    height 180px
    &::-webkit-scrollbar
      width 6px
    &::-webkit-scrollbar-thumb
      -webkit-box-shadow inset 0 0 5px rgba(0,0,0,0.2)
      background #00B3DC
      border-radius 7px
    &::-webkit-scrollbar-track
      -webkit-box-shadow inset 0 0 5px rgba(0,0,0,0.2)
      background-color #d8ebf4
      border-radius 7px
    li
      margin-top 10px
    label
      display inline-block
      text-align right
      width 6em
      margin-right 5px
    .symbol,.input-type
      width 86px
      margin-right 5px
    .val
      width 160px
      margin-right 5px
    .add
      margin 20px
      position relative
      padding 12px 15px 12px 35px
      background-color #F9F9FB
      .el-icon-circle-plus-outline
        position absolute
        font-size 20px
        color #11C462
        left 14px
        top 10px
    .el-icon-delete
      font-size 26px
      position relative
      top 3px
      margin-left 8px
      color #E63922
  .nursing-measures
    .top
      line-height 55px
      .el-button
        float right
        line-height 55px
        padding 0
    .el-textarea
      & >>>.el-textarea__inner
        resize none
        height 180px
        background #F9F9FB
        &::-webkit-scrollbar
          width 6px
        &::-webkit-scrollbar-thumb
          -webkit-box-shadow inset 0 0 5px rgba(0,0,0,0.2)
          background #00B3DC
          border-radius 7px
        &::-webkit-scrollbar-track
          -webkit-box-shadow inset 0 0 5px rgba(0,0,0,0.2)
          background-color #d8ebf4
          border-radius 7px
  .right-bar
    position absolute
    top 0
    right -266px
    height 654px
    width 266px
    background-color #fff
    z-index 1
    opacity 1
    box-sizing border-box
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
    border-radius: 0 4px 4px 0
    padding 0 20px
    span
      display block
      line-height 64px
      font-size 18px
      color #303133
    .el-checkbox-group
      height 518px
      overflow-y auto
      margin-top 15px
      &::-webkit-scrollbar
        width 6px
      &::-webkit-scrollbar-thumb
        -webkit-box-shadow inset 0 0 5px rgba(0,0,0,0.2)
        background #00B3DC
        border-radius 7px
      &::-webkit-scrollbar-track
        -webkit-box-shadow inset 0 0 5px rgba(0,0,0,0.2)
        background-color #d8ebf4
        border-radius 7px
      .el-checkbox
        margin-bottom 15px
        display block
      .el-checkbox+.el-checkbox
        margin-left 0
  .el-select>>>.el-input__inner,.el-input>>>.el-input__inner
    background #F9F9FB
  .fade-enter-active, .fade-leave-active
    transition opacity 1s
  .fade-enter, .fade-leave-active
    opacity  0

</style>
