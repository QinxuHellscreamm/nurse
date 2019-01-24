<template>
  <div>
    <el-button @click="init" type='success'>新增</el-button>
    <el-dialog :title="initTitle" :visible.sync="dialogVisible" class='dialog-class'>
      <el-form ref="form" :model="form">
        <el-form-item>
          <label>名　　称</label>
          <el-input v-model="form.NAME"></el-input>
        </el-form-item>
        <el-form-item>
          <label>编　　码</label>
          <el-input v-model="form.CODE"></el-input>
        </el-form-item>
        <el-form-item>
          <label>父　　类</label>
          <el-select v-model="form.PARENT_ID" placeholder="请选择">
            <el-option v-for="(item,index) of allList"  :label="item.NAME" :value="item.ID" :key=index></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <label>类　　型</label>
          <el-select v-model="form.INPUT_TYPE_CODE" placeholder="请选择" @change='change'>
            <el-option v-for="(item,index) of options"  :label="item.label" :value="item.value" :key=index></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if='form.INPUT_TYPE_CODE == "03" || form.INPUT_TYPE_CODE == "04"'>
          <div>选项内容</div>
          <div style="text-indent: 1em;background-color: #A5DDEA;line-height: 32px;margin: 0 1em;">输入选项值（每行一个）</div>
          <el-input type="textarea" v-model="opation" style="margin-left: 1em"></el-input>
        </el-form-item>
        <el-form-item v-if='form.INPUT_TYPE_CODE == "02"|| form.INPUT_TYPE_CODE == "04" '>
          <label>取值范围</label>
          <el-input v-model="form.VALIDATION_RULE.min" style="width: 50px"></el-input><span style="margin: 0 12px">—</span>
          <el-input v-model="form.VALIDATION_RULE.max" style="width: 50px"></el-input><span style="margin: 0 15px">小数位数</span>
          <el-input v-model="form.VALIDATION_RULE.decimal" style="width: 80px"></el-input>
        </el-form-item>
        <el-form-item v-if='form.INPUT_TYPE_CODE == "01" || form.INPUT_TYPE_CODE == "02" || form.INPUT_TYPE_CODE == "04"'>
          <label>输入长度</label>
          <el-input v-model="form.INPUT_LENGTH"></el-input>
        </el-form-item>
        <el-form-item>
          <label>单　　位</label>
          <el-input v-model="form.UNIT" style='width: 110px'></el-input>
        </el-form-item>
        <el-form-item>
          <label>默认频次</label>
          <el-input v-model="form.NUMBER_OF_TIMES" style='width: 50px' :disabled='lock_flag' type='number' @change='valuedate'></el-input>
          <el-checkbox-group v-model="NUMBER_OF_TIMES_REVISABILITY" style="display: inline-block; margin-left: 12px;" :disabled='lock_flag || form.NUMBER_OF_TIMES==""'>
            <el-checkbox label="频次锁定"></el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group v-model="dateLocking" style="display: inline-block; margin-left: 12px;">
            <el-checkbox label="时间锁定"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>



        <el-form-item>
          <label>不可删除</label>
          <el-radio v-model="form.NOT_DELETE" label="1">是</el-radio>
          <el-radio v-model="form.NOT_DELETE" label="2">否</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="del" style="padding:12px 31px;" type='danger' v-if='delete_flag'>删除</el-button>
        <el-button @click="dialogVisible = false" style="background-color:#DDEFF9; padding:12px 31px; color:#00B3DC;">取 消</el-button>
        <el-button type="primary" style="background-color: #00B3DC; padding:12px 48px; margin-left: 15px;" @click='submit' :disabled='disable'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default{

    props : ['allList'],

    data(){
      return {
        dialogVisible : false,
        title : "",
        options : [{value:"0",label:"无"},{value:"01",label:"文本"},{value:"02",label:"数字"},{value:"03",label:"选项"},{value:"04",label:"可输可选"}],     //输入类型
        opation : '',
        type : '',
        delete_flag : false,
        lock_flag : false,
        NUMBER_OF_TIMES_REVISABILITY : false,
        dateLocking : false,
        max_time : '',
        form : {
          NAME : '',
          INPUT_TYPE_CODE : '',
          OPTION_LIST : [],
          INPUT_LENGTH : '',
          UNIT : '',
          NUMBER_OF_TIMES : '',
          VALIDATION_RULE : { "min" :'' , "max" : '' , "decimal" : ''},
          NUMBER_OF_TIMES_REVISABILITY : '2',
          TIMES_SLICE_LOCK : '2',
          PARENT_ID:'',
          NOT_DELETE:'2',
          CODE:''
        },
        disable : false
      }
    },

    methods:{
      change(){
        if(this.form.INPUT_TYPE_CODE == '03') this.form.INPUT_LENGTH = ''
        if(this.form.INPUT_TYPE_CODE != '02') this.form.VALIDATION_RULE = { "min" : '' , "max" : '' , "decimal" : ''}
        if(this.form.INPUT_TYPE_CODE == '01' || this.form.INPUT_TYPE_CODE == '02'||this.form.INPUT_TYPE_CODE == '0') this.opation = ''
      },
      valuedate(value){
        if(value > this.max_time) this.form.NUMBER_OF_TIMES = this.max_time
        if(value < 0) this.form.NUMBER_OF_TIMES = 1
      },
      submit(){
        this.disable = true
        this.form.OPTION_LIST = []
        if(this.opation){
          let arr = this.opation.split('\n')
          console.log(arr)
          arr.forEach( item => {
            console.log(item.split('|')[0])
            console.log(item.split('|')[1])
            this.form.OPTION_LIST.push({ 'code' : item.split('|')[1] ,'name' : item.split('|')[0]})
          })
        }

        if(this.form.NAME.trim() == '' ){
          this.$message({type : 'warning',message : '请输入体征名称'})
          this.disable = false
          return
        }
        if(this.form.INPUT_TYPE_CODE == "02"){
          if(this.form.VALIDATION_RULE.min =="" || this.form.VALIDATION_RULE.max ==""){
            this.$message({type : 'warning',message : "请输入取值范围"})
            this.disable = false
            return
          }
        }


        this.form.OPTION_LIST = JSON.stringify(this.form.OPTION_LIST)
        this.form.VALIDATION_RULE = JSON.stringify(this.form.VALIDATION_RULE)
        //var VALIDATION_RULE = JSON.stringify(this.form.VALIDATION_RULE)

        if(this.type == 'add'){
          this.disable = true
          this.post('datacenter/vs',{ ...this.form}, res =>{
            console.log(res);
            if(res.status == 201){
              this.$message({type : 'success', message : res.data.message})
              this.dialogVisible = false
              this.$parent.pageAjax()
            }
            this.disable = false
          })
        }else{
          this._put('datacenter/vs/'+this.form.id,{...this.form}, res =>{
            console.log(res);
            this.disable = true
            if(res.status == 201){
              this.$message({type : 'success', message : res.data.message})
              this.dialogVisible = false
              this.$parent.pageAjax()
            }
            this.disable = false
          })
        }
      },
      init(){
        this.dialogVisible = true
        this.type = 'add',
        this.delete_flag = false
        this.dateLocking = false
        this.NUMBER_OF_TIMES_REVISABILITY = false
        this.form =  {
          NAME : '',
          INPUT_TYPE_CODE : '',
          OPTION_LIST : [],
          INPUT_LENGTH : '',
          UNIT : '',
          NUMBER_OF_TIMES : '',
          VALIDATION_RULE : { "min" :'' , "max" : '' , "decimal" : ''},
          NUMBER_OF_TIMES_REVISABILITY : '2',
          TIMES_SLICE_LOCK : '2',
          PARENT_ID:'',
          NOT_DELETE:'2',
          CODE:''
        }
      },
      getData(item){
        console.log(item);
        this.delete_flag = true
        this.type = 'edit'
        this.dialogVisible = true
        this.form.NAME = item.NAME
        this.form.id = item.ID
        this.form.INPUT_TYPE_CODE = item.INPUT_TYPE_CODE
        this.form.INPUT_LENGTH = item.INPUT_LENGTH || ''
        this.form.NUMBER_OF_TIMES = item.NUMBER_OF_TIMES
        this.form.NUMBER_OF_TIMES_REVISABILITY = item.NUMBER_OF_TIMES_REVISABILITY
        this.form.PARENT_ID = item.PARENT_ID
        this.form.CODE = item.CODE

        this.form.NOT_DELETE = item.NOT_DELETE+''
        this.NUMBER_OF_TIMES_REVISABILITY = item.NUMBER_OF_TIMES_REVISABILITY == 1 ? true : false
        this.dateLocking = item.TIMES_SLICE_LOCK == 1 ? true : false

        this.form.VALIDATION_RULE = item.VALIDATION_RULE != 'null' ? item.VALIDATION_RULE : { "min" :'' , "max" : '' , "decimal" : ''}
        this.form.UNIT = item.UNIT
        this.form.TIMES_SLICE_LOCK = item.TIMES_SLICE_LOCK
        if(item.OPTION_LIST){
          const arr = item.OPTION_LIST
          let str = ''
          arr.forEach((item ,index) => {
            if(index != arr.length - 1) str += (item.name + '|' +item.code+'\n')
            else str += (item.name + '|' + item.code)
          })
          this.opation = str
        }
      },
      del() {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this._delete('datacenter/vs/' + this.form.id,{ id : this.form.id }, res =>{
            console.log(res.response);
            if(res.status == 204){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.dialogVisible = false
              this.$parent.handleCurrentChange()
            }
          })
        })
      }
    },

    computed : {
      initTitle(){
        return this.type == 'add' ? '新增生命体征' : '编辑选择项('+ this.form.NAME +')'
      }
    },

    mounted(){
      this.$nextTick(()=>{
        this.getSer('datacenter/vs/select-time-arr',{},res=>{
          console.log('配置文件',res);
          this.max_time = res.data.length
        })
      })
    },

    watch:{
      'NUMBER_OF_TIMES_REVISABILITY' : function (to) {
        to ? this.form.NUMBER_OF_TIMES_REVISABILITY = 1 : this.form.NUMBER_OF_TIMES_REVISABILITY = 2
      },
      'dateLocking' : function (to) {
        if(to){
          this.form.TIMES_SLICE_LOCK = 1
          this.form.NUMBER_OF_TIMES = this.max_time
          this.lock_flag = true
          this.NUMBER_OF_TIMES_REVISABILITY = true
        }else{
          this.form.TIMES_SLICE_LOCK = 2
          this.lock_flag = false
        }
      },

    }
  }
</script>
<style scoped lang="stylus">
  .dialog-class >>> .el-dialog
    width 444px
    .el-form-item
      label
        display inline-block
        margin-right 20px
      .el-input
        width 310px
        .el-input__inner
          background-color #F9F9FB
          &::-webkit-outer-spin-button,&::-webkit-inner-spin-button
            -webkit-appearance none
          &[type="number"]
            -moz-appearance textfield
      .el-textarea
        width 376px
        .el-textarea__inner
          border-radius 0
          height 150px
          resize none
  .el-button--success
    padding 12px 32px
    background-color #11c462
    float right
    margin-top -40px
    &:hover
      background-color #14d462




</style>
