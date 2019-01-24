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
              moduleList:["住院模块","版本管理"],
              content:["inHospital","version"],
              page:'mobileNurse'
            }
        },
        components:{
          tabBar
        },

    }
</script>
<style scoped>

</style>
