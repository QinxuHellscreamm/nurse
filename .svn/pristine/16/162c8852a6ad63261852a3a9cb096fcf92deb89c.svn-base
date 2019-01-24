<template>
  <div>
    <el-dialog title="风险评估单" :visible.sync="dialogTableVisible" width='800px'>
      <div class="selbox">
        <el-input type="search" placeholder="搜索评估单" class="this_input" style="width:42%; background-color:#f9f9fb;margin-right: 5px" v-model="title"  @blur="getData"></el-input>
        <el-button type='primary' @click="getData" class='serch'>搜索</el-button>
      </div>
      <div class="tableCont">
        <el-table :data="modelList" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="ID" label="ID"></el-table-column>
          <el-table-column prop="NAME" label="评估单"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmBtn">确 定</el-button>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

  export default{

    props:["id","depart_id"],

    data(){
      return {
        title:'',
        modelList:[],
        dialogTableVisible:false,
        multipleSelection: [],
        setValue:[],
        parentData:[]
      }
    },

    methods: {
      //获取下拉Data

       //获取table的Data
      getData(){
        this.dialogTableVisible
        this.getSer('datacenter/template',{SUBJECT : this.title , TYPE : 1,page_size : 300}, res =>{
          if(res.status <= 400){
          this.modelList = res.data.items;
          this.setData()
          }
        })
      },
      setData(data){
        data ? this.parentData = data : null
        this.dialogTableVisible = true
        this.setValue = []
        this.parentData.forEach(item => {
          this.modelList.forEach(list=>{
            item.TEMPLATE_ID == list.ID ? this.setValue.push(list) : null
          })
          console.log(this.setValue);
          this.$nextTick(()=>{
            this.$refs.multipleTable.clearSelection()
            this.setValue.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            })
          })
        })

      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      //确定按钮
      confirmBtn(){

        var id = '';
        this.multipleSelection.forEach( item => {
          console.log( item );
          id += item.ID +",";
        })
        id = id.substring(0, id.lastIndexOf(','));

        this.post('datacenter/questionnairedepart',{depart_id:this.depart_id, questionnair_ids:id}, (res) =>{
          if(res.status <= 400){
            this.dialogTableVisible = false;
            this.$parent.getData(this.depart_id)
            this.$message({
                type: 'success',
                message: '添加成功!'
            })
          }
        })
      },

    }
  }
</script>
<style scoped lang="stylus">
  .serch
    padding 12px 32px
    float right

  /*rr  add*/
  .tableCont{ margin-top: 20px;}
  .tableCont >>> .el-table__header-wrapper{
    height: 34px;
    border-top: 1px solid #A5DDEA;
    background: #DDEFF9;
  }
  .tableCont >>> .el-table th, .el-table tr{
    background: #DDEFF9;
    height: 34px;
    line-height: 34px;
    text-align: left;
    border-right:solid 1px #A5DDEA;
  }
  .tableCont >>> .el-table--enable-row-transition .el-table__body td:first-child{
    border-left:solid 1px #eee;
  }
  .tableCont >>> .el-table--enable-row-transition .el-table__body td{
    text-align: left;
    border-right:solid 1px #eee;
    height: 34px;
    line-height: 34px;
  }
  .tableCont >>>.el-table td, .el-table th{ padding: 0;}

  .tableCont >>> .el-checkbox__input.is-checked .el-checkbox__inner,.tableCont >>> .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #00CACF;
    border-color: #00CACF;
  }
  .tableCont >>> .el-checkbox{ color: #2B3A50;display: block;}
  .tableCont >>> .el-checkbox__input.is-checked+.el-checkbox__label{ color: #2B3A50;}
  .tableCont >>> .el-checkbox__inner{ height: 20px;width:20px;line-height: 20px;}
  .tableCont >>> .el-checkbox__inner::after{ border-width: 2px; height: 8px; left: 6px; top: 2px;width: 4px;}
  .el-checkbox-group > .el-checkbox{margin-left: 0;margin-top: 15px;}
  .eventStyle>>> .el-dialog__headerbtn{ margin-right:300px!important;}
  .el-dialog__body{padding-top: 0!important;}

</style>
