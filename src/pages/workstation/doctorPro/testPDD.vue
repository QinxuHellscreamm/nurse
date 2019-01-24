<template>
  <el-dialog :visible.sync="popshow" width='580px' class='custom'>
    <div slot='title'>
      <span class="el-dialog__title" >{{title}}</span>
    </div>
    <div class="min" v-if="title=='执行PPD皮试'">
      <div style="margin-bottom: 20px;">
        <span style="margin-right: 10px;">试验类型</span>
        <el-radio-group v-model="radio">
          <el-radio :label="1">皮内试验</el-radio>
          <el-radio :label="2">挑刺试验</el-radio>
          <el-radio :label="3">斑贴试验</el-radio>
        </el-radio-group>
      </div>
      <div style="margin-bottom: 20px;">
        <span style="margin-right: 10px;">开始时间</span>
        <el-date-picker
          v-model="starTime"
          type="datetime"
          value-format='yyyy-MM-dd	HH:mm'
          format="yyyy-MM-dd	HH:mm"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div style="text-align: right;">
        <el-button @click="popshow = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </div>
    <div class="min" v-else>
      <div style="margin-bottom: 20px;">
        <span style="margin-right: 10px;">试验结果</span>
        <el-select v-model="resultVal" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div style="margin-bottom: 20px;" class="startime">
        <span style="margin-right: 10px;">开始时间</span>
        <el-date-picker
          v-model="starTime"
          type="datetime"
          value-format='yyyy-MM-dd	HH:mm'
          format="yyyy-MM-dd	HH:mm"
          placeholder="选择日期时间">
        </el-date-picker>
        <span style="margin-right: 10px;">结束时间</span>
        <el-date-picker
          v-model="starTime"
          type="datetime"
          value-format='yyyy-MM-dd	HH:mm'
          format="yyyy-MM-dd	HH:mm"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div style="margin-bottom: 20px;" class="nurse">
        <span style="margin-right: 10px;">执行护士</span>
        <el-input v-model="execNurse" disabled></el-input>
        <span style="margin-right: 10px;">校对护士</span>
        <el-input v-model="prooNurse"></el-input>
      </div>
      <div style="margin-bottom: 20px;" class="textarea">
        <span style="margin-right: 10px;display: inline-block;
    line-height: 32px;
    width: 56px;
    vertical-align: top;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</span>
        <el-input
          type="textarea"
          :rows="1"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
      </div>
      <div style="text-align: right;">
        <el-button @click="popshow = false">取 消</el-button>
        <el-button type="primary" @click="testResult">确 定</el-button>
      </div>

      <el-dialog title="提示" :visible.sync="dialogVisible" width="400px" append-to-body top="200px">
        <span>后台消息:PPD试验时间不足,不允许录入PPD结果</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-dialog>
</template>
<script>
    export default{
        data(){
            return {
              title:'',
              popshow : false,
              radio:1,
              starTime: '',
              options: [
                {value: '1', label: '阴性'},
                {value: '2', label: '免试'},
                {value: '3', label: '已核对'},
                {value: '4', label: '弱阳性(+)'},
                {value: '5', label: '阳性(++)'},
                {value: '6', label: '强阳性(+++)'}
              ],
              resultVal: '1',
              execNurse: '',
              prooNurse: '',
              textarea: '',
              dialogVisible: false,

            }
        },

      methods: {
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
          this.str = y + '-' + m + '-' + d  + ' ' + h + ':' + mi + ':' + se
          this.starTime =  this.str
        },
        submitForm(formName) {

        },
        testResult(){
          this.dialogVisible = true

        },

      },

      mounted(){
        this.$nextTick(()=>{
          this.dataTime()
      })
      },

    }
</script>
<style scoped lang='stylus'>
  .startime .el-date-editor.el-input
    width 196px
  .nurse .el-input
    width 196px
  .textarea .el-textarea
    width 466px
</style>
