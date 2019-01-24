<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible"  class='dialog'>
    <div class='left'>
      <div class='input-item'>
        <label>标　　题</label>
        <el-input v-model='tit' :disabled='dialogTitle == "查看体温单"' maxlength='40'></el-input>

      </div>
      <div class='input-item'>
        <div style="display: inline-block" >
          <label>关联科室</label>
          <el-autocomplete class="inline-input" v-model="state1" :fetch-suggestions="querySearch_department" placeholder="搜索选择项" :disabled='dialogTitle == "查看体温单" || select_flag == true' @select="handleSelect_department"></el-autocomplete>
        </div>
        <el-checkbox v-model="select_flag" :disabled='dialogTitle == "查看体温单"'>全院模板</el-checkbox>
      </div>
      <div class='input-item'>
        <label >体温单编号</label>
        <el-input v-model='code'  maxlength='8' style='width: 120px'></el-input>
        <label style='margin-left: 10px'>关联记录单编号</label>
        <el-input v-model='re_code'  maxlength='8' style='width: 120px'></el-input>
      </div>
      <div class='input-item'></div>
      <div class='tag-box' v-show='select_flag == false'>
        <el-tag :key="index" v-for="(tag,index) in dynamicTags.values" :closable='dialogTitle != "查看体温单"' :disable-transitions="false" @close="handleClose(tag)" >{{tag}}</el-tag>
        <el-input v-if="inputVisible"  ref="saveTagInput" ></el-input>
      </div>
      <el-table :data="vitalSigns" border style="width: 854px"  @row-click="row_click"><!--:span-method="arraySpanMethod"-->
        <el-table-column prop="name" label="体征项目" min-width="150"></el-table-column>
        <el-table-column min-width="117">
          <template slot-scope="{row}">
            <div v-if='row.INPUT_TYPE_CODE == "01" '>
              <el-input disabled></el-input>
            </div>
            <div v-if='row.INPUT_TYPE_CODE == "02"'>
              <el-input type='number' disabled></el-input>
            </div>
            <div v-if='row.INPUT_TYPE_CODE == "03"' :disabled='dialogTitle == "查看体温单"'>
              <el-select  placeholder="请选择" :disabled='dialogTitle == "查看体温单"'>
                <el-option v-for="item1 in row.OPTION_LIST" :key="item1.value" :label="item1.name" :value="item1.code"></el-option>
              </el-select>
            </div>
            <div v-if='row.INPUT_TYPE_CODE == "04"'>
              <el-input disabled></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column min-width="117" prop="num" label="录入频次" >
        </el-table-column>
      </el-table>
      <div class='btn-box'>
        <!--<el-button class='save' @click='save' v-if='dialogTitle != "查看体温单"'>保存</el-button>-->
        <el-button class='save-close'  @click='save2' v-if='dialogTitle != "查看体温单"'>保存并关闭</el-button>
        <el-button class='save'  @click='dialogTableVisible = false' v-if='dialogTitle == "查看体温单"'>关闭</el-button>
      </div>
    </div>

    <div class="right">
      <h5 style="text-align: center">表单配置</h5>
      <el-table :data="vitalSigns" border style="width: 312px" @row-click="handleSelectionChange">
        <el-table-column prop="date" label="序号" min-width="42">
          <template slot-scope="scope"><div>{{scope.$index + 1}}</div></template>
        </el-table-column>
        <el-table-column prop="date" label="项目名" min-width="117">
          <template slot-scope="{row}">
            <el-autocomplete
              class="inline-input auto"
              v-model="row.name"
              :fetch-suggestions="querySearch_project"
              placeholder="请输入内容"
              :disabled='dialogTitle == "查看体温单"'
              @select="handleSelect_project"
            ></el-autocomplete>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="一天几次" min-width="70">
          <template slot-scope="{row}">
            <el-input v-model='row.num' type='tel' :disabled="row.disable || dialogTitle == '查看体温单'">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="" min-width="48">
          <template slot-scope="scope">
            <i class="el-icon-delete" style="color:#E63922" @click='del(scope.$index)' v-if='dialogTitle != "查看体温单"'></i>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="btn1" @click='add' :disabled='dialogTitle == "查看体温单"'><i class="el-icon-circle-plus-outline"></i><span class='text'>新增</span></el-button>
    </div>
    <dialogComponent :sub='obj' ref='sub'></dialogComponent>
  </el-dialog>
</template>

