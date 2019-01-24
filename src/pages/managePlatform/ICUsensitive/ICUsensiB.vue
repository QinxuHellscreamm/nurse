<template>
  <div>
    <tempEcharts  :type='type' :title="title"></tempEcharts>
  </div>
</template>
<script>
  import tempEcharts from './tempEcharts'
  export default{
    data(){
      return {
        type:"EVENT_AT_HOUR",
        title:["感染例数","导管插管总日数","感染发生率"]
      }
    },

    components : { tempEcharts},
  }
</script>
<style scoped>

</style>
