<template >
  <div class="report">
    <h2>护理不良事件报告单</h2>
    <p class="card"><span style="padding-right: 30px;">报告人:{{ruleForm.NURSE_NAME}}</span>上报时间:{{ruleForm.CREATE_AT}}</p>
    <el-form ref="ruleForm" :model="ruleForm" label-width="80px"  :rules="rules">
      <div class="situation" >
        <h3>事件基本情况</h3>
        <div>
          <el-form-item label="事件类型" prop="EVENT_TYPE">
            <el-cascader
                    :disabled="true"
                    expand-trigger="hover"
                    :options="patient_typelist"
                    v-model="selectedOptions2"
                    @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="发生时间" prop="EVENT_AT">
            <el-date-picker
                    :disabled="true"
                    v-model="ruleForm.EVENT_AT"
                    type="datetime"
                    value-format='yyyy-MM-dd  HH:mm'
                    format="yyyy-MM-dd  HH:mm"
                    placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="到达时间" prop="ARRIVE_AT">
            <el-date-picker
                    :disabled="true"
                    v-model="ruleForm.ARRIVE_AT"
                    type="datetime"
                    value-format='yyyy-MM-dd  HH:mm'
                    format="yyyy-MM-dd  HH:mm"
                    placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="发生地点" prop="EVENT_AT_POINT">
            <el-input v-model="ruleForm.EVENT_AT_POINT" placeholder="请输入内容" :disabled="role_rank == 3 ||ruleForm.EVENT_STATUS==2 || (ruleForm.EVENT_STATUS==1 && ruleForm.IS_DRAFT!=1)"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="不良事件经过" prop="EVENT_CONTENT" class="texta" label-width="110px" >
          <!-- <p style="display: inline-block;width: 90px;">不良事件经过</p>-->
          <el-input
                  :disabled="true"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="ruleForm.EVENT_CONTENT">
          </el-input>
        </el-form-item>
        <el-form-item label="处理措施" prop="TREATMENT_MEASURES" class="texta" label-width="110px" >
          <el-input
                  :disabled="true"
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
      <div class="situation">
        <h3>报告人</h3>
        <div>
          <el-form-item label="姓名">
            <el-input  placeholder="请输入内容"  v-model="ruleForm.NURSE_NAME" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="职务">
            <el-input  placeholder="请输入内容"  v-model="ruleForm.NURSE_JOB" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="职称">
            <el-input  placeholder="请输入内容"  v-model="ruleForm.NURSE_PROFESSIONAL_POST" :disabled="true"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="年龄">
            <el-input  placeholder="请输入内容"  v-model="ruleForm.NURSE_AGE" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="工作年限">
            <el-input  placeholder="请输入内容"  v-model="ruleForm.NURSE_WORK_AGE" :disabled="true" ></el-input>
          </el-form-item>
          <el-form-item label="所在病区">
            <el-input  placeholder="请输入内容"  v-model="ruleForm.EVENT_WARD_NAME" :disabled="true"></el-input>
          </el-form-item>
        </div>
        <div >
          <el-form-item label="班次" prop='SCHEDULE_SHEET_NAME'>
            <el-input  placeholder="请输入内容"  v-model="ruleForm.SCHEDULE_SHEET_NAME" :disabled="true"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="situation">
        <h3>患者情况
          <el-form-item label-width="10px"   prop="PATIENT_TYPE">
            <el-select v-model="ruleForm.PATIENT_TYPE" placeholder="请选择" :disabled="true">
              <el-option
                      v-for="item of patient_type"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </h3>
        <div>
          <el-form-item label="住院号"  :prop="this.ruleForm.PATIENT_TYPE!='1'? 'PATIENT_INPATIENT_NUMBER':'PATIENT_INPATIENT_N'" >
            <el-input v-model="ruleForm.PATIENT_INPATIENT_NUMBER" placeholder="请输入内容"  :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="姓名"  prop="PATIENT_NAME">
            <el-input v-model="ruleForm.PATIENT_NAME" placeholder="请输入内容" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="性别"  prop="PATIENT_SEX">
            <el-select v-model="ruleForm.PATIENT_SEX" placeholder="请选择" :disabled="true">
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
          <el-form-item label="年龄"  prop="PATIENT_AGE">
            <el-input v-model="ruleForm.PATIENT_AGE" placeholder="请输入内容" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="科室"  :prop="this.ruleForm.PATIENT_TYPE!='1'? 'PATIENT_DEPARTMENT_ID':'PATIENT_INPATIENT_N'"  >
            <el-input v-model="ruleForm.PATIENT_DEPARTMENT_ID" placeholder="请输入内容" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="入院时间"  :prop="this.ruleForm.PATIENT_TYPE!='1'? 'PATIENT_HOSPITALIZED_DATE':'PATIENT_INPATIENT_N'">
            <el-date-picker
                    :disabled="true"
                    v-model="ruleForm.PATIENT_HOSPITALIZED_DATE"
                    type="datetime"
                    value-format='yyyy-MM-dd  HH:mm'
                    format="yyyy-MM-dd  HH:mm"
                    placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="护理级别" :prop="this.ruleForm.PATIENT_TYPE!='1'? 'PATIENT_NURSING_GRADE_ID':'PATIENT_INPATIENT_M'">
            <el-select v-model="ruleForm.PATIENT_NURSING_GRADE_ID" placeholder="请选择" :disabled="true">
              <el-option
                      v-for="item of patient_gra"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文化程度"  :prop="this.ruleForm.PATIENT_TYPE!='1'? 'PATIENT_EDUCATION_DEGREE':'PATIENT_INPATIENT_M'">
            <el-select v-model="ruleForm.PATIENT_EDUCATION_DEGREE" placeholder="请选择" :disabled="true">
              <el-option
                      v-for="item of patient_edu"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="患者床号" :prop="this.ruleForm.PATIENT_TYPE!='1'? 'PATIENT_BED_NUMBER':'PATIENT_INPATIENT_N'">
            <el-input v-model="ruleForm.PATIENT_BED_NUMBER" placeholder="请输入内容" :disabled="true"></el-input>
          </el-form-item>
        </div>
        <div class="diagnosis">
          <el-form-item label="患者诊断" class="texta"  :prop="this.ruleForm.PATIENT_TYPE!='1'? 'PATIENT_DIAGNOSTIC_RESULTS':'PATIENT_INPATIENT_N'">
            <el-input
                    :disabled="true"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="ruleForm.PATIENT_DIAGNOSTIC_RESULTS">
            </el-input>
          </el-form-item>
        </div>
      </div>
      <div class="opinion">
        <h3>科室(病区)意见</h3>
        <p style="font-size: 16px;padding-bottom: 10px;">事件等级</p>
        <el-form-item  label-width="0px"  prop="HEAD_NURSE_EVENT_GRADE">
          <el-radio-group v-model="ruleForm.HEAD_NURSE_EVENT_GRADE" :disabled="true">
            <el-radio label="1">Ⅰ级事件（警告事件）：非预期的死亡，或是非疾病自然进展过程中造成永久性功能丧失</el-radio><br>
            <el-radio label="2">Ⅱ级事件（不良后果事件）：在疾病医疗过程中是因诊疗活动而非疾病本身造成的病人机体与功能损害</el-radio><br>
            <el-radio label="3">Ⅲ级事件（未造成后果事件）：虽然发生的错误事实，但未给病人机体与功能造成任何损害，或有轻微后果而不需任何处理即可完全康复</el-radio><br>
            <el-radio label="4">Ⅳ级事件（隐患事件）：由于及时发现错误，但未形成事实</el-radio>
          </el-radio-group>
        </el-form-item>
        <p style="font-size: 16px;">原因分析</p>
        <el-form-item  label-width="0px"  prop="EVENT_REASON">
          <el-checkbox-group v-model="ruleForm.EVENT_REASON" :disabled="true">
            <el-checkbox v-for="reason in infaust_events_reason" :label="reason.code" :key="reason.code">{{reason.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item  label-width="0px" prop="UPDATE_ADVICE">
          <p style="font-size: 16px;">审核意见</p>
          <el-input
                  :disabled="true"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入审核意见"
                  v-model="ruleForm.UPDATE_ADVICE">
          </el-input>
        </el-form-item>
      </div>

      <div class="opinion">
        <h3>护理部意见</h3>
        <p style="font-size: 16px;padding-bottom: 10px;">事件等级</p>
        <el-form-item  label-width="0px"  prop="MANAGE_NURSE_EVENT_GRADE">
          <el-radio-group v-model="ruleForm.MANAGE_NURSE_EVENT_GRADE" :disabled="true">
            <el-radio label="1">Ⅰ级事件（警告事件）：非预期的死亡，或是非疾病自然进展过程中造成永久性功能丧失</el-radio><br>
            <el-radio label="2">Ⅱ级事件（不良后果事件）：在疾病医疗过程中是因诊疗活动而非疾病本身造成的病人机体与功能损害</el-radio><br>
            <el-radio label="3">Ⅲ级事件（未造成后果事件）：虽然发生的错误事实，但未给病人机体与功能造成任何损害，或有轻微后果而不需任何处理即可完全康复</el-radio><br>
            <el-radio label="4">Ⅳ级事件（隐患事件）：由于及时发现错误，但未形成事实</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item  label-width="0px" prop="CLOSE_ADVICE">
          <p style="font-size: 16px;">审核意见</p>
          <el-input
                  :disabled="true"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入审核意见"
                  v-model="ruleForm.CLOSE_ADVICE">
          </el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                radio: '1',
                checkList: [],
                aaa:false,
                ruleForm: {
                    EVENT_REASON:[],
                    EVENT_GRADE: '',
                    PATIENT_TYPE: '1',
                },
                id:'',
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
                        { required: true, message: ' ', trigger: 'blur' },
                    ],
                    PATIENT_AGE: [
                        { required: true, message: ' ', trigger: 'change' },
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
                    CLOSE_ADVICE: [
                        { required: true, message: ' ', trigger: 'blur' },
                    ],
                    EVENT_GRADE: [
                        { required: true, message: ' ', trigger: 'change' },
                    ],
                    EVENT_REASON: [
                        { type: 'array',required: true, message: ' ', trigger: 'change' },
                    ],
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
                selectedOptions2: [],
                infaust_events_reason:[]
            }
        },

        methods: {
            //获取列表
            getData(id){
                this.role_rank = decodeURIComponent(this.getCookieVal("role_rank"))

                if(id ==undefined){id=""}
                this.getSer("datacenter/infaustevent/" + id,{ id : id}, (res) => {
                    console.log("不良",res)
                    this.ruleForm = res.data;
                    this.selectedOptions2 =  [this.ruleForm.EVENT_TYPE,this.ruleForm.EVENT_CHILD_TYPE]
                });
            },
            handleChange(val) {
                //如果没有子类 则 为0
                this.ruleForm.EVENT_CHILD_TYPE = val.length > 1 ? val[val.length - 1] : 0
                this.ruleForm.EVENT_TYPE = val[0]
                console.log('val',val);
            },
            draftSub(formName){
                //if(this.draft == true){
                this.ruleForm.EVENT_GRADE=String(this.ruleForm.EVENT_GRADE)
                this.ruleForm.EVENT_REASON= JSON.stringify(this.ruleForm.EVENT_REASON)
                var obj = {...this.ruleForm, 'id': this.ruleForm.ID}
                this._put('datacenter/infaustevent/'+ this.ruleForm.ID, {...obj,IS_DRAFT:1},res =>{
                    console.log("1111",res)
                    if(res.data.status=="201"){
                        this.$message({
                            message: "草稿保存成功",
                            type: 'success'
                        });
                        this.cancel()
                    }
                })
              /*   }else {
               this.ruleForm.EVENT_GRADE=String(this.ruleForm.EVENT_GRADE)
               this.ruleForm.EVENT_REASON= JSON.stringify(this.ruleForm.EVENT_REASON)
               var obj = {...this.ruleForm, 'id': this.ruleForm.ID}
               this._put('datacenter/infaustevent/'+ this.ruleForm.ID, {...obj,IS_DRAFT:1},res =>{
               console.log("2222",res)
               if(res.data.status=="201"){
               this.$message({
               message: "草稿保存成功",
               type: 'success'
               });
               }
               })
               }*/
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
                    this.infaust_events_reason = res.data.infaust_events_reason;
                    this.grade_list = res.data.grade_list;
                    this.patient_sex = res.data.patient_sex;
                })
            },
            cancel(formName){
                this.$parent.$parent.toggle()
            },
        },

        created(){
            this.$nextTick(() => {
                this.getData()
                this.getType()
                this.getDefault()
            })
        },

    }


</script>

<style scoped lang="stylus">
.report
  padding 20px
  h2
    font-size 20px
    color #1A2C4E
    text-align center
  h3
    font-size 16px
    color #00B3DC
    line-height 24px
    padding-bottom 10px
    padding-top 10px
  .card
    border-bottom 1px solid #D8E3E7
    padding 14px 0
    margin-bottom 10px
    text-align center
    font-size 16px
    span
      font-size 16px
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

  .subBut
    clear both
    text-align right
    padding 20px 0
  .opinion
    ul li
      line-height 24px
    >>>.el-textarea
      .el-textarea__inner
        background #F9F9FB
    >>>.el-checkbox-group
      padding-bottom 10px
</style>