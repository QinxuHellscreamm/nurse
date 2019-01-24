<template>
    <div style="margin-top: 20px;">
      <div class="realmin">
        <div class="out-top">
          <span>时间</span>
          <el-date-picker
            v-model="start_end_time"
            type="date"
            value-format='yyyy-MM-dd'
            format="yyyy-MM-dd">
          </el-date-picker>
          <el-button type='primary' @click="pageAjax()">搜索</el-button>
          <el-button type='primary' @click="forlist()" style="float:right">列表</el-button>
          <el-button type='primary' @click="forechart()" style="float:right">曲线图</el-button>
        </div>

        <div id="echarts" :style="{ height: '300px'}" v-if="list_echart"></div>
        <div v-else >
          <el-table
            :data="tableData"
            border
            style="width: 100%;margin-bottom: 40px;">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </div>

      </div>
    </div>
</template>
<script>
  export default{

    data(){
      return {
        /*date: new Date()*/
        start_end_time: "",
        end_time : "",
        graphiData:'',
        department:'骨科一病区',
        department_id:"10015",
        restaurants:[],
        wardTes:[],
        strF:'',
        str:'',
        dataForm:[],

        list_echart:true,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        peopleList:"例",
        type:"EVENT_GRADE",
        yAxisLabel:"例",
      }
    },

    mounted() {
      this.$nextTick(() => {
        this.ward()
      this.pageAjax()
    })
    },
    methods:{
      forlist(){
        this.list_echart = false
      },
      forechart(){
        this.list_echart = true
        setTimeout(() => {
          this.pageAjax()
      }, 10);
      },
      ward(){
        this.getSer("datacenter/ward" ,{}, (res) => {
          this.wardTes = res.data.items;
      })
      },
      getID(item){
        this.department = item.NAME
        this.department_id = item.ID
      },
      pageAjax(){
        let myChart = this.echarts.init(document.getElementById('echarts'))
        myChart.clear();

        this.peopleList = this.yAxisLabel
        this.getSer("datacenter/infaustevent/count" ,{
          item:this.type,
          ward_id:this.department_id,
          start_time:this.start_end_time ,
        }, (res) => {
          this.dataForm = res.data.data
        console.log("5222",this.dataForm)
        myChart.setOption(this.chartInit())
      })
      },

      chartInit(){
        var dwArr = [23,27,28,30,34,36,39,41,45,46,56,60,23,27,28,30,34,36,139,41,45,246,56,360,23,27,128,320,34,36,139,41,45,46,56,60,23,27,28,30,34,36,3,88,956,555,888,999];
        var zgArr = [1500,1700,1750,1800,1850,1900,1910,1941,1980,2000,2100,2200,27,3328,30,34,36,2239,41,1145,46,56,1160,23,927,1128,30,34,36,39,41,45,46,56,60,23,27,2,27,28,30,34,36,39,41,45,46,56,60,23,27,28,30,34,36,39,41,45,46,56,60,23,27,2];
        var colors = ['#00B3DC','#00CA53'];
        return {
          color:colors,

          tooltip: {trigger: 'axis'},

          grid: {
            top:20,
            bottom: 50,
            left: 60,
            right: 20
          },
          xAxis: {
            // data: months,
            axisLabel: {
              formatter: '{value}',
              interval: 0
            },
            data: [' ','1am', ' ' ,'2am', ' ', '3am', ' ' ,'4am', ' ','5am','','6am', ' ' ,'7am', ' ', '8am', ' ' ,'9am'
              , ' ','10am',' ','11am', ' ' ,'12am', ' ', '1pm', ' ' ,'2pm', ' ','3pm',' ', '4pm', ' '
              ,'5pm', ' ','6pm',' ', '7pm', ' ' ,'8pm', ' ','9pm',' ', '10pm', ' ' ,'11pm', ' ','12pm'
            ]
          },
          yAxis: {
            axisLabel: {
              formatter: '{value}'+this.peopleList
            },
          },

          series: [{
            name:'护理投诉',
            type:'line',
            symbol:'none',
            // showSymbol:false,
            data:dwArr
          },
            {
              name:'护理不良事件',
              type:'line',
              symbol:'none',
              data:zgArr
            },
          ]
        };

      },
    },
  }
</script>
<style scoped lang="stylus">
  .realmin
    background #fff
    padding 5px 20px
    width 100%
    box-shadow 0 0 10px 0 rgba(0,0,0,0.04)
    border-radius 4px
    box-sizing border-box
    .el-table >>> td
      padding 6px 0
    .el-table >>> th
      padding 6px 0
      background #F9F9FB
  .out-top >>> .el-input__inner
    background #fff
    .out-top
      .el-input
        width 240px
        margin-right 10px
        &>>>.el-input__inner
          width 240px
    .el-select
      margin-right 10px
  .el-button
    padding 12px 32px
</style>
