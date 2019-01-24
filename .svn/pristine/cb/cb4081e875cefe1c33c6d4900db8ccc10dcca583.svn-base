<template>
  <div>
    <mainTab :vitalList="vitalList1" :tempss="templates" :page='page'></mainTab>
  </div>
</template>
<script>
  import mainTab from '../../../../components/mainTab.vue'
  import logma from './logManage.vue'
  import logmo from './logMobilenurse.vue'
  export default{
    data(){
      return {
        vitalList1:["管理平台","移动护士站"],
        templates:['logma','logmo'],
        page : 'system/log',
      }
    },
    components:{mainTab,logma,logmo}
  }
</script>
<style scoped>

</style>