<script>
  import dialogComponent from './dialogComponent'

    export default  {
        name: "addTemperature",

        components : {dialogComponent},

        data(){
          return {
            dialogTitle : '',
            dialogTableVisible : false,
            obj : {},
            tit : '',
            tables : {
              label : ['2:00','6:00','10:00','14:00','18:00','22:00'],
            },
            code:'',
            re_code:'',
            state1 : '',
            state2 : '',
            restaurants : [],
            select_flag : true,
            inputVisible : false,
            dynamicTags : { values : [] , ids : [] }, //关联科室
            department : [],
            LIST : [],
            vitalSigns : [],
            row : {},
            id : ''
          }
        },

        methods : {
          getData(id){
              this.dialogTableVisible = true
              this.id = id
              this.getSer('datacenter/twtemplate/'+id,{ id : id }, res =>{
                console.log(res)
                this.tit = res.data.TITLE
                this.code = res.data.CODE
                this.re_code = res.data.RE_CODE
                this.select_flag = res.data.IS_ALL == 1 ? true : false
                this.department = []
                this.dynamicTags = { values : [] , ids : [] }
                var dataArr = res.data.TEMPLATE ? res.data.TEMPLATE  : []

                this.vitalSigns = []

                dataArr.forEach(item => {
                  this.LIST.forEach(listItem => {
                    if(item.SIGN_CODE == listItem.CODE){
                      this.vitalSigns.push({
                        code:listItem.CODE,
                        id : listItem.ID,
                        UNIT : listItem.UNIT,
                        num : item.FREQUENCY,
                        name : item.NAME,
                        OPTION_LIST : item.OPTION_LIST ,
                        INPUT_TYPE_CODE : listItem.INPUT_TYPE_CODE,
                        disable : listItem.NUMBER_OF_TIMES_REVISABILITY == 1 ? true : false,
                        type : listItem.type,
                        IS_SELECT : item.IS_SELECT,
                        TIMES_SLICE_LOCK : item.TIMES_SLICE_LOCK,
                        subList: item.SING_SUB_CODE
                      })
                    }
                  })
                })
                console.log(this.vitalSigns);
                console.log(dataArr)
                res.data.DEPARTMENT.forEach((item,i)=>{
                  this.department.push(item.DEPARTMENT_ID)
                  this.dynamicTags.values.push(item.NAME)
                  this.dynamicTags.ids.push(item.DEPARTMENT_ID)
                })
                console.log(this.dynamicTags);

              })
          },
          querySearch_department(queryString, cb) {
            console.log(queryString)
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
            cb(results);
          },
          querySearch_project(queryString,cb) {
            console.log(queryString)
            var restaurants = this.LIST
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
            cb(results)
          },

          handleClose(tag) {
            console.log(tag);
            let index = this.dynamicTags.values.indexOf(tag)
            let id = this.dynamicTags.ids[index]
            this.department.splice(this.department.indexOf(id),1)
            this.dynamicTags.values.splice(index, 1)
            this.dynamicTags.ids.splice(index, 1)
            console.log(this.department)
          },
          createFilter(queryString) {
            return (restaurant) => {
              return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
            }
          },
          handleSelect_department(item) {
            console.log(item)
            this.state1 = ''
            this.dynamicTags.values.push(item.value)
            this.dynamicTags.ids.push(item.ID)
            this.department.push(item.ID)
            /*去重*/
            this.dynamicTags.values = Array.from(new Set(this.dynamicTags.values))
            this.dynamicTags.ids = Array.from(new Set(this.dynamicTags.ids))
            this.department = Array.from(new Set(this.department))
          },
          handleSelect_project(item) {
            console.log(item)
            this.obj.code = item.CODE
            this.obj.OPTION_LIST = item.OPTION_LIST
            this.obj.INPUT_TYPE_CODE = item.INPUT_TYPE_CODE
            this.obj.num = item.NUMBER_OF_TIMES
            this.obj.UNIT = item.UNIT
            this.obj.disable = item.NUMBER_OF_TIMES_REVISABILITY == 1 ? true : false
            this.obj.IS_SELECT = item.IS_SELECT

            this.obj.TIMES_SLICE_LOCK = item.TIMES_SLICE_LOCK == null ? 1 :item.TIMES_SLICE_LOCK
            this.obj.SUB = item.SUB
            this.obj.subList.length > 0 ? null: this.obj.subList= item.SING_SUB_CODE ? item.SING_SUB_CODE : []
            console.log(this.obj);
            if(item.SUB.length != 0 ) this.$refs.sub.show(this.obj.subList)

          },

          add(){
            this.vitalSigns.push({
              code : '' ,
              num : '' ,
              name : '' ,
              OPTION_LIST : '' ,
              UNIT : '',
              INPUT_TYPE_CODE : '',
              disable : '',
              IS_SELECT : '',
              TIMES_SLICE_LOCK : '',
              subList:[]
            })
          },
          handleSelectionChange(vals){
            console.log(vals);
            this.obj = vals
            this.obj.subList = []
          },
          del(index){
            this.vitalSigns.splice(index,1)
          },

          save(callback){
            var obj = {
              code : this.code,
              re_code : this.re_code,
              id : this.id ,
              title : this.tit ,
              is_all : this.select_flag ? 1 : 2 ,
              data : [] ,
              department : JSON.stringify(this.department)
            }
            console.log(this.department);
            var arr = this.vitalSigns
            console.log(arr)
            arr.forEach(item => {
              obj.data.push({ 'code' : item.code ,num : item.num , time_lock : item.TIMES_SLICE_LOCK ,sub : item.subList })
            })
            obj.data = JSON.stringify(obj.data)
            if(this.tit == ''){
              this.$message({type : 'error', message : '请输入标题！'})
              return
            }
            if(this.select_flag == false && this.dynamicTags.values ==""){
              this.$message({type : 'error', message : '请输关联科室！'})
              return
            }

            if(this.dialogTitle == '编辑体温单'){
              console.log(obj);
              this._put('datacenter/twtemplate/' + this.id, obj ,res =>{
                console.log(obj)
                if(res.status ==201){
                  this.$message({type : 'success', message : '编辑成功'})
                  this.$parent.pageAjax()
                  typeof callback == 'function' ? callback() : null
                }
              })
            }else{
              console.log(obj)
              this.post('datacenter/twtemplate', obj , res =>{
                if(res.status == 201){
                  this.$message({type : 'success', message : "新增成功"})
                  this.$parent.pageAjax()
                  typeof callback == 'function' ? callback() : null
                }
              })
            }

          },
          save2(){//保存并关闭
            this.save(()=>{
              this.dialogTableVisible = false
            })
          },
          row_click(vals){
            console.log(vals);
            this.row = vals
            if(this.row.OPTION_LIST){
              this.row.OPTION_LIST.forEach((item,i) => {
                this.row.OPTION_LIST[i].value = item.name
              })
            }
          },
      },

      mounted(){
        this.$nextTick(() => {
          this.getSer('datacenter/department', { page : 1 , page_size : 1000 } , res => {
            console.log(res); //科室列表
            res.data.items.forEach((item , i) => {
              this.restaurants.push({'value' : item.NAME , "ID" : item.ID})
            })
          })
          this.getSer("datacenter/twtemplate/termlist",{}, res =>{
            console.log('体征关联');
            console.log(res);
            this.LIST = res.data.items
            this.LIST.forEach((item,i) =>{
              this.LIST[i] = {...this.LIST[i] , value : this.LIST[i].NAME}
            })
          })
        })
      }
    }
