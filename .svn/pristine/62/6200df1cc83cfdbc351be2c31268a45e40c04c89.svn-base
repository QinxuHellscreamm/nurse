<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width='800px' class='custom' :close-on-click-modal="false">
    <el-form :model="ruleForm" ref="ruleForm" label-width="80px">
      <el-form-item label="疾病名称">
        <!--<el-input v-model="ruleForm.TITLE" auto-complete="off" placeholder="搜索选择项"  clearable></el-input>-->
      <!--  <el-autocomplete
          class="inline-input"
          v-model="ruleForm.DIS_NAME"
          :fetch-suggestions="querySearch"
          placeholder="搜索选择项"
          @select="handleSelect"
        ></el-autocomplete>-->
        <el-select v-model="ruleForm.DIS_NAME" filterable placeholder="请选择" >
          <el-option
            v-for="item in restaurants"
            :key="item.ID"
            :label="item.value"
            :value="item.ID">
          </el-option>
        </el-select>
      </el-form-item>
      <div class="aimtitle" style="height: 40px;">
        <p  class="pTit">预期目标</p>
        <div style="float: right">
          <el-button type="success" icon="el-icon-plus" circle size="mini" @click="addTest(1)"></el-button>
          <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="editItem(1)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini" @click.native.prevent="deleteRow(1)"></el-button>
        </div>
      </div>
      <div class="tabNurbot">
        <p v-for="(val, key) in ruleForm.TARGET" @click="expBut(val,key)" >
         <!-- <span  v-if="hiddTA" :key="key">{{ val }}</span>
          <input type="text"   v-model="ruleForm.TARGET[key]" v-else style=" margin-bottom: 5px;line-height: 20px;padding-left: 5px;border: 1px solid #D8E3E7;">
        -->
          {{ val }}
        </p>

        <div  style="border-top: none"><el-input v-model="Expinput"  placeholder="新增内容"></el-input></div>
      </div>
      <div class="aimtitle" style="height: 40px;">
        <p  class="pTit">护理路径</p>
      </div>
      <div class="addTab" :style='menuStyle'>
        <el-button @click="addTab(editableTabsValue)" ><span>+</span></el-button>
      </div>

      <el-tabs v-model="editableTabsValue"  type="card" @tab-click="handleClick" class="greece">
        <el-tab-pane
          v-for="(item, index) in ruleForm.DATA"
          :key="item.STAGE_NUMBER"
          :label="item.STAGE_NUMBER | romeNumber"
          :name="item.index"
        >
          <div style="border: 1px solid #D8E3E7;padding: 20px 10px;    min-height: 300px;">
            <div class="Dtime">
              <span class="timeDa">住院持续天数</span>
              <el-input v-model="item.FEW_DATS" auto-complete="off"  type="number"><span  slot="suffix" style="line-height: 40px;padding-right: 10px;">天</span></el-input>
              <span style="margin-left: 50px"  class="timeDa">手术(分娩)本阶段第</span>
              <el-input type="number" v-if="item.THAT_DAY!=null" v-model="item.THAT_DAY.DAYS" auto-complete="off"><span slot="suffix"  style="line-height: 40px;padding-right: 10px;">天</span></el-input>

            </div>
            <div class="aimtitle go">
              <div>
                <p  class="pTit">执行医嘱</p>
                <div style="float: right">
                  <el-button type="success" icon="el-icon-plus" circle size="mini" @click="addTest(2)"></el-button>
                  <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="editItem(2)"></el-button>
                  <el-button type="danger" icon="el-icon-delete" circle size="mini" @click.native.prevent="deleteRow(2)"></el-button>
                </div>
              </div>
              <div style="" class="tabNurbot">
                <p v-for="(val, key) in item.EXECUTE_ORDER" @click="impBut(val,key)">
                  {{ val }}
                </p>
                <el-input v-model="impinput" placeholder="新增内容"></el-input>
              </div>
            </div>
            <div class="aimtitle go">
              <div>
                <p  class="pTit">护理与健康指导</p>
                <div style="float: right">
                  <el-button type="success" icon="el-icon-plus" circle size="mini" @click="addTest(3)"></el-button>
                  <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="editItem(3)"></el-button>
                  <el-button type="danger" icon="el-icon-delete" circle size="mini" @click.native.prevent="deleteRow(3)"></el-button>
                </div>
              </div>

              <div class="tabNurbot">
                <p v-for="(val, key) in item.HEALTH_NOTES" @click="heaBut(val,key)">
                  {{ val }}
                </p>
                <el-input v-model="nurinput" placeholder="新增内容"></el-input>
              </div>
            </div>
        <!--    <div >
              <el-button @click="removeTab" v-if="ruleForm.DATA.length==2">删除</el-button>
            </div>-->
            <!--<el-button type="primary" @click="minAdd()" size="small">保 存</el-button>-->
          </div>
        </el-tab-pane>

      </el-tabs>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false" >取 消</el-button>
      <el-button type="primary" @click="confirmAdd()">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>

  export default {

  props : ['restaurants'],

    data(){
      return{
        title:'',
        dialogFormVisible : false,
        ruleForm:{
          ID:'',
          DIS_ID:'',
          STATUS:'',
          TARGET:[],
          DIS_NAME:'',
          DATA: [{
            STAGE_NUMBER: "1",
            FEW_DATS:'' ,
            THAT_DAY: {},
            EXECUTE_ORDER: [] ,
            HEALTH_NOTES: [ ]
          }],
        },
        editableTabsValue: '0',
        tabIndex: 1,
        menuStyle : {
          left : ''
        },
        Expinput:'',
        tex:'',
        impinput:'',
        nurinput:'',
        tabindex:0,
        id:"",
        hiddTA:true,
        check:false,
      }
    },

    watch: {
      'dialogFormVisible'(val, oldVal){
        if(val == false){
         // this.ruleForm.TARGET=[]
          /*={
              ID:'',
              DIS_ID:'',
              STATUS:'',
              TARGET:[],
              DIS_NAME:'',
              DATA: [{
              STAGE_NUMBER: "1",
              FEW_DATS:'' ,
              THAT_DAY: {},
              EXECUTE_ORDER: [] ,
              HEALTH_NOTES: [ ]
            }],
          }*/
        }
      },
    },


    methods:{
      expBut(val,key){
        this.Expinput = val
        this.tex = key
      },
      impBut(val,key){
        this.impinput = val
        this.texs = key
      },
      heaBut(val,key){
        this.nurinput = val
        this.texs = key
      },
      addTab(targetName) {
        if(this.ruleForm.DATA[this.tabindex].FEW_DATS !=""){

          let newTabName = ++ this.tabIndex + '';
          if(newTabName<12){
            this.menuStyle.left = ((newTabName)*64)+40 +'px'
          }else {
            this.menuStyle.left = (11*64)+64 +'px'
          }
          this.ruleForm.DATA.push({
            STAGE_NUMBER: newTabName,
            FEW_DATS:"",
            EXECUTE_ORDER:[],
            HEALTH_NOTES:[],
            THAT_DAY:{}
          });
          this.editableTabsValue = (newTabName-1)+'';
          this.tabindex =  this.editableTabsValue
          console.log("asdsadsd",this.editableTabsValue)
        }else{
          this.$message({
            type: 'warning',
            message: '天数不能为空!',
          });
        }
      },
      removeTab(targetName) {
        console.log("wwww",targetName)

/*        let tabs = this.ruleForm.DATA;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
        }

        this.editableTabsValue = (activeName-1)+'';
        this.ruleForm.DATA = tabs.filter(tab => tab.name !== targetName);*/
      },
      handleClick(tab, event) {
        this.tabindex = tab.index
      },
      //新增预期目标
      addTest(index){
        /*var flg = true
        if(this.Expinput){}*/
        if(index == 1 && this.Expinput != "") {
          this.ruleForm.TARGET.push(this.Expinput)
          this.Expinput = ''
        }
        if(index == 2 && this.impinput != ""){

          this.ruleForm.DATA[this.tabindex].EXECUTE_ORDER.push(this.impinput)
          this.impinput = ''
        }
        if(index == 3 && this.nurinput != ""){
          this.ruleForm.DATA[this.tabindex].HEALTH_NOTES.push(this.nurinput)
          this.nurinput = ''
        }
      },
      //编辑
      editItem(index){
        if(index == 1 && this.Expinput != ""){
          this.ruleForm.TARGET[this.tex]=this.Expinput
          this.Expinput = ''
        }
        if(index == 2 && this.impinput != ""){
          // this.ruleForm.DATA[this.tabindex].EXECUTE_ORDER = this.ruleForm.DATA[this.tabindex].EXECUTE_ORDER
          this.ruleForm.DATA[this.tabindex].EXECUTE_ORDER[this.texs] = this.impinput
          this.impinput = ''
        }
        if(index == 3 && this.nurinput != ""){
          this.ruleForm.DATA[this.tabindex].HEALTH_NOTES[this.texs]=this.nurinput
          this.nurinput = ''
        }
      },
      //删除
      deleteRow(index){
        if(index == 1 && this.Expinput != "") {
          this.ruleForm.TARGET.splice(this.tex, 1)
          this.Expinput = ''
        }
        if(index == 2 && this.impinput != "") {
          this.ruleForm.DATA[this.tabindex].EXECUTE_ORDER.splice(this.texs, 1)
          this.impinput = ''
        }
        if(index == 3 && this.nurinput != "") {
          this.ruleForm.DATA[this.tabindex].HEALTH_NOTES.splice(this.texs, 1)
          this.nurinput = ''
        }
      },
      tableRowClassName ({row, rowIndex}) {
        row.index = rowIndex;
      },
      openDetails(row, event, column){
        this.Expinput = row.address
        this.tex = row.index;
      },
      openDetailsa(row, event, column){
        this.impinput = row.address
        this.tex = row.index;
      },
      unrDetailsa(row, event, column){
        this.nurinput = row.address
        this.tex = row.index;
      },
      setAddData(){
        this.id = 2;
      },
      //新增弹框提交
      confirmAdd(){
        if( (this.ruleForm.DATA[this.tabindex].THAT_DAY.DAYS !=null) && (this.ruleForm.DATA[this.tabindex].THAT_DAY.DAYS>this.ruleForm.DATA[this.tabindex].FEW_DATS)){
          this.check = true
        }else {
          this.check = false
        }
        this.ruleForm.DIS_ID = this.ruleForm.DIS_NAME
        this.ruleForm.DATA.forEach(item =>{
          item.EXECUTE_ORDER =item.EXECUTE_ORDER.filter(function(e){return e})
          item.HEALTH_NOTES =item.HEALTH_NOTES.filter(function(e){return e})
        })
        if(this.ruleForm.DIS_NAME == "" ){
          this.$message({
            type: 'warning',
            message: '疾病名称不能为空!'
          })
        }else if(this.ruleForm.DATA[this.ruleForm.DATA.length-1].FEW_DATS ==""){
          this.$message({
            type: 'warning',
            message: '住院天数不能为空!'
          })
        }else if(this.check == true){
          this.$message({
            type: 'warning',
            message: '手术天数不能大于住院天数!'
          })
        }else {
          this.post('datacenter/nursingpath',{
            DIS_ID:this.ruleForm.DIS_ID,
            TARGET:JSON.stringify(this.ruleForm.TARGET),
            DATA:JSON.stringify(this.ruleForm.DATA)},res =>{
            console.log(res);
          if(res.data.status=="201"){
            this.$message({
              type: 'success',
              message: '新增成功!'
            })
            this.$parent.getData()
            this.dialogFormVisible = false

          }
        })
        }
      },
    },

    mounted() {
      this.$nextTick(()=> {
        this.tabindex =  this.editableTabsValue

    })
    },

    watch:{

    },
  }
