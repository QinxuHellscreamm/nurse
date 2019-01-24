<template>
    <div style='padding:20px; background-color: #FFFFFF'>
      <div class='setting'>
        <!--<el-button class='entry' @click='signEntry'>体征录入</el-button>-->
        <el-button class='left' @click='date--'><i class="el-icon-caret-left"></i></el-button>
        <el-select v-model="date" placeholder="请选择" class='date'>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button class='right' @click='date++'><i class="el-icon-caret-right"></i></el-button>
        <!--<el-button type='primary' @click='print'>打印</el-button>-->
      </div>
      <div ref="print">
        <h2 style='width: 850px;text-align: center; font-size: 16px;line-height: 30px;'>{{title}}</h2>
        <h2 style='width: 850px;text-align: center; font-size: 16px;line-height: 30px;'>体温单</h2>

        <p style='display: flex;width: 850px;'>
          <span style='margin: 10px 20px;flex: 1;'>姓名：{{detile.NAME}}</span>
          <span style='margin: 10px 20px;flex: 1;'>科室：{{detile.DEPARTMENT}}</span>
          <span style='margin: 10px 20px;flex: 1;'>床号：{{detile.BED_NUMBER}}</span>
          <span style='margin: 10px 20px;flex: 1;'>住院号：{{detile.INPATIENT_NUMBER}}</span>
        </p>
        <div style='position: relative;' >
          <table border="1" cellspacing="0" width='850' align="center">
            <thead>
            <tr>
              <th height='20px' :colspan='6*ten' width='75' class='red'>日期</th>
              <th height='20px' :colspan='6*ten' width='75' v-for='item of dateFormatArr' class='red'>{{item}}</th>
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
              <td :colspan='6*ten' rowspan='2' class='red'>时间</td>
              <td :colspan='3*ten' height='14px' v-for='(item,index) of td14null' :key=index :class='{"red":index % 2 == 1}'>{{index % 2 == 0 ? '上午' : '下午'}}</td>
            </tr>
            <tr>
              <td height='14px' width='14px' v-for='(item,index) of td42null' :key=index :colspan='ten' :class='{"red":index % 6 == 5}'>{{ index % 3*4+2 }}</td>
            </tr>
            <tr>
              <td :colspan='3*ten' height='14px'>脉搏</td>
              <td :colspan='3*ten' height='14px' class='red'>体温</td>
              <td v-for='(item,index) of td42null' :key=index height='14px' :colspan='ten' :class='{"red":index % 6 == 5}'></td>
            </tr>

            <template v-for='(item,index) of pulseTemperature'>
              <tr>
                <td :colspan='3*ten' rowspan='5' class='border-r' valign="top" >{{item.pulse}}</td>
                <td :colspan='3*ten' rowspan='5' class='border-n red' valign="top">{{item.temperature}}</td>
                <td v-for='(item,index) of td42null'  height='14px' :colspan='ten' :class='{"red":index % 6 == 5}'></td>
              </tr>
              <tr v-for='(td,i) of td4null' >
                <td v-for='(item,index) of td42null'  height='14px' :colspan='ten' :class='{"red":index % 6 == 5}'></td>
              </tr>
            </template>

            <!--<template v-if='item.SIGN_CODE =="P10100"' v-for='(item,index) of signs'>-->
            <!--<tr style='border-top: 1px solid #666'>-->
            <!--<td :colspan='5*ten' rowspan='5' class='border-r' valign="top" style='white-space:normal;word-break:break-all;word-wrap:break-word; max-width: 50px; line-height: 30px '>{{item.NAME}}</td>-->
            <!--<td :colspan='ten' rowspan='5' class='border-r red' valign="top" style='padding: 0;'><p>10</p><p>8</p><p>6</p><p>4</p><p>2</p><p>0</p></td>-->
            <!--<td v-for='(item,index) of td42null' :key=index height='14px' :colspan='ten' :class='{"red":index % 6 == 5}'></td>-->
            <!--</tr>-->
            <!--<tr v-for='(td,i) of td4null' >-->
            <!--<td v-for='(item,index) of td42null'  height='14px' :colspan='ten' :class='{"red":index % 6 == 5}'></td>-->
            <!--</tr>-->
            <!--</template>-->
            <breathing  v-for='(item,index) of signs' v-if='item.SIGN_CODE == "T10400"' :sign='item' :key='item.CODE'></breathing>
            <template v-for='(item,index) of signs'>

              <tableTr :sign='item' :key='index' v-if='item.SIGN_CODE != "T10600" && item.SIGN_CODE != "T10100" && item.SIGN_CODE != "T10200" && item.SIGN_CODE != "T10300" && item.SIGN_CODE != "T10500"'></tableTr>
              <tr v-if='item.SIGN_CODE == "T10600"'>
                <td :colspan='6*ten' height='20px' style='max-width: 83px;overflow: hidden;'>{{ item.NAME }}</td>
                <td :colspan='3*ten' height='20px' v-for='(one,i) of item.items' v-if='i<14'>{{one.VS_VALUE}}</td>
              </tr>
              <tr v-if='item.items.length > 14 && item.SIGN_CODE == "T10600"'>
                <td :colspan='6*ten' height='20px'></td>
                <td :colspan='3*ten' height='20px' v-for='(one,i) of item.items' v-if='i<28 && i>=14'>{{one.VS_VALUE}}</td>
              </tr>
              <tr v-if='item.items.length > 28 && item.SIGN_CODE == "T10600"'>
                <td :colspan='6*ten' height='20px'></td>
                <td :colspan='3*ten' height='20px' v-for='(one,i) of item.items' v-if='i<42 && i>=28'>{{one.VS_VALUE}}</td>
              </tr>
            </template>
            </tbody>
          </table>
          <brokenLine4 v-for='(item,index) of signs' :sign='item' v-if='item.SIGN_CODE == "T10500" && signs[0]' :key='index'></brokenLine4>
          <brokenLine3 v-for='(item,index) of signs' :sign='item' v-if='item.SIGN_CODE == "T10300" && signs[0]' :key='index'></brokenLine3>

          <brokenLine v-for='(item,index) of signs' :sign='item'  v-if='item.SIGN_CODE == "T10100" && signs[0]' :key='index'></brokenLine>
          <brokenLine2 v-for='(item,index) of signs' :sign='item' v-if='item.SIGN_CODE == "T10200" && signs[0]' :key='index'></brokenLine2>

          <p style='text-indent: 2em;margin-top: 10px;'>
            备注：
            <span style='color:blue'>▲</span>耳温&nbsp&nbsp
            <span style='color:blue'>x</span>腋温&nbsp&nbsp
            <span style='color:blue;font-size: 20px'>○</span>肛温&nbsp&nbsp
            <span style='color:blue;font-size: 20px'>●</span>口温&nbsp&nbsp
            <span style='color:red;font-size: 20px'>○</span>降温&nbsp&nbsp
            <span style='color:red;font-size: 20px'>●</span>脉搏&nbsp&nbsp
            ☆人工肛门、分别表示，连线不变
          </p>

        </div>
      </div>

      <signEntry ref='signEntry' :detile='detile' :id='id'></signEntry>
    </div>
