<template>
  <el-dialog :visible.sync="popshow" width='1200px' class='custom' :title="title" >
    <div slot='title'>
      <span class="el-dialog__title" >{{title}}</span>
    </div>
    <div>
      <div class="left sty" >
        <el-input v-model="filterText" placeholder="请输入内容"></el-input>
        <el-tree :data="department" show-checkbox node-key="id" @check-change="handleCheckChange" ref="tree" :filter-node-method="filterNode" :props="defaultProps"></el-tree>
      </div>
      <div class="mot sty">
        <p class="title">经评估后根据患者需求选择以下项目:</p>

        <el-form :model="ruleForm" ref="ruleForm" label-width="70px" label-position="left">
          <el-form-item label="教育对象" prop="EDUCATION_OBJ">
            <el-checkbox-group v-model="ruleForm.EDUCATION_OBJ" :disabled="title == '查看宣教'">
              <el-checkbox label="家属" name="type"></el-checkbox>
              <el-checkbox label="病人" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="教育时机" prop="EDUCATION_OPP">
            <el-checkbox-group v-model="ruleForm.EDUCATION_OPP" :disabled="title == '查看宣教'">
              <el-checkbox label="首次宣教" name="type"></el-checkbox>
              <el-checkbox label="再次宣教" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="教育项目" prop="EDUCATION_PROJECT">
            <el-checkbox-group v-model="ruleForm.EDUCATION_PROJECT" :disabled="title == '查看宣教'">
              <el-checkbox :label="item" v-for='(item,i) of EDUCATION_PROJECT' :key='i'></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="教育方法" prop="EDUCATION_METHOD">
            <el-checkbox-group v-model="ruleForm.EDUCATION_METHOD" :disabled="title == '查看宣教'">
              <el-checkbox :label="item" v-for="(item,index) of EDUCATION_METHOD" :key='index'></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="教育时间" prop="EDUCATION_TIME" >
            <el-date-picker v-model="ruleForm.EDUCATION_TIME" type="datetime" value-format='yyyy-MM-dd	HH:mm' format="yyyy-MM-dd	HH:mm" placeholder="选择日期时间" :disabled="title == '查看宣教'"></el-date-picker>
          </el-form-item>
          <el-form-item label="教育内容" prop="EDUCATION_CONTENT">
             <textarea maxlength="1000"  @input="descInput" v-model="ruleForm.EDUCATION_CONTENT" class="textarea" :disabled="title == '查看宣教'"/>
            <em style="position: absolute;right: 25px;bottom: 4px;">{{ remnant }}/1000</em>
          </el-form-item>

          <el-form-item label="效果评价"  >
            <el-checkbox-group :disabled="title == '新增宣教' || title == '查看宣教'" v-model="ruleForm.EFFECT_EVALUATE">
              <el-checkbox :label="item" v-for="(item,index) of EFFECT_EVALUATE" :key='index'></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-col :span="15" class="col">
            <el-form-item label="评估时间" >
              <el-date-picker type="datetime" v-model="ruleForm.ASSESS_TIME" value-format='yyyy-MM-dd	HH:mm' format="yyyy-MM-dd	HH:mm" placeholder="选择日期时间" :disabled="title == '新增宣教' || title == '查看宣教'"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="9"  class="col">
            <el-form-item label="评估人" label-width="70px">
              <el-input  placeholder="请输入内容" v-model="ruleForm.ASSESSER" :disabled="title == '新增宣教' || title == '查看宣教'"></el-input>
            </el-form-item>
          </el-col>

        </el-form>

      </div>
      <div class="right sty" v-if="treeTitle.length!=0">
        <div  v-for="(item,index) in treeTitle">
          <p>{{item.TITLE}}</p>
          <span>{{item.CONTENT}}</span>
        </div>
      </div>
    </div>
     <span slot="footer" class="dialog-footer">
        <el-button @click="popshow = false">取 消</el-button>
        <el-button type="primary" @click="save" v-if="title != '查看宣教'">确 定</el-button>
      </span>
  </el-dialog>
