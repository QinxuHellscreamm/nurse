<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width='800px' class='custom'>
    <el-form :model="ruleForm" ref="ruleForm" label-width="80px">
      <el-form-item label="工号" prop="NAME">
        <el-input v-model="ruleForm.NAME" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="JOB_NUMBER">
        <el-input v-model="ruleForm.JOB_NUMBER" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="关联病区" prop="WARD_IDS">
        <el-autocomplete class="inline-input" v-model="WARD_IDS" :fetch-suggestions="querySearch" placeholder="请选择病区" @select="handleSelect"></el-autocomplete>
        <div class='tag-box'>
          <el-tag :key="tag" v-for="tag in dynamicTags.values" closable :disable-transitions="false" @close="handleClose(tag)">
            {{tag}}
          </el-tag>
        </div>
        <el-input v-if="inputVisible"  ref="saveTagInput"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmAdd()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
    export default {
        name : "add",

        props : ['restaurants'],

        data(){
          return{
            title:'',
            id : '',
            dialogFormVisible : false,
            ruleForm : {
              TITLE : '' ,
              CONTENT : '' ,
              WARD_IDS : []
            },
            inputVisible : false,
            WARD_IDS : '',//select 筛选
            dynamicTags : {
              values : [],
              ids : []
            },

          }
        },

        methods:{
          handleClose(tag) {
            this.dynamicTags.values.splice(this.dynamicTags.values.indexOf(tag),1);
            this.dynamicTags.ids.splice(this.dynamicTags.ids.indexOf(tag),1);
            this.ruleForm.WARD_IDS.splice(this.dynamicTags.ids.indexOf(tag),1);
          },
          handleSelect(item) {
            this.WARD_IDS = ''
            this.dynamicTags.values.push(item.value)
            this.dynamicTags.ids.push(item.ID)
            this.ruleForm.WARD_IDS.push(item.ID)
            /*去重*/
            this.dynamicTags.values = Array.from(new Set(this.dynamicTags.values))
            this.dynamicTags.ids = Array.from(new Set(this.dynamicTags.ids))
            this.ruleForm.WARD_IDS = Array.from(new Set(this.ruleForm.WARD_IDS))
          },
          querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
          },
          createFilter(queryString) {//创建浮签
            return (restaurant) => {
              return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
          },

          //新增弹框提交
          confirmAdd(){
              if(this.id) {
                  this._put('datacenter/nurse/'+this.id,{id:this.id,NAME:this.ruleForm.NAME,JOB_NUMBER:this.ruleForm.JOB_NUMBER,WARD_IDS:JSON.stringify(this.ruleForm.WARD_IDS)},res =>{
                      if(res.data.status=="201"){
                          this.$parent.pageAjax()
                          this.dialogFormVisible = false
                          this.$message({
                              type: 'success',
                              message: '编辑成功!'
                          })
                      }

                  })
              }else{
                  this.post('datacenter/nurse',{...this.ruleForm,WARD_IDS:JSON.stringify(this.ruleForm.WARD_IDS)},(res) =>{
                      if(res.data.status=="201"){
                          this.$parent.getData()
                          this.dialogFormVisible = false
                          this.$message({
                              type: 'success',
                              message: '新增成功!'
                          })
                      }
                  })
              }
          },
          setAddData(){
              this.id = '';
          },
          setData(id){
            this.getSer('datacenter/nurse/' + id, {id}, (res) => {
              this.id = id;
              this.ruleForm = res.data;
              this.ruleForm.WARD_IDS = []
              this.dynamicTags.values = []
              this.dynamicTags.ids = []
              this.dynamicTags.WARD_IDS = []
              res.data.ward_list.forEach(item => {
                this.dynamicTags.values.push(item.WARD_NAME)
                this.dynamicTags.ids.push(item.WARD_ID)
                this.ruleForm.WARD_IDS.push(item.WARD_ID)
              }),

              console.log(this.dynamicTags)
            })
          },

        }
    }
</script>

<style lang="stylus" scoped>
  .custom >>> .el-dialog__body
    padding 30px
  .el-form-item
    margin-bottom 30px
  .el-form-item >>> .el-form-item__label
    font-size 16px!important
  .el-input >>> .el-input__inner
    background-color #F9F9FB
  .el-textarea >>> .el-textarea__inner
    background-color #F9F9FB
    height 240px
    resize none
  .tag-box
    margin-top 10px
    .el-tag
      margin-right 8px
</style>
