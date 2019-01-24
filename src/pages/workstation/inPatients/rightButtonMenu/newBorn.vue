<template>
    <el-dialog :visible.sync="popshow" width='780px' title='新生儿信息新增'>
      <div class='detile'>
        <span  style="margin-right: 10px;">母亲姓名</span>
        <el-input v-model="MOTHER_NAME" placeholder="请输入内容"></el-input>
        <span style="margin-right: 10px;margin-left: 50px;">床位</span>
        <el-input v-model="BED_NUMBER" placeholder="请输入内容"></el-input>
      </div>
      <div class='detile'>
        <span  style="margin-right: 10px;">婴儿姓名</span>
        <el-input v-model="NAME" placeholder="请输入内容"></el-input>
        <span style="margin-right: 10px;margin-left: 50px;">性别</span>
        <el-select v-model="SEX" placeholder="请选择">
          <el-option
            v-for="item in sex"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class='detile'>
        <span  style="margin-right: 10px;">出生日期</span>
        <el-date-picker
          v-model="BIRTHDAY"
          type="datetime"
          value-format='yyyy-MM-dd	HH:mm'
          format="yyyy-MM-dd	HH:mm"
          placeholder="选择日期时间">
        </el-date-picker>
        <span style="margin-right: 10px;margin-left: 50px;">婴儿编号</span>
        <el-input v-model="BABY_NUMBER" placeholder="请输入内容"></el-input>
      </div>
      <p class="newtit">已登记婴儿信息</p>
      <div class="newlist">
        <el-table border :data="newList" style="width: 100%"  @row-contextmenu='rightClick'>
          <el-table-column prop="BED_NUMBER" label="母亲住院号" min-width="100"></el-table-column>
          <el-table-column prop="MOTHER_NAME" label="母亲姓名" min-width="80"></el-table-column>
          <el-table-column prop="NAME" label="姓名" min-width="80"></el-table-column>
          <el-table-column prop="BIRTHDAY" label="生日" min-width="135"></el-table-column>
          <el-table-column prop="BABY_NUMBER" label="婴儿编号" min-width="80"></el-table-column>
          <el-table-column prop="AGE" label="年龄" min-width="60"></el-table-column>
          <el-table-column prop="SEX" label="性别" min-width="50"></el-table-column>
          <el-table-column prop="CREATED_AT" label="登记时间" min-width="135"></el-table-column>
          <el-table-column prop="CREATED_ADMIN_NAME" label="登记人" min-width="80"></el-table-column>
          <!--<el-table-column label="床号" min-width="52">
            <template slot-scope="scope">{{ scope.row.BED_NUMBER }}</template>
          </el-table-column>-->
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="popshow = false" class='close' type="primary" plain>取 消</el-button>
        <el-button @click="create_save" class='save' type="primary">保存</el-button>
      </div>

      <el-dialog title="新生儿信息编辑" :visible.sync="dialogVisible" width="600px" append-to-body top="200px">
        <div class='detile'>
          <span  style="margin-right: 10px;">母亲姓名</span>
          <el-input v-model="BED_NUMBER" placeholder="请输入内容"></el-input>
          <span style="margin-right: 10px;">床位</span>
          <el-input v-model="MOTHER_NAME" placeholder="请输入内容"></el-input>
        </div>
        <div class='detile'>
          <span  style="margin-right: 10px;">婴儿姓名</span>
          <el-input v-model="NAME" placeholder="请输入内容"></el-input>
          <span style="margin-right: 10px;">性别</span>
          <el-select v-model="SEX" placeholder="请选择">
            <el-option
              v-for="item in sex"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class='detile'>
          <span  style="margin-right: 10px;">出生日期</span>
          <el-date-picker
            v-model="BIRTHDAY"
            type="datetime"
            value-format='yyyy-MM-dd	HH:mm'
            format="yyyy-MM-dd	HH:mm"
            placeholder="选择日期时间">
          </el-date-picker>
          <span style="margin-right: 10px;margin-left: 50px;">婴儿编号</span>
          <el-input v-model="BABY_NUMBER" placeholder="请输入内容"></el-input>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="delList" type="danger" class='delete'>删除</el-button>
          <el-button @click="dialogVisible = false" class='close' type="primary" plain>取 消</el-button>
          <el-button @click="edit_save" class='save' type="primary">保存</el-button>
        </div>
      </el-dialog>
    </el-dialog>
</template>

