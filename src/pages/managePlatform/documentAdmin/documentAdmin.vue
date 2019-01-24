<template>
  <div>
    <tabBar :moduleList="list" :content="content" :page="page"></tabBar>
  </div>
</template>
<script>
  import tabBar from '../component/tabBar'

  export default{
    data() {
      return {
        list : ["文书模板管理","文书题目管理","体温单管理"],
        //vitalList:["体温","体表其它项目"],
        content : ["docTemplateAdmin","docSubjectAdmin","temperatureChartAdmin"],
        page : 'documentAdmin'
      }
    },
    components : { tabBar },
    mounted() {
      this.$nextTick(() => {
        //文书静态资源session存储
        this.getSer('datacenter/collocation', {} ,res => {
          sessionStorage.setItem('publicDoc',JSON.stringify(res.data.items))
          console.log(this.$store.getters.getPublicDoc)
        })
      })
    }
  }
</script>
<style scoped>

</style>
