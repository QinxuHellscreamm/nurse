<template>
  <el-dialog title="查看宣教" :visible.sync="viewdialogFormVisible" width='800px'>
    <el-form :model="ruleForm" ref="ruleForm" label-width="74px">
      <el-form-item label="标　　题" prop="TITLE">
        <el-input v-model="ruleForm.TITLE" auto-complete="off" readonly></el-input>
      </el-form-item>
      <el-form-item label="内　　容" prop="CONTENT">
        <el-input type="textarea" :rows="3" placeholder="请填写内容" v-model="ruleForm.CONTENT" readonly></el-input>
      </el-form-item>
      <el-form-item label="关联科室" prop="DEPART_IDS">
        <el-tag :key="tag" v-for="tag in dynamicTags.values" closable :disable-transitions="false">
          {{tag}}
        </el-tag>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="viewdialogFormVisible = false">关闭</el-button>
    </div>

  </el-dialog>
</template>

<script>
    export default {
        name: "see",

        data(){
          return{
            viewdialogFormVisible : false,
            ruleForm : [],
            dynamicTags:[]
          }
        },

        methods : {
          viewItem(id){
            this.getSer('datacenter/inform/' + id, { id }, res => {
              this.ruleForm = res.data.infrom_info
              this.dynamicTags.values = []
              this.dynamicTags.ids = []
              res.data.depart_list.forEach(item => {
                this.dynamicTags.values.push(item.NAME)
                this.dynamicTags.ids.push(item.ID)
              }),
                this.viewdialogFormVisible = true
            })
          },
        }
    }
</script>

<style scoped lang='stylus'>
  .el-textarea >>>.el-textarea__inner
    resize none
  .el-button
    background-color #00B3DC
    color #FFFFFF
</style>
