<template>
    <div>
      <docSidebar ref='docSidebar' :id="id"></docSidebar>
      <div class='doc-main'>

        <div class="doc-main-content">
          <!--<nursingPlan  v-if='docType.type == -1 && detile.INPATIENT_NUMBER' :INPATIENT_NUMBER='detile.INPATIENT_NUMBER' :INPATIENT_AREA_DATE='detile.INPATIENT_AREA_DATE'></nursingPlan>-->
          <thermometer :detile='detile' v-if='detile.INPATIENT_NUMBER &&  docType.type == 0 ' :id='docType.ID' :title='docType.TITLE'></thermometer>
          <assessmentSheet v-if='docType.type == 1 || docType.type == 3' :id='docType.ID' :INPATIENT_NUMBER='detile.INPATIENT_NUMBER' :docType='docType.type'></assessmentSheet>
          <record v-if='docType.type == 2' :id='docType.ID' :INPATIENT_NUMBER='detile.INPATIENT_NUMBER' :detile='detile'></record>
          <bloodSugar v-if='docType.TYPE == 4' :id='docType.ID' :INPATIENT_NUMBER='detile.INPATIENT_NUMBER'></bloodSugar>
          <!--<adverseEvent :INPATIENT_NUMBER='detile.INPATIENT_NUMBER' :NAME="detile.NAME" :BED_NUMBER="detile.BED_NUMBER"
                        :AGE="detile.AGE" :ID="detile.ID" :SEX="detile.SEX" :DEPARTMENT="detile.DEPARTMENT" :HOSPITALIZED_DATE="detile.HOSPITALIZED_DATE"
                        :NURSING_GRADE_ID="detile.NURSING_GRADE_ID" v-if='docType.type == -2' ></adverseEvent>-->
          <health v-if='docType.type == -4' :NAME="detile.NAME" :INPATIENT_NUMBER='detile.INPATIENT_NUMBER'></health>
        </div>
      </div>
    </div>
</template>

<script>
  import docSidebar from './component/docSidebar'//文书左侧导航组件
/*  import nursingPlan from './component/nursingPlan/nursingPlan'//护理计划*/
  import thermometer from './component/thermometer/thermometer'//体温单
  import assessmentSheet from './component/assessmentSheet'//评估单&交接单
  import record from './component/record/record'//记录单
  import bloodSugar from './component/bloodSugar'//血糖单
/*  import adverseEvent from './component/adverseEvent'//护理不良事件报告单*/

  import health from './component/health/health'//健康宣教


  import clinicalData from './component/clinicalData'//临床数据

  export default {
    name : "PatientDocPage",

    props : ['id'],

    components : { docSidebar, thermometer, assessmentSheet, record, bloodSugar  ,health },

    data(){
      return{
        detile : {},
        docType : {type: -3,ID:999996},//默认医嘱记录
        currentView :'comA',
        routerList : [],
      }
    },

    methods : {
      toggle(data){
        console.log("gggg",data)
        this.docType = data
      },
      getDetile(){
        console.log("ididi",this.id);
        if(!this.detile.NAME){
          this.getSerin("datacenter/patient/" + this.id, {id : this.id} , res => {
            console.log('病人详情')
            console.log(res)
            if(res.status <= 400){
              this.detile = res.data
            }
          })
        }
      },
    },

    mounted(){
      this.$nextTick(() => {
        //this.routerList = this.$store.state.patientDocList
        this.getDetile()
      })
    },
  }
</script>

<style scoped lang='stylus'>
  .doc-main
    flex 1
    margin 0 20px
  .patient-detile
    background-color #FAF8E0
    line-height 50px
    margin 20px 0 10px
    .black
      margin-left 18px
      font-size 16px
    .gray
      margin-left 18px
      font-size 16px
      color #6C8B97
    .value
      font-size 16px
  .doc-main-content
    height 100%
    background-color #FFFFFF
    box-shadow 0 0 10px 0 rgba(0,0,0,0.04)
    border-radius 4px
    min-height calc(100% - 140px)
</style>
