<template>
  <div style="height: 100%;">
    <tabBar :moduleList="list" :content="content" :page="page"></tabBar>
  </div>
</template>
<script>
  import tabBar from '../component/tabBar.vue'
  export default{
    data(){
      return {
        list:["导尿管相关尿路感染发生率","中心导管相关血流感染发生率","呼吸机相关肺炎发生率"],
        content:["IcusensiA","IcusensiB","IcusensiC"],
        page:'ICUsensitive'
      }
    },

    components:{tabBar},

    mounted() {
    }

  }
</script>
<style scoped>

</style>
