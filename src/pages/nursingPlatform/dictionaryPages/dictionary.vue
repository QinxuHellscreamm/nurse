<template>
  <div>
    <tabBar :moduleList="moduleList" :content="content" :page="page"></tabBar>
  </div>
</template>
<script>

  import tabBar from '@/components/tabBar'
  export default{
    data(){
      return {
        current:0,
        moduleList:["科室字典","病区字典","医嘱字典","生命体征字典","人员字典","疾病字典","病人信息字典"],
        content:["partdic","warddic","advicedic","vitaldic","workersdic","diseasedic","patientinfodic"],
        page:'dictionary'
      }
    },
    components:{tabBar}


  }
</script>
<style scoped>

</style>
