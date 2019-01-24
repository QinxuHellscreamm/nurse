<template>
    <div style='padding:20px; background-color: #FFFFFF;'>
      <div>
        <el-button type='primary' @click='inputShow' v-if='$route.name != "infoshare"'>产程编辑</el-button>
        <print style='position:relative;top:2px;margin-left: 10px;'></print>
      </div>
      <div ref='print'>
        <h1 style='font-size: 27px; font-family:宋体; text-align: center; margin: 20px 0 30px;width: 890px;'>常德市第二人民医院产程图</h1>
        <div class="from-header"style='border: none;'>
          <div style="font-size: 12px;width: 890px; text-align: center;">
            <label>姓名：</label>
            <span>{{detile.NAME}}</span>
            <label>年龄：</label>
            <span>{{detile.AGE}}</span>
            <label>科室：</label>
            <span>{{detile.DEPARTMENT}}</span>
            <span>{{detile.MEDICAL_RECORD_NUM}}</span>
            <label>孕产：</label>
            <span>{{detile.MATERNITY}}</span>
            <label>孕周：</label>
            <span>{{detile.GESTATIONAL_AGE}}</span>
            <label>身高：</label>
            <span>{{detile.HEIGHT}}</span>
            <label>体重：</label>
            <span>{{detile.WEIGHT}}</span>
            <label>床号：</label>
            <span>{{detile.BED_NUMBER}}</span>
            <label>住院号：</label>
            <span>{{detile.MEDICAL_RECORD_NUM}}</span>
            <label>入院时间：</label>
            <span>{{detile.HOSPITALIZED_DATE.slice(0,10)}}</span>
          </div>
        </div>
        <div style="padding: 0 0 0 72px;width: 751px;position: relative; top: 10px;" class="tables">
          <table border="0" cellspacing="0" width='751' align="center">
            <span style="position: absolute;top:20px;left: 22px">时间</span>
            <tbody>
            <tr>
              <td height='50px' width="25px" v-for='item of mapTime' class='topTime'>{{item}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div  style='position: relative;height: 300px;width: 842px;' >
          <p style="width: 24px;text-align: center;position: absolute;left: 12px;top: 50px;z-index: 99;">(红)宫口扩张(cm)</p>
          <p style="width: 24px;text-align: center;position: absolute;right: -40px;top: 50px;z-index: 99;">(蓝)胎头下降(cm)</p>
          <div id="echarts" style="height:300px;width: 842px;" ></div>
          <img src="" alt="" style='height:300px;width: 842px; position: relative;top: -300px;'>
        </div>
        <div style="padding: 0 0 0 72px;width: 750px;position: relative;" class="tables">
          <table border="1" cellspacing="0" width='751' align="center" style="border-bottom: 1px solid #ccc;">
            <span style="top:20px;" class="tableLeft">胎心音</span>
            <span style="right: -50px;top:20px;left: inherit;" class="tableLeft">次/min</span>
            <span style="top:70px;" class="tableLeft">血压</span>
            <span style="right: -50px;top:70px;left: inherit;" class="tableLeft">mmHg</span>
            <span style="top:120px;" class="tableLeft">宫缩</span>
            <span style="right: -50px;top:120px;left: inherit;" class="tableLeft">秒/分</span>
            <span style="top:170px;" class="tableLeft">羊水</span>
            <span style="top:280px;" class="tableLeft">处理</span>
            <span style="top:415px;" class="tableLeft">签名</span>
            <tbody>
            <tr>
              <td height='50px' width="25px" v-for='item of HEART_SOUND' class='red'>{{item}}</td>
            </tr>
            <tr>
              <td height='50px'  class='red' style="position: relative;"  v-for='item of blood'>
                <span style="display: block;position: absolute;top: 2px;" >{{item.a}}</span>
                <span style="transform: rotate(118deg);display: block;width: 52px;height: 1px;background: #ccc;position: absolute;left:-14px;"></span>
                <span style="display: block;position: absolute;bottom: 2px;left: 4px;">{{item.b}}</span>
              </td>
            </tr>
            <tr>
              <td height='50px' v-for='item of uterusTwo' class='red' style="position: relative;">
                <span style="display: block;position: absolute;top: 2px;">{{item.a}}</span>
                <span style="transform: rotate(118deg);display: block;width: 52px;height: 1px;background: #ccc;position: absolute;left:-14px;"></span>
                <span style="display: block;position: absolute;bottom: 2px;left: 4px;">{{item.b}}</span>
              </td>
            </tr>
            <tr>
              <td height='50px' v-for='item of amniotic' class='red'>{{item}}</td>
            </tr>
            <tr>
              <td height='180px' v-for='item of handle' class='red'><span style="width: 16px;display: block;text-align: right;">{{item}}</span></td>
            </tr>
            <tr>
              <td height='90px' v-for='item of autograph' class='red'><span  style="width: 16px;display: block;text-align: right;">{{item}}</span></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <labor-process-input ref='signEntry' :INPATIENT_NUMBER='INPATIENT_NUMBER' :patient='patient'></labor-process-input>
    </div>
</template>
<script>
    import print from '@/components/print'
    import LaborProcessInput from "@/pages/workstation/PatientDOC/component/processMap/laborProcessInput"
    export default{

      components: {LaborProcessInput,print},

      props : ['INPATIENT_NUMBER','detile'],

      data(){
          return {
            patient:[],
            dateFormatArr : [],
            numTab:[],
            ihg:[1,2,3,4,5,6],
            dataBir:[],
            HEART_SOUND:[],
            mapTime:[],
            blood:[],
            //detile:{AGE:'',BED_NUMBER:'',DEPARTMENT:'',GESTATIONAL_AGE:'',HEIGHT:'',HOSPITALIZED_DATE:'',MATERNITY:'',NAME:'',WEIGHT:'',MEDICAL_RECORD_NUM:'' },
            uterus:[],
            uterusTwo:[],
            amniotic:[],
            handle:[],
            autograph:[],
            redLine:[],
            blueLine:[],
            SYSTOLIC_PRESSURE:[],
            DIASTOLIC_PRESSURE:[],
          }
       },

      methods:{
        getData(){
          this.numTab = []
          this.HEART_SOUND= []
          this.mapTime = []
          this.blood = []
          this.uterus = []
          this.amniotic = []
          this.handle = []
          this.autograph = []
          this.uterusTwo = []
          this.redLine = []
          this.blueLine = []
          for(let i=0;i<30;i++){
            this.numTab.push("")
            this.HEART_SOUND.push("")
            this.mapTime.push("")
            this.blood.push("")
            this.uterus.push("")
            this.amniotic.push("")
            this.handle.push("")
            this.autograph.push("")
            this.uterusTwo.push("")
          }
          this.numTab[20] = 5
          this.dataBir = []

          this.getSer('datacenter/birthprocess',{number:this.INPATIENT_NUMBER} , res => {
            this.patient = res.data.items

            // this.detile.AGE = res.data.AGE
            // this.detile.BED_NUMBER = res.data.BED_NUMBER
            // this.detile.DEPARTMENT = res.data.DEPARTMENT
            // this.detile.GESTATIONAL_AGE = res.data.GESTATIONAL_AGE
            // this.detile.HEIGHT = res.data.HEIGHT
            // this.detile.HOSPITALIZED_DATE = res.data.HOSPITALIZED_DATE
            // this.detile.MATERNITY = res.data.MATERNITY
            // this.detile.NAME = res.data.NAME
            // this.detile.WEIGHT = res.data.WEIGHT
            // this.detile.MEDICAL_RECORD_NUM = res.data.MEDICAL_RECORD_NUM

            this.patient.forEach((item,i) => {
              this.mapTime[item.HOUR-1] = item.RECORD_TIME
              this.HEART_SOUND[item.HOUR-1] = item.HEART_SOUND
              this.blood[item.HOUR-1] = {a : item.SYSTOLIC_PRESSURE ,b : item.DIASTOLIC_PRESSURE}
              this.uterusTwo[item.HOUR-1] = {a:item.UTERUS_SHRINK_DURATION,b:item.UTERUS_SHRINK_GAPTIME}
              this.amniotic[item.HOUR-1] = item.AMNIOTIC_FLUID
              this.handle[item.HOUR-1] = item.HANDLE
              this.autograph[item.HOUR-1] = item.AUTOGRAPH
              this.SYSTOLIC_PRESSURE[i] = item.SYSTOLIC_PRESSURE
              this.DIASTOLIC_PRESSURE[i] = item.DIASTOLIC_PRESSURE
              this.redLine.push([item.HOUR - 1,item.UTERUS_DILATATION])
              this.blueLine.push([item.HOUR - 1,item.HEAD_DROP])
          })

            this.pageAjax()
          })
        },

        pageAjax(){
          let myChart = this.echarts.init(document.getElementById('echarts'))
          myChart.clear();
          myChart.setOption(this.chartInit())
        },
        chartInit(){
          var x = []
          for(let i=0;i<30;i++){
            x.push(i+1)
          }
          return {
            grid: {
              left: '50px',
              right: '0px',
              bottom: '10px',
              top: '10px',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: true,
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle:{
                  color:'#000',
                  fontWeight:'bold'
                }
              },
              splitLine: { //网格线
                show: true,
                lineStyle: {
                  type: 'solid'
                }
              },
              data: x
            },
            yAxis: [
              {
              type: 'value',
              scale:true,
              splitNumber:10,
              min: 0,
              max: 10,
              axisLabel: {
                formatter: '{value}',
                padding: [8, 0, 8,0]
              }
            },
              {
                type: 'value',
                splitNumber:10,
                min: -5,
                max: 5,
                position: 'right',
                inverse : true,
                axisLabel: {
                  formatter: '{value}',
                  padding: [8, 0, 0,0]
                }
              }],
            series: [{
              type: 'line',
              symbol:"circle",
              symbolSize:12,
              color: ["#f40e0e"],
              data: this.redLine,
            },{
              yAxisIndex: 1,
              type: 'line',
              symbol:"rect",
              symbolSize:12,
              color: ['#0da0e9'],
              data: this.blueLine,
            }]
          }
        },
        inputShow(){
          this.$refs.signEntry.show()
        },
        print_preview(){
          var LODOP = this.$getLodop()

          var canvas = document.getElementsByTagName('canvas')[0]

          canvas.style.display = 'none'
          var src = canvas.toDataURL()
          var img = document.getElementsByTagName('img')[0]
          img.style.display = 'block'
          img.src = src

          var strBodyStyle="<style>.tableLeft{width :50px;text-align:right;position :absolute; left :10px;} .topTime{display:inline-block;writing-mode:tb-rl;text-align:center; line-height:24px;}.tables table{border-right:1px solid #ccc;} .tables table td {border-left:1px solid #ccc; border-top:1px solid #ccc;box-sizing:border-box;font-size:12px;word-wrap:break-word;}</style>"


          var strBodyHtml = strBodyStyle+"<body>"+this.$refs.print.innerHTML+"</body>";

          LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单一")
          LODOP.SET_PRINT_PAGESIZE(1,"","","a4")
          LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Auto-Width")
          LODOP.ADD_PRINT_HTML(20,20,'100%','100%',strBodyHtml)//xx ←边距 xx height
          LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1)
          LODOP.PREVIEW()
          canvas.style.display = 'block'
          img.style.display = 'none'

        }
      },

      mounted(){
        this.$nextTick(()=>{
          this.getData()
        })
      },

    }
</script>
<style scoped lang='stylus'>
  .entry
    background-color #DDEFF9
    border none
    color #00B3DC
    padding 10px 20px
  .from-header
    padding 10px 0px
    border-bottom 1px solid #dddddd
    div
      label
        color #878787
      span
        color #878787
        margin-right 10px
  .tables table
    border-right 1px solid #ccc
    td
      border-left 1px solid #ccc
      border-top 1px solid #ccc
      box-sizing border-box
      font-size 12px
      word-wrap:break-word
      span
        font-size 12px
  .topTime
    display inline-block
    writing-mode tb-rl
    text-align center
    line-height 24px
  .tableLeft
    width 50px
    text-align right
    position absolute
    left 10px
</style>
