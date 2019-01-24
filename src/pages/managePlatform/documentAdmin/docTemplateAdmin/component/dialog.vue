<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" ref='child' class='dialog'>
    <div class='search'>
      <el-input type="serch" placeholder='请输入标题' v-model='va'></el-input>
      <el-button size="medium" type="primary" style="padding:10px 35px" @click='pageAjax'>搜索</el-button>
    </div>

    <el-table :data="LIST" height='330' border @row-click="handleSelectionChange" v-if='CATEGORY == 1 || CATEGORY == 2 || CATEGORY == 3 '>
      <el-table-column label="标题" >
        <template slot-scope="scope">{{ scope.row.SUBJECT }}</template>
      </el-table-column>
      <el-table-column label="输入方式"><template slot-scope="scope">{{ scope.row.INPUT_TYPE | Sub_TYPE }}</template></el-table-column>
    </el-table>

    <el-table :data="LIST" height='330' border @row-click="selectSign" v-if='CATEGORY == 4'>
      <el-table-column label="标题" >
        <template slot-scope="scope">{{ scope.row.NAME }}</template>
      </el-table-column>
      <el-table-column label="输入方式"><template slot-scope="scope">{{ scope.row.INPUT_TYPE_NAME}}</template></el-table-column>
    </el-table>

    <el-table :data="LIST" height='330' border @row-click="selectAssessment" v-if='CATEGORY == 5'>
      <el-table-column label="标题" >
        <template slot-scope="scope">{{ scope.row.SHOW_NAME }}</template>
      </el-table-column>
      <el-table-column label="输入方式"><template slot-scope="scope">点击弹出该评估单</template></el-table-column>
    </el-table>

    <el-table :data="LIST" height='330' border @row-click="selectDetile" v-if='CATEGORY == 8' key='CATEGORY8'>
      <el-table-column label="中文别名" prop='ITEM_ALIAS'></el-table-column>
      <el-table-column label="字段名" prop='ITEM_NAME'></el-table-column>
    </el-table>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogTableVisible = false" size="small">取消导入</el-button>
      <el-button type="primary" @click="importData" size="small">确定导入</el-button>
    </div>
  </el-dialog>
</template>

