<template>
  <el-dialog :visible.sync="popshow" width='890px'>
    <div ref='print'>
      <h2 style='width: 850px;text-align: center; font-size: 16px;line-height: 30px;'>常德市第二人民医院体温单</h2>
      <p style='width: 850px; line-height: 26px' id='p'>姓名：　 性别：　 年龄：　 科室：　 床号：　 住院号：　 入院日期：　</p>
      <table border="1" cellspacing="0" width='850' align="center">
        <thead>
        <tr>
          <th height='20px' :colspan='6*ten' width='75' class='red'>日期</th>
          <th height='20px' :colspan='6*ten' width='75' v-for='item of td7null' class='red'></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td height='20px' :colspan='6*ten' class='red'>住院天数</td>
          <td height='20px' :colspan='6*ten' v-for='item of td7null' class='red'></td>
        </tr>
        <tr>
          <td height='20px' :colspan='6*ten' class='red'>手术后天数</td>
          <td height='20px' :colspan='6*ten' v-for='item of td7null' class='red'></td>
        </tr>
        <tr>
          <td :colspan='6*ten' class='red'>时间</td>
          <td height='14px' width='14px' v-for='(item,index) of td42null' :key=index :colspan='ten' :class='{"red":index % 6 == 5}'>{{ index % 6*4+2 }}</td>
        </tr>
        <tr>
        </tr>
        <tr>
          <td :colspan='3*ten' height='14px'>脉搏</td>
          <td :colspan='3*ten' height='14px' class='red'>体温</td>
          <td v-for='(item,index) of td42null' :key=index height='14px' width='14px' :colspan='ten' :class='{"red":index % 6 == 5}'></td>
        </tr>

        <template v-for='(item,i) of pulseTemperature'>
          <tr>
            <td :colspan='3*ten' rowspan='10' class='border-r' valign="center" style='padding: 0;margin: 0;'>
              <div style='height:35px;line-height: 34px;border-bottom:1px solid #666;'>{{item.pulse}}</div>
              <div style='height:35px;line-height: 34px;'>{{item.pulse ? item.pulse - 10 : ''}}</div>
            </td>
            <td :colspan='3*ten' rowspan='10' class='border-n red' :valign="i != 11 ?'bottom':'center'" style='padding: 0;margin: 0;'>{{item.temperature ? item.temperature : item.pulse == 20 ? 'VAS评分' : ''}}</td>
            <td v-for='(item2,index) of td42null'  height='6px' :colspan='ten' :class='{"red":index % 6 == 5}'></td>
          </tr>
          <tr v-for='(td,s) of td9null' >
            <td v-for='(item2,index) of td42null'  height='6px' :colspan='ten' :class='{"red":index % 6 == 5,"bottom": i == 5 && s == 8 }'></td>
          </tr>
        </template>

        <tr>
          <td :colspan='6*ten' height='28px' style='max-width: 83px;overflow: hidden;'>呼吸</td>
          <td :colspan='ten' height='28px' v-for='(one,i) of td42null'></td>
        </tr>
        <tr>
          <td :colspan='6*ten' height='20px' style='max-width: 83px;overflow: hidden;'>血压</td>
          <td :colspan='3*ten' height='20px' v-for='(one,i) of td14null'></td>
        </tr>
        <tr v-for='item of signs'>
          <td :colspan='6*ten' height='20px' style='max-width: 83px;overflow: hidden;'>{{item}}</td>
          <td :colspan='6*ten' height='20px' v-for='(one,i) of td7null'></td>
        </tr>

        <tr>
          <td height='20px' :colspan='6*ten'>疼痛的性质</td>
          <td height='20px' :colspan='30*ten' style='border-right:1px solid #fff;'>
            <p style='text-align: left;text-indent: 1em;'>
              <span style='font-size: 12px;'>刀割样（刺痛）</span><span style='font-size: 12px;'>△&nbsp;&nbsp;</span>
              <span style='font-size: 12px;'>绞痛</span><span style='font-size: 12px;'>×&nbsp;&nbsp;</span>
              <span style='font-size: 12px;'>抽搐痛</span><span style='font-size: 12px'>⊙&nbsp;&nbsp;</span>
              <span style='font-size: 12px;'>烧灼痛</span><span style='font-size: 12px'>▼&nbsp;&nbsp;</span>
              <span style='font-size: 12px;'>钝痛</span><span style='font-size: 12px;'>○&nbsp;&nbsp;</span>
              <span style='font-size: 12px;'>胀痛</span><span style='font-size: 12px;'>◎&nbsp;&nbsp;</span>
              <span style='font-size: 12px;'>麻痛</span><span style='font-size: 12px'>※&nbsp;&nbsp;</span>
            </p>
          </td>
          <td height='20px' :colspan='12*ten'></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="print" class='save' type='primary'>打印</el-button>
      <el-button @click="viewdialogFormVisible = false" class='close'>取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
    export default {
        name: "preview",

        data(){
          return{
            popshow : false,
            td42null : ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
            td28null : ['','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
            td9null : ['','','','','','','','',''],
            td5null : ['','','','',''],
            td14null : ['','','','','','','','','','','','','',''],
            td7null : ['','','','','','',''],
            ten : 30,
            pulseTemperature : [
              { pulse : '' , temperature : '42℃'},
              { pulse : '' , temperature : '41℃'},
              { pulse : '' , temperature : '40℃'},
              { pulse : 180 , temperature : '39℃'},
              { pulse : 160 , temperature : '38℃'},
              { pulse : 140 , temperature : '37℃'},
              { pulse : 120 , temperature : '36℃'},
              { pulse : 100 , temperature : '35℃'},
              { pulse : 80 , temperature : ''},
              { pulse : 60 , temperature : ''},
              { pulse : 40 , temperature : ''},
              { pulse : 20 , temperature : ''},
            ],
            signs:['大便(次/天)','小便(ml)','入量(ml)','出量(ml)','体重(kg)','身高(cm)','疼痛部位']
          }
        },

        methods:{
          show(){
            this.popshow = true
          },
          print(){
            //体温单打印
            var LODOP = this.$getLodop()
            var strBodyStyle="<style>table{border-collapse:collapse;} h2{font-size: 50px;margin: 0;font-family: Simsun,Georgia; height: 20px;} p{font-family: Simsun,Georgia;height: 20px; font-size: 14px;} .line2{position: absolute;left:90px;top:885px;} .line{position:absolute;left:90px;top:86px;} th{ font-family: Simsun,Georgia; font-weight: normal;font-size: 14px;}  td{ text-align: center; font-size:14px;min-width:9px;min-height: 7px; font-family: Simsun,Georgia} twd_event{display: none;} .top{top:-8px;!important;position:relative;} .pp span{position: relative;top:5px;} .line3{position: absolute;left: 90px; top:82px;} .red{border-right:2px solid red;} .bottom{border-bottom:2px solid red;}</style>";
            var strBodyHtml = strBodyStyle+"<body>"+this.$refs.print.innerHTML+"</body>";


            LODOP.PRINT_INIT("")
            LODOP.SET_PRINT_PAGESIZE(1,"","","a4")
            // LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Full-Page")
            LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Auto-Width")
            LODOP.ADD_PRINT_HTML(0,20,'100%','100%',strBodyHtml)//xx ←边距 xx height
            LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1)
            LODOP.PREVIEW()
            // LODOP.PRINT_DESIGN()
          },
        }
    }
</script>

<style scoped lang='stylus'>
  .setting
    margin-bottom 20px
    .entry
      background-color #DDEFF9
      border none
      color #00B3DC
      padding 10px 20px
    .left,.right
      padding 10px 10px
    .date
      width 150px;
      & >>> .el-input__inner
        height 36px
        line-height 36px
      & >>>.el-input__suffix
        top 2px
  table
    border-collapse collapse
    .border-r
      border-right 1px solid #999
      div
        font-size 12px
    .border-n
    th
      font-weight normal
    td
      font-size 12px
      text-align center
      line-height 1
      white-space nowrap
    .red
      border-right 2px solid red
    .bottom
      border-bottom 2px solid red
  p
    font-size 12px
  .line
    position absolute
    left 93px
    top 105px
  .twd_event
    position absolute
    top 80px
    font-size 12px
    width 20px
    color red
    line-height 15px
  .twd_event_print
    display none
</style>
