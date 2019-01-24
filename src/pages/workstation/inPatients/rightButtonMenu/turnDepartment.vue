<template>
  <el-dialog :visible.sync="popshow" width='444px' title='转科'>
    <div class='detile'>
      <span>{{thisData.BED_NUMBER}}</span>
      <span>{{thisData.NAME}}</span>
      <span>{{thisData.SEX}}</span>
      <span>{{thisData.PATIENT_AGE}}</span>
      <span>{{thisData.DEPARTMENT}}</span>
    </div>
    <div class='select'>
      <label>转入科室</label>
      <el-select v-model='department_id'>
        <el-option v-for="item in departmentList"  :key="item.ID"  :label="item.NAME" :value="item.ID" v-if="item.ID != old_department_id"></el-option>
      </el-select>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="popshow = false" class='close'>取 消</el-button>
      <el-button @click="childDialogshowfun()">确定</el-button>
    </div>
    <el-dialog append-to-body :visible.sync="childDialogshow" width='444px'>
      <div class='detile'>
        <span>{{thisData.BED_NUMBER}}</span>
        <span>{{thisData.NAME}}</span>
        <span>{{thisData.SEX}}</span>
        <span>{{thisData.PATIENT_AGE}}</span>
        <span>{{thisData.DEPARTMENT}}</span>
        <span>是否转科</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="childDialogshow = false" class='close'>取 消</el-button>
        <el-button @click="save">确定</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
  export default {
    name: "turnBed",

    props : ['thisData'],

    data(){
      return{
        popshow : false,
        old_department_id : this.thisData.DEPARTMENT_ID,
        department_id : '',
        patient_id : this.thisData.ID,
        childDialogshow : false,
        departmentList : [],
      }
    },

    methods: {
      show(){
          this.old_department_id = this.thisData.DEPARTMENT_ID
          this.war_id = JSON.parse(localStorage.info).ward_id
          this.getSer("datacenter/department", {'page': 1, 'page_size': 1000}, (res) =>{
              if( res.status <= 400){
                  this.departmentList = res.data.items
                  this.popshow = true
              }
              else
              {
                  this.$message({type: 'warning', message: '科室获取错误'})
                  return false
              }
          })
      },
      childDialogshowfun(){
        if (!this.department_id)
        {
            this.$message({type: 'warning', message: '请选择科室'})
            return false
        }
        this.childDialogshow = true
      },
      save(){
        var obj = {
            patient_id : this.thisData.ID,
            department_id : this.department_id,
        }
        this.post('datacenter/bed/setdepartment',obj , res => {
          if(res.status<400){
              this.$message({type: 'success', message: '转科成功!'})
              this.childDialogshow = false
              this.popshow = false
              this.$parent.getData()
          }
        })
      }
    },

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
</style>
