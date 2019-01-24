<template>
  <div>
    <tabBar :moduleList="list" :content="content" :page="page"></tabBar>
  </div>
</template>
<script>
  import tabBar from '@/components/tabBar'
  export default{
    data() {
      return {
        list : ["护士排班","护士档案"],
        content : ["nurseScheduling","outArchives"],
        page : 'nurse'
      }
    },
    components:{ tabBar }
  }
</script>
<style scoped>

</style>
