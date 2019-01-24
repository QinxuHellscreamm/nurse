<template>
  <div>
    <div class="out-top">
      <span>时间</span>
      <el-date-picker
        v-model="start_end_time"
        type="datetimerange"
        value-format='yyyy-MM-dd	HH:mm'
        format="yyyy-MM-dd	HH:mm"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <span>选择病区</span>
      <el-select v-model="ward_id"  placeholder="选择病区" >
        <el-option
          v-for="item in ward_list"
          :key="item.ID"
          :label="item.NAME"
          :value="item.ID">
        </el-option>
      </el-select>
      <span>病人姓名</span>
      <el-input v-model="patient_name" placeholder="请输入病人姓名"></el-input>
      <el-button type='primary' @click="pageAjax()">搜索</el-button>
    </div>

    <div class="out-main">
      <el-table :data="patientList" style="width: 100%">
        <el-table-column  prop='NAME' label="姓名"  min-width="80">
          <template slot-scope="{row}">
            <el-button type='text' @click='showDoc(row)'>
              {{ row.BED_NUMBER+'床_'+row.NAME }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column  prop='SEX' label="性别"  min-width="36"></el-table-column>
        <el-table-column  prop='PATIENT_AGE' label="年龄"  min-width="100"></el-table-column>
        <el-table-column  prop='DIAGNOSTIC_RESULTS' label="诊断"  min-width="240"></el-table-column>
        <el-table-column  prop='NURSING_GRADE' label="护理级别"  min-width="80"></el-table-column>
        <el-table-column  prop='MEDICAL_RECORD_NUM' label="住院号"  min-width="100"></el-table-column>
        <el-table-column  prop='HOSPITALIZED_DATE' label="入院时间"  min-width="140"></el-table-column>
        <el-table-column  prop='FEEBY' label="病人费别"  min-width="140"></el-table-column>
        <el-table-column  prop='DOCTOR' label="主管医生"  min-width="80"></el-table-column>
      </el-table>
      <div class="block" style="margin:20px 0;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-size="20"
          layout="total, prev, pager, next, jumper"
          :total="adicsCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    data(){
      return {
        start_end_time: "",
        patient_name : "",
        patientList:[],
        currentPage1 : 1,
        adicsCount : 0,
        ward_id:'',
        ward_list:[],
        role_rank:'',
      }
    },

    methods:{
      getType(){
        this.getSer("datacenter/ward" ,{}, (res) => {
          this.ward_list = res.data;
          this.ward_list.unshift({ID: "0", NAME: "全部"})
            console.log('this.ward_list',this.ward_list)
        })
      },
      pageAjax(){
        this.getSer("datacenter/patient" , {
          start_time: (this.start_end_time ? this.start_end_time[0] : '') ,
          end_time: (this.start_end_time ? this.start_end_time[1] : '') ,
          ward_id : this.ward_id,
          patient_name : this.patient_name,
          page: this.currentPage1,
          page_size: this.pageSize,
        },res=>{
        if(res.status <= 400){
          this.patientList = res.data.items;
          this.adicsCount = parseInt(res.data.meta.totalCount);
        }
      })
      },
      handleCurrentChange(val) {       //当前页变化的时候
        this.currentPage1 = val
        this.pageAjax();
      },
      showSub(id,name) {
        console.log("rowrow",name,id)
        this.$parent.$parent.addDynamic(id,name)
      },
      showDetail(id,name) {
        console.log("showDetail",name,id)
        this.$parent.$parent.addDynamicShow(id,name)
      },
    },
    mounted() {

      this.$nextTick(() => {
        this.pageAjax()
        this.getType()
    })
    },
  }
</script>

<style scoped lang="stylus">
  .out-top >>> .el-input__inner
    background #fff
  .out-top
    .el-input
      width 150px
      margin-right 10px
      &>>>.el-input__inner
        width 150px
    .el-select
      margin-right 10px
      width 150px
  .el-button
    padding 12px 32px

</style>
