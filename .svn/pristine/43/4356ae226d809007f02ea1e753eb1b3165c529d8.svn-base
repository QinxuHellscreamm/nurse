<template>
  <div class="record">
    <div class='list'>
      <div class='top-menu'>
        <el-button class="trend" @click='dialogShow' v-if='$route.name != "infoshare"'>新增记录</el-button>
        <el-button class="trend" @click='statistics' v-if='IS_COUNT == 1'>出入量统计</el-button>
        <span style='margin-left: 10px'>开始时间</span>
        <el-date-picker v-model="begin" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        <span style='margin-left: 10px'>结束时间</span>
        <el-date-picker v-model="end" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        <el-switch v-model="print_mian" active-text="双面打印" inactive-color="#ccc"></el-switch>
        <print style='position:relative;top:2px;margin-left: 10px;'></print>
        <el-button @click='getList' type='success'>刷新</el-button>
        <!--<el-button @click='paging.direction ="up" ;pageinfo.page = pageinfo.page>1?pageinfo.page-1:1; weiwatch++' icon='el-icon-caret-left' size='mini' circle></el-button>-->
        <!--<el-button @click='paging.direction ="down" ;pageinfo.page = pageinfo.page+1; weiwatch++ ' icon='el-icon-caret-right' size='mini' circle></el-button>-->
      </div>

      <div ref='print' style='width: 100%;' v-if='print_zh == 3'>
        <div ref='label' style='width: 100%;'>
          <h1 style='font-size: 20px;text-align: center; margin: 0 0 20px'>{{TEMPLATE_NAME}}</h1>
          <div class="from-header" style='border: none;' v-if='HEADER2.length'>
            <div v-for='item of HEADER2'>
              <label>{{item.NODE_NAME}}:</label>
              <span>{{item.VALUE}}</span>
            </div>
          </div>
          <div class="from-header" v-if='HEADER.length'>
            <div v-for='item of HEADER'>
              <label>{{item.NODE_NAME}}:</label>
              <span>{{item.VALUE}}</span>
            </div>
          </div>
        </div>
        <div class='no-out-main'>
          <el-table :data='LIST2' @row-contextmenu='rightClick' :row-style="tableRowStyle" style="width: 900px;">
            <el-table-column :label="item.NODE_NAME"  :prop='item.ID' min-width="10" v-for='(item,index) of tables' :key='index' :width='item.INPUT_MODE == 2 ? 220 : item.VS_ITEM_CODE == "T10600" ? 60 : item.VS_ITEM_CODE == "T12400" ? 60 : item.VS_ITEM_CODE == "T12300" ? 20 : item.ID == -1 ? 38 : item.ID == -2 ? 60 : ""' :align='item.INPUT_MODE == 2 ? "left" : "center"'><!--:width='item.INPUT_MODE == 2 ? 400 : ""'-->
              <el-table-column v-for='item1 of item.CHILD' :label="item1.NODE_NAME" :prop='item1.ID' :key='item1.ID' min-width="10" :width='item.INPUT_MODE == 2 ? 220 : item.VS_ITEM_CODE == "T10600" ? 60 : item.VS_ITEM_CODE == "T12400" ? 60 : item.VS_ITEM_CODE == "T12300" ? 20 : item.ID == -1 ? 38 : item.ID == -2 ? 60 : ""'>
                <el-table-column v-for='item2 of item1.CHILD' :label="item2.NODE_NAME" :prop='item2.ID' :key='item2.ID' min-width="10" :width='item.INPUT_MODE == 2 ? 220 : item.VS_ITEM_CODE == "T10600" ? 60 : item.VS_ITEM_CODE == "T12400" ? 60 : item.VS_ITEM_CODE == "T12300" ? 20 : item.ID == -1 ? 38 : item.ID == -2 ? 60 : ""'>
                  <el-table-column v-for='item3 of item2.CHILD' :label="item3.NODE_NAME" :prop='item3.ID' :key='item3.ID' min-width="10" :width='item.INPUT_MODE == 2 ? 220 : item.VS_ITEM_CODE == "T10600" ? 60 : item.VS_ITEM_CODE == "T12400" ? 60 : item.VS_ITEM_CODE == "T12300" ? 20 : item.ID == -1 ? 38 : item.ID == -2 ? 60 : ""'></el-table-column>
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div style='width: 100%' v-if='print_zh != 3' ref='print'>
        <div style='width: 100%;' ref='label' >
        <h1 style='font-size: 20px;text-align: center; margin: 0 0 20px'>{{TEMPLATE_NAME}}</h1>
        <div class="from-header" style='border: none;' v-if='HEADER2.length'>
          <div v-for='item of HEADER2'>
            <label>{{item.NODE_NAME}}:</label>
            <span>{{item.VALUE}}</span>
          </div>
        </div>
        <div class="from-header" v-if='HEADER.length'>
          <div v-for='item of HEADER'>
            <label>{{item.NODE_NAME}}:</label>
            <span>{{item.VALUE}}</span>
          </div>
        </div>
        </div>
        <div class='no-out-main'>
          <el-table :data='LIST2' @row-contextmenu='rightClick' :row-style="tableRowStyle" style="width: 1160px;">
            <el-table-column :label="item.NODE_NAME"  :prop='item.ID' min-width="10" v-for='(item,index) of tables' :key='index' :width='item.INPUT_MODE == 2 ? 220 : item.VS_ITEM_CODE == "T10600" ? 60 : item.VS_ITEM_CODE == "T12400" ? 60 : item.VS_ITEM_CODE == "T12300" ? 20 : item.ID == -1 ? 38 : item.ID == -2 ? 60 : ""' :align='item.INPUT_MODE == 2 ? "left" : "center"'><!--:width='item.INPUT_MODE == 2 ? 400 : ""'-->
              <el-table-column v-for='item1 of item.CHILD' :label="item1.NODE_NAME" :prop='item1.ID' :key='item1.ID' min-width="10" :width='item.INPUT_MODE == 2 ? 220 : item.VS_ITEM_CODE == "T10600" ? 60 : item.VS_ITEM_CODE == "T12400" ? 60 : item.VS_ITEM_CODE == "T12300" ? 20 : item.ID == -1 ? 38 : item.ID == -2 ? 60 : ""'>
                <el-table-column v-for='item2 of item1.CHILD' :label="item2.NODE_NAME" :prop='item2.ID' :key='item2.ID' min-width="10" :width='item.INPUT_MODE == 2 ? 220 : item.VS_ITEM_CODE == "T10600" ? 60 : item.VS_ITEM_CODE == "T12400" ? 60 : item.VS_ITEM_CODE == "T12300" ? 20 : item.ID == -1 ? 38 : item.ID == -2 ? 60 : ""'>
                  <el-table-column v-for='item3 of item2.CHILD' :label="item3.NODE_NAME" :prop='item3.ID' :key='item3.ID' min-width="10" :width='item.INPUT_MODE == 2 ? 220 : item.VS_ITEM_CODE == "T10600" ? 60 : item.VS_ITEM_CODE == "T12400" ? 60 : item.VS_ITEM_CODE == "T12300" ? 20 : item.ID == -1 ? 38 : item.ID == -2 ? 60 : ""'></el-table-column>
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </div>



    </div>
    <addRecord ref='addRecord' :id='id' :INPATIENT_NUMBER='INPATIENT_NUMBER' :detile='detile'></addRecord>
    <div class="fixed" ref='fix' v-show='fixShow' @mouseout='out' v-if='$route.name != "infoshare"'>
      <div class='edit' @click='edit'>编辑</div>
      <div @click='del'>删除</div>
    </div>
    <statistics :INPATIENT_NUMBER='INPATIENT_NUMBER' :id='id' ref='statistics' :HOSPITALIZED_DATE='detile.HOSPITALIZED_DATE'></statistics>
  </div>
