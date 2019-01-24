<template>
  <div>
    <el-dialog :title="titleName" :visible.sync="dialogTableVisible" width='800px'>
      <div class="selbox">
        <el-input type="search" placeholder="搜索标题" class="" style="width:42%; background-color:#f9f9fb;margin-right: 5px;" v-model="title"  @blur="getData"></el-input>
        <el-input type="search" placeholder="科室或疾病" class=""  style="width:42%; background-color:#f9f9fb;" v-model="category_id"  @blur="getData"></el-input>
        <el-button type='primary' @click="getData" style='margin-left: 10px;padding:12px 32px;'>搜索</el-button>
      </div>
      <div class="tableCont">
        <el-table :data="modelList" ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="ID" label="ID"></el-table-column>
          <el-table-column prop="TITLE" label="宣教标题"></el-table-column>
          <el-table-column prop="CATEGORY" label="科室属性" show-overflow-tooltip></el-table-column>
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

    props:["id",'depart_id'],

    data(){
      return {
        titleName:'',
        title:'',
        category_id : '',
        modelList:[],
        dialogTableVisible:false,
        multipleSelection: [],
        setValue : [],//selected arr
        parentData:[]
      }
    },

    methods: {
       //获取table的Data
      getData(){
        this.getSer('datacenter/inform',{title : this.title, category_name:this.category_id},res =>{
          if(res.status <= 400){
            console.log('我是新增列表')
            console.log(res);
            this.modelList = res.data.items
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
            item.INFORM_ID == list.ID ? this.setValue.push(list) : null
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
        var id = '';
        this.multipleSelection.forEach( item => {
          id += item.ID +","
        })
        id = id.substring(0, id.lastIndexOf(','));
        this.post('datacenter/informdepart',{depart_id:this.depart_id, inform_ids:id}, (res) =>{
          if(res.status <= 400){
            this.dialogTableVisible = false
            this.$message({type: 'success', message: '添加成功!'})
            this.$parent.getData()
          }
        })
      }
    }
  }
</script>
<style scoped lang="stylus">
  .selbox
    text-align center
    ul
      height 460px
      .t_head
        display flex
        margin-top 20px
        line-height 33px
        background-color: #ddeff9
        border-top 1px solid #a5dde9
        label
          width 40px
          border 1px solid #a5dde9
          border-bottom none
          border-top none
          box-sizing border-box
          -webkit-box-sizing border-box
        div
          width 33.3%
          flex 1
          box-sizing border-box
          -webkit-box-sizing border-box
          border-right 1px solid #a5dde9
      .t_bd
        border-bottom 1px solid #eee
        line-height 30px
        display flex
        label
          width 40px
          border-left 1px solid #eee
          border-right 1px solid #eee
          box-sizing border-box
          -webkit-box-sizing border-box
        div
          flex 1
          box-sizing border-box
          -webkit-box-sizing border-box
          border-right 1px solid #eee

  /*rr  add*/
  .tableCont{ margin-top: 20px;}
  .tableCont >>> .el-table__header-wrapper{
    height: 34px;
    border-top: 1px solid #A5DDEA;
    background: #DDEFF9;
  }
  .tableCont >>> .el-table th, .el-table td{
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
  .tableCont >>>.el-table td, .el-table th
    padding 0
    text-align left
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
