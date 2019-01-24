<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width='600px' append-to-body="false">
    <el-form :model="form">
      <el-form-item label="目标名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmAdd()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
    export default{
      name : "addTest",
      props: ['tabled'],
        data(){
            return {
              title:'',
              dialogFormVisible: false,
              form: {
                name: '',

              },
              formLabelWidth: '80px'
            }
        },

      methods:{
        //新增弹框提交
        confirmAdd(){
          this.dialogFormVisible = false
          this.tabled.push({address:this.form.name})
        },

      },
    }
</script>
<style scoped>

</style>
