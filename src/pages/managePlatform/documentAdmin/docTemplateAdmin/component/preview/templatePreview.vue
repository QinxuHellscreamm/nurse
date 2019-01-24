<template>
   <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" class='dialog'>
     <div style="display: flex;flex-wrap: wrap;">
       <Node v-for="(node,index) of NODES" :nodeData='node' :key='index' :class='{"br":node.IS_NEWLINE =="1"}' ></Node>
     </div>
   </el-dialog>
</template>

<script>
  import Node from '@/components/node'
    export default {
        name: "templatePreview",
        data(){
          return{
            dialogTitle : '模板预览',
            dialogTableVisible : false,
          }
        },
        methods : {
          show(){
            this.dialogTableVisible = true
          }
        },
        props : ['NODES'],
        mounted(){
          console.log(this.NODES);
        },
      components: {Node}
    }
</script>

<style scoped lang='stylus'>
  .br
    width 100%
</style>
