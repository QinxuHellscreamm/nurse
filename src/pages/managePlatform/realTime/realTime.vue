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
        list:["医嘱执行","新入病区"],
        content:["orders","inpatientArea"],
        page:'realTime'
      }
    },

    components:{tabBar},

    mounted() {
      /*this.$nextTick(() => {

    })
    })*/
    }

  }
</script>
<style scoped>

</style>
