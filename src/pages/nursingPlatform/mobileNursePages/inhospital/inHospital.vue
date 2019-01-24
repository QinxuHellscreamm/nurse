<template>
  <div>
    <mainTab :vitalList="vitalList1" :tempss="templates" :page="page"></mainTab>
  </div>
</template>
<script>

  import mainTab from '@/components/mainTab.vue'
  // import funcManage from'./funcManage.vue'
  // import riskAss from './riskAss.vue'
    export default{
        data(){
            return {
              //vitalList1:[/*"功能管理","健康宣教调配",*//*"风险评估调配"*/"生命体征调配","医嘱执行调配"],
              //templates:[/*funcManage,healthEdu,*//*riskAss*/vitalSign,medicalOrder]
              page:'mobileNurse/inHospital',
              vitalList1:["健康宣教调配","风险评估调配","生命体征调配","医嘱执行调配"],
              templates:["healthEdu","riskRatin","vitalSign","medicalOrder"]
            }
        },
      components:{mainTab}
    }
</script>
<style scoped>

</style>
