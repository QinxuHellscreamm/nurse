<template>
  <div class="record">
    <div class='list'>
      <div class='top-menu'>
     <!--   <el-button class="trend" @click='dialogShow'>新增记录</el-button>-->
        <div class='right-button'>
          <print></print>
        </div>
      </div>

      <h1 style='font-size: 20px;text-align: center; margin: 0 0 20px'>{{TEMPLATE_NAME}}</h1>
      <div class="from-header" v-if='HEADER.length'>
        <div v-for='item of HEADER'>
          <label>{{item.NODE_NAME}}:</label>
          <span>{{item.VALUE}}</span>
        </div>
      </div>
      <div class='out-main'>
        <el-table  style="width: 100%" :data='LIST' @row-contextmenu='rightClick'>
          <el-table-column :label="item"  :prop='item' min-width="80" v-for='(item,index) of tables' :key='index'></el-table-column>
        </el-table>
      </div>
    </div>
    <addRecord ref='addRecord'  :seeText="seeText" :id='id' :INPATIENT_NUMBER='INPATIENT_NUMBER' :detile='detile'></addRecord>
    <div class="fixed" ref='fix' v-show='fixShow' @mouseout='out'>
      <div class='edit' @click='edit'>查看</div>
      <!--<div @click='del'>删除</div>-->
    </div>
    <el-dialog :visible.sync="popshow" title='预览' width='960px'>

      <el-date-picker
        v-model="begin"
        type="date"
        value-format="yyyy-MM-dd"
        @change='print_preview'
        placeholder="选择日期">
      </el-date-picker>
      <el-date-picker
        v-model="end"
        type="date"
        @change='print_preview'
        value-format="yyyy-MM-dd"
        placeholder="选择日期">
      </el-date-picker>
      <div ref="print">
        <div v-html='content'></div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="popshow = false">取 消</el-button>
        <el-button type='primary' @click='print'>打印</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import print from '@/components/print'
  import addRecord from './addRecord'
    export default {

      name: "record",

      props: ['id','INPATIENT_NUMBER','detile'],

      components:{addRecord,print},

      data() {
        return {
          tables : [],
          LIST:[],
          TEMPLATE_NAME : '',
          HEADER:[],
          fixShow : false,
          popshow : false,
          seeText : false,
          content : '',
          begin : '',
          end : ''
        }
      },

      created() {
        this.$nextTick(() => {
          this.getList()
        })
      },

      methods: {
        dialogShow(){
          this.$refs.addRecord.getData()
        },
        print(){
          this.$print(this.$refs.print)
        },
        getList(){
          this.getSer('datacenter/questionnaire',{ TYPE : 2 , TEMPLATE_ID : this.id , INPATIENT_NUMBER : this.INPATIENT_NUMBER },res=>{
            console.log(res);
            this.TEMPLATE_NAME = res.data.TEMPLATE_NAME
            this.tables = res.data.tables
            let arr = []
            for(var k in res.data.items){
              let obj = {}
              res.data.items[k].forEach(item=>{
                obj[item.NODE_NAME] = item.VALUE
              })
              obj.ID = k
              arr.push(obj)
            }
            this.LIST = arr
            this.HEADER = res.data.headers
            console.log(arr)
          this.seeText = false
          })
        },
        rightClick(obj,e){
          e.preventDefault()
          console.log(obj,e)
          this.obj = obj
          this.fixShow = true
          this.$refs.fix.style.left = e.clientX - 40 + 'px'
          this.$refs.fix.style.top = e.clientY - 30 + 'px'
          this.fixShow = true
        },
        out(e){
          if(e.toElement.className == 'right' || e.toElement.className == 'cell' || e.toElement.lastChild.className == 'cell') this.fixShow = false
        },
        edit(){
          this.fixShow = false
          this.$refs.addRecord.setData(this.obj.ID)
          this.seeText = true
        },
        del(){
          this._delete('datacenter/questionnaire/' + this.obj.ID,{ id : this.obj.ID },res => {
            if(res.status == 204){
              this.$message({type: 'success', message: '删除成功!'})
              this.getList()
              this.editId == this.obj.ID ? this.getData() : null
            }
          })
        },
        print_preview(){
          this.getSer('datacenter/tempstyle/lists', { id:this.id , inpatient_number:this.INPATIENT_NUMBER ,begin : this.begin ,end : this.end },res=>{
            this.content = res.data.content
            this.popshow = true
          })
        }
      },

      watch:{
        'id':function (id) {
          console.log(id)
          this.getList()
        },
      }
    }
</script>

<style scoped lang='stylus'>
  .record
    display flex
    height 100%
    flex 1
    .list
      flex 1
      .from-header
        display flex
        padding 10px 20px
        border-bottom 1px solid #dddddd
        div
          flex 1
          label,span
            color #878787
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
            float right
            margin-left 10px
    .fixed
      position fixed
      width 80px
      height 30px
      background-color #FFFFFF
      border 1px solid #dddddd
      z-index 2000
      div
        height 30px
        line-height 30px
        text-align center
        &:hover
          background-color #ddeff9
      .edit
        border-bottom 1px solid #dddddd

</style>
