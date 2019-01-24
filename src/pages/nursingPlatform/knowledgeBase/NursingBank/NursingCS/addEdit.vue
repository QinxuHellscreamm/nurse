<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width='560px' class='custom'>
    <label v-if='title == "新增"'>输入护理措施，每行一个</label>
    <el-input type="textarea" v-model="content" v-if='title == "新增"'></el-input>
    <el-input v-model="content" v-if='title != "新增"'></el-input>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { _debounce } from "@/global"

  export default {
        name: "addEdit",

        data(){
          return{
            content : '',
            dialogFormVisible : false,
            title : '',
            id : ''
          }
        },

        methods : {
          add(){
            this.dialogFormVisible = true
            this.title = '新增'
            this.content = ''
          },
          edit(row){
            this.dialogFormVisible = true
            this.title = '编辑'
            this.id = row.ID
            this.content = row.CONTENT
          },
          save:_debounce(function () {
            if (!this.content){
              this.$message({type: 'warning', message: '请输入信息!'})
              return false
            }
            if(this.title == '新增'){
              this.post('datacenter/measurebank',{ content : JSON.stringify(this.content.split('\n'))} , res => {
                console.log(res);
                if(res.status<400){
                  this.$message({type: 'success', message: '新增成功!'})
                  this.dialogFormVisible = false
                  this.$parent.getData()
                }
              })
            }else{
              this._put('datacenter/measurebank/' + this.id , { id : this.id ,content :this.content } , res =>{
                if(res.status<400){
                  this.$message({type: 'success', message: '编辑成功!'})
                  this.dialogFormVisible = false
                  this.$parent.getData()
                }
              })
            }
          })
        }

    }
</script>

<style scoped lang='stylus'>
  .custom
    label
      color #6C8B97
      font-size 16px
      margin 0 10px 20px
      position relative
      top -10px
    &>>>.el-dialog__header
      margin-left 10px
  .el-button--primary
    background #00B3DC
  .el-button--default
    background #DDEFF9
    color #00B3DC
  .el-button
    border none
    padding 12px 40px
  .el-textarea
    margin 10px auto 0
    display block
    width 500px
    &>>>.el-textarea__inner
      resize none
      height 240px
      background-color #F9F9FB

</style>
