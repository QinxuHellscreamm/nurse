<template>
  <div>
    <el-button @click="init" type='success'>新增</el-button>
    <el-dialog :title="initTitle" :visible.sync="dialogVisible" class='dialog-class'>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="ICD_CODE">
          <label>ICD-10编码</label>
          <el-input v-model="form.ICD_CODE"></el-input>
        </el-form-item>
        <el-form-item prop="NAME">
          <label>疾病名称</label>
          <el-input v-model="form.NAME"></el-input>
        </el-form-item>
        <el-form-item>
          <label>英文名称</label>
          <el-input v-model="form.ENGLISH"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="del()" style="padding:12px 31px;" type='danger' v-if='delete_flag'>删除</el-button>
        <el-button @click="dialogVisible = false" style="background-color:#DDEFF9; padding:12px 31px; color:#00B3DC;">取 消</el-button>
        <el-button type="primary" style="background-color: #00B3DC; padding:12px 48px; margin-left: 15px;" @click="submit('form')" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        dialogVisible : false,
        title : "",
        opation : '',
        type:'',
        delete_flag:false,

        form : {
          NAME : '',
          ICD_CODE : '',
          ENGLISH : '',
          id:''
        },
        rules: {
          NAME: [
            {required: true, message: '疾病名称不能为空', trigger: 'blur'},
          ],
          ICD_CODE: [
            {required: true, message: 'ICD-10编码不能为空', trigger: 'blur'},
          ],
        }
      }
    },
    methods:{
      submit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.type == 'add'){
              this.disable = true
              this.post('datacenter/disease',{ ...this.form}, res =>{

                if(res.status == 200){
                  this.$message({
                    type : 'success',
                    message : res.data.message
                  })
                  console.log("aaaaaaaaaa",res);
                  this.dialogVisible = false
                  this.$parent.handleCurrentChange()
                }
                this.disable = false
              })
            }else{
              this._put('datacenter/disease/'+this.form.id,{...this.form}, res =>{
                console.log(res);
                this.disable = true
                if(res.status == 201){
                  this.$message({
                    type : 'success',
                    message : res.data.message
                  });
                  this.dialogVisible = false
                  this.$parent.handleCurrentChange()
                }
                this.disable = false
              })
            }
          }
        });
      },
      init(){
        this.dialogVisible = true
        this.type = 'add',
          this.delete_flag = false
        this.form =  {
          NAME : '',
          ICD_CODE : '',
          ENGLISH : '',
          id:''
        }
      },
      getData(item){
        this.delete_flag = true
        this.type = 'edit'
        this.form.id = Number(item.ID)
        this.dialogVisible = true
        this.form.NAME = item.NAME
        this.form.ICD_CODE = item.ICD_CODE
        this.form.ENGLISH = item.ENGLISH
      },
      del() {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this._delete('datacenter/disease/' + this.form.id,{id : this.form.id}, res =>{
          console.log(res);
        if(res.status == 204){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });

        }

        this.dialogVisible = false
        this.$parent.handleCurrentChange()
      })
      })
      }
    },

    computed : {
      initTitle(){
        return this.type == 'add' ? '新增疾病':'编辑选择项'
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
