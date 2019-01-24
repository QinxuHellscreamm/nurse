<template>
  <el-dialog :visible.sync="popshow" width='960px' :title='title' append-to-body>
    <div style="display: flex;flex-wrap: wrap;">
      <patientAlentNode v-for="(node,index) of TEMPLATE.NODES" :nodeData='node' :key='index' :class='{"br":node.IS_NEWLINE =="1"}' ></patientAlentNode>
    </div>
    <div>
      <span>总分</span>
      <span>{{computedFraction}}</span>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="popshow = false">取 消</el-button>
      <el-button @click="ok">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import patientAlentNode from './patientAlentNode'
    export default {
        name: "alertNode",

        props : ['importTemplateId','form_id','inpatient_number'],

        components : { patientAlentNode },

        data(){
          return{
            popshow : false,
            title : '',
            TEMPLATE : {},
            computedFraction : 0
          }
        },

        methods : {
          getData(){

            if(this.$store.state.importTemplateObj.saveType == 'post'){
              this.getSer('datacenter/template/' + this.importTemplateId, { id : this.importTemplateId } , res => {
                console.log(res);
                this.TEMPLATE = res.data
                this.$store.state.importTemplateObj.importTemplateArr.push(this.TEMPLATE)
                this.title = res.data.NAME
              })
            }else{
              this.getSer('datacenter/questionnaire/' + this.form_id.form_id ,{ id : this.form_id.form_id, inpatient_number : this.inpatient_number },res => {
                console.log(res)
                if(res.status < 400){
                  this.TEMPLATE = res.data
                  this.$store.state.importTemplateObj.importTemplateArr.push(this.TEMPLATE)
                  this.title = res.data.NAME
                  //this.editId = res.data.ID
                }
              })
            }
          },
          computedScore(arr) {
            if(arr){
              arr.forEach(item=> {
                this.computedFraction += Number(item.VALUE.score)
                item.CHILDS.length != 0 ? this.computedScore(item.CHILDS) : null
              })
            }
          },
          ok(){
            this.popshow = false
            this.$parent.nodeData.VALUE.score = this.computedFraction
          }
        },

        mounted(){
          this.$nextTick(()=>{
            this.getData()
          })
        },

        watch :{
          'TEMPLATE.NODES': {
            handler(newValue, oldValue) {
              this.computedFraction = 0
              this.computedScore(newValue)
            },
            deep : true
          },
          'form_id.form_id' : function () {
            this.getData()
          }
        }
    }
</script>

<style scoped lang='stylus'>
  .br
    width 100%
  .dialog-footer
    .el-button:last-of-type
      background-color #00B3DC
      color #fff
      padding 13px 50px!important
      border 0
    .el-button:first-of-type
      background-color #DDEFF9
      color #00B3DC
      padding 13px 20px!important
      border 0
</style>
