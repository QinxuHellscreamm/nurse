<template >
  <div style="">
    <div class="report">
      <div class="repTop"  style="">
        <div class="subBut" style=" ">
          <el-button type="primary"  @click="cancel('ruleForm')"  size="small">保存草稿</el-button>
          <el-button type="primary" @click="onSubmit('ruleForm')"  size="small">提交</el-button>
          <el-button type="primary" icon="el-icon-printer"  size="small"></el-button>
        </div>
        <h2>护理不良事件报告单</h2>
      </div>

      <el-form ref="ruleForm" :model="ruleForm" label-width="80px" :rules="rules">
        <div class="situation">
          <h3>事件基本情况</h3>
          <div>
            <!--  <span class="span">事件类型</span>-->
            <el-form-item label="事件类型" prop="EVENT_TYPE">
              <el-cascader
                      expand-trigger="hover"
                      :options="patient_typelist"
                      v-model="selectedOptions2"
                      @change="handleChange">
              </el-cascader>
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
            <el-form-item label="到达时间" prop="ARRIVE_AT">
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
            <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="字数限制1000"
                    v-model="ruleForm.EVENT_CONTENT">
            </el-input>
          </el-form-item>
          <el-form-item label="处理措施" prop="TREATMENT_MEASURES" class="texta" label-width="110px" >
            <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="字数限制1000"
                    v-model="ruleForm.TREATMENT_MEASURES">
            </el-input>
          </el-form-item>
          <!--<p style="font-size: 16px;padding-bottom: 10px;">事件严重结果</p>-->
          <!--<el-form-item  label-width="0px"  prop="SEVERITY_GRADE">-->
            <!--<el-radio-group v-model="ruleForm.SEVERITY_GRADE">-->
              <!--<el-radio v-for="severity of severity_list"  :key='severity.code' :label="severity.code">{{severity.name}}</el-radio><br />-->
            <!--</el-radio-group>-->
          <!--</el-form-item>-->
          <!--<p style="font-size: 16px;padding-bottom: 10px;">护理结果分级</p>-->
          <!--<el-form-item  label-width="0px"  prop="EVENT_GRADE">-->
            <!--<el-radio-group v-model="ruleForm.EVENT_GRADE">-->
              <!--<el-radio v-for="(grade,i) of grade_list"  :label="grade.code" :key='i'>{{grade.name}}：{{grade.desc}}</el-radio><br />-->
            <!--</el-radio-group>-->
          <!--</el-form-item>-->
        </div>


        <div class="situation unr">
          <h3>报告人</h3>
          <div >
            <el-form-item label="姓名" >
              <el-input v-model="ruleForm.REAL_NAME" readonly ></el-input>
            </el-form-item>
            <el-form-item label="职务">
              <el-input v-model="ruleForm.JOB" readonly></el-input>
            </el-form-item>
            <el-form-item label="职称">
              <el-input v-model="ruleForm.PROFESSIONAL_POST" readonly></el-input>
            </el-form-item>
          </div>
          <div >
            <el-form-item label="年龄">
              <el-input v-model="ruleForm.NURSE_AGE" readonly></el-input>
            </el-form-item>
            <el-form-item label="工作年限">
              <el-input v-model="ruleForm.WORK_AGE" readonly></el-input>
            </el-form-item>
            <el-form-item label="所在病区">
              <el-input v-model="ruleForm.WARD_NAME" readonly></el-input>
            </el-form-item>
          </div>
          <div >
            <el-form-item label="班次" prop='SCHEDULE_SHEET'>
              <el-select v-model="ruleForm.SCHEDULE_SHEET" placeholder="请选择" >
                <el-option
                        v-for="item of schedule_sheet"
                        :key="item.ID"
                        :label="item.NAME"
                        :value="item.ID">
                </el-option>
              </el-select>
            </el-form-item>

          </div>
        </div>
        <div class="situation">
          <h3>患者情况
            <el-form-item label-width="10px" >
              <el-select v-model="ruleForm.PATIENT_TYPE" placeholder="请选择" >
                <el-option v-if="item.code != 1"
                        v-for="item of patient_type"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </h3>
          <div>
            <el-form-item label="住院号"  :prop="this.ruleForm.PATIENT_TYPE=='1'? 'PATIENT_INPATIENT_NUMBER':'PATIENT_INPATIENT_N'" >
              <el-input v-model="ruleForm.PATIENT_INPATIENT_NUMBER" placeholder="请输入内容" ></el-input>
            </el-form-item>
            <el-form-item label="姓名"  prop="PATIENT_NAME">
              <el-input v-model="ruleForm.PATIENT_NAME" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="PATIENT_SEX">
              <el-select v-model="ruleForm.PATIENT_SEX" placeholder="请选择">
                <el-option
                        v-for="item of patient_sex"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="年龄" prop="PATIENT_AGE">
              <el-input v-model="ruleForm.PATIENT_AGE" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="科室"  :prop="this.ruleForm.PATIENT_TYPE=='1'? 'PATIENT_DEPARTMENT_ID':'PATIENT_INPATIENT_N'" >
              <el-input v-model="ruleForm.PATIENT_DEPARTMENT_ID" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="入院时间" :prop="this.ruleForm.PATIENT_TYPE=='1'? 'PATIENT_HOSPITALIZED_DATE':'PATIENT_INPATIENT_N'" >
              <el-date-picker v-model="ruleForm.PATIENT_HOSPITALIZED_DATE" value-format='yyyy-MM-dd	HH:mm' format="yyyy-MM-dd	HH:mm" type="datetime" placeholder=""></el-date-picker>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="护理级别"  :prop="this.ruleForm.PATIENT_TYPE=='1'? 'PATIENT_NURSING_GRADE_ID':'PATIENT_INPATIENT_M'" >
              <el-select v-model="ruleForm.PATIENT_NURSING_GRADE_ID" placeholder="请选择">
                <el-option
                        v-for="item of patient_gra"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文化程度"   :prop="this.ruleForm.PATIENT_TYPE=='1'? 'PATIENT_EDUCATION_DEGREE':'PATIENT_INPATIENT_M'" >
              <el-select v-model="ruleForm.PATIENT_EDUCATION_DEGREE" placeholder="请选择" >
                <el-option
                        v-for="item of patient_edu"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="患者床号" :prop="this.ruleForm.PATIENT_TYPE=='1'? 'PATIENT_BED_NUMBER':'PATIENT_INPATIENT_N'" >
              <el-input v-model="ruleForm.PATIENT_BED_NUMBER" placeholder="请输入内容"></el-input>
            </el-form-item>
          </div>
          <div class="diagnosis">
            <el-form-item label="患者诊断" class="texta"  :prop="this.ruleForm.PATIENT_TYPE=='1'? 'PATIENT_DIAGNOSTIC_RESULTS':'PATIENT_INPATIENT_N'" >
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="ruleForm.PATIENT_DIAGNOSTIC_RESULTS"></el-input>
            </el-form-item>
          </div>
        </div>

      </el-form>
    </div>
  </div>

