<template>
  <el-dialog :visible.sync="viewdialogFormVisible" title='预览' width='1200px'>

    <div ref='print'>
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
      <el-table :data='LIST' class='custom'>
        <el-table-column :label="item.NODE_NAME"  :prop='item.ID' min-width="10" v-for='(item,index) of tables' :key='index' :width='item.INPUT_MODE == 2 ? 100 : item.VS_ITEM_CODE == "T10600" ? 40 : "" || item.ID == -1 ? "40" : ""' :align='item.INPUT_MODE == 2 ? "left" : "center"'><!--:width='item.INPUT_MODE == 2 ? 400 : ""'-->
          <el-table-column v-for='item1 of item.CHILD' :label="item1.NODE_NAME" :prop='item1.ID' :key='item1.ID' min-width="14">
            <el-table-column v-for='item2 of item1.CHILD' :label="item2.NODE_NAME" :prop='item2.ID' :key='item2.ID' min-width="14">
              <el-table-column v-for='item3 of item2.CHILD' :label="item3.NODE_NAME" :prop='item3.ID' :key='item3.ID' min-width="14"></el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer">


      <el-button @click='print_preview' type='primary'>打印</el-button>
      <el-button @click="popshow = false" class='close'>取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>

    export default {
        name: "recordl_Preview",

        data(){
          return{
            viewdialogFormVisible: false,
            LIST:[],
            tables:[],
            HEADER:[],
            HEADER2:[],
            TEMPLATE_NAME:''
          }
        },

        methods : {
          getData(TEMPLATE_ID){
            this.tables = []
            this.LIST = []
            this.HEADER2 = []
            this.HEADER = []

            this.getSer("datacenter/template/preview" , { TEMPLATE_ID , TYPE:2 },res => {
              console.log(res)
              this.viewdialogFormVisible = true
              this.LIST = JSON.parse(JSON.stringify(Object.values(res.data.items)))
              this.tables = res.data.tables

              this.TEMPLATE_NAME = res.data.TEMPLATE_NAME
              res.data.headers.forEach(item=>{
                item.IS_NEW_LINE == 1 ? this.HEADER2.push(item) : this.HEADER.push(item)
              })
            })
          },
          print_preview(){


            setTimeout(()=>{
              var LODOP = this.$getLodop()
              var strLabelStyle="<style>h1{font-size: 20px;text-align:center;}.from-header{display:flex;padding:0 20px;font-size: 14px; height: 20px;} .from-header div{float:left;margin-right:25px; } .is-left>.cell{text-align:left}</style>";
              var strTableStyle="<style>table{border-collapse:collapse;table-layout:fixed;} td,th {border-collapse:collapse; font-weight: normal;min-width:10px;text-align:center;font-size:14px;border: 1px solid #000;} td{ min-height: 45px; font-family: MicrosoftYaHei, 'Avenir', Helvetica, Arial, sans-serif;} .cell {padding:0;text-align: center;} .gutter{display: none} .is-left>.cell{text-align:left;word-break:break-all;font-size:14px;}</style>";

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
        }
    }
</script>

<style scoped lang='stylus'>
    .custom
      border 1px solid #666
      &>>>.el-table__header-wrapper,&>>>.el-table__body-wrapper
        .cell
          font-size 12px
          color #2B3A50
          text-align center
          padding 0
          text-overflow auto
        .is-group
          th
            background-color #ffffff
        th
          border-right 1px solid #666
          border-bottom 1px solid #666
          text-align center
        /*font-weight 500*/
        td
          height 45px
          padding 0px
          border-right 1px solid #666
          border-bottom 1px solid #666!important
    .out-main .el-table td, .mytable td, .el-table thead th
      border-bottom 1px solid #666
    .from-header
      padding 10px 20px
      overflow hidden
      div
        float left
        margin-right 25px
        label,span
          color #1A2C4E
          font-size 12px
</style>
