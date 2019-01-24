<template>
  <div>
    <mainTab :vitalList="vitalList1" :tempss="tempss" :page="page" ></mainTab>
  </div>
</template>
<script>
  import mainTab from '../../component/mainTab.vue'
  export default{

    components : { mainTab },

    data(){
      return {
        vitalList1 : ["事件分类统计", "事件级别分布统计","事件原因分析","事件发生星期分布统计","事件发生时段分布统计","当事人职称分布统计","当事人年龄分布统计","患者年龄分布统计",],
        tempss : ['eventStaA','eventStaB','eventStaC','eventStaD','eventStaE','eventStaF','eventStaG','eventStaH'],
       // type : ['EVENT_TYPE','EVENT_GRADE','EVENT_REASON','EVENT_AT_WEEK_DAY','EVENT_AT_HOUR','NURSE_PROFESSIONAL_POST','NURSE_AGE','PATIENT_AGE'],

        page : 'adverseEvent/count',

      }
    },


  }
</script>
<style scoped>

</style>
