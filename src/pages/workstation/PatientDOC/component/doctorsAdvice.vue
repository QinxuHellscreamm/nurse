<template>
    <div class='mainropt'>
      <!--<div class="pro-top">

        <span>日期</span>
        <el-date-picker v-model="startTime" type="date" value-format='yyyy-MM-dd' format='yyyy-MM-dd' placeholder=""></el-date-picker>
        <span>&nbsp;&nbsp;至</span>
        <el-date-picker v-model="endTime" type="date" value-format='yyyy-MM-dd' format='yyyy-MM-dd' placeholder=""></el-date-picker>&nbsp;&nbsp;


          </div>-->
          <div class="pro-top">
            <el-radio-group v-model="isStop"><el-radio :label="0">全部医嘱</el-radio><el-radio :label="1">有效医嘱</el-radio><el-radio :label="2">已停医嘱</el-radio></el-radio-group>
            <span style="padding: 0 15px;color: #D8E3E7">|</span>
            <el-radio-group v-model="order"><el-radio :label="0">全部医嘱</el-radio><el-radio :label="1">长期医嘱</el-radio><el-radio :label="2">临时医嘱</el-radio></el-radio-group>
            <el-button size="small"  type="primary" @click='getData' style="margin-left: 20px;padding: 9px 25px;">搜索</el-button>
            <el-button size="small"  type="success" @click='getData' style="margin-left: 20px;padding: 9px 25px;">刷新</el-button>
          </div>
          <div style='display: flex'>
            <billingInfor :medicaladvice_list="medicaladvice_list"></billingInfor>
          </div>
    </div>
</template>
<script>
  import {_YMD} from "@/global";
  import billingInfor from './billingInfor'
    export default{
        props:['INPATIENT_NUMBER'],
        components:{billingInfor},
      data(){
          return {
            checkAll: false,
            checkedCities: [],
            medicaladvice_type_list: [],
            isIndeterminate: false,
            medicaCheck:[],
            value2:'',
            options:[],
            startTime: "",
            endTime: "",
            editableTabsValue: '0',
            isStop:0,
            order: 0,
            input: "",
            inhospital_patient_list: [],
            selecData:[],
            medicaladvice_list:[],
            execRecord:[],
            check_inpatient_number:[],
            checks:false,
            start_end_time:[],
            res:[],
            title:"医嘱执行清单"
          }
      },

      created(){
        this.$nextTick(()=> {
          document.oncontextmenu = event => {  event.preventDefault()  }
          this.getData()
        })
      },

      methods: {
        //获取列表
        getData(){
        console.log('this.INPATIENT_NUMBER',this.INPATIENT_NUMBER)
        let  obj ={
            check_inpatient_number:JSON.stringify([this.INPATIENT_NUMBER]),
            aging:this.order,
            status:this.isStop,
            begin:this.startTime
          }
          console.log("医嘱执行清单")
          this.getSer("datacenter/medicaladvice/sourceindex",obj,res=>{
            if(res.status == 200){
              // this.medicaladvice_list = res.data.items;
              this.res = res.data.items;
              this.dealTable();
            }
          })
        },

        dealTable(){
          let groupIndex = [0] // 保存类型需要合并的值
          let a = 1

          this.res.forEach((v, index, arr)=> {
            if((index+1) == this.res.length) {
              groupIndex.push(a);
            }else if(arr[index]['LIST_ID'] != arr[index+1]['LIST_ID']){
              groupIndex.push(a);
              a = 1;
            }else {
              a++;
            }
          })
          console.log('groupIndex', groupIndex)
          // 根据这个规则,只需要给数据加上两个额外的属性控制是否合并就OK
          let k = 0
          groupIndex.forEach((v, i, nameArr) => {
            if (nameArr[i + 1]) {
              this.res[k].INDEX = nameArr[i + 1]
              k += nameArr[i + 1]
            }
          })
          console.log('medicaladvice_list', this.res);
          this.medicaladvice_list = this.res;
        },

      },



    }
</script>
<style scoped lang='stylus'>
  .mainropt
    margin 20px
    .el-tabs
      &>>>.el-tabs__item
        background-color #DDEFF9
        line-height 36px
        height 36px
        padding 0 26px
        margin-left 10px
        border-radius 4px 4px 0 0
      &>>> #tab-0 span
        display none
      &>>>.is-active
        background-color #FFFFFF
        color #666
      &>>>.el-tabs__active-bar
        display none
      &>>>.el-tabs__nav-wrap:after
        display none
      &>>>.el-tabs__header
        margin 0
      &>>>.el-tabs__content
        background-color #FFFFFF
        min-height 660px
        border-radius 4px 4px 0 0
    .pro-top
      background #fff
      height 50px
      line-height 50px
      padding 0 20px
      .el-date-editor
        width 136px
        margin-left 10px
        &>>>.el-input__inner
          line-height 32px
          height 32px
      .el-checkbox-group
        display inline-block
        .el-checkbox
          margin-left 15px


</style>
