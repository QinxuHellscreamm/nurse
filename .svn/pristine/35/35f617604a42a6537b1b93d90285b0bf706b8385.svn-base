<template>
    <el-dialog :visible.sync="popshow" title='产程录入' width='800px'>

      <div class='form'>
        <div class="input-item">
          <label>临产时间(h)</label>
          <el-select v-model='from.LABOR_TIME' style='width:70%' @change='getData'>
            <el-option v-for="item in houres" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <div class="input-item">
          <label>血压(mmHg)</label>
          <el-input v-model='from.SYSTOLIC_PRESSURE' maxlength='3'></el-input>
          <span style='line-height: 40px;'>&nbsp;/&nbsp;</span>
          <el-input v-model='from.DIASTOLIC_PRESSURE' maxlength='3'></el-input>
        </div>
        <div class="input-item">
          <label>宫颈扩张（cm）</label>
          <el-input v-model='from.UTERUS_DILATATION'></el-input>
        </div>
        <div class="input-item">
          <label>抬头下降(cm)</label>
          <el-input v-model='from.HEAD_DROP'></el-input>
        </div>
        <div class="input-item">
          <label>胎心音(次/min)</label>
          <el-input v-model='from.HEART_SOUND'></el-input>
        </div>
        <div class="input-item">
          <label>羊水</label>
          <el-select v-model='from.AMNIOTIC_FLUID' style='width:70%'>
            <el-option label='已破' value='已破'></el-option>
            <el-option label='未破' value='未破'></el-option>
          </el-select>
          <!--<el-input v-model='from.AMNIOTIC_FLUID'></el-input>-->
        </div>
        <h1 style='width:100%;float: left;margin-bottom: 30px'>宫缩</h1>
        <h1></h1>
        <div class="input-item">
          <label>持续(秒)</label>
          <el-input v-model='from.UTERUS_SHRINK_DURATION'></el-input>
        </div>
        <div class="input-item">
          <label>间隔(分)</label>
          <el-input v-model='from.UTERUS_SHRINK_GAPTIME'></el-input>
        </div>
        <h1 style='margin-bottom: 20px;'>处理</h1>
        <el-input type="textarea" placeholder="请输入内容" v-model="from.HANDLE"></el-input>
      </div>

      <div slot="footer" class="dialog-footer">
        <div style='float: left;'>
          <label style='margin-right: 20px;'>记录时间</label>
          <el-date-picker value-format='yyyy-MM-dd	HH:mm' format='yyyy-MM-dd	HH:mm' v-model="from.RECORD_TIME" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </div>
        <el-button type='primary' @click='save'>保存</el-button>
      </div>
    </el-dialog>
</template>

<script>

  import {_debounce,_YMDhms} from "@/global";

  export default {
        name: "laborProcessInput",

        props:['INPATIENT_NUMBER','patient'],

        data(){
          return{

            popshow : false,
            houres:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
            from : {
              LABOR_TIME:'',
              RECORD_TIME:'',
              SYSTOLIC_PRESSURE:'',
              DIASTOLIC_PRESSURE:'',
              UTERUS_DILATATION:'',
              HEAD_DROP:'',
              HEART_SOUND:'',
              AMNIOTIC_FLUID:'',
              UTERUS_SHRINK_DURATION:'',
              UTERUS_SHRINK_GAPTIME:'',
              HANDLE:''
            },

          }
        },

        methods:{
          show(){
            this.popshow = true
            for(var k in this.from){
              this.from[k] = ''
            }
            this.from.RECORD_TIME = _YMDhms()
          },
          getData(time){
            this.patient.forEach(item=>{
              if(item.HOUR == time){
                this.getSer('datacenter/birthprocess/'+time,{id:time, number:this.INPATIENT_NUMBER},res=>{
                  console.log(res);
                  if(res.status < 400){
                    this.from.RECORD_TIME = res.data.RECORD_DATE
                    this.from.AMNIOTIC_FLUID = res.data.AMNIOTIC_FLUID
                    this.from.HANDLE = res.data.HANDLE
                    this.from.DIASTOLIC_PRESSURE = res.data.DIASTOLIC_PRESSURE
                    this.from.HEAD_DROP = res.data.HEAD_DROP
                    this.from.HEART_SOUND = res.data.HEART_SOUND
                    this.from.SYSTOLIC_PRESSURE = res.data.SYSTOLIC_PRESSURE
                    this.from.UTERUS_DILATATION = res.data.UTERUS_DILATATION
                    this.from.UTERUS_SHRINK_DURATION = res.data.UTERUS_SHRINK_DURATION
                    this.from.UTERUS_SHRINK_GAPTIME = res.data.UTERUS_SHRINK_GAPTIME
                  }
                })
              }

            })
          },
          save:_debounce(function () {

            // if(!this.from.LABOR_TIME || !this.from.RECORD_TIME){
            //   var message;
            //   !this.from.LABOR_TIME ? message = "请选择临产时间" : message = "请输入记录时间"
            //   this.$message({type : 'warning',message})
            //   return
            // }
            //
            // if( this.from.SYSTOLIC_PRESSURE){
            //   if(!isNaN(this.from.SYSTOLIC_PRESSURE)){
            //     this.$message({type : 'warning',message:'血压值不能为非数字'})
            //     return
            //   }
            // }
            // if( this.from.DIASTOLIC_PRESSURE){
            //   if(!isNaN(this.from.DIASTOLIC_PRESSURE)){
            //     this.$message({type : 'warning',message:'血压值不能为非数字'})
            //     return
            //   }
            // }
            // if( this.from.UTERUS_DILATATION){
            //   if(!isNaN(this.from.UTERUS_DILATATION)){
            //     this.$message({type : 'warning',message:'宫颈扩张值不能为非数字'})
            //     return
            //   }
            // }
            // if( this.from.HEAD_DROP){
            //   if(!isNaN(this.from.HEAD_DROP)){
            //     this.$message({type : 'warning',message:'抬头下降值不能为非数字'})
            //     return
            //   }
            // }
            // if( this.from.HEART_SOUND){
            //   if(!isNaN(this.from.HEART_SOUND)){
            //     this.$message({type : 'warning',message:'胎心音'})
            //     return
            //   }
            // }
            // if( this.from.UTERUS_SHRINK_DURATION){
            //   if(!isNaN(this.from.UTERUS_SHRINK_DURATION)){
            //     this.$message({type : 'warning',message:'持续值不能为非数字'})
            //     return
            //   }
            // }
            // if( this.from.UTERUS_SHRINK_GAPTIME){
            //   if(!isNaN(this.from.UTERUS_SHRINK_GAPTIME)){
            //     this.$message({type : 'warning',message:'间隔值不能为非数字'})
            //     return
            //   }
            // }


            this.post('datacenter/birthprocess',{ INPATIENT_NUMBER:this.INPATIENT_NUMBER , ...this.from },res=>{
              if(res.status < 400){
                this.$message({ type: 'success', message : '录入成功'})
                this.popshow = false
                this.$parent.getData()
              }
            })
          })
        },
    }
</script>

<style scoped lang='stylus'>
.form
  overflow hidden
  padding 0 10px
  .input-item
    float left
    display flex
    width 45%
    margin-bottom 30px
    &:nth-child(2n)
      margin-left 70px
    label
      display inline-block
      width 100px
      line-height 40px
    .el-input
      flex 1
  .el-textarea >>>.el-textarea__inner
    resize none
    background-color #F9F9FB
    height 110px
</style>