</template>

<script>
  // Normal,1:横打列表，2：纵打单页, 3:纵打列表, 4:横打单页
  import print from '@/components/print'
  import addRecord from './addRecord'
  import statistics from './statistics'

    export default {

      name: "record",

      props: ['id','INPATIENT_NUMBER','detile'],

      components:{ addRecord,print,statistics },

      data() {
        return {
          print_mian:true,
          print_zh:1,
          weiwatch:1,
          show : false,
          tables : [],
          LIST:[],
          LIST2:[],
          TEMPLATE_NAME : '',
          HEADER:[],
          HEADER2:[],
          fixShow : false,
          content : '',
          begin : '',
          end : '',
          items : 0,
          IS_COUNT:  '',
          paging : {
            upRecord : 0,
            upLine : -1,
            downRecord : 0,
            downLine : -1,
            direction : 'down'
          },
          pageinfo :{
            page: 1,
            },
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
        tableRowStyle({row, column, rowIndex, columnIndex}) {
          console.log(rowIndex)
          //第八列添加 red 类
          if(this.print_zh!=3 && rowIndex%15 == 0){
            return 'background-color: #ffe600;page-break-after:always;'
          }
          if(this.print_zh==3 && rowIndex%24 == 0){
            return 'background-color: #ffe600;page-break-after:always;'
          }
        },
        getList(){
          this.tables = []
          this.getSer('datacenter/questionnaire',{ TYPE : 2 , TEMPLATE_ID : this.id , INPATIENT_NUMBER : this.INPATIENT_NUMBER , BEGIN:this.begin,END:this.end,...this.paging  },res=>{
            console.log(res)
            this.print_zh = res.data.REPORT_TYPE
            this.paging.upLine = res.data.upLine
            this.paging.upRecord = res.data.upRecord
            this.paging.downLine = res.data.downLine
            this.paging.downRecord = res.data.downRecord

            this.TEMPLATE_NAME = res.data.TEMPLATE_NAME
            this.tables = res.data.tables
            this.HEADER = []
            this.HEADER2 = []
            this.IS_COUNT = res.data.IS_COUNT
            this.LIST = JSON.parse(JSON.stringify(Object.values(res.data.items)))
            this.LIST.forEach(item=>{
              if(Object.values(item).join('') == ''){
                item.disab = true
              }
            })
            // var last = res.data.items[res.data.items.length-1]
            var last = []
            var data = []
            Object.values(res.data.items).forEach(item=>{
              if(Object.values(item).join('') == ''){
                item.disab = true
                last.push(item)
              }else{
                data.push(item)
              }
            })

            var arr = data.reverse()

            this.LIST2 = [...arr,...last]
            
            this.items = res.data.items.length
            res.data.headers.forEach(item=>{
              item.IS_NEW_LINE == 1 ? this.HEADER2.push(item) : this.HEADER.push(item)
            })
            this.LIST2 = this.LIST;
            console.log(this.LIST)
          })
        },
        rightClick(obj,e){
          if(obj.disab) return
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


          setTimeout(()=>{
            var LODOP = this.$getLodop()
            var strLabelStyle="<style>h1{font-size: 20px;text-align:center;}.from-header{display:flex;padding:0;font-size: 14px; height: 20px;float:left;} .from-header div{float:left;margin-right:5px; } .is-left>.cell{text-align:left}</style>";
            var strTableStyle="<style>table{border-collapse:collapse;table-layout:fixed;} td,th {border-collapse:collapse; font-weight: normal;min-width:10px;text-align:center;font-size:14px;border: 1px solid #000;} td{ min-height: 45px; font-family: MicrosoftYaHei, 'Avenir', Helvetica, Arial, sans-serif;} .cell{word-break:break-all;text-align: center;} .gutter{display: none} .is-left>.cell{text-align:left;word-break:break-all;font-size:14px;}</style>";

            var custom_dom = this.$refs.print
            var thead = custom_dom.getElementsByClassName('el-table__header')[0].getElementsByTagName('thead')[0]
            if(thead){
              custom_dom.getElementsByClassName('el-table__body-wrapper')[0].getElementsByTagName('table')[0].appendChild(thead)
            }


            // var strBodyHtml = strBodyStyle+"<body>"+this.$refs.print.innerHTML+"</body>";
            var strBodyHtml = strTableStyle + custom_dom.getElementsByClassName('el-table__body-wrapper')[0].innerHTML;

            LODOP.PRINT_INIT("")
            LODOP.SET_PREVIEW_WINDOW(2)
            this.print_zh == 3 ? LODOP.SET_PRINT_PAGESIZE(1,'210mm','297mm','a4') : LODOP.SET_PRINT_PAGESIZE(2,'210mm','297mm','a4')
            // LODOP.SET_PRINT_PAGESIZE(2,'210mm','297mm','a4')
            LODOP.ADD_PRINT_HTM('2mm', '20mm', '100%', '15mm', strLabelStyle+this.$refs.label.innerHTML);  //在纸张的左上角 打印"页眉页脚内容"
            LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);  //这行的作用：让前一行的内容 每页都打印。
            if (this.print_zh == 3) {
              LODOP.ADD_PRINT_TABLE('17mm','10mm','100%','300mm',strBodyHtml)//打印的表格内容
              LODOP.ADD_PRINT_HTM('322mm','50mm','100%','10mm',"<font  format='#' style='float: left;'>总页号：<span tdata='pageNO'>第##页</span>/<span tdata='pageCount'>共##页</span><span style='padding-left: 100px;'>主管护士对检测执行情况认可</span><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></font>")

            }else{
              LODOP.ADD_PRINT_TABLE('17mm','10mm','100%','190mm',strBodyHtml)//打印的表格内容
              LODOP.ADD_PRINT_HTM('217mm','80mm','100%','10mm',"<font  format='#' style='float: left;'>总页号：<span tdata='pageNO'>第##页</span>/<span tdata='pageCount'>共##页</span><span style='padding-left: 150px;'>主管护士对检测执行情况认可</span><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></font>")
            }
            // LODOP.ADD_PRINT_HTM('215mm','100mm','100%','10mm',"<font  format='#' style='float: left;'>总页号：<span tdata='pageNO'>第"+this.pageinfo.page+"页</span><span style='padding-left: 150px;'>主管护士对检测执行情况认可</span><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></font>")
            LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);  //这行的作用：让前一行的内容 每页都打印。
            LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Auto-Width")
            LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1)
            this.print_mian ? LODOP.SET_PRINT_MODE("DOUBLE_SIDED_PRINT",true) : null
            LODOP.PREVIEW()
            // LODOP.PRINT_DESIGN()

          },100)

        },


        statistics(){
          this.$refs.statistics.show()
        }
      },

      watch:{
        'id':function (id) {
          console.log(id)
          this.getList()
        },
        'begin':function () {
          this.getList()
        },
        'end':function () {
          this.getList()
        },
        'begin_print':function () {
          this.print_preview()
        },
        'end_print':function () {
          this.print_preview()
        },
        'weiwatch':function () {
          this.getList()
        }
      }
    }
</script>

<style scoped lang='stylus'>
  .red
    background red;
  .record
    display flex
    height 100%
    flex 1
    overflow-x auto
    .list
      flex 1
      max-height 760px
      overflow-y auto
      .from-header
        padding 10px 5px
        overflow hidden
        div
          float left
          margin-right 10px
          label,span
            color #1A2C4E
            font-size 12px
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
    .fixed
      position fixed
      width 80px
      height 60px
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
    .el-table
      border-top 1px solid #666
      width auto
      display inline-block !important
      display inline
      &>>>.el-table__header-wrapper,&>>>.el-table__body-wrapper
        .cell
          font-size 12px
          color #2B3A50
          text-align center
          padding 0
          text-overflow auto
        th
          border-right 1px solid #666
          border-bottom 1px solid #666
          text-align center
          /*font-weight 500*/
        td
          height 45px
          padding 0px
          border-right 1px solid #666
          border-bottom 1px solid #666
        td.is-left
          .cell
            font-size 14px
            text-align left
            height 45px
      &>>>.el-table__header-wrapper
        thead
          th
            border-right 1px solid #666
            border-bottom 1px solid #666
            text-align center
            /*font-weight 500*/

</style>
