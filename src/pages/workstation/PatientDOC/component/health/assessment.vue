<template>
  <el-dialog :visible.sync="popshow" width='750px' class='custom'>
    <div slot='title'>
      <span class="el-dialog__title" >病人评估</span>
    </div>
    <div  class="timeinput">
      评估时间：
      <el-date-picker
        v-model="date"
        type="datetime"
        value-format='yyyy-MM-dd	HH:mm'
        format="yyyy-MM-dd	HH:mm"
        placeholder="选择日期时间">
      </el-date-picker>
      评估人：
      <el-input v-model="rocName" placeholder="请输入内容"></el-input>
    </div>
    <p class="study">病人学习能力评估</p>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="400px" label-position="left" class="formda">
      <el-form-item label="照顾者" prop="CAREGIVERS">
        <el-select v-model="ruleForm.CAREGIVERS" placeholder="请选择" >
          <el-option
            v-for="item in optCar"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Translation Needed 需翻译" prop="NEED_TRANSLATE">
        <el-select v-model="ruleForm.NEED_TRANSLATE" placeholder="请选择">
          <el-option
            v-for="item in optNee"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Psychological 心理" prop="MENTALITY">
        <el-select v-model="ruleForm.MENTALITY" placeholder="请选择" >
          <el-option
            v-for="item in optMen"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Literacy 识字" prop="LITERACY">
        <el-select v-model="ruleForm.LITERACY" placeholder="请选择" >
          <el-option label="不识字" value="不识字"></el-option>
          <el-option label="部分识字" value="部分识字"></el-option>
          <el-option label="识字能力正常" value="识字能力正常"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Memory Loss 失忆" prop="AMNESIA">
        <el-select v-model="ruleForm.AMNESIA" placeholder="请选择" >
          <el-option label="未失忆" value="未失忆"></el-option>
          <el-option label="局部性失忆" value="局部性失忆"></el-option>
          <el-option label="选择性失忆" value="选择性失忆"></el-option>
          <el-option label="连续性失忆" value="连续性失忆"></el-option>
          <el-option label="全盘性失忆" value="全盘性失忆"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Religious/Cultural Practices 宗教/文化习俗" prop="RELIGION">
        <el-select v-model="ruleForm.RELIGION" placeholder="请选择" >
          <el-option label="无" value="无"></el-option>
          <el-option label="佛教" value="佛教"></el-option>
          <el-option label="天主教" value="天主教"></el-option>
          <el-option label="基督教" value="基督教"></el-option>
          <el-option label="伊斯兰教" value="伊斯兰教"></el-option>
          <el-option label="印度教" value="印度教"></el-option>
          <el-option label="犹太教" value="犹太教"></el-option>
          <el-option label="藏教" value="藏教"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Hearing 听力" prop="HEARING">
        <el-select v-model="ruleForm.HEARING" placeholder="请选择" >
          <el-option label="正常" value="正常"></el-option>
          <el-option label="听力下降" value="听力下降"></el-option>
          <el-option label="先天性耳聋" value="先天性耳聋"></el-option>
          <el-option label="后天性耳聋" value="后天性耳聋"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Vision 视力" required >
        <el-col :span="12">
          <el-form-item label="左眼" prop="LEFT_VISION" label-width="60px" >
            <el-select v-model="ruleForm.LEFT_VISION" placeholder="请选择" >
              <el-option label="左眼正常" value="左眼正常"></el-option>
              <el-option label="视力下降" value="视力下降"></el-option>
              <el-option label="视野缺损" value="视野缺损"></el-option>
              <el-option label="失明" value="失明"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="右眼" prop="RIGHT_VISION" label-width="60px">
            <el-select v-model="ruleForm.RIGHT_VISION" placeholder="请选择" >
              <el-option label="右眼正常" value="右眼正常"></el-option>
              <el-option label="视力下降" value="视力下降"></el-option>
              <el-option label="视野缺损" value="视野缺损"></el-option>
              <el-option label="失明" value="失明"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Speach 语言表达" prop="LANGUAGE_EXPRESS" >
      <el-select v-model="ruleForm.LANGUAGE_EXPRESS" placeholder="请选择" >
        <el-option label="流利" value="流利"></el-option>
        <el-option label="沟通困难" value="沟通困难"></el-option>
        <el-option label="失语" value="失语"></el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="Caregiver not available 无照顾者" prop="IS_CAREGIVERS">
        <el-select v-model="ruleForm.IS_CAREGIVERS" placeholder="请选择" >
          <el-option label="被遗弃" value="被遗弃"></el-option>
          <el-option label="拒绝照顾" value="拒绝照顾"></el-option>
          <el-option label=" " value=" "></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Other 其它" >
        <el-select v-model="ruleForm.OTHER" placeholder="请选择" >
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>


    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="popshow = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
  </el-dialog>

