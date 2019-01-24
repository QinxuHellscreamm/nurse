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
        vitalList1 : ["人员列表", "调配记录",],
        tempss : ['peopleList','allRecord'],
        page : 'nurse/outArchives',

      }
    },


  }
</script>

<style scoped>

</style>