</template>
<script>
    export default{

      props: ['INPATIENT_NUMBER','list_item'],

      data(){
          return {
            popshow : false,
            title:'',
            ruleForm:{
              EDUCATION_OBJ : [],
              EDUCATION_OPP : [],
              EDUCATION_PROJECT : [],
              EDUCATION_METHOD : [],
              EDUCATION_TIME : '',
              EDUCATION_CONTENT : '',
              EFFECT_EVALUATE: [],
              ASSESS_TIME : '',
              ASSESSER: '',
            },
            remnant:1000,
            defaultProps: {
              children: 'TITLES',
              label: 'NAME'
            },
            department : [],
            filterText : '',
            arrTreech : [],
            treeTitle : [],
            EDUCATION_PROJECT : ['疾病','康复','药物','出院','入院','宗教','心理','介入','疼痛护理','设备','其他'],
            EDUCATION_METHOD : ['书写/印刷','口述/论述','示范','电子推送'],
            EFFECT_EVALUATE : ['口述理解','回演示','需强化']
          }
      },

      methods: {
        filterNode(value, data) {
          if (!value) return true;
          return data.NAME.indexOf(value) !== -1;
        },
        handleCheckChange(data, checked, indeterminate) {
          let arr_nurse = this.$refs.tree.getCheckedNodes() //树形选中
          let treeArr = []
          arr_nurse.forEach(item=>{
            treeArr.push(item.ID)
          })
          this.arrTreech= treeArr.filter(function(ele){
            if(ele != undefined) return true
            return false
          })
          this.treeTitles()
        },
        treeTitles(){
          this.treeTitle = []
          if(this.arrTreech.length != 0){
            this.getSer('datacenter/education/getinform',{id:this.arrTreech},res => {
              if(res.status < 400){
                this.treeTitle = res.data.items
                console.log("内容",this.treeTitle)
              }
          })
          }
        },
        getData(){
          this.getSer('datacenter/education/depaofinfom',{},res => {
            if(res.status < 400){
              this.department = res.data.items
              console.log("222222",this.department)
            }
          })
        },
        valueDate(){

          if(this.ruleForm.EDUCATION_OBJ.length == 0){
            this.$message({type: 'warning', message: '未填写教育对象!'});return false
          }
          if(this.ruleForm.EDUCATION_OPP.length == 0){
            this.$message({type: 'warning', message: '未填写教育时机!'});return false
          }
          if(this.ruleForm.EDUCATION_PROJECT.length == 0){
            this.$message({type: 'warning', message: '未填写教育项目!'});return false
          }
          if(this.ruleForm.EDUCATION_METHOD.length == 0){
            this.$message({type: 'warning', message: '未填写教育方法!'});return false
          }
          if(!this.ruleForm.EDUCATION_TIME){
            this.$message({type: 'warning', message: '未填写教育时间!'});return false
          }
          if(!this.ruleForm.EDUCATION_CONTENT.trim()){
            this.$message({type: 'warning', message: '未填写教育内容!'});return false
          }

          if(this.title == "编辑宣教"){
            if(this.ruleForm.EFFECT_EVALUATE.length == 0){
              this.$message({type: 'warning', message: '未填写效果评价!'});return false
            }
            if(!this.ruleForm.ASSESS_TIME){
              this.$message({type: 'warning', message: '未填写评估时间!'});return false
            }
            if(!this.ruleForm.ASSESSER || !this.ruleForm.ASSESSER.trim()){
              this.$message({type: 'warning', message: '请输入评估人!'});return false
            }
          }
          return true
        },
        init(){
            this.ruleForm.EDUCATION_OBJ = []
            this.ruleForm.EDUCATION_OPP = []
            this.ruleForm.EDUCATION_PROJECT = []
            this.ruleForm.EDUCATION_METHOD = []
            this.ruleForm.EDUCATION_TIME = ''
            this.ruleForm.EDUCATION_CONTENT = ''
            this.ruleForm.EFFECT_EVALUATE = []
            this.ruleForm.ASSESS_TIME = ''
            this.ruleForm.ASSESSER = ''
        },
        save() {
          if (this.valueDate()) {
            var obj = {
              id:this.ruleForm.ID,
              INPATIENT_NUMBER : this.INPATIENT_NUMBER,
              NURSE_ID : this.$store.state.userinfo.admin_id,
              EDUCATION_OBJ : JSON.stringify(this.ruleForm.EDUCATION_OBJ),
              EDUCATION_OPP : JSON.stringify(this.ruleForm.EDUCATION_OPP),
              EDUCATION_PROJECT : JSON.stringify(this.ruleForm.EDUCATION_PROJECT),
              EDUCATION_METHOD : JSON.stringify(this.ruleForm.EDUCATION_METHOD),
              EDUCATION_TIME : this.ruleForm.EDUCATION_TIME,
              EDUCATION_CONTENT : this.ruleForm.EDUCATION_CONTENT,
              EFFECT_EVALUATE : JSON.stringify(this.ruleForm.EFFECT_EVALUATE),
              ASSESS_TIME : this.ruleForm.ASSESS_TIME,
              ASSESSER : this.ruleForm.ASSESSER,
            }
            if(this.title == "新增宣教"){
              this.post('datacenter/education', obj , res => {
                if (res.data.status == "201") {
                  this.$message({message: res.data.message, duration: 1000, type: 'success'})
                  this.popshow = false
                  this.title = ''
                  this.$parent.getData()
                }
              })
            }else if( this.title == "编辑宣教"){
              this._put('datacenter/education/'+this.ruleForm.ID, obj,res => {
                if (res.data.status == "201") {
                  this.$message({message: res.data.message, duration: 1000, type: 'success'})
                  this.popshow = false
                  this.title = ''
                  this.$parent.getData()
                }
              })
            }
          }
        },

        descInput(){
          this.remnant = 1000 - this.ruleForm.EDUCATION_CONTENT.length
        },
      },

      created(){
        this.$nextTick(()=>{
          this.getData()
        })
      },

      watch: {
        filterText(val) {
          this.$refs.tree.filter(val);
        },
        'title' : function (to) {
            if(to == "新增宣教"){
              this.init()
            }else{
              this.ruleForm = this.$parent.list_item
            }
        }
      },

    }
