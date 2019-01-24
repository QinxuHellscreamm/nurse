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
        type:"EVENT_REASON",
        title:["肺炎例数","有创机械通气总日数","肺炎发生率"]
      }
    },

    components : { tempEcharts},
  }
</script>
<style scoped>

</style>
