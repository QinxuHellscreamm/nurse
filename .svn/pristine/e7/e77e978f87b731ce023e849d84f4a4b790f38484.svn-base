<template>
    <div style='overflow: hidden'>
       <doc v-for='(item,index) of routerList' :key='index' :id='item.id'></doc>
    </div>
</template>

<script>
  import doc from '../../workstation/PatientDOC/doc'
    export default {
        name : "infoshare",
        props : ['id'],
        components : { doc },

        data(){
          return{
            routerList : [
              {id: this.id},
            ]
          }
        },

        methods : {

        },

        mounted(){
          this.$nextTick(() => {

          })
        },


    }
</script>

<style scoped lang='stylus'>

</style>
