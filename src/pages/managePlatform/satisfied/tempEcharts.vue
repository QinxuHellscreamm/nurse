<template>
  <div class="realmin">
    <div class="out-top">
      <span>时间</span>
      <el-date-picker
        v-model="start_end_time"
        type="year"
        value-format='yyyy-MM-dd'
        format="yyyy-MM-dd"
        placeholder="选择年">
      </el-date-picker>
      <span>病区</span>
      <el-select v-model="department" filterable placeholder="病区" @change="getID">
        <el-option
          v-for="item in wardTes"
          :key="item.ID"
          :label="item.NAME"
          :value="item">
        </el-option>
      </el-select>
      <el-button type='primary' @click="pageAjax()">搜索</el-button>
    </div>
    <div id="echarts" :style="{ height: '500px'}" ></div>
  </div>
</template>
<script>
  export default{
    props : ['type'],

    data(){
      return {
        /*date: new Date()*/
        start_end_time: [],
        end_time : "",
        graphiData:'',
        department:'骨科一病区',
        department_id:"10015",
        restaurants:[],
        wardTes:[],
        strF:'',
        str:'',
        dataForm:[],
      }
    },

    mounted() {
      this.$nextTick(() => {
        this.ward()
        this.pageAjax()
    })
    },
    methods:{
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
        //请求数据response
        this.getSer("datacenter/infaustevent/count" ,{
          item:this.type,
          ward_id:this.department_id,
          start_time: (this.start_end_time ? this.start_end_time[0] : '') ,
          end_time: (this.start_end_time ? this.start_end_time[1] : '') ,
        }, (res) => {
          this.dataForm = res.data.data
        console.log("5222",this.dataForm)
        myChart.setOption(this.chartInit())
      })
      },

      chartInit(){
        var xarr=[1,1,2,2,5,5,5,5,5,5,5,5]
        var title=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
        var percentage=[2,3,4,5,6,7,8,9,0,11,12,14]
        var growthRate=[5,5,5,8,-5,8,15,25,-8,5,5,15]
      /*  this.dataForm.forEach((item , i) => {
          xarr.push(item.item_count)
          title.push(item.item_name)
          percentage.push(item.item_count_percentage)
        })*/

        function getTableLine(num) {
          var list = [];
          var bottom = 112;
          var height = 30;
          for (var i = 0; i < num; i++) {
            list.push({
              type: 'line',
              bottom: bottom - i * height,
              right: 50,
              style: {
                fill: '#333',
                stroke:'#dfdfdf'
              },
              shape: {
                x1: 0,
                y1: 0,
                x2: 2000,//下划线偏离
                y2: 0
              }
            });
          }
          return list;
        }
        var lineList = getTableLine(4);//3行

        function calMax(arr) {
          var max = arr[0];
          var min = arr[1];
          for ( var i = 1; i < arr.length; i++) {// 求出一组数组中的最大值
            if (max < arr[i]) {
              max = arr[i];
            }
          }
          var maxint = Math.ceil(max / 10);// 向上取整
          var maxval = maxint * 10;// 最终设置的最大值
          return maxval;// 输出最大值
        }

        var maxappreg = calMax(percentage);//注册Y轴值
        var maxactive = calMax(growthRate);//活跃Y轴值
        var interval_left=maxappreg/5;//左轴间隔
        var interval_right=maxactive/5;//右轴间隔

        return {
          title: [{
            text: '\n'+ '2014' +'\n2013'+'\n增长率',
            bottom: 84,
            left: 10,
            textStyle: {
              lineHeight:30,
              fontSize: 13,
              fontWeight: 'normal',
              formatter: function(value) {
                return '{table|' + value + '}';
              },
              rich: {
                table: {
                  align: 'center'
                }
              }
            }
          }],
          tooltip: {
            trigger: 'axis',

          },
          grid: {
            bottom: 150,
            left: 120,
            right: 50
          },

          xAxis: [{
            type: 'category',
            data: title,
            axisTick: {
              show:true,
              length:128    //x轴垂直线长度
            },
            axisLine: {
              onZero:false,  //从最低值开始计算
              lineStyle:{
                color:'#D1D1D1'
              }
            },
            axisLabel: {
              interval:0,
              textStyle: {
                fontWeight: 'normal',
                fontSize: '12',
                color:"#666"
              },
              formatter: function(value, index) {

                return '{table|' + value +
                  '}\n{table|' + (xarr[index]) +
                  '}\n{table|' + (percentage[index]) +
                  '}\n{table|' + (growthRate[index]+"%") +
                  '}';

              },
              rich: {
                table: {
                  lineHeight: 30,
                  align: 'center'
                },
                lineStyle:{
                  color:'#D1D1D1'
                }
              }
            }
          }],
          yAxis: [{
            type: 'value',
            max: 100,
            min: 0,
            splitNumber:5,
            axisLine: {
              show: true,
              lineStyle:{
                color:'#D1D1D1'
              }
            },
            axisLabel: {
              formatter: '{value}%',
              textStyle: {
                fontWeight: 'normal',
                fontSize: '12',
                color:"#666"
              }
            },
          },
            {
              type: 'value',
              "splitLine": {     //网格线
                "show": false
              },

              axisLine: {
                show: true,
                lineStyle:{
                  color:'#D1D1D1'
                }
              },
              axisLabel: {
                formatter: '{value}%',
                textStyle: {
                  fontWeight: 'normal',
                  fontSize: '12',
                  color:"#666"
                }
              },
              position: 'right',
            }],
          series: [{
            name:'2014',
            type: 'bar',
            barWidth : 30,
            data: xarr,
            itemStyle: {
              normal:{
                color: ['#00B3DC']
              },
            },
          },{
            name:'2013',
            type: 'bar',
            barWidth : 30,
            data: percentage,
            itemStyle: {
              normal:{
                color: ['#00CA53']
              },
            },
          },{
            name:'增长率',
            type: 'line',
            yAxisIndex: 1,
            data: growthRate,
            itemStyle: {
              normal:{
                color: ['#bc09e6']
              },
            },
          }],
          graphic: lineList
        };
      },
    },
  }
</script>
<style scoped lang="stylus">
  .realmin
    margin-top 20px
    background #fff
    padding 5px 20px
    width 100%
    box-shadow 0 0 10px 0 rgba(0,0,0,0.04)
    border-radius 4px
    box-sizing border-box
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
