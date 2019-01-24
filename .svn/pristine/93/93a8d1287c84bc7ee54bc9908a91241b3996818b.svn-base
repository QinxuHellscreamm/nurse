<template>
  <el-dialog :visible.sync="popshow" width='1120px' class='custom' :title="title" >
    <div slot='title'>
      <span class="el-dialog__title" >{{title}}</span>
    </div>
    <div class="min">
      <div class="left sty" >
        <el-input v-model="filterText" placeholder="请输入内容"></el-input>
        <el-tree
          :data="department"
          show-checkbox
          node-key="id"
          @check-change="handleCheckChange"
          ref="tree"
          :filter-node-method="filterNode"
          :props="defaultProps">
        </el-tree>

      </div>
      <div class="mot sty">
        <p class="title">经评估后根据患者需求选择以下项目:</p>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
          <el-form-item label="教育对象" prop="EDUCATION_OBJ">
            <el-checkbox-group v-model="ruleForm.EDUCATION_OBJ">
              <el-checkbox label="家属" name="type"></el-checkbox>
              <el-checkbox label="病人" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="教育时机" prop="EDUCATION_OPP">
            <el-checkbox-group v-model="ruleForm.EDUCATION_OPP">
              <el-checkbox label="首次宣教" name="type"></el-checkbox>
              <el-checkbox label="再次宣教" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="教育项目" prop="EDUCATION_PROJECT">
            <el-checkbox-group v-model="ruleForm.EDUCATION_PROJECT">
              <el-checkbox label="疾病"></el-checkbox>
              <el-checkbox label="康复"></el-checkbox>
              <el-checkbox label="药物"></el-checkbox>
              <el-checkbox label="出院"></el-checkbox><br>
              <el-checkbox label="入院"></el-checkbox>
              <el-checkbox label="宗教"></el-checkbox>
              <el-checkbox label="心理"></el-checkbox>
              <el-checkbox label="介入"></el-checkbox><br>
              <el-checkbox label="疼痛护理"></el-checkbox>
              <el-checkbox label="设备"></el-checkbox>
              <el-checkbox label="其他"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="教育方法" prop="EDUCATION_METHOD">
            <el-checkbox-group v-model="ruleForm.EDUCATION_METHOD">
              <el-checkbox label="书写/印刷"></el-checkbox>
              <el-checkbox label="口述/论述"></el-checkbox>
              <el-checkbox label="示范"></el-checkbox>
              <el-checkbox label="电子推送"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="教育时间" prop="EDUCATION_TIME">
            <el-date-picker
              v-model="ruleForm.EDUCATION_TIME"
              type="datetime"
              value-format='yyyy-MM-dd	HH:mm'
              format="yyyy-MM-dd	HH:mm"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="教育内容" prop="EDUCATION_CONTENT">
             <textarea maxlength="1000"  @input="descInput" v-model="ruleForm.EDUCATION_CONTENT"  class="textarea"/>
            <em style="position: absolute;right: 25px;bottom: 4px;">{{remnant}}/1000</em>
          </el-form-item>

          <el-form-item label="效果评价" prop="EFFECT_EVALUATE" >
            <el-checkbox-group v-model="ruleForm.EFFECT_EVALUATE">
              <el-checkbox label="口述理解"></el-checkbox>
              <el-checkbox label="回演示"></el-checkbox>
              <el-checkbox label="需强化"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-col :span="15">
            <el-form-item label="评估时间" prop="ASSESS_TIME" >
              <el-date-picker
                v-model="ruleForm.ASSESS_TIME"
                type="datetime"
                value-format='yyyy-MM-dd	HH:mm'
                format="yyyy-MM-dd	HH:mm"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="评估人" prop="ASSESSER" label-width="70px">
              <el-input v-model="ruleForm.ASSESSER" placeholder="请输入内容"></el-input>
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
        <el-button type="primary" @click="addNewGrant('ruleForm')">确 定</el-button>
      </span>
  </el-dialog>
