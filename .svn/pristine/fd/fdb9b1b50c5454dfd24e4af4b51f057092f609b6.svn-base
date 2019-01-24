<template>
    <div>
        <el-dialog :title="initTitle" :visible.sync="dialogVisible" class='dialog-class'>
            <el-form ref="form" :model="form">
                <el-form-item>
                    <label>字段名</label>
                    <el-input v-model="form.ITEM_NAME" readonly> </el-input>
                </el-form-item>
                <el-form-item>
                    <label>字段别名</label>
                    <el-input v-model="form.ITEM_ALIAS"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" style="background-color:#DDEFF9; padding:12px 31px; color:#00B3DC;">取 消</el-button>
        <el-button type="primary" style="background-color: #00B3DC; padding:12px 48px; margin-left: 15px;" @click='submit' :disabled='disable'>确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                dialogVisible : false,
                form : {
                    ITEM_NAME : '',
                    ITEM_ALIAS : '',
                },
                disable : false
            }
        },
        methods:{
            submit(){
                this.disable = true
                this.post('datacenter/patientinfodic',{ ...this.form}, res =>{
                    if(res.status == 201){
                        this.$message({
                            type : 'success',
                            message : res.data.message
                        })
                        this.dialogVisible = false
                        this.$parent.handleCurrentChange()
                    }
                    this.disable = false
                })
            },
            getData(item){
                this.dialogVisible = true
                this.form.ITEM_NAME = item.ITEM_NAME
                this.form.ITEM_ALIAS = item.ITEM_ALIAS
            },
        },
        computed : {
            initTitle(){
                return '编辑'
            }
        },

        mounted(){

        },

    }
</script>
<style scoped lang="stylus">
  .dialog-class >>> .el-dialog
    width 444px
    .el-form-item
      label
        display inline-block
        margin-right 20px
        width 76px
      .el-input
        width 300px
        .el-input__inner
          background-color #F9F9FB
      .el-textarea
        width 376px
        .el-textarea__inner
          border-radius 0
          height 150px
          resize none
  .el-button--success
    background-color #11c462
    margin-top -40px
    padding 12px 32px
    float right
    &:hover
      background-color #14d462
</style>

