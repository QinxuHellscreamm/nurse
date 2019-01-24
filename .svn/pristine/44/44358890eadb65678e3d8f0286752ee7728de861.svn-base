<template>
    <div style='overflow: hidden;background-color: #f3f3f8;'>
       <doc v-for='(item,index) of routerList' :key='index' v-if='item.id' v-show='item.id == $route.params.id' :id='item.id'></doc>
    </div>
</template>

<script>
  import doc from './doc'
    export default {
        name : "PatientDocPage",

        components : { doc },

        data(){
          return{
            routerList : []
          }
        },

        mounted(){
          this.$nextTick(() => {
            this.routerList = this.$store.state.patientDocList
            console.log(this.routerList)
          })
        },

        watch : {
          '$store.state.patientDocList': {
            handler(newValue, oldValue) {
              this.routerList = newValue
            },
            deep : true
          },
        }
    }
</script>

