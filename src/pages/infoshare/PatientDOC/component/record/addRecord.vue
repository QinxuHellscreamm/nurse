<template>
  <el-dialog :visible.sync="popshow" width='1060px' class='custom'>
    <div slot='title'>
      <span class="el-dialog__title">{{popname}}</span>
      <label style='display: inline-block;text-align: center;width: 75%'>
        <span style='font-size: 18px;color:#00B3DC;margin-left: 6px;'>{{detile.BED_NUMBER}}</span>
        <span style='font-size: 18px;color:#00B3DC;margin-left: 6px;'>{{detile.NAME}}</span>
        <span style='font-size: 18px;color:#00B3DC;margin-left: 6px;'>{{detile.SEX}}</span>
        <span style='font-size: 18px;color:#00B3DC;margin-left: 6px;'>{{detile.AGE}}</span>
      </label>
      <button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button>
    </div>
    <div style="display: flex;flex-wrap: wrap;">
      <patientNode v-for="(node,index) of TEMPLATE.NODES" :nodeData='node' :seeText="seeText" :key='index' :class='{"br":node.IS_NEWLINE =="1"}' :inpatient_number='INPATIENT_NUMBER'></patientNode>
    </div>
    <div slot="footer" class="dialog-footer">
      <div style='display: inline-block;float: left;'>
        <label style='margin-right: 10px'>记录时间</label>
        <el-date-picker v-model="date"  :disabled="seeText" type="datetime" value-format='yyyy-MM-dd	HH:mm' format='yyyy-MM-dd	HH:mm' placeholder="选择日期时间"></el-date-picker>
      </div>
      <el-button @click="popshow = false" style='padding:12px 32px;'>取消</el-button>
     <!-- <el-button type="primary" @click='save' style='padding:12px 42px;'>确定</el-button>-->
    </div>
  </el-dialog>
</template>

<script>
  import { _debounce , _YMDhms} from "@/global"
  import patientNode from '../patientNode/patientNode'
    export default {
        name: "addRecord",

        components : { patientNode },

        props:['id','INPATIENT_NUMBER','detile','seeText'],

        data(){
          return{
            popname:'新增护理记录',
            popshow : false,
            TEMPLATE:{},
            date : '',
            nodeValueArr:[],
            template_answers:[],
            editId:''
          }
        },

        methods:{
          getData(){
            this.popshow = true
            this.popname = "新增护理记录"
            this.$store.state.importTemplateObj.saveType = 'post'
            console.log({ id : this.id , inpatient_number : this.INPATIENT_NUMBER })
            this.getSer('datacenter/template/' + this.id, { id : this.id , inpatient_number : this.INPATIENT_NUMBER} , res => {
              console.log(res)
              this.TEMPLATE = res.data
              this.date = _YMDhms()
            })
          },
          setData(id){
            this.getSer('datacenter/questionnaire/' + id ,{ id , inpatient_number : this.INPATIENT_NUMBER },res => {
              console.log(res)
              if(res.status < 400){
                this.popshow = true
                this.$store.state.importTemplateObj.saveType = 'put'
                this.$store.state.importTemplateObj.importTemplateArr = []
                this.template_answers = []
                this.date = res.data.FORM_DATE
                this.TEMPLATE = res.data
                this.editId = res.data.ID
                this.popname = "修改护理记录"
              }
            })
          },
          save : _debounce(function(){
            this.nodeValueArr = []
            this.template_answers = []
            this.recursion(this.TEMPLATE.NODES)
            this.recursion_template_answers()
            if(this.$store.state.importTemplateObj.saveType == 'post'){
              console.log({
                form_id : this.id ,
                inpatient_number : this.INPATIENT_NUMBER ,
                time : this.date ,
                answers : JSON.stringify(this.nodeValueArr),
                template_answers : JSON.stringify(this.template_answers)
              })
              this.post('datacenter/questionnaire' ,{
                form_id : this.id ,
                inpatient_number : this.INPATIENT_NUMBER ,
                time : this.date ,
                answers : JSON.stringify(this.nodeValueArr),
                template_answers : JSON.stringify(this.template_answers)
              },res => {
                if(res.data.code < 400){
                  this.popshow = false
                  this.$message({ message: '新增成功', type: 'success' })
                  this.$parent.getList()
                  //this.getData()
                }else{
                  this.$message({ message: res.data.message, type: 'warning' })
                }
                console.log(res)
              })
            }
            if(this.$store.state.importTemplateObj.saveType == 'put'){
              this._put('datacenter/questionnaire/' + this.editId ,{
                id : this.editId ,
                inpatient_number : this.INPATIENT_NUMBER ,
                time : this.date ,
                answers : JSON.stringify(this.nodeValueArr),
                template_answers : JSON.stringify(this.template_answers)
              },res => {
                if(res.data.code < 400){
                  this.popshow = false
                  this.$message({ message: '编辑成功', type: 'success' })
                  this.$parent.getList()
                }else{
                  this.$message({ message: res.data.message, type: 'warning' })
                }
                console.log(res)
              })
            }
          }),
          recursion(arr) {
            arr.forEach(item=> {
              item.VALUE.qid = item.ID
              this.nodeValueArr.push(item.VALUE)
              item.CHILDS.length != 0 ? this.recursion(item.CHILDS) : null
            })
          },
          recursion_template_answers() {
            this.$store.state.importTemplateObj.importTemplateArr.forEach(form=>{
              let obj = {
                relate_qid : form.ID,
                relate_answer : []
              }
              this.recursion_template_answers_callback(form.NODES,obj)
              this.template_answers.push(obj)
            })

          },
          recursion_template_answers_callback(NODES,obj){
            console.log(NODES)
            NODES.forEach(item=> {
              item.VALUE.qid = item.ID
              obj.relate_answer.push(item.VALUE)
              item.CHILDS.length != 0 ? this.recursion_template_answers_callback(item.CHILDS,obj) : null
            })
          },
        }
    }
</script>

<style scoped lang='stylus'>
  .br
    width 100%
  .custom
    &>>>.el-dialog__body
      padding 40px 20px
  .dialog-footer
    .el-date-editor
      width 200
      &>>>.el-input__inner
        background-color #F9F9FB
</style>