</script>

<style lang="stylus" scoped>
  .custom >>> .el-dialog__body
    padding 30px
    .el-tabs>.el-tabs__header
      border none
      margin 0
      position relative
      left 0
  .el-form-item
    margin-bottom 0px
  .el-form-item >>> .el-form-item__label
    font-size 16px!important
  .el-form-item .el-autocomplete
    width 50%
  .el-form-item__content .el-input >>> .el-input__inner
    background-color #F9F9FB
  .el-textarea >>> .el-textarea__inner
    background-color #F9F9FB
    height 240px
    resize none
  .tag-box
    margin-top 10px
    .el-tag
      margin-right 8px
  .aim
    min-height 40px
  .aim .el-table
      border 1px solid #D8E3E7
      border-bottom none
      background #f9f9fb
    ::before
      height 0
  .aim >>> .el-table .el-table__row
    background-color #F9F9FB
  .el-table >>> .el-table__row td
      border none
      padding 4px 0
  .aimtitle
    line-height 40px
    padding 10px 0
    .pTit
      font-size 16px
      color #00B3DC
      float left
  .el-tabs >>> .el-tabs__item
    background-color #DDEFF9
    margin-right 10px
    color #00B3DC
    border-radius 10px 10px 0 0
    line-height 35px
  .el-tabs >>> .el-tabs__item.is-active
    border none
    color #fff
    background-color #00B3DC
  .el-tabs >>> .el-table__body-wrapper
    background-color #f9f9fb
  .el-tabs >>> .el-tabs--card>.el-tabs__header .el-tabs__nav
    border none
  .el-tabs >>> .el-tabs__nav
    padding-left 10px
    height 30px
    border none
  .Dtime .timeDa
    float left
    margin-right 20px
    line-height 40px
    font-size 14px
  .Dtime .el-input
    float left
    width 18%
  .Dtime .el-input >>> .el-input__inner
    width 100%
    background #f9f9fb
  .go
    clear both
    p
      color #2B3A50
  .addTab
    position absolute
    z-index 99
    left 106px
    .el-button--default
      padding 0
      border none
      color #11C462
      span
        font-size 26px
      :hover
        color #11C462
        background #fff
    .el-button:focus
      background #fff
      color #11C462
  .tabNurbot
    border 1px solid #D8E3E7
    padding 10px
    background #F9F9FB
    clear both
    p
      line-height 22px
      font-size 14px
  .greece .el-tabs__header
      position relative
      margin 0 0 15px

.Dtime ::-webkit-outer-spin-button
  -webkit-appearance none
.Dtime  ::-webkit-inner-spin-button
  -webkit-appearance none
.Dtime input[type="number"]
  -moz-appearance textfield
</style>