<script>
    export default {
        name: "turnBed",

        props : ['thisData'],

        data(){
          return{
            popshow : false,
            inpatient_number : '',
            bedList : [],
            input:'',
            newSex:'',
            sex:[{value: '1', label: '男'},{value: '2', label: '女'}],
            dateBirth:'',
            newList:[],
            dialogVisible: false,
            MOTHER_NAME:'',
            MOTHER_BED_NUMBER:'',
          }
        },

        methods: {
          rightClick(obj,e){
            e.preventDefault()
            console.log("2222",obj,e)
            this.dialogVisible = true
            this.BABY_ID = obj.ID
            this.NAME = obj.NAME
            this.BIRTHDAY = obj.BIRTHDAY
            this.BED_NUMBER = obj.BED_NUMBER
            this.SEX = obj.SEX
            this.BABY_NUMBER = obj.BABY_NUMBER
            this.MOTHER_ID = obj.MOTHER_ID
            this.MOTHER_NAME = obj.MOTHER_NAME
          },
          show(data){
              this.MOTHER_ID = this.thisData.ID
              //获取baby列表
              this.newList = [];
              this.getSer('datacenter/baby',{ MOTHER_ID : this.MOTHER_ID} , res => {
                  if (res.status == 200)
                  {
                    this.newList = res.data.items
                    this.popshow = true
                  }
                  else
                  {
                    this.$message({type: 'warning', message: ' 获取新生儿列表失败!'})
                    return false
                  }
              })
          },
          create_save(){
              //if (!this.bed_id) {
                  //this.$message({type: 'warning', message: '请选择要分配的床位!'})
                //  return false;
              //}
              var obj = {
                  NAME : this.NAME,
                  BIRTHDAY : this.BIRTHDAY,
                  BED_NUMBER : this.BED_NUMBER,
                  SEX : this.SEX,
                  BABY_NUMBER : this.BABY_NUMBER,
                  MOTHER_ID : this.MOTHER_ID,
                  MOTHER_NAME : this.MOTHER_NAME,
              }
              console.log(obj);
              this.post('datacenter/baby',obj , res => {
                  console.log(res);
                  if(res.status == 201){
                      this.$message({type: 'success', message: '新增成功!'})
                      //重新初始化 输入框
                      this.NAME = ''
                      this.BIRTHDAY =  ''
                      this.BED_NUMBER =  ''
                      this.SEX =  ''
                      this.BABY_NUMBER = ''
                  }
              })
          },
          edit_save(val){
          console.log('edit_save');
             var obj = {
                    id : this.BABY_ID,
                    NAME : this.NAME,
                    BIRTHDAY : this.BIRTHDAY,
                    BED_NUMBER : this.BED_NUMBER,
                    SEX : this.SEX,
                    BABY_NUMBER : this.BABY_NUMBER,
                    MOTHER_ID : this.MOTHER_ID,
                    MOTHER_NAME : this.MOTHER_NAME,
                }
                console.log(obj);
                this._put('datacenter/baby/'+this.BABY_ID,obj , res => {
                    console.log(res);
                    if(res.status == 201){
                        this.$message({type: 'success', message: '编辑成功!'})
                        //重新初始化 输入框
                      this.BABY_ID = 0
                      this.NAME = ''
                      this.BIRTHDAY =  ''
                      this.BED_NUMBER =  ''
                      this.SEX =  ''
                      this.BABY_NUMBER = ''
                    }
                })
          },
          delList(){
            this.$confirm('是否删除?', '警告', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
              this._delete('datacenter/baby/' + this.obj.ID,{ id : this.obj.ID },res => {
              if(res.status == 204){
                  this.$message({type: 'success', message: '删除成功!'})
                  this.dialogVisible = false
                  this.getList()
                  this.editId == this.obj.ID ? this.getData() : null
              }
          })

             //重新加载数据
          }).catch(() => {

            })
          },
        },

        watch : {
          'thisData' : function () {
            console.log(this.thisData)
          }
        }
    }
</script>

<style scoped lang='stylus'>
  .detile
    margin-bottom 10px
    .el-input
      width 220px
      >>>.el-input__inner
        background #F9F9FB
    .el-select
      width 220px
      >>>.el-input__inner
        background #F9F9FB
  .newtit
    font-size 16px
    color #2B3A50
    font-weight bold
    padding 10px 0
  .newlist
    .el-table >>> .has-gutter tr th
      background #DDEFF9
      padding 6px 0
      border-right 1px solid #A5DDE9
    .el-table >>> .el-table__body-wrapper tr td
      padding 6px 0
    .el-table >>> .el-table__row tr td
      border-right none
  .dialog-footer
    .close
      background-color #DDEFF9
      color #00B3DC
      border-color #DDEFF9
    .save
      background-color #00B3DC
      border-color #00B3DC
    .delete
      float left
</style>
