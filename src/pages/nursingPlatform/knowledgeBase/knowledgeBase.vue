<template>
  <div style="height: 100%;">
    <tabBar :moduleList="list" :content="content" :page="page"></tabBar>
  </div>
</template>
<script>
  import tabBar from '@/components/tabBar'
  export default{
    data(){
      return {
        list:["健康宣教库","护理措施库","护理路径库"],
        content:["HealthBank","NursingBank","NursingPlanBank"],
        page:'knowledgeBase'
      }
    },
    components:{tabBar},
  }
</script>
<style scoped>

</style>