</template>

<script>
  import signEntry from './signEntry'
  import tableTr from './tableTr'
  import breathing from './breathing'
  import brokenLine from './brokenLine'//体温
  import brokenLine2 from './brokenLine2'//降温
  import brokenLine3 from './brokenLine3'//脉搏
  import brokenLine4 from './brokenLine4'//心率
    export default {
        name: "thermometer",

        components : { signEntry , tableTr ,brokenLine,brokenLine2,brokenLine3,brokenLine4,breathing},//

        props : ['detile','id','title'],

        data (){
          return{
            date : '',
            options : [],
            signs : [],
            maxValue : 0,
            INPATIENT_AREA_DATE : '',
            td42null : ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
            td4null : ['','','',''],
            td14null : ['','','','','','','','','','','','','',''],
            td7null : ['','','','','','',''],
            ten:30,

            dateFormatArr : [],
            pulseTemperature : [
              { pulse : 180 , temperature : '42℃'},
              { pulse : 160 , temperature : '41℃'},
              { pulse : 140 , temperature : '40℃'},
              { pulse : 120 , temperature : '39℃'},
              { pulse : 100 , temperature : '38℃'},
              { pulse : 80 , temperature : '37℃'},
              { pulse : 60 , temperature : '36℃'},
              { pulse : 40 , temperature : '35℃'},
              { pulse : 20 , temperature : '34℃'},
            ]
          }
        },

        created(){
          this.$nextTick(() => {

            let arr = []
            let in_areg_date = new Date(this.detile.INPATIENT_AREA_DATE).getTime()
            let in_areg_week = new Date(in_areg_date - 86400000 * ( 0 + (new Date(in_areg_date).getDay() + 6) % 7)).getTime() //入院周的周一

            let today_date = Math.floor(new Date().getTime()/86400000)
            let D_value = today_date - Math.floor(in_areg_week/86400000)
            console.log(today_date,D_value);
            let for_len = Math.ceil( Math.floor(D_value + 1) / 7 ) - 1
            for(let i = for_len; i >= 0 ; i--){
              let timeStamp = in_areg_week + 604800000 * i
              let timeStamp_end = in_areg_week + 604800000 * (i+1) - 86400000

              let y = new Date(timeStamp).getFullYear()
              let m = new Date(timeStamp).getMonth() + 1 > 9 ? new Date(timeStamp).getMonth() + 1 : '0' + (new Date(timeStamp).getMonth() + 1)
              let d = new Date(timeStamp).getDate() > 9 ? new Date(timeStamp).getDate() : '0' + new Date(timeStamp).getDate()
              let y_end = new Date(timeStamp_end).getFullYear()
              let m_end = new Date(timeStamp_end).getMonth() + 1 > 9 ? new Date(timeStamp_end).getMonth() + 1 : '0' + (new Date(timeStamp_end).getMonth() + 1)
              let d_end = new Date(timeStamp_end).getDate() > 9 ? new Date(timeStamp_end).getDate() : '0' + new Date(timeStamp_end).getDate()
              let str = y + '-' + m + '-' + d
              let str_end = y_end + '-' + m_end + '-' + d_end
              arr.push({ label : str , value : i, date_end: str_end })
            }
            this.options = arr

            this.maxValue = for_len
            this.date = for_len

            this.getData()
          })
        },

        methods : {

          signEntry(){
            this.$refs.signEntry.popshow = true
            this.$refs.signEntry.getData()
          },
          getData(){
            this.signs = []
            this.getSer('datacenter/twtemplateuser',{ tpl : this.id, inpatient_number : this.detile.INPATIENT_NUMBER , startDate : this.options[this.maxValue - this.date].label ,endDate : this.options[this.maxValue - this.date].date_end }, res => {
              console.log('折线图',res);
              let arr = []
              res.data.TEMPLATE_DATA.forEach(sign=>{
                for(var k in sign.items){
                  sign.items[k] = Object.values(sign.items[k])
                  sign.items[k].forEach((item,index)=>{
                    sign.items[k][index] = Object.values(item)
                  })
                }
              })
              res.data.TEMPLATE_DATA.forEach(item=>{
                if(item.SIGN_CODE == "T10600"){
                  item.items.forEach(pc=>{
                    console.log(pc);
                    for(var k in pc){
                      pc[k][0].VS_VALUE = pc[k][1].VS_VALUE + '/' + pc[k][2].VS_VALUE
                      k < 2 ? arr.push(pc[k][0]) : null
                    }
                  })
                  item.items.forEach(pc=>{
                    for(var k in pc){ k > 1 ? arr.push(pc[k][0]) : null }
                  })
                  // console.log(arr)
                  item.items = arr
                }
              })

              this.signs = res.data.TEMPLATE_DATA
              this.dateFormat()
            })
          },
          dateFormat(){
            this.dateFormatArr = []
            this.dateFormatArr.push(this.options[this.maxValue - this.date].label)
            let date = new Date(this.options[this.maxValue - this.date].label).getTime()
            for(var i=1;i<7;i++){
              this.dateFormatArr.push(new Date(date+(i*86400000)).getDate())
            }
          },
          print(){
            this.$print(this.$refs.print)
          },
        },

        watch : {
          'date' : function (to) {
            to > this.maxValue ? this.date = this.maxValue : null
            to < 0 ? this.date = 0 : null
            this.getData()
          },
          'id' : function () {
            this.getData()
          }
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
      & >>> .el-input__inner
        height 36px
        line-height 36px
      & >>>.el-input__suffix
        top 2px
  table
    border-collapse collapse
    .border-r
      border none
      border-right 1px solid #999
      padding-top 9px
    .border-n
      border none
      padding-top 9px
    td
      font-size 12px
      text-align center
      line-height 1
      white-space nowrap
    .red
      border-right 2px solid red
  p
    font-size 12px
</style>
