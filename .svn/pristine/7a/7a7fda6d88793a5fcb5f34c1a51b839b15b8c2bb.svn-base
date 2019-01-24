<template>
  <el-dialog :visible.sync="popshow" title='出入量统计' width='660px'>
    <div class='item'>
      <label>开始时间</label>
      <el-date-picker value-format='yyyy-MM-dd' format='yyyy-MM-dd 07:00' v-model="begin" type="date" placeholder="选择日期时间"></el-date-picker>
      <label style='margin-left: 15px'>结束时间</label>
      <el-date-picker value-format='yyyy-MM-dd	HH:mm' format='yyyy-MM-dd	HH:mm' v-model="end" type="datetime" placeholder="选择日期时间" readonly></el-date-picker>
    </div>
    <div class='item'>
      <label>时间选择</label>
      <el-select v-model='TIME'>
        <el-option v-for="item in options"  :key="item.label"  :label="item.label" :value="item.value"></el-option>
      </el-select>
      <label style='margin-left: 15px'>统计类型</label>
      <el-select v-model='type' @change='selectC'>
        <el-option v-for="item in types"  :key="item.label"  :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
    <div class='item'>
      <template v-if='type=="T10800"'>
        <label >出量名称</label>
        <el-select v-model='outname' style='margin-right: 15px'>
          <el-option v-for="(item,i) in outnames"  :key="i"  :label="item" :value="item"></el-option>
        </el-select>
      </template>
      <label>统计结果</label>
      <el-input v-model='TOTAL' class='TOTAL' readonly></el-input>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="extend_record(1)" class='extend_record' v-if='end'>插入体温单</el-button>
      <el-button @click="extend_record(2)" class='extend_record' v-if='end'>插入记录单</el-button>
      <el-button @click="popshow = false" type='danger'>关闭</el-button>
      <el-button @click="ok()" type='primary'>统计</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {_debounce} from "@/global";

  export default {
        name: "statistics",

        props:['INPATIENT_NUMBER','id','HOSPITALIZED_DATE'],

        data(){
          return{
            popshow : false,
            begin : '',
            end : '',
            options:[{label:'12',value:'12'},{label:'24',value:'24'}],
            type:'T10800',
            types:[{label:"出量",value:'T10800'},{label:'入量',value:"T11300"}],
            TIME:'12',
            TOTAL:'',
            outname:'',
            outnames:'',
            php_time : ''
          }
        },

        methods:{
          show(){
            this.popshow = true
            this.begin = ''
            this.end = ''
            this.TIME = '24'
            this.TOTAL = ''
            this.outname = ''
          },
          ok(){
            if(!this.begin){
              this.$message({type : 'warning',message : '开始时间不能为空'})
              return
            }
            this.getSer('datacenter/record',{ CODE:this.type , BEGIN:this.begin + ' 07:00' , TIME:this.TIME , INPATIENT_NUMBER:this.INPATIENT_NUMBER ,ID:this.id ,OUTNAME:this.outname,HOSPITALIZED_DATE:this.HOSPITALIZED_DATE },res=>{
              console.log(res)
              if(res.status<400){
                this.end = res.data.end
                this.TOTAL = res.data.total
                this.php_time = res.data.time
              }
            })
          },
          extend_record : _debounce(function (TO) {
            this.post('datacenter/record',{ INPATIENT_NUMBER:this.INPATIENT_NUMBER,TIME:this.php_time,CODE:this.type,TOTAL:this.TOTAL, DATE:this.end,TO , ID : this.id ,OUTNAME:this.outname },res=>{
              console.log(res)
              let message = TO == 1 ? '已插入到体温单' : '已插入到记录单'
              if(res.status<400){
                this.$message({ type:'success',message })
                this.popshow = false
                this.$parent.getList()
              }
            })
          }),
          selectC(val){
            val == 'T10800' ? this.outname = '' : null
          }
        },

        mounted(){
          this.$nextTick(()=>{
            this.getSer('datacenter/record/outitem',{},res=>{
              this.outnames = ['',...res.data]
            })
          })
        }
    }
</script>

<style scoped lang='stylus'>
  .item
    margin 18px 0
    label
      margin-right 10px
  .extend_record
    background-color #DDEFF9
    color #00B3DC
    border-color #DDEFF9
    float left
  .TOTAL
    width 220px
</style>