</script>
<style scoped  lang='stylus'>
  .sty
    display inline-block
    vertical-align top
    margin-right -4px
    >>>.el-checkbox__inner:hover
      border-color #00cacf
    >>>.is-checked
      .el-checkbox__inner
        background-color #00cacf
        border-color #00cacf
      .el-checkbox__label
        color #00cacf
    >>>.is-indeterminate
      .el-checkbox__inner
        background-color #00cacf
        border-color #00cacf
    .el-date-editor
      margin-left 30px
  .left
    width 200px
    padding 10px
    margin-right 30px
    border 1px solid #D8E3E7
  .mot
    width 520px
    padding 0 10px 10px
    color #2B3A50
    .title
      font-size 16px
      color #00B3DC
      line-height 24px
      padding-bottom 10px
    span
      padding-right 20px
      width 66px
      display inline-block
      vertical-align top
    .textarea
      width 400px
      height 200px
      background #F9F9FB
      border 1px solid #D8E3E7
      max-width 400px
      min-height 100px
      min-width 400px
      border-radius 4px
      padding 5px
      margin 10px 0 0 30px
    .el-checkbox-group
      display inline-block
      .el-checkbox
        margin-left 30px
    .col .el-form-item
      >>>.el-form-item__label
        padding-top 4px
    .el-form .el-form-item
      margin-bottom 8px
      >>>.el-form-item__label
        line-height 32px
      >>>.el-form-item__content
        line-height 32px
        .el-form-item__error
          bottom -4px
          top inherit
        .el-checkbox
          width 80px
  .right
    width 300px
    padding 10px
    border 1px solid #D8E3E7
    max-height 600px
    overflow auto
  &>>> ::-webkit-scrollbar
    height 8px
    width 8px
  &>>>  ::-webkit-scrollbar-track
    background-color #dff4f9
  &>>>  ::-webkit-scrollbar-thumb
    background-color #00B3DC
    border-radius 10px
  p
    font-size 14px
    color #00B3DC
    line-height 30px
  span
    font-size 14px
</style>
