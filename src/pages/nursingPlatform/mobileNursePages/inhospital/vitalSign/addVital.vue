<template>
    <el-dialog title="添加生命体征" :visible.sync="dialogTableVisible">
      <div class="selbox">
        <el-input type="search" placeholder="搜索生命体征" style="width:42%; background-color:#f9f9fb;margin-right: 5px;" v-model="title" ></el-input>
        <el-button class="serch" @click="getData" type='primary'>搜索</el-button>
      </div>
      <div class="tableCont">
        <el-table :data="modelList" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="ID" label="ID"></el-table-column>
          <el-table-column prop="NAME" label="生命体征"></el-table-column>
          <el-table-column prop="INPUT_TYPE_NAME" label="属性类型" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmBtn">确 定</el-button>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
      </div>
    </el-dialog>
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
        setValue:[]
      }
    },

    methods: {

       //获取table的Data
      getData(){
        this.getSer('datacenter/vs',{vs_name:this.title, category_name:this.category_id},(res) =>{
          if(res.status <= 400){
            this.modelList = res.data.items;
          }
        })
      },
      setData(data){
        console.log(data);
        this.dialogTableVisible = true
        this.setValue = []
        data.forEach(item => {
          this.modelList.forEach(list=>{
            item.VS_ITEM_ID == list.ID ? this.setValue.push(list) : null
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
        this.multipleSelection = val
      },

      //确定按钮
      confirmBtn(){
        console.log('拿id');
        var id = '';
        this.multipleSelection.forEach( item => {
          console.log( item )
          id += item.ID +","
        })
        id = id.substring(0, id.lastIndexOf(','))
        console.log( id );
        this.post('datacenter/vsopt',{depart_id:this.depart_id, items_ids:id}, (res) =>{
          if(res.status <= 400){
              this.$message({type: 'success', message: '添加成功!'})
            this.dialogTableVisible = false;
            this.$parent.getData()
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
  .btn-small
    width 112px
</style>