<script>
    export default {
        name : "",

        data(){
          return{
            height : true,
            dialogTableVisible : false,
            LIST : [],
            va : '',
            dialogTitle:'导入xxx',
            id : '',
            sign : {},
            assessment:{},
            detile:{}
          }
        },

        props : ["CATEGORY"],

        methods : {
          handleSelectionChange(vals){
            console.log(vals);
            this.id = vals.ID
          },
          selectSign(vals){
            console.log(vals);
            this.sign = vals
          },
          selectAssessment(vals){
            console.log(vals)
            this.id = vals.ID
            this.assessment = vals
          },
          selectDetile(vals){
            this.detile = vals
          },
          show(){
            this.$nextTick(()=>{
              this.dialogTableVisible = true
              if(this.CATEGORY == 1) this.dialogTitle = '导入评估单题库'
              else if(this.CATEGORY == 2) this.dialogTitle = '导入记录单题库'
              else if(this.CATEGORY == 3) this.dialogTitle = '导入交接单题库'
              else if(this.CATEGORY == 4) this.dialogTitle = '导入生命体征字典'
              else if(this.CATEGORY == 5) this.dialogTitle = '导入评估单'
              else if(this.CATEGORY == 8) this.dialogTitle = '导入信息字典'
              this.pageAjax()
            })
          },
          pageAjax(){//题目列表
            this.LIST = []
            if(this.CATEGORY == 1 || this.CATEGORY == 2 || this.CATEGORY == 3){ //请求题库列表
              this.getSer("datacenter/question" , {
                'SUBJECT' : this.va,
                'CATEGORY' : this.CATEGORY,
                'page' : 1,
                'page_size' : 1000
              },res => {
                console.log(res)
                if(res.status <= 400){
                  this.LIST = res.data.items;
                }
              })
            }

            if(this.CATEGORY == 4){ //请求生命体征列表
              this.getSer('datacenter/vs',{ page : 1, page_size : 1000 , vs_name : this.va },res=>{
                console.log('生命体征列表');
                console.log(res);
                if(res.status < 400){
                  this.LIST = res.data.items
                }
              })
            }
            if(this.CATEGORY == 5){ // 请求评估单列表
              this.getSer('datacenter/template',{ TYPE : 1 , page : 1, page_size : 1000 , SUBJECT : this.va },res=>{
                console.log('评估单列表')
                console.log(res)
                if(res.status < 400){
                  this.LIST = res.data.items
                }
              })
            }
            if(this.CATEGORY == 8){
              this.getSer("datacenter/patientinfodic",{
                'page' : 1,
                'page_size' : 100
              },res=>{
                console.log(res)
                let arr = []
                if(this.va != ''){
                  res.data.items.forEach(item=>{
                    item.ITEM_ALIAS.indexOf(this.va) == -1 ? null : arr.push(item)
                  })
                  this.LIST = arr
                }else{
                  this.LIST = res.data.items
                }
              })
            }
          },
          importData(){
            if(this.CATEGORY == 1 || this.CATEGORY == 2 || this.CATEGORY == 3) {
              this.getSer("datacenter/question/" + this.id, {id: this.id}, res1 => {
                var res = res1.data
                var str = ''
                res.OPTIONS.forEach(item => {
                  str += item['TITLE'] + '|' + item['SCORE'] + "\n"
                })
                res.OPTIONS = str
                res.NODE_NAME = res.SUBJECT
                res.NODE_UNIT = res.UNIT
                res.INPUT_MODE = res.TYPE
                res.RELATE_NODE_ID = res.ID
                delete res.SUBJECT
                delete res.UNIT
                delete res.TYPE
                delete res.ID
                this.dialogTableVisible = false
                this.$parent.merge(res)
              })
            }
            if(this.CATEGORY == 4){
              let obj = {}
              let sign = {...this.sign}
              let str = ''
              if(sign.OPTION_LIST){
                sign.OPTION_LIST.forEach((item,i)=>{
                  console.log(i);
                  str += item['name'] + '|' + item['code'] + '\n'
                })
              }
              obj.OPTIONS = str
              obj.NODE_NAME = sign.NAME
              console.log(sign.INPUT_TYPE_CODE);
              if(sign.INPUT_TYPE_CODE == "01" || sign.INPUT_TYPE_CODE == "02"){
                obj.INPUT_MODE = '1'
                sign.INPUT_TYPE_CODE == "01" ? obj.INPUT_TYPE = '2' : obj.INPUT_TYPE = '1'
                obj.INPUT_RULES = sign.VALIDATION_RULE
              }
              if(sign.INPUT_TYPE_CODE == "03") obj.INPUT_MODE = '5'
              if(sign.INPUT_TYPE_CODE == "04") obj.INPUT_MODE = '6'
              obj.NODE_UNIT = sign.UNIT

              obj.VS_ITEM_CODE = sign.CODE
              obj.RELATE_NODE_ID = sign.ID
              this.dialogTableVisible = false
              this.$parent.merge(obj)
            }
            if(this.CATEGORY == 5){//导入模板
              var obj = { RELATE_TEMPLATE_ID : this.id , NODE_NAME : this.assessment.SHOW_NAME }
              this.dialogTableVisible = false
              this.$parent.merge(obj)
            }
            if(this.CATEGORY == 8){//导入患者信息字典
              var obj = { RELATE_NODE_ID : this.detile.ID , NODE_NAME : this.detile.ITEM_ALIAS }
              this.dialogTableVisible = false
              this.$parent.merge(obj)
            }
        }

      },

    }
</script>

<style scoped lang="stylus">
  .search
    margin 0 0 25px 0
  .el-button
    margin-left 10px
  .el-input
    width 310px
  .el-input >>> .el-input__inner
    height 36px
  .el-table >>>.el-table__header-wrapper .el-checkbox__input
    display none
  .el-table >>>.current-row td
    background-color #DDEFF9
  .cell:nth-child(1) label
    visibility hidden
  .dialog >>> .el-dialog
    width 556px
  .dialog >>> .el-table td
    text-align center
    padding 3px 0
  .dialog >>> .el-table th
    padding 3px 0
    text-align center
</style>
