<template>

  <div style='overflow: hidden;background-color: #f3f3f8;'>
    123
    <!--<baby-doc v-for='(item,index) of routerList' :key='index' v-if='item.id' v-show='item.id == $route.params.id' :id='item.id'></baby-doc>-->
  </div>
</template>

<script>
    import BabyDoc from "@/pages/workstation/babyDOC/babyDoc";
    export default {

      name: "babyDocPage",

      components: {BabyDoc},

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
            console.log(this.routerList);
            console.log(this.$route.params.id);
          },
          deep : true
        }
      }
    }
</script>

<style scoped>

</style>
