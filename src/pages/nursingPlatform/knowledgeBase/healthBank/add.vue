<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width='800px' class='custom'>
    <el-form :model="ruleForm" ref="ruleForm" label-width="80px">
      <el-form-item label="标　　题" prop="TITLE">
        <el-input v-model="ruleForm.TITLE" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="内　　容" prop="CONTENT">
        <el-input type="textarea" :rows="3" placeholder="请填写内容" v-model="ruleForm.CONTENT"></el-input>
      </el-form-item>
      <el-form-item label="关联科室" prop="DEPART_IDS">
        <el-autocomplete class="inline-input" v-model="DEPART_IDS" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
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
              DEPART_IDS : []
            },
            inputVisible : false,
            DEPART_IDS : '',//select 筛选
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
            this.ruleForm.DEPART_IDS.splice(this.dynamicTags.ids.indexOf(tag),1);
          },
          handleSelect(item) {
            this.DEPART_IDS = ''
            this.dynamicTags.values.push(item.value)
            this.dynamicTags.ids.push(item.ID)
            this.ruleForm.DEPART_IDS.push(item.ID)
            /*去重*/
            this.dynamicTags.values = Array.from(new Set(this.dynamicTags.values))
            this.dynamicTags.ids = Array.from(new Set(this.dynamicTags.ids))
            this.ruleForm.DEPART_IDS = Array.from(new Set(this.ruleForm.DEPART_IDS))
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
                  this._put('datacenter/inform/'+this.id,{id:this.id,TITLE:this.ruleForm.TITLE,CONTENT:this.ruleForm.CONTENT,DEPART_IDS:JSON.stringify(this.ruleForm.DEPART_IDS)},res =>{
                      if(res.data.status=="201"){
                          this.$parent.getData()
                          this.dialogFormVisible = false
                          this.$message({
                              type: 'success',
                              message: '编辑成功!'
                          })
                      }

                  })
              }else{
                  this.post('datacenter/inform',{...this.ruleForm,DEPART_IDS:JSON.stringify(this.ruleForm.DEPART_IDS)},(res) =>{
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
            this.getSer('datacenter/inform/' + id, {id}, (res) => {
              this.id = id;
              this.ruleForm = res.data.infrom_info;
              this.dynamicTags.values = []
              this.dynamicTags.ids = []
              this.ruleForm.DEPART_IDS = []
              res.data.depart_list.forEach(item => {
                this.dynamicTags.values.push(item.NAME)
                this.dynamicTags.ids.push(item.ID)
                this.ruleForm.DEPART_IDS.push(item.ID)
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
