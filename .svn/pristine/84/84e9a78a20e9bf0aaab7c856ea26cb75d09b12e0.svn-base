<template>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="床位使用率" name="Z00100" type="Z00100">
          <tempEcharts :type="type" :department_id="department_id"></tempEcharts>
        </el-tab-pane>
        <el-tab-pane label="平均住院日" name="2" type="2">平均住院日</el-tab-pane>
        <el-tab-pane label="床位周转次数" name="3" type="3">床位周转次数</el-tab-pane>
        <el-tab-pane label="平均病床工作日" name="Z00200"  type="Z00200">平均病床工作日</el-tab-pane>
      </el-tabs>
    </div>
</template>
<script>
  import tempEcharts from './tempEcharts'
    export default{
      components : { tempEcharts},
      props : ['department_id'],
      data(){
          return {
            activeName: 'Z00100',
            type:"Z00100",

          }
      },

      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
          this.type= tab.name
          console.log("2",this.type);
          console.log("212",this.department_id);

        }
      },
    }
</script>
<style scoped>

</style>
