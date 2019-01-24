<template>
    <el-dialog :visible.sync="viewdialogFormVisible" title='预览' width='640px' class='custom'>
          <div v-html='htm' style='width: 600px;height: 849px;overflow-y: auto;' ref='print'></div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="print" class='save' type='primary'>打印</el-button>
        <el-button @click="viewdialogFormVisible = false" class='close'>取消</el-button>

      </div>
    </el-dialog>
</template>

<script>

    export default {
        name: "listPreview",

        data(){
          return{
            viewdialogFormVisible : false,
            htm:''
          }
        },

        methods:{
          getData(id){
            this.htm = ''
            this.getSer("datacenter/template/preview" , { TEMPLATE_ID:id , TYPE:1 },res => {
              console.log(res)
              this.viewdialogFormVisible = true
              this.htm = res.data.content
            })
          },
          print(){
            var LODOP = this.$getLodop()
            LODOP.PRINT_INIT("");
            LODOP.SET_PREVIEW_WINDOW(2);
            LODOP.SET_PRINT_PAGESIZE(1,"","","a4");
            LODOP.SET_PRINT_STYLE("FontSize",18);
            LODOP.SET_PRINT_STYLE("Bold",1);
            LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Auto-Width");
            LODOP.ADD_PRINT_HTM(20,20,'100%','100%',this.$refs.print.innerHTML);//xx ←边距 xx height
            LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1)
            LODOP.PREVIEW()
          }
        },


    }
</script>

<style scoped lang='stylus'>
  .custom
    &>>>.el-dialog__body
      padding 0 20px
  &::-webkit-scrollbar
    width 1px
  &::-webkit-scrollbar-thumb
    border-radius 1px
  &::-webkit-scrollbar-track
    border-radius 1px
</style>
