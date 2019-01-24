<template>
  <el-dialog width="556px" title="选择用药途径" :visible.sync="innerVisible" append-to-body>
    <el-table  ref='multipleTable' :data='list' border @selection-change="handleSelectionChange" >
      <el-table-column type='selection'></el-table-column>
      <el-table-column label='名称' prop='NAME'></el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <button  @click="innerVisible = false" class='btn-pop-cancel'>取消</button>
      <button  @click="save " class='btn-pop-sure'>确定</button>
    </div>
  </el-dialog>
</template>
<script>
    export default{

        data(){
            return {
              innerVisible : false,
              list : [],
              multipleSelection : [],
              chose_me_advice_desc : ''
            }
        },

        methods:{
          getData(data){
            console.log(data);
            this.innerVisible = true
            this.list = data.detail_content.his_way_by_hisadviceid
            this.parentData = data

            this.$nextTick(()=>{
              this.$refs.multipleTable.clearSelection()
              this.list.forEach( item => {
                item.IS_SELECT == 1 ? this.$refs.multipleTable.toggleRowSelection(item) : null
              })
            })
          },

          handleSelectionChange(val){
            this.multipleSelection = val
          },

          save(){
            let str = ''
            let chose_me_advice_ids = []
            this.multipleSelection.forEach((item,index) => {
              item.IS_SELECT = 1
              index<this.multipleSelection.length - 1 ? str += (item.NAME+',') : str += item.NAME
              chose_me_advice_ids.push(item.HIS_WAY_ID)
            })
            this.parentData.detail_content.chose_me_advice_desc = str
            this.parentData.detail_content.chose_me_advice_ids = chose_me_advice_ids
            console.log(this.parentData.detail_content.chose_me_advice_desc);
            this.innerVisible = false
          }
        }
    }
</script>
<style scoped lang='stylus'>
    .el-table
      &>>>.el-table__header-wrapper
        th
          padding 5px 0
          background-color #DDEFF9
          border-color #A5DDEA
          .el-checkbox
            margin-left 5px
      &>>>.el-table__body-wrapper
        td
          padding 8px 0
          .el-checkbox
            margin-left 5px
</style>
