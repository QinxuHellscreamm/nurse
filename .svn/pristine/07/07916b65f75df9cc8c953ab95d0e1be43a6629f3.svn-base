<template>
    <el-dialog :visible.sync="popshow" width='444px' title='转床'>
      <div class='detile'>
        <span>{{thisData.BED_NUMBER}}</span>
        <span>{{thisData.NAME}}</span>
        <span>{{thisData.SEX}}</span>
        <span>{{thisData.PATIENT_AGE}}</span>
        <span>{{thisData.DEPARTMENT}}</span>
      </div>
      <div class='select'>
        <label>分配床位</label>
        <el-select v-model='bed_id'>
          <el-option v-for="item in bedList"  :key="item.BED_ID"  :label="item.BED_NUMBER" :value="item.BED_ID"></el-option>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="popshow = false" class='close'>取 消</el-button>
        <el-button @click="save" class='save'>确定</el-button>
      </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "turnBed",

        props : ['thisData'],

        data(){
          return{
            popshow : false,
            bed_id : '',
            inpatient_number : '',
            bedList : [],
          }
        },

        methods: {
          show(data){
              this.war_id = JSON.parse(localStorage.info).ward_id
              this.popshow = true
              this.inpatient_number = this.thisData.INPATIENT_NUMBER
              //获取空床床位列表
              this.bedList = [];
              this.getSer('datacenter/bed',{ filterfuc : 'empty_bed_count',war_id : this.war_id, page_size : 50 } , res => {
                  this.bedList = res.data.items
              })
          },
          save(){
              if (!this.bed_id)
              {
                  this.$message({type: 'warning', message: '请选择要分配的床位!'})
                  return false;
              }
              if (!this.inpatient_number)
              {
                  this.$message({type: 'warning', message: '病人住院号为空!'})
                  return false;
              }
            var obj = {
                id : this.bed_id,
                INPATIENT_NUMBER : this.inpatient_number,
            }
            console.log(obj);
            this._put('datacenter/bed/'+this.bed_id,obj , res => {
                console.log(res);
                if(res.status<400){
                    this.popshow = false
                    this.$message({type: 'success', message: '转床成功!'})
                    this.popshow = false
                    this.$parent.getData()
                }
            })
          }
        },

        watch : {
          'thisData' : function () {
            console.log(this.thisData)
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
      margin-top 30px
      label
        margin-right 10px
      .el-select
        width 334px
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
