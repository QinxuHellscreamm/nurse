<template >
  <div class="report">
    <div class="repTop"  style="">
      <div class="subBut" style=" ">
        <el-button type="primary" plain @click="cancel('ruleForm')"  size="small" class="cancel">保存草稿</el-button>
        <el-button type="primary" @click="onSubmit('ruleForm')"  size="small" class="sub">保存</el-button>
        <el-button type="primary" icon="el-icon-printer"  size="small" @click="print_preview" class="prin"></el-button>
      </div>
      <h2>护理不良事件报告单</h2>
      <p><span>姓名:{{NAME}}</span><span>病区:{{ward_arrName}}</span><span>床号:{{BED_NUMBER}}</span><span>住院号:{{INPATIENT_NUMBER}}</span></p>
    </div>

    <el-form ref="ruleForm" :model="ruleForm" label-width="80px" :rules="rules">
      <div class="situation">
        <h3>事件基本情况</h3>
        <div>
          <!--  <span class="span">事件类型</span>-->
          <el-form-item label="事件类型" prop="EVENT_TYPE">
            <el-select v-model="ruleForm.EVENT_TYPE" placeholder="请选择">
              <el-option
                v-for="item in patient_typelist"
                :key="item.ID"
                :label="item.NAME"
                :value="item.ID">
              </el-option>
            </el-select>
            </el-form-item>
          <el-form-item label="发生时间" prop="EVENT_AT">
            <el-date-picker
                    v-model="ruleForm.EVENT_AT"
                    type="datetime"
                    value-format='yyyy-MM-dd	HH:mm'
                    format="yyyy-MM-dd	HH:mm"
                    placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="到达时间" prop="EVENT_AT">
            <el-date-picker
              v-model="ruleForm.ARRIVE_AT"
              type="datetime"
              value-format='yyyy-MM-dd	HH:mm'
              format="yyyy-MM-dd	HH:mm"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="发生地点" prop="EVENT_AT_POINT">
            <el-input v-model="ruleForm.EVENT_AT_POINT" placeholder="请输入内容" ></el-input>
          </el-form-item>
        </div>
        <el-form-item label="不良事件经过" prop="EVENT_CONTENT" class="texta" label-width="110px" >
       <!-- <p style="display: inline-block;width: 90px;">不良事件经过</p>-->
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="ruleForm.EVENT_CONTENT">
          </el-input>
        </el-form-item>
      </div>


      <div class="situation nurse">
        <h3>报告人</h3>
        <div >
          <el-form-item label="姓名" >
            <el-input   v-model="ruleForm.REAL_NAME" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="职务">
            <el-input v-model="ruleForm.JOB" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="职称">
            <el-input   v-model="ruleForm.PROFESSIONAL_POST" :disabled="true"></el-input>
          </el-form-item>
        </div>
        <div >
          <el-form-item label="年龄">
            <el-input  v-model="ruleForm.AGE" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="工作年限">
            <el-input  v-model="ruleForm.WORK_AGE" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="所在病区">
            <el-input  v-model="ruleForm.WARD_NAME" :disabled="true"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="situation">
        <h3>患者情况
          <el-form-item label-width="10px"  prop="PATIENT_TYPE">
            <el-select v-model="ruleForm.PATIENT_TYPE" placeholder="请选择" >
              <el-option
                v-for="item in patient"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </h3>
        <div>
          <el-form-item label="住院号"  :prop="this.ruleForm.PATIENT_TYPE!='3'? 'PATIENT_INPATIENT_NUMBER':'PATIENT_INPATIENT_N'" >
            <el-input v-model="ruleForm.PATIENT_INPATIENT_NUMBER" placeholder="请输入内容" ></el-input>
          </el-form-item>
          <el-form-item label="姓名"  prop="PATIENT_NAME">
            <el-input v-model="ruleForm.PATIENT_NAME" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="性别"  prop="PATIENT_SEX">
            <el-select v-model="ruleForm.PATIENT_SEX" placeholder="请选择">
              <el-option
                v-for="item in sex"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

        </div>
        <div>
          <el-form-item label="年龄" prop="PATIENT_AGE">
            <el-input v-model="ruleForm.PATIENT_AGE" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="科室"  :prop="this.ruleForm.PATIENT_TYPE!='3'? 'PATIENT_DEPARTMENT_ID':'PATIENT_INPATIENT_N'" >
            <el-input v-model="ruleForm.PATIENT_DEPARTMENT_ID" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="入院时间" :prop="this.ruleForm.PATIENT_TYPE!='3'? 'PATIENT_HOSPITALIZED_DATE':'PATIENT_INPATIENT_N'" >
            <el-date-picker
              v-model="ruleForm.PATIENT_HOSPITALIZED_DATE"
              value-format='yyyy-MM-dd	HH:mm'
              format="yyyy-MM-dd	HH:mm"
              type="datetime"
              placeholder="">
            </el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="护理级别"  :prop="this.ruleForm.PATIENT_TYPE!='3'? 'PATIENT_NURSING_GRADE_ID':'PATIENT_INPATIENT_M'" >
            <el-select v-model="ruleForm.PATIENT_NURSING_GRADE_ID" placeholder="请选择">
              <el-option
                v-for="item in patient_gra"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文化程度"   :prop="this.ruleForm.PATIENT_TYPE!='3'? 'PATIENT_EDUCATION_DEGREE':'PATIENT_INPATIENT_M'" >
            <el-select v-model="ruleForm.PATIENT_EDUCATION_DEGREE" placeholder="请选择">
              <el-option
                v-for="item in patient_edu"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="患者床号" :prop="this.ruleForm.PATIENT_TYPE!='3'? 'PATIENT_BED_NUMBER':'PATIENT_INPATIENT_N'" >
            <el-input v-model="ruleForm.PATIENT_BED_NUMBER" placeholder="请输入内容"></el-input>
          </el-form-item>
        </div>
        <div class="diagnosis">
          <el-form-item label="患者诊断" class="texta"  :prop="this.ruleForm.PATIENT_TYPE!='3'? 'PATIENT_DIAGNOSTIC_RESULTS':'PATIENT_INPATIENT_N'" >
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="ruleForm.PATIENT_DIAGNOSTIC_RESULTS">
            </el-input>
          </el-form-item>
        </div>

      </div>
    </el-form>

    <el-dialog :visible.sync="popshow" title='预览' width='800px'>
      <div ref="print">
        <div v-html='content'></div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="popshow = false">取 消</el-button>
        <el-button type='primary' @click='print'>打印</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default{
    name: "adverseEvent",

    props: ['ID','INPATIENT_NUMBER','NAME','BED_NUMBER','AGE','SEX','DEPARTMENT','HOSPITALIZED_DATE','NURSING_GRADE_ID'],
    data(){

        return {
          ruleForm: {
            EVENT_TYPE:'',
            EVENT_AT:'',
            EVENT_CONTENT:'',
            EVENT_AT_POINT:'',
            PATIENT_TYPE:'1',
            PATIENT_NURSING_GRADE_ID:this.NURSING_GRADE_ID,
            PATIENT_EDUCATION_DEGREE:'',
            PATIENT_SEX:this.SEX,
            PATIENT_HOSPITALIZED_DATE:this.HOSPITALIZED_DATE,
            EVENT_REASON:'',
            EVENT_PATIENT_ID:this.ID,
            PATIENT_NAME:this.NAME,
            PATIENT_INPATIENT_NUMBER:this.INPATIENT_NUMBER,
            PATIENT_AGE:this.AGE,

            PATIENT_DEPARTMENT_ID:this.DEPARTMENT,
            PATIENT_BED_NUMBER:this.BED_NUMBER,
            PATIENT_DIAGNOSTIC_RESULTS:'',
            PROFESSIONAL_POST:'',
            JOB:'',
            WARD_NAME:'',
            WORK_AGE:'',
            AGE:'',
            REAL_NAME:'',

          },
          // 校验规则
          rules: {
            EVENT_TYPE: [
              { required: true, message: ' ', trigger: 'change' },
            ],
            UPDATE_ADVICE: [
              { required: true, message: ' ', trigger: 'blur' },
            ],
            EVENT_AT: [
              { required: true, message: ' ', trigger: 'blur' },
            ],
            EVENT_AT_POINT: [
              { required: true, message: ' ', trigger: 'blur' },
            ],
            EVENT_CONTENT: [
              { required: true, message: ' ', trigger: 'blur' },
            ],
            PATIENT_TYPE: [
              { required: true, message: ' ', trigger: 'blur' },
            ],
            PATIENT_INPATIENT_NUMBER: [
              { required: true, message: ' ', trigger: 'blur' },
            ],
            PATIENT_INPATIENT_N: [
              { required: false, message: ' ', trigger: 'blur' },
            ],
            PATIENT_INPATIENT_M: [
              { required: false, message: ' ', trigger: 'change' },
            ],
            PATIENT_NAME: [
              { required: true, message: ' ', trigger: 'blur' },
            ],
            PATIENT_SEX: [
              { required: true, message: ' ', trigger: 'change' },
            ],
            PATIENT_AGE: [
              { required: true, message: ' ', trigger: 'blur' },
            ],
            PATIENT_DEPARTMENT_ID: [
              { required: true, message: ' ', trigger: 'blur' },
            ],
            PATIENT_HOSPITALIZED_DATE: [
              { required: true, message: ' ', trigger: 'change' },
            ],
            PATIENT_NURSING_GRADE_ID: [
              { required: true, message: ' ', trigger: 'change' },
            ],
            PATIENT_EDUCATION_DEGREE: [
              { required: true, message: ' ', trigger: 'change' },
            ],
            PATIENT_BED_NUMBER: [
              { required: true, message: ' ', trigger: 'blur' },
            ],
            PATIENT_DIAGNOSTIC_RESULTS: [
              { required: true, message: ' ', trigger: 'blur' },
            ],



          },
          patient:[{value: '1', label: '住院患者'},{value: '2', label: '门诊患者'},{value: '3', label: '非患者'}],
          patient_gra:[{value: '1', label: '特级护理'},{value: '2', label: '一级护理'},{value: '3', label: '二级护理'},{value: '4', label: '三级护理'}],
          patient_edu:[{
            value: '1',
            label: '博士'
          },{
            value: '2',
            label: '硕士'
          },{
            value: '3',
            label: '大学'
          },{
            value: '4',
            label: '大专'
          },{
            value: '5',
            label: '中专'
          },{
            value: '6',
            label: '小学'
          }],
          sex:[{value: '1', label: '男'},{value: '2', label: '女'}],
          view:{},
          patient_typelist:[],
          ward_arrName:'',
          popshow:false,
          content:'打印',
          draft:false,



        }
    },

    methods: {
      print_preview(){
        /*this.getSer('datacenter/tempstyle/'+this.id, {id:this.id , form_id : this.editId, inpatient_number:this.INPATIENT_NUMBER,is_preview:1 },res=>{
          console.log(res);
        this.content = res.data.content
        this.popshow = true
      })*/
        this.popshow = true
      },
      print(){
        this.$print(this.$refs.print)
      },
      getData(){
        console.log("rrrrrrr",this.ID)
        this.getSer("datacenter/nurse/adminview" ,{}, (res) => {
        this.view = res.data;
        this.ruleForm.PROFESSIONAL_POST = this.view.PROFESSIONAL_POST
        this.ruleForm.JOB = this.view.JOB
        this.ruleForm.WARD_NAME = this.view.WARD_NAME
        this.ruleForm.AGE = this.view.AGE
        this.ruleForm.WORK_AGE = this.view.WORK_AGE
        this.ruleForm.REAL_NAME = this.view.REAL_NAME
      })
      },
      exists(){
        let nurid = decodeURIComponent(this.getCookieVal("nurse_id"))
        let parid = this.ID
        this.getSer("datacenter/infaustevent/exists-draft" ,{nurse_id:nurid,patient_id:parid}, (res) => {
          console.log("asd",res.data)
          if(res.data.length ==0){
            this.draft = true
          }else {
            this.draft = false
           this.ruleForm = res.data
            this.ruleForm.PROFESSIONAL_POST = this.view.PROFESSIONAL_POST
            this.ruleForm.JOB = this.view.JOB
            this.ruleForm.WARD_NAME = this.view.WARD_NAME
            this.ruleForm.AGE = this.view.AGE
            this.ruleForm.WORK_AGE = this.view.WORK_AGE
            this.ruleForm.REAL_NAME = this.view.REAL_NAME
            /*this.ruleForm.EVENT_TYPE = res.data.EVENT_TYPE
           // this.ruleForm.EVENT_AT = res.data.EVENT_AT
            this.ruleForm.EVENT_AT_POINT = res.data.EVENT_AT_POINT
            this.ruleForm.EVENT_CONTENT = res.data.EVENT_CONTENT
            this.ruleForm.PATIENT_DIAGNOSTIC_RESULTS = res.data.PATIENT_DIAGNOSTIC_RESULTS*/

          }

        console.log("aaaaa",this.ruleForm)
        })
      },

      getType(){
        const arr = decodeURIComponent(this.getCookieVal("ward_arr"))
        const ward_arr = JSON.parse(arr)
        this.ward_arrName = ward_arr[0].WARD_NAME
        this.getSer("datacenter/infaustevent/inserttypelist" ,{}, (res) => {
        this.patient_typelist = res.data;
      })
      },
      cancel(formName){
        var obj = {...this.ruleForm }
        if(this.draft == true){
          this.post('datacenter/infaustevent', {...obj,IS_DRAFT:1,},res =>{
            console.log("1111",res)
            if(res.data.status=="201"){
              this.$message({
                message: "草稿保存成功",
                type: 'success'
              });
            }
          })
        }else {
          this._put('datacenter/infaustevent/'+ this.ruleForm .ID, {...obj,IS_DRAFT:1,id:this.ruleForm .ID},res =>{
            console.log("2222",res)
            if(res.data.status=="201"){
              this.$message({
                message: "草稿保存成功",
                type: 'success'
              });
            }
          })
        }

      },

      onSubmit(formName) {
        if(this.draft == true){
          var obj = {...this.ruleForm }
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.post('datacenter/infaustevent', {...obj,IS_DRAFT:0,},res =>{
              if(res.data.status=="201"){
                this.$message({
                  message: res.data.message,
                  duration:1000,
                  type: 'success'
                });

              }
            })
            } else {
              this.$message({type: 'warning', message: '表单未填完整!'});
              return false;
          }
          });
        }else {
          var obj = {...this.ruleForm }
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this._put('datacenter/infaustevent/'+ this.ruleForm .ID, {...obj,IS_DRAFT:0, id:this.ruleForm .ID },res =>{
                if(res.data.status=="201"){
                  this.$message({
                    message: res.data.message,
                    duration:1000,
                    type: 'success'
                  });

                }
              })
            } else {
              this.$message({type: 'warning', message: '表单未填完整!'});
          return false;
        }
        });
        }

      },



    },

    mounted(){
      this.$nextTick(() => {
        this.getData()
        this.exists()
        this.getType()
    })
    },
  }
</script>
<style scoped lang="stylus">
  .report
    padding 20px
    .repTop
      padding-bottom 20px
      border-bottom 1px solid #d8e3e7
      text-align center
      color #1A2C4E
      position relative
      .subBut
        position absolute
        right 0
        .cancel
          background #DDEFF9
          color #00B3DC
        .sub
          background #00B3DC
          color #fff
          padding 9px 29px
        .prin
          background #00B3DC
          color #fff
      h2
        font-size 20px
        padding-bottom 10px
      span
        font-size 16px
        padding-right 15px
    h3
      font-size 16px
      color #00B3DC
      line-height 24px
      padding-bottom 10px
      padding-top 10px
  .situation
    >>>.el-form-item
      display inline-block
    .texta
      width 100%
  .situation >>> .el-input
    width 260px
  .situation >>> .el-input__inner
    background #F9F9FB
  .situation >>> .el-textarea
    .el-textarea__inner
      background #F9F9FB
  .nurse >>>.el-form-item .el-input__inner
    color #6C8B97

</style>

