<template>
  <el-dialog :visible.sync="popshow" width='600px' class='custom' :title="title" >
    <div slot='title'>
      <span class="el-dialog__title" >{{title}}</span>
    </div>
    <div class="min">
      <div class="mot sty">
        <p class="title">经评估后根据患者需求选择以下项目:</p>
        <el-form :model="ruleForm"  label-width="100px" class="demo-ruleForm" label-position="left">
          <el-form-item label="教育对象" >
            <el-checkbox-group v-model="ruleForm.EDUCATION_OBJ" disabled>
              <el-checkbox label="家属" name="type"></el-checkbox>
              <el-checkbox label="病人" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="教育时机">
            <el-checkbox-group v-model="ruleForm.EDUCATION_OPP" disabled>
              <el-checkbox label="首次宣教" name="type"></el-checkbox>
              <el-checkbox label="再次宣教" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="教育项目">
            <el-checkbox-group v-model="ruleForm.EDUCATION_PROJECT" disabled>
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
          <el-form-item label="教育方法">
            <el-checkbox-group v-model="ruleForm.EDUCATION_METHOD" disabled>
              <el-checkbox label="书写/印刷"></el-checkbox>
              <el-checkbox label="口述/论述"></el-checkbox>
              <el-checkbox label="示范"></el-checkbox>
              <el-checkbox label="电子推送"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="教育时间" >
            <el-date-picker
              disabled
              v-model="ruleForm.EDUCATION_TIME"
              type="datetime"
              value-format='yyyy-MM-dd	HH:mm'
              format="yyyy-MM-dd	HH:mm"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="教育内容" >
             <textarea disabled maxlength="1000"  @input="descInput" v-model="ruleForm.EDUCATION_CONTENT"  style="width: 400px;height: 200px;background: #F9F9FB;
border: 1px solid #D8E3E7;max-width: 400px;min-height: 100px;min-width: 400px;
border-radius: 4px;padding: 5px;"/>
            <em style="position: absolute;right: 25px;bottom: 4px;">{{remnant}}/1000</em>
          </el-form-item>
          <el-form-item label="效果评价" >
            <el-checkbox-group v-model="ruleForm.EFFECT_EVALUATE" disabled>
              <el-checkbox label="口述理解"></el-checkbox>
              <el-checkbox label="回演示"></el-checkbox>
              <el-checkbox label="需强化"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-col :span="15">
            <el-form-item label="评估时间"  >
              <el-date-picker
                disabled
                v-model="ruleForm.ASSESS_TIME"
                type="datetime"
                value-format='yyyy-MM-dd	HH:mm'
                format="yyyy-MM-dd	HH:mm"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="评估人"  label-width="70px">
              <el-input v-model="ruleForm.ASSESSER" placeholder="请输入内容" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </div>
     <span slot="footer" class="dialog-footer">
        <el-button @click="popshow = false">取 消</el-button>
      </span>
  </el-dialog>
</template>
<script>
    export default{
        data(){
            return {
              popshow : false,
              title:'',
              ruleForm:{},
              remnant:1000,
            }
        },

      methods: {
        descInput(){
          var txtVal = this.ruleForm.desc.length;
          this.remnant = 1000 - txtVal;
        },
        seeDtae(row){
          this.ruleForm = row
          if(this.ruleForm.EFFECT_EVALUATE ==null){
            this.ruleForm.EFFECT_EVALUATE = []
          }
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
    /*ul li
      padding-bottom 14px
      .el-checkbox-group .el-checkbox
        width 80px*/
  .right
    width 175px
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

</style>
