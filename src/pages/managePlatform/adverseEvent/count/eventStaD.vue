<template>
    <div>
      <tempEcharts  :type='type' ></tempEcharts>
    </div>
</template>
<script>
  import tempEcharts from './tempEcharts'
    export default{
        data(){
            return {
              type:"EVENT_AT_WEEK_DAY"
            }
        },

      components : { tempEcharts},
    }
</script>
<style scoped>

</style>