</template>
<script>
    export default{


        data(){
            return {
              popshow: false,
              title: '',
              ruleForm: {
                EDUCATION_OBJ: [],
                EDUCATION_OPP: [],
                EDUCATION_PROJECT: [],
                EDUCATION_METHOD: [],
                EDUCATION_TIME: '',
                EDUCATION_CONTENT: '',
                EFFECT_EVALUATE: [],
                ASSESS_TIME: '',
                ASSESSER: '',

              },

              remnant: 1000,
              defaultProps: {
                children: 'TITLES',
                label: 'NAME'
              },
              department: [],
              filterText: '',
              arrTreech: [],
              treeTitle: [],
              rules: {
                EDUCATION_OBJ: [{type: 'array', required: true, message: '请至少选择一个', trigger: 'change'}],
                EDUCATION_OPP: [{type: 'array', required: true, message: '请至少选择一个', trigger: 'change'}],
                EDUCATION_PROJECT: [{type: 'array', required: true, message: '请至少选择一个', trigger: 'change'}],
                EDUCATION_METHOD: [{type: 'array', required: true, message: '请至少选择一个', trigger: 'change'}],
                EFFECT_EVALUATE: [{type: 'array', required: true, message: '请至少选择一个', trigger: 'change'}],
                EDUCATION_TIME: [{type: 'string', required: true, message: ' ', trigger: 'change'}],
                EDUCATION_CONTENT: [{required: true, message: '请填写教育内容', trigger: 'blur'}],
                ASSESSER: [{required: true, message: ' ', trigger: 'blur'}],
                ASSESS_TIME: [{type: 'string', required: true, message: ' ', trigger: 'change'}],

              },
            }
        },

      watch: {
        filterText(val) {
          this.$refs.tree.filter(val);
        },
        'popshow'(val, oldVal){
          if(val == false){
            this.$parent.getData()
          }
        },
      },

      methods: {
        filterNode(value, data) {
          if (!value) return true;
          return data.NAME.indexOf(value) !== -1;
        },
        handleCheckChange(data, checked, indeterminate) {
          let arr_nurse = this.$refs.tree.getCheckedNodes() //树形选中
          let treeArr = []
          console.log("树形选中",arr_nurse);
          arr_nurse.forEach(item=>{
            treeArr.push(item.ID)
        })
          this.arrTreech= treeArr.filter(function(ele){
            if(ele!=undefined){
              return true;
            }
            return false;
          })
          this.treeTitles()
        },
        treeTitles(){
          this.treeTitle = ''
          if(this.arrTreech.length != 0){
            this.getSer('datacenter/education/getinform',{id:this.arrTreech},res => {
              console.log("内容",res);
            if(res.status < 400){
              this.treeTitle = res.data.items
              console.log("内容",this.treeTitle);
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
        addNewGrant(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this._put('datacenter/education/'+this.ruleForm.ID, {
               // NURSE_ID:this.$store.state.userinfo.admin_id,
                id:this.ruleForm.ID,
                EDUCATION_OBJ:JSON.stringify(this.ruleForm.EDUCATION_OBJ),
                EDUCATION_OPP:JSON.stringify(this.ruleForm.EDUCATION_OPP),
                EDUCATION_PROJECT:JSON.stringify(this.ruleForm.EDUCATION_PROJECT),
                EDUCATION_METHOD:JSON.stringify(this.ruleForm.EDUCATION_METHOD),
                EFFECT_EVALUATE:JSON.stringify(this.ruleForm.EFFECT_EVALUATE),
                EDUCATION_TIME:this.ruleForm.EDUCATION_TIME,
                EDUCATION_CONTENT:this.ruleForm.EDUCATION_CONTENT,
                ASSESS_TIME:this.ruleForm.ASSESS_TIME,
                ASSESSER:this.ruleForm.ASSESSER,
              },res => {
                console.log(res)
              if (res.data.status == "201") {
                this.$message({
                  message: res.data.message,
                  duration: 1000,
                  type: 'success'
                });
                this.popshow = false
                this.$parent.getData()
              }
            })
            } else {
              this.$message({type: 'warning', message: '未填完整!'});
          return false;
        }
        });
        },

        descInput(){
          var txtVal = this.ruleForm.EDUCATION_CONTENT.length;
          this.remnant = 1000 - txtVal;
        },

        editDtae(row){
          console.log("saas",row)
          this.ruleForm = row
          if(this.ruleForm.EFFECT_EVALUATE ==null || this.ruleForm.EFFECT_EVALUATE ==''){
            this.ruleForm.EFFECT_EVALUATE = []
          }

          this.getData()
        },

      },

    }
</script>
<style scoped  lang='stylus'>
.min
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
  .left
    width 200px
    padding 10px
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
    .el-checkbox-group
      display inline-block
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
