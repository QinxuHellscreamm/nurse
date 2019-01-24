<template>
    <el-dialog :visible.sync="popshow" width='444px' title='床位安置'>
      <div class='detile'>
        <span v-if='$store.state.bedType == "empty_bed_count" || thisData.INPATIENT_NUMBER == null'>{{thisData.BED_NUMBER}}</span>
        <span>{{thisData.NAME||''}}</span>
        <span>{{thisData.SEX||''}}</span>
        <span>{{thisData.PATIENT_AGE||''}}</span>
        <span>{{thisData.DEPARTMENT||''}}</span>
      </div>

      <div class='select' v-if='$store.state.bedType == "empty_bed_count" || thisData.INPATIENT_NUMBER == null'>
        <label>选择病人</label>
        <el-select v-model='patient_id' @change="getDoctor">
          <el-option v-for="item in patientList"  :key="item.ID"  :label="item.NAME" :value="item.ID"></el-option>
        </el-select>
      </div>
      <div class='select' v-if='$store.state.bedType == "to_be_set_patient_count"'>
        <label>分配床位</label>
        <el-select v-model='bed_id'>
          <el-option v-for="item in bedList"  :key="item.BED_ID"  :label="item.BED_NUMBER" :value="item.BED_ID"></el-option>
        </el-select>
      </div>
      <div class='select'>
        <label>主管护士</label>
        <el-select v-model='nurse'>
          <el-option v-for="item in nurseList"  :key="item.ID"  :label="item.NAME" :value="item.ID"></el-option>
        </el-select>
      </div>
      <div class='select'>
        <label>主管医生</label>
        <el-select v-model='doctor'>
          <el-option v-for="item in doctorList"  :key="item.ID"  :label="item.NAME" :value="item.ID"></el-option>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="popshow = false" class='close'>取 消</el-button>
        <el-button @click="save" class='save'>保 存</el-button>
      </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "safeBed",

        props : ['thisData'],

        data(){
          return{
            popshow : false,
            bed_id : this.thisData.BED_ID,
            patient_id : this.thisData.ID,
            doctor : '',
            nurse : '',
            type : '',
            bedList : [],
            patientList : [],
            nurseList : [],
            doctorList : [],
            ward_id : '',
          }
        },
      methods:{
            //病人变化时调用此接口
        getDoctor(patient_id){
            this.getSer('datacenter/patient/'+patient_id,{ id : patient_id } , res => {
                console.log('patient res');
                console.log(res);
                var patient_info = res.data
                this.getSer('datacenter/doctor',{ dept_id : patient_info.DEPARTMENT_ID } , res => {
                    this.doctorList = res.data.items
            })
        })
        },
          show(data){
              this.war_id = JSON.parse(localStorage.info).ward_id
              this.doctor = ''
              this.nurse =''
              this.bed_id =''
              this.nurseList = []
              this.doctorList = []
            this.popshow=true
              if (this.thisData.ID)
              {
                  this.patient_id = this.thisData.ID
              }
              if (this.thisData.BED_ID)
              {
                  this.bed_id = this.thisData.BED_ID
              }
            if (data.INPATIENT_NUMBER == null)
            {
                //获取待安置病人列表
                this.patientList = [];
                this.getSer('datacenter/bed',{ filterfuc : 'to_be_set_patient_count',war_id : this.war_id, page_size : 50 } , res => {
                    this.patientList = res.data.items
                })
            }
            else
            {
                //获取空床床位列表
                this.bedList = [];
                this.getSer('datacenter/bed',{ filterfuc : 'empty_bed_count',war_id : this.war_id, page_size : 50 } , res => {
                    this.bedList = res.data.items
                })
            }
            //获取同病区下的护士
              console.log('获取同病区下的护士')
              this.nurseList = [];
            this.getSer('datacenter/nurse',{ war_id : this.war_id } , res => {
                this.nurseList = res.data.items
            })
            //获取同科室下的医生
              this.doctorList = [];
            if (this.thisData.DEPARTMENT_ID)
            {
                this.getSer('datacenter/doctor',{ dept_id : this.thisData.DEPARTMENT_ID } , res => {
                    this.doctorList = res.data.items
                })
            }
          },
        save(){
            if (this.patient_id == null)
            {
                this.$message({type: 'warning', message: '请选择病人'})
                return false
            }
            if (this.bed_id == null)
            {
                this.$message({type: 'warning', message: '请选择床位'})
                return false
            }
            if (this.nurse == null)
            {
                this.$message({type: 'warning', message: '请选择责任护士'})
                return false
            }
            if (this.doctor == null)
            {
                this.$message({type: 'warning', message: '请选择医生'})
                return false
            }
            var obj = {
              patient_id : this.patient_id,
              bed_id : this.bed_id,
              nurse_id : this.nurse,
              doctor_id : this.doctor,
            }
          this.post('datacenter/bed/setbed',obj , res => {
              console.log(res);
              if(res.status<400){
                  this.$message({type: 'success', message: '安床成功!'})
                  this.popshow = false
                  this.$parent.getData()
                  this.$parent.$parent.$parent.$refs.bar.getData()
              }
          })

        }
      }
    }
</script>

<style scoped lang='stylus'>
  .detile
    color #00B3DC
    span
      font-size 16px
      margin-right 8px
  .select
    margin-top 20px
    label
      margin-right 10px
    .el-select
      width 310px
      &>>>.el-input__inner
        background-color #F9F9FB
  .close
    background-color #DDEFF9
    color #00B3DC
    border-color #DDEFF9
    padding 12px 30px
  .save
    background-color #00B3DC
    color #FFFFFF
    padding 12px 46px
</style>
