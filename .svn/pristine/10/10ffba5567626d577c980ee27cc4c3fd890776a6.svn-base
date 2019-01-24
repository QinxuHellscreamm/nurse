<template>
    <div class='pain-content'>
      <painLeft :STAGE='STAGE' :TARGET='TARGET' :STATUS1='STATUS1'></painLeft>
      <painRight :active_STAGE='active_STAGE' :STATUS1='STATUS1'></painRight>
    </div>
</template>

<script>
  import painLeft from './painLeft'
  import painRight from './painRight'
    export default {
        name: "painContent",

        props: ['STAGE','TARGET','STATUS1'],

        components: { painLeft ,painRight },


        data(){
          return{
            active_STAGE : this.STAGE[0]
          }
        }
    }
</script>

<style scoped lang='stylus'>
  .pain-content
    display flex
</style>
