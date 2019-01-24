<template>
    <el-dialog title="录入事件" :visible.sync="dialogFormVisible" width='500px'>

      <el-table :data='tableList' border @row-click='setRow'>
        <el-table-column  label="时间" prop='START_TIME' min-width='160'></el-table-column>
        <el-table-column  label="事件类型" prop='NAME' min-width='100'></el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click="add"  style='float: left' type='primary'>新增</el-button>
        <el-button @click="edit" style='float: left' type='success'>编辑</el-button>
        <el-button @click="del" style='float: left' type='warning'>删除</el-button>
        <el-button @click="dialogFormVisible = false" type='info'>取 消</el-button>
      </div>
      <event-edit ref='edit' :detile='detile'></event-edit>
    </el-dialog>
</template>

<script>
    import eventEdit from './eventEdit'
    export default {
        name: "eventEntry",

        props:['detile'],

        components: {eventEdit},

        data(){
          return{
            dialogFormVisible : false,
            tableList:[],
            row:{}
          }
        },

        methods : {
          getList(){
            this.getSer('datacenter/patient-label',{ group:1 , in_number:this.detile.INPATIENT_NUMBER },res=>{
              console.log(res);
              this.tableList = res.data.items
            })
          },
          show(){
            this.dialogFormVisible = true
            this.getList()
          },
          add(){
            this.$refs.edit.add()
          },
          edit(){
            if(this.row.ID){
              this.$refs.edit.edit(JSON.parse(JSON.stringify(this.row)))
            }
          },
          del(){
            this._delete('datacenter/patient-label/'+this.row.ID,{id:this.row.ID},res=>{
              if(res.status == 204){
                this.$message({type: 'success', message: '删除成功!'});
                this.getList()
                this.row = {}
              }
            })
          },
          setRow(row){
            console.log(row);
            this.row = row
          }
        },
    }
</script>

<style scoped lang='stylus'>
  .el-table
    &>>>.el-table__header-wrapper
      th
        padding 8px 0
    &>>>.el-table__body-wrapper
      td
        padding 8px 0
</style>