</template>

<script>
  export default{
    name: "adverseEvent",

    props: ['id','INPATIENT_NUMBER' , 'adverseReport',  'title'],
    data(){

        return {
            ruleForm: {
                EVENT_TYPE:'',
                EVENT_CHILD_TYPE:'',
                SEVERITY_GRADE:'',
                EVENT_GRADE:'',
                EVENT_AT:'',
                ARRIVE_AT:'',
                EVENT_CONTENT:'',
                TREATMENT_MEASURES:'',
                EVENT_AT_POINT:'',

                PATIENT_TYPE:3,
                EVENT_REASON:'',
                PATIENT_NURSING_GRADE_ID:'',
                PATIENT_EDUCATION_DEGREE: '',
                PATIENT_SEX:'男',
                PATIENT_HOSPITALIZED_DATE:'',
                EVENT_PATIENT_ID:'',
                PATIENT_NAME:'',
                PATIENT_INPATIENT_NUMBER:'',
                PATIENT_AGE:'',
                PATIENT_DEPARTMENT_ID:'',
                PATIENT_BED_NUMBER:'',
                PATIENT_DIAGNOSTIC_RESULTS:'',

                JOB:'',
                WARD_NAME:'',
                WORK_AGE:'',
                NURSE_AGE:'',
                REAL_NAME:'',
                SCHEDULE_SHEET : '',
                PROFESSIONAL_POST:'',

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
            ARRIVE_AT: [
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
//            SEVERITY_GRADE: [
//                { required: true, message: ' ', trigger: 'blur' },
//            ],
            EVENT_GRADE: [
                { required: true, message: ' ', trigger: 'blur' },
            ],
//              SCHEDULE_SHEET: [
//                  { required: true, message: ' ', trigger: 'change' },
//              ],
          },
            patient_type:[],
            patient_gra:[],
            patient_edu:[],
            patient_sex:[],
            grade_list:[],
            severity_list:[],
            view:{},
            patient_typelist:[],
            ward_arrName:'',
            popshow:false,
            content:'打印',
            draft:false,
            schedule_sheet:[],
            selectedOptions2: []
        }
    },

    methods: {
      getData(id){

        if(this.title == '列表详情' && id != undefined){
          console.log("列表详2222情",id)
          var id = id
          this.getSer("datacenter/infaustevent/" + id,{ id : id}, (res) => {
            console.log("不良",res)
          this.ruleForm = res.data;
          if(this.ruleForm.EVENT_REASON == ""){
            this.ruleForm.EVENT_REASON =[]
          }else {
            this.ruleForm.EVENT_REASON=JSON.parse(this.ruleForm.EVENT_REASON)
          }
        });
        }else {
          console.log("新增")

          this.getSer("datacenter/nurse/adminview" ,{}, (res) => {
            this.view = res.data;
          console.log("this.view",this.view)
          this.ruleForm.PROFESSIONAL_POST = this.view.PROFESSIONAL_POST
          this.ruleForm.JOB = this.view.JOB
          this.ruleForm.WARD_NAME = this.view.WARD_NAME
          this.ruleForm.NURSE_AGE = this.view.AGE
          this.ruleForm.WORK_AGE = this.view.WORK_AGE
          this.ruleForm.REAL_NAME = this.view.REAL_NAME
        })
        }

      },
      exists(){
        let nurid = decodeURIComponent(this.getCookieVal("nurse_id"))
        let parid = 0
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
          this.ruleForm.NURSE_AGE = this.view.NURSE_AGE
          this.ruleForm.WORK_AGE = this.view.WORK_AGE
          this.ruleForm.REAL_NAME = this.view.REAL_NAME
          this.selectedOptions2 =  [this.ruleForm.EVENT_TYPE,this.ruleForm.EVENT_CHILD_TYPE]
          console.log('this.selectedOptions2',this.selectedOptions2)
        }
      })
      },

        getSchedule(){
            const arr = decodeURIComponent(this.getCookieVal("ward_arr"))
            const ward_id = decodeURIComponent(this.getCookieVal("ward_id"))
            const ward_arr = JSON.parse(arr)
            this.ward_arrName = ward_arr[0].WARD_NAME
            this.getSer("datacenter/nursemanage/schedule" ,{ward_id:ward_id}, (res) => {
                this.schedule_sheet = res.data;

            })
        },
        getType(){
            this.getSer("datacenter/infaustevent/inserttypelist" ,{}, (res) => {
                this.patient_typelist = res.data;
            })
        },
        getDefault(){
            this.getSer("datacenter/infaustevent/getparams" ,{}, (res) => {
                this.patient_type = res.data.patient_type;
                this.patient_gra = res.data.patient_gra;
                this.patient_edu = res.data.patient_edu;
//              this.nurse_professional_post = res.data.nurse_professional_post
                this.severity_list = res.data.infaust_events_severity_grade;
                this.grade_list = res.data.grade_list;
                this.patient_sex = res.data.patient_sex;
            })
        },
      cancel(formName){
        var obj = {...this.ruleForm }
        if(this.draft == true){
          this.post('datacenter/infaustevent', {...obj,IS_DRAFT:1,},res =>{
            console.log("1111",res)
            if(res.status=="201"){
                this.draft = false
                this.ruleForm .ID = res.data.ID
              this.$message({
                message: "草稿保存成功",
                type: 'success'
              });
                this.$parent.$parent.$parent.removeTab()
                return false
            }
          })
        }else {
          this._put('datacenter/infaustevent/'+ this.ruleForm .ID, {...obj,IS_DRAFT:1,id:this.ruleForm .ID},res =>{
            console.log("2222",obj)
            if(res.status=="201"){
              this.$message({
                message: "草稿保存成功",
                type: 'success'
              });
                this.$parent.$parent.$parent.removeTab()
                return false
            }
          })
        }

      },
      handleChange(val) {
          //如果没有子类 则 为0
          this.ruleForm.EVENT_CHILD_TYPE = val.length > 1 ? val[val.length - 1] : 0
          this.ruleForm.EVENT_TYPE = val[0]
          console.log('val',val);
      },
      onSubmit(formName) {
        if(this.draft == true){
          var obj = {...this.ruleForm }
          this.$refs[formName].validate((valid) => {
            if (valid) {
                console.log('infaustevent')
                console.log(obj)
              this.post('datacenter/infaustevent', {...obj,IS_DRAFT:0,},res =>{
                if(res.data.status=="201"){
                  this.$message({
                    message: "提交成功",
                    duration:1000,
                    type: 'success'
                  });
                    this.$parent.$parent.$parent.removeTab()
                    return false
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
                    message: "提交成功",
                    duration:1000,
                    type: 'success'
                  });
                    this.$parent.$parent.$parent.removeTab()
                    return false

                }
              })
            } else {
              this.$message({type: 'warning', message: '表单未填完整!'});
          return false;
        }
        });
        }

      },
        //初始化参数
        init_form(){
            this.ruleForm.EVENT_TYPE = ""
            this.ruleForm.EVENT_CHILD_TYPE = ""
            this.ruleForm.EVENT_AT = ""
            this.ruleForm.ARRIVE_AT = ""
            this.ruleForm.EVENT_AT_POINT = ""
            this.ruleForm.EVENT_CONTENT = ""
            this.ruleForm.TREATMENT_MEASURES = ""
            this.ruleForm.SEVERITY_GRADE = ""
            this.ruleForm.EVENT_GRADE = ""
        },

    },

    mounted(){
      this.$nextTick(() => {
        this.getData()
        this.exists()
        this.getType()
        this.getDefault()
        this.getSchedule()
    })
    },
  }
</script>
<style scoped lang="stylus">
  .report
    padding 20px
    background #fff
    border-radius 4px
    box-sizing border-box
    box-shadow 0 0 10px 0 rgba(0,0,0,0.04)
    .repTop
      padding-bottom 20px
      border-bottom 1px solid #d8e3e7
      text-align center
      color #1A2C4E
      position relative
      .subBut
        position absolute
        right 0
        .el-button--primary.is-plain
          border none
          background #DDEFF9
        .el-button--primary
          background #00B3DC
      h2
        font-size 18px
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
      margin-bottom 16px
    .texta
      width 100%
  .unr >>>.el-form-item .el-input__inner
    color #6C8B97
  .situation >>> .el-input
    width 260px
  .situation >>> .el-input__inner
    background #F9F9FB
  .situation >>> .el-textarea
    .el-textarea__inner
      background #F9F9FB

</style>

