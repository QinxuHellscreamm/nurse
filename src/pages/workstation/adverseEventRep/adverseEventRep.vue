<template >
  <div class='mainropt'>

    <el-tabs closable @tab-remove="removeTab"  v-model="editableTabsValue">
      <el-tab-pane label="事件列表" >
        <div class="report" >
          <div style="margin-bottom: 10px;">
            <span>事件类型</span>
            <el-select v-model="department_id" filterable  placeholder="事件类型">
              <el-option
                v-for="item in patient_typelist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button type='primary' @click="pageAjax()" style="margin-left: 5px;">搜索</el-button>
            <el-button type="primary" @click="newReport" >新增报告单</el-button>
          </div>

          <div class="out-main">
            <el-table :data="eventList" style="width: 100%">
              <el-table-column prop="ID" label="事件编号" min-width="100"></el-table-column>
              <el-table-column prop="EVENT_TYPE_NAME" label="事件类型" min-width="100"></el-table-column>
              <el-table-column prop="EVENT_GRADE_NAME" label="事件等级" min-width="100"></el-table-column>
              <el-table-column prop="EVENT_WARD_NAME" label="护理部门" min-width="100"></el-table-column>
              <el-table-column prop="REPORT_NAME" label="上报人" min-width="100"></el-table-column>
              <el-table-column prop="CREATE_AT_SHOW" label="上报时间" min-width="150"></el-table-column>
              <el-table-column prop="EVENT_STATUS_DESC" label="状态" min-width="100"></el-table-column>
              <el-table-column  label="操作" width="100" >
                <template slot-scope="{row}">
                  <el-button  type="text" size="small" @click='showSub(row.ID)'>查看</el-button>
                </template>
              </el-table-column>

            </el-table>
            <div class="block" style="margin:20px 0;">
              <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage1" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="adicsCount"></el-pagination>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="title" v-if="cole==1">

        <addReport   ref='addReport' :title="title" v-if="addRep == true"></addReport>
        <adverseReport   ref='child' :title="title" v-else></adverseReport>
      </el-tab-pane>
    </el-tabs>

  </div>

</template>

<script>
  import adverseReport from './adverseReport'
  import addReport from './addReport'
  export default{
    name: "adverseEvent",

    props: ['id','INPATIENT_NUMBER'],

    components : { adverseReport ,addReport},
    data(){

        return {
          editableTabsValue: '0',

          start_end_time: "",
          event_type_id : "",
          nurse_name : "",//上报人姓名
          eventList:[],
          currentPage1 : 1,
          pageSize : 20,
          adicsCount : 0,
          department:'',
          department_id:'',
          patient_typelist:[],
          role_rank:'',
          title:'',
          cole:0,
          addRep:true,
          /*ruleForm: {
            EVENT_TYPE:'',
            EVENT_AT:'',
            EVENT_CONTENT:'',
            EVENT_AT_POINT:'',
            PATIENT_TYPE:'',
            PATIENT_AGE:'',
            PATIENT_NURSING_GRADE_ID:'',
            PATIENT_EDUCATION_DEGREE:'',
            PATIENT_SEX:'',
            PATIENT_HOSPITALIZED_DATE:"",
            EVENT_REASON:'',
            EVENT_PATIENT_ID:'',
            PATIENT_NAME:'',
            PATIENT_INPATIENT_NUMBER:'',
            PATIENT_DEPARTMENT_ID:'',
            PATIENT_BED_NUMBER:'',
            PATIENT_DIAGNOSTIC_RESULTS:'',
            PROFESSIONAL_POST:'',
            JOB:'',
            WARD_NAME:'',
            WORK_AGE:'',
            AGE:'',
            REAL_NAME:'',

          },*/
          // 校验规则
       /*   rules: {
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



          },*/


        }
    },

    methods: {
      newReport(){
        console.log("wswwwww",decodeURIComponent(this.getCookieVal("real_name")))
        this.editableTabsValue = '1'
        this.cole = '1'
        this.addRep = true
        this.title = '新增报告单'
        setTimeout(()=>{
          this.$refs.addReport.getData()
      },100)

      },
      getType(){
        this.getSer("datacenter/infaustevent/inserttypelist" ,{}, (res) => {
          this.patient_typelist = res.data;
      })
      },
      pageAjax(){
       // this.nurse_name = decodeURIComponent(this.getCookieVal("real_name"))
        this.nurse_name = ''

        this.getSer("datacenter/infaustevent/doneindex" , {
          start_time: '' ,
          end_time: '' ,
          event_type_id : this.department_id,
          nurse_name : this.nurse_name,
          page: this.currentPage1,
          page_size: this.pageSize,
        },res=>{
          console.log("不良列表",res)
        if(res.status <= 400){
          this.eventList = res.data.items;
          this.adicsCount = parseInt(res.data.meta.totalCount);
        }
      })
      },
      handleCurrentChange(val) {       //当前页变化的时候
        this.currentPage1 = val
        this.pageAjax();
      },
      showSub(id) {
       /* console.log("rowrow",name,id)
        decodeURIComponent(this.getCookieVal("ward_id"))
        this.$parent.$parent.addDynamic(id,name)*/
        this.cole = '1'
        this.addRep = false
        this.editableTabsValue = '1'
        this.title = '列表详情'
        setTimeout(()=>{
          this.$refs.child.getData(id)
      },100)

      },
      removeTab() {
        this.editableTabsValue = '0'
        this.cole = '0'
      },



    },

    mounted(){
      this.$nextTick(() => {
        this.pageAjax()
      this.getType()
    })
    },
  }
</script>
<style scoped lang="stylus">
  .mainropt
    margin 20px
    .el-tabs
      &>>>.el-tabs__item
        background-color #DDEFF9
        line-height 36px
        height 36px
        padding 0 36px
        margin-left 10px
        font-size 16px
        border-radius 4px 4px 0 0
      &>>> #tab-0 span
        display none
      &>>>.is-active
        background-color #FFFFFF
        color #666
      &>>>.el-tabs__active-bar
        display none
      &>>>.el-tabs__nav-wrap:after
        display none
      &>>>.el-tabs__header
        margin 0
      &>>>.el-tabs__content
        background-color #FFFFFF
        min-height 660px
        border-radius 4px 4px 0 0
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

</style>

