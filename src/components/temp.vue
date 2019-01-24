<template>
    <div>
      <div class="temp-t">
        <div class="block">
          <el-date-picker
            v-model="valueDate"
            type="date"
            :class="['datepick','marr10']"
            placeholder="请选择日期">
          </el-date-picker>
          <el-select v-model="value" :class="['timepick','marr10']" placeholder="请选择时间">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" class="temp-btn">搜索</el-button>
        </div>
        <div>
          <el-button type="primary" :class="['temp-btn','view']">预览</el-button>
          <el-button type="primary" :class="['temp-btn','marr10']">保存</el-button>
          <button class="print"></button>
        </div>
      </div>
      <div class="temp-main" style="border:1px solid #fff;">
          <div class="entry-thead">
          <span style="width:105px">床号</span>
          <span class="w110">姓名</span>
          <span style="width:220px">体温</span>
          <span class="w110">脉搏</span>
          <span class="w110">呼吸</span>
          <span class="w110">心率</span>
          <span class="w110">大便</span>
          <span class="w110">血糖</span>
          <span class="w110">氧饱和度</span>
          <span style="width:220px">降温后</span>
          <span style="width:250px">事件类型</span>
        </div>
        <ul class="entry-table" >
          <li v-for="(item,index) of entryData" :key="index">
            <span style="display:inline-block;width:105px;text-align:center;position:fixed">{{item.date}}</span>
            <span style="display:inline-block;width:105px;position:fixed">{{item.name}}</span>
            <div class="sel-con">
              <select name="bodyTem">
                <option v-for="(item,index) of tempart" :value="item.value" :key="index">{{item.name}}</option>
              </select>
              <div class="inp-con">
                <input type="number" v-model="item.bodyTemp">
                <span>℃</span>
              </div>
            </div>
            <input type="number" v-model="item.pulse" :class="['w90','marl22']">
            <input type="number" v-model="item.breathe" :class="['w90','marl22']">
            <input type="number" v-model="item.heartRate" :class="['w90','marl22']">
            <input type="number" v-model="item.shit" :class="['w90','marl22']">
            <input type="number" v-model="item.sugar" :class="['w90','marl22']">
            <input type="number" v-model="item.oxygen" :class="['w90','marl22']">
            <div class="sel-con">
              <select name="afterTemp">
                <option v-for="(item,index) of tempart" :value="item.value" :key="index">{{item.name}}</option>
              </select>
              <input type="number" v-model="item.afterTemp">
              <span>℃</span>
            </div>
            <select name="eventYpe" style="width:246px">
              <option v-for="(item,index) of events" :key="index" :value="item.value">{{item.name}}</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
    export default{
      data() {
        return {
          pickerOptions1: {
            disabledDate(time) {
              return time.getTime() > Date.now();
            }
          },
          valueDate: '',
          options: [{
            value: '选项1',
            label: '02:00'
          }, {
            value: '选项2',
            label: '06:00'
          }, {
            value: '选项3',
            label: '10:00'
          }, {
            value: '选项4',
            label: '14:00'
          }, {
            value: '选项5',
            label: '18:00'
          },{
            value: '选项6',
            label: '22:00'
          }],
          value: '',
          tempart:[{name:"耳温",value:"value1"},{name:"口温",value:"value2"},{name:"腋温",value:"value3"},{name:"肛温",value:"value4"}],
          events:[{name:"无",value:"etype1"},{name:"入院",value:"etype2"},{name:"出院",value:"etype3"},{name:"死亡",value:"etype4"},
            {name:"手术",value:"etype5"},{name:"分娩",value:"etype6"},{name:"转入",value:"etype7"},{name:"转出",value:"etype8"},{name:"请假外出",value:"etype9"},{name:"外出返回",value:"etype10"}],
          entryData: [{
            date: '001',
            name: '王小虎',
            bodyTemp:0,
            pulse:0,
            breathe:0,
            heartRate:0,
            shit:0,
            sugar:0,
            oxygen:0,
            afterTemp:0
          }, {
            date: '001',
            name: '王小虎',
            bodyTemp:0,
            pulse:0,
            breathe:0,
            heartRate:0,
            shit:0,
            sugar:0,
            oxygen:0,
            afterTemp:0
          }, {
            date: '001',
            name: '王小虎',
            bodyTemp:0,
            pulse:0,
            breathe:0,
            heartRate:0,
            shit:0,
            sugar:0,
            oxygen:0,
            afterTemp:0
          }, {
            date: '001',
            name: '王小虎',
            bodyTemp:0,
            pulse:0,
            breathe:0,
            heartRate:0,
            shit:0,
            sugar:0,
            oxygen:0,
            afterTemp:0
          }, {
            date: '001',
            name: '王小虎',
            bodyTemp:0,
            pulse:0,
            breathe:0,
            heartRate:0,
            shit:0,
            sugar:0,
            oxygen:0,
            afterTemp:0
          }, {
            date: '001',
            name: '王小虎',
            bodyTemp:0,
            pulse:0,
            breathe:0,
            heartRate:0,
            shit:0,
            sugar:0,
            oxygen:0,
            afterTemp:0
          }, {
            date: '001',
            name: '王小虎',
            bodyTemp:0,
            pulse:0,
            breathe:0,
            heartRate:0,
            shit:0,
            sugar:0,
            oxygen:0,
            afterTemp:0
          },{
            date: '001',
            name: '王小虎',
            bodyTemp:0,
            pulse:0,
            breathe:0,
            heartRate:0,
            shit:0,
            sugar:0,
            oxygen:0,
            afterTemp:0
          },{
            date: '001',
            name: '王小虎',
            bodyTemp:0,
            pulse:0,
            breathe:0,
            heartRate:0,
            shit:0,
            sugar:0,
            oxygen:0,
            afterTemp:0
          },{
            date: '001',
            name: '王小虎',
            bodyTemp:0,
            pulse:0,
            breathe:0,
            heartRate:0,
            shit:0,
            sugar:0,
            oxygen:0,
            afterTemp:0
          },{
            date: '001',
            name: '王小虎',
            bodyTemp:0,
            pulse:0,
            breathe:0,
            heartRate:0,
            shit:0,
            sugar:0,
            oxygen:0,
            afterTemp:0
          }]
        }
      }
    }
</script>
<style scoped>
  .temp-t{
    display:flex;
    justify-content:space-between;
    margin-bottom:10px;
  }
  .datepick{
    width:310px;
  }
  .marr10{
    margin-right:10px !important;
  }
  .timepick{
    width:150px;
  }
  .temp-btn{
    border:none;
    padding:12px 32px;
    font-size:16px;
    background: #00B3DC;
    border-radius: 4px;
    color:#fff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .view{
    background: #DDEFF9;
    color: #00B3DC;
  }
  .print{
    width:40px;
    height:40px;
    background:url("../assets/images/print.png") no-repeat center center;
    vertical-align:middle;
  }
  .entry-thead{
    min-width:1640px;
    height:56px;
    line-height:56px;
    background:#fff;
    position:fixed;
  }
  .entry-thead>span{
    display:inline-block;
    text-align:center;
  }
  .entry-table{
    margin-top:66px;
  }
  .entry-table li{
    display:flex;
    align-items:center;
    text-align:center;
    background: #F9F9FB;
    height:54px;
    line-height:54px;
    margin-bottom:10px;
  }
  .entry-table>li>span:first-of-type,.entry-table>li>span:nth-of-type(2){
    position:fixed;
    background: #F9F9FB;
  }
  .entry-table>li>span:nth-of-type(2){
    margin-left:105px;
  }
  .entry-table>li>div:first-of-type{
    margin-left:210px;
  }
  .entry-table li input, .entry-table li select{
    background:#fff;
  }
  .sel-con{
    margin-left:20px;
    width:190px;
    display:flex;
    text-align:center;
    align-items:center;
    justify-content:space-between;
  }
  .entry-table li select{
    width:100px;
    height:36px;
    vertical-align: middle;
    border: 1px solid #D8E3E7;
    border-radius: 4px;
  }
  .inp-con{
    width:80px;
    display:flex;
    align-items:center;
    line-height:36px;
    height:36px;
  }
  .entry-table input[type=number]{
    width:64px;
    height:36px;
    line-height:36px;
    padding-left:15px;
    border: 1px solid #D8E3E7;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .w90{
    width:90px !important;
  }
  .w110{
    width:110px !important;
  }
  .marl22{
    margin-left:22px !important;
  }
</style>
