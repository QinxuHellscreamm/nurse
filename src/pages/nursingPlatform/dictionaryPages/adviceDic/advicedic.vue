<template>
  <div>
    <mainTab :vitalList="vitalList1" :tempss="templates" :page="page" ></mainTab>
  </div>
</template>
<script>
  import mainTab from '@/components/mainTab.vue'
  import advicecat from "./adviceCat.vue"
  import useway from "./useway.vue"
  import wayass from "./wayass.vue"
  export default{
    data(){
      return {
        vitalList1 : ["医嘱类别" , "用药途径" , "途径关联"],
        templates : ["advicecat" , "useway" , "wayass"],
        page : 'dictionary/advicedic'
      }
    },
    components : { mainTab }
  }
</script>
<style scoped>

</style>
