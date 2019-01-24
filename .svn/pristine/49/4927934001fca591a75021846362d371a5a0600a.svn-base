<template>
    <el-dialog :visible.sync="popshow" width='444px' title='离床'>
      <div class='detile'>
        <span>{{thisData.BED_NUMBER}}</span>
        <span>{{thisData.NAME}}</span>
        <span>{{thisData.SEX}}</span>
        <span>{{thisData.PATIENT_AGE}}</span>
        <span>{{thisData.DEPARTMENT}}</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="popshow = false" class='close'>取 消</el-button>
        <el-button @click="save" class='save'>保 存</el-button>
      </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "leaveBed",

        props : ['thisData'],

        data(){
          return{
            popshow : false,
            bed_number : '',
          }
        },

        methods: {
          save(){
            this.popshow = false
            var obj = {
                patient_id : this.thisData.ID,
                bed_id : this.thisData.BED_ID,
            }
            this.post('datacenter/bed/leavebed',obj , res => {
                console.log(res);
                if(res.status<400){
                    this.$message({type: 'success', message: '离床成功!'})
                    this.popshow = false
                    this.$parent.getData()
                    this.$parent.$parent.$parent.$refs.bar.getData()
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
