<template>
    <div>
      <div id="echarts" :style="{ height: '500px'}" ></div>
    </div>
</template>
<script>
    export default{
      props : ['type' , 'department_id'],
      data(){
          return {
            dataForm:[],
          }
      },

      mounted() {
        this.$nextTick(() => {
        this.pageAjax()
      })
      },

      methods: {
        pageAjax(){
          console.log("ssssss",this.type)
          let myChart = this.echarts.init(document.getElementById('echarts'))
          myChart.clear();
          //请求数据response
          this.getSer("datacenter/indicator" ,{
            code:this.type,
            war_id:this.department_id,
            start_time: "" ,
            end_time: "" ,
          }, (res) => {
            console.log("5222",res)
            this.dataForm = res.data.data

          myChart.setOption(this.chartInit())
        })
        },
        chartInit(){
          var xarr=[22,22,22]
          var title=["全院","二病区","三病区","四病区","五病区","六病区"]
          //var percentage=[]
       /*   this.dataForm.forEach((item , i) => {
            xarr.push(item.VALUE)
          title.push(item.YEAR)
         // percentage.push(item.item_count_percentage)
        })*/
          function getTableLine(num) {
            var list = [];
            var bottom = 112;
            var height = 30;
            for (var i = 0; i < num; i++) {
              list.push({
                type: 'line',
                bottom: bottom - i * height,
                right: 20,
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
          var lineList = getTableLine(3);//3行
          return {
            title: [{
              text: '\n'+ ' '+'\n床位使用率',
              bottom: 98,
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
              axisPointer: {
                type : 'shadow',
                label: {
                  backgroundColor: '#283b56'
                }
              }
            },
            grid: {
              bottom: 150,
              left: 120,
              right: 20
            },

            xAxis: [{
              type: 'category',
              data: title,
              axisTick: {
                show:true,
                length:98    //x轴垂直线长度
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
                 /*   '}\n{table|' + (percentage[index]) +*/
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
              minInterval: 1,
              splitNumber:4,
              axisLine: {
                show: true,
                lineStyle:{
                  color:'#D1D1D1'
                }
              },
              axisLabel: {
                textStyle: {
                  fontWeight: 'normal',
                  fontSize: '12',
                  color:"#666"
                }
              },
            }],
            series: [{
              type: 'bar',
              barWidth : 30,
              data: xarr,
              itemStyle: {
                normal:{
                  color: ['#00CACF']
                },
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                  position:'center'
                }
              },
            }],
            graphic: lineList
          };
        },
      },
    }
</script>
<style scoped>

</style>