</script>

<style scoped lang="stylus">
  .dialog>>>.el-dialog
    width 1197px
  .dialog>>>.el-dialog__body
    display flex
    padding 0 10px 10px 26px
  .dialog>>>.el-dialog__header
    border-bottom 1px solid #D8E3E7
  .left
    width 860px
    padding 10px 10px 0 0
    .input-item
      margin-bottom 8px
      .el-checkbox
        margin-left 10px
      label
        margin-right 10px
      .el-input
        width 310px
    .tag-box
      margin-left 68px
      .el-tag
        margin-right 10px
        margin-bottom 10px
    .el-table
      .el-select
        width 100%
      .el-select >>> .el-input__inner
        background-color #fff
        border none
      .el-input >>> .el-input__inner
        background-color #fff
        border none
      .el-autocomplete >>> .el-input__inner
        border none
    .btn-box
      margin 20px 0 0 622px
      .el-button
        background-color #00B3DC
        color #fff
        padding 12px 26px
      .el-button >>> span
          font-size 16px
  .right
    width 279px
    border-left 1px solid #D8E3E7
    padding-bottom 50px
    h5
      margin-top 5px
      line-height 45px
    .el-table
      margin-left 10px
      .el-input >>> .el-input__inner
        width 100%
        padding 0 25px
        border none
    .btn1
      padding 8px 15px
      margin-left 10px
      position absolute
      bottom 10px
      .el-icon-circle-plus-outline
        font-size 24px
        color #11C462
        position relative
        left -7px
      .text
        top -3px
        position relative


  .el-table >>> th
    text-align center
    line-height 34px
  .el-table >>> .cell
    text-align center
    line-height 34px
    padding-left 0!important
    padding-right 0
  .el-table >>> td
    padding 0
  .el-input >>> .el-input__inner
    background-color:#F9F9FB
    height 36px
  .auto >>> .el-input
    width 100%
    .el-input__inner
      width 100%
      padding 0 8px
      border none

</style>