</template>
<script>
    export default{
      props: ['NAME','INPATIENT_NUMBER'],
        data(){
            return {
              date : '',
              rocName : '',
              popshow : false,
              ruleForm : {},
              rules: {
                CAREGIVERS: [{required: true, message: '请选择', trigger: 'change'}],
                NEED_TRANSLATE: [{required: true, message: '请选择', trigger: 'change'}],
                MENTALITY: [{required: true, message: '请选择', trigger: 'change'}],
                LITERACY: [{required: true, message: '请选择', trigger: 'change'}],
                AMNESIA: [{required: true, message: '请选择', trigger: 'change'}],
                RELIGION: [{required: true, message: '请选择', trigger: 'change'}],
                HEARING: [{required: true, message: '请选择', trigger: 'change'}],
                LEFT_VISION: [{required: true, message: '请选择', trigger: 'change'}],
                RIGHT_VISION: [{required: true, message: '请选择', trigger: 'change'}],
                LANGUAGE_EXPRESS: [{required: true, message: '请选择', trigger: 'change'}],
                IS_CAREGIVERS: [{required: true, message: '请选择', trigger: 'change'}],
              },
              optCar:[
                {value: '本人', label: '本人'},
                {value: '配偶', label: '配偶'},
                {value: '父亲', label: '父亲'},
                {value: '母亲', label: '母亲'},
                {value: '哥哥', label: '哥哥'},
                {value: '姐姐', label: '姐姐'},
                {value: '弟弟', label: '弟弟'},
                {value: '妹妹', label: '妹妹'},
                {value: '儿子', label: '儿子'},
                {value: '女儿', label: '女儿'},
                {value: '女婿', label: '女婿'},
                {value: '儿媳', label: '儿媳'},
                {value: '看护', label: '看护'},
                {value: '叔叔', label: '叔叔'},
                {value: '婶婶', label: '婶婶'},
                {value: '姑姑', label: '姑姑'},
                {value: '姑父', label: '姑父'},
                {value: '舅舅', label: '舅舅'},
                {value: '舅母', label: '舅母'},
                {value: '姨妈', label: '姨妈'},
                {value: '姨夫', label: '姨夫'},
                {value: '侄子', label: '侄子'},
                {value: '侄女', label: '侄女'},
                {value: '外甥', label: '外甥'},
                {value: '外甥女', label: '外甥女'},
                {value: '孙子', label: '孙子'},
                {value: '孙女', label: '孙女'},
                {value: '外孙', label: '外孙'},
                {value: '外孙女', label: '外孙女'},
                {value: '婆婆', label: '婆婆'},
                {value: '爷爷', label: '爷爷'},
                {value: '奶奶', label: '奶奶'},
                {value: '外公', label: '外公'},
                {value: '外婆', label: '外婆'},
              ],
              optNee:[
                {value: '不需要翻译', label: '不需要翻译'},
                {value: '方言', label: '方言'},
                {value: '粤语', label: '粤语'},
                {value: '闽南语', label: '闽南语'},
                {value: '藏语', label: '藏语'},
                {value: '维吾尔族语', label: '维吾尔族语'},
                {value: '英语', label: '英语'},
                {value: '法语', label: '法语'},
                {value: '德语', label: '德语'},
                {value: '日语', label: '日语'},
                {value: '韩语', label: '韩语'},
                {value: '俄语', label: '俄语'},
                {value: '意大利语', label: '意大利语'},
                {value: '西班牙语', label: '西班牙语'},
                {value: '葡萄牙语', label: '葡萄牙语'},
                {value: '阿拉伯语', label: '阿拉伯语'},
                {value: '希腊语', label: '希腊语'},
                {value: '其他', label: '其他'},
              ],
              optMen:[
                {value: '抑郁症', label: '抑郁症'},
                {value: '焦虑症', label: '焦虑症'},
                {value: '恐怖症', label: '恐怖症'},
                {value: '强迫症', label: '强迫症'},
                {value: '神经性厌食症', label: '神经性厌食症'},
                {value: '严重失眠', label: '严重失眠'},
                {value: '多动症', label: '多动症'},
                {value: '学习困难', label: '学习困难'},
              ],
            }
        },

      methods : {
        dataTime(){
          let date = new Date()
          let y = date.getFullYear()
          let m = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0'+ (date.getMonth() + 1)
          let d = date.getDate()
          d = d < 10 ? ('0' + d) : d;
          let h = date.getHours();
          h = h < 10 ? ('0' + h) : h;
          let mi = date.getMinutes();
          mi = mi < 10 ? ('0' + mi) : mi;
          let se = date.getSeconds();
          se = se < 10 ? ('0' + se) : se;
          this.str = y + '-' + m + '-' + d+ " " + h + ":" + mi
          this.date =  this.str
          this.rocName =  this.NAME

        },
        getData(){

          /*this.date = this.valdate*/
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.post('datacenter/education/assesspatient', {
                ...this.ruleForm,
                NURSE_ID:this.$store.state.userinfo.admin_id,
                INPATIENT_NUMBER:this.INPATIENT_NUMBER,
                ASSESS_TIME:this.date,
                APPRAISER:this.rocName,
            },res =>{
                console.log(res)
                if(res.data.status=="201"){
                  this.popshow = false
                  this.$parent.getData()
                  this.$message({message: res.data.message, duration:1000, type: 'success'})
                }
              })
            } else {
              this.$message({type: 'warning', message: '表单未填完整!'});
              return false;
        }
        });
        },

      },

      mounted(){
        this.$nextTick(()=>{
        //this.getData()
        this.dataTime()

      })
      },

    }
</script>
<style scoped  lang='stylus'>
  .timeinput >>> .el-input
    width 200px
  .study
    font-size 18px
    color #00B3DC
    line-height 24px
    padding 20px 0
  .formda
    .el-form-item
      margin-bottom 16px
      .el-select
        width 100%
      .el-form-item
        margin-bottom 0
</style>
