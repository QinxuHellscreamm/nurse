<template ref='addTPL'>
    <div>
      <div class="add-template">
        <div class='form_left'>

          <div class='input-item'><label>模板名称</label><el-input  class="custom-item" placeholder="请输入内容" v-model="form1.NAME"></el-input></div>
          <div class='input-item'><label>显示名称</label><el-input  class="custom-item" placeholder="请输入内容" v-model="form1.SHOW_NAME"></el-input></div>
          <div class='input-item'><label>模版编码</label><el-input  class="custom-item" placeholder="请输入唯一编码" v-model="form1.TEMPLATE_CODE"></el-input></div>
          <div class='input-item'><label>关联编码</label><el-input  class="custom-item" placeholder="请输入关联编码" v-model="form1.RE_CODE"></el-input></div>
          <div class='input-item'>
            <label>所属分类</label>
            <el-select  placeholder="请选择" v-model='form1.TYPE' class='need-4'>
              <el-option v-for="item in TEMPLATE_TYPE" :key="item.value" :label="item.label" :value="item.value" ></el-option>
            </el-select>
          </div>

          <div class='input-item'>
            <label>文书类型</label>
            <el-select  placeholder="请选择" v-model='form1.DOCUMENT_TYPE' class='need-4'>
              <el-option v-for="item in DOCUMENT_TYPE" :key="item.value" :label="item.label" :value="item.value" ></el-option>
            </el-select>
          </div>
          <div class='input-item'>
            <label>报表类型</label>
            <el-select  placeholder="请选择" v-model='form1.REPORT_TYPE' class='need-4'>
              <el-option v-for="item in REPORT_TYPE" :key="item.value" :label="item.label" :value="item.value" ></el-option>
            </el-select>
          </div>

          <div class='input-item'>
            <label>关联科室</label>
            <el-select v-model="DEPARTMENT_NAME" filterable placeholder="请选择" @change="handleSelect"  :disabled="disSea==1">
              <el-option
                v-for="item in restaurants"
                :key="item.ID"
                :label="item.value"
                :value="item.ID">
              </el-option>
            </el-select>
          </div>
          <div class='input-item'>
            <el-checkbox v-model="checked" @change="checWhole">全院模板</el-checkbox>
          </div>
          <div class='input-item'>
            <el-checkbox v-model="checkedCount" @change="checCount">启用出入量统计</el-checkbox>
          </div>
        </div>
        <div class='form_center'>
          <div class='add-node'>
            <el-button type="success" size="small" @click='addNodeRoot(0)'>增加根节点</el-button>
            <el-button type="warning" size="small" @click='addNodeRoot(1)'>增加子节点</el-button>
          </div>
          <span>节点列表</span>
          <el-tree :data="NODES" :props="defaultProps" @node-click="handleNodeClick" empty-text='请添加根节点' :expand-on-click-node=false default-expand-all node-key="id" draggable :render-content="renderContent"></el-tree>
        </div>
        <nodeConfig v-if="rightShow" :thisNode='thisNode' ref='config'></nodeConfig>
      </div>
      <div class='btn-menu'>
        <el-button type="primary">PDA文书预览</el-button>
        <el-button type="primary" @click='preview'>文书预览</el-button>
        <el-button type="primary" @click='submit(2)'>复制</el-button>
        <el-button type="primary" @click='submit(1)'>保存</el-button>
      </div>

      <preview ref='preview' :NODES='NODES'></preview>
    </div>
</template>

<script>
  import preview from './component/preview/templatePreview'
  import nodeConfig from './component/nodeConfig'
    export default {
        name : "addTemplate",

        data() {
          return{
            /*form1 start*/
            form1 : {
              NAME : '',
              SHOW_NAME : '',
              TEMPLATE_CODE : '',
              TYPE : '',
              DOCUMENT_TYPE : '',
              REPORT_TYPE : '',
              RE_CODE:''
            },
            TEMPLATE_TYPE : [],//所属分类
            DOCUMENT_TYPE : [],
            REPORT_TYPE : [], //报表类型
            DEPARTMENT_NAME : '',

            inputVisible : false,

            /*form1 end*/
            /*form-center*/
            NODES : [],

            defaultProps: { //tree 组件 定义默认字段
              children: 'CHILDS',
              label: 'NODE_NAME'
            },
            rightShow : false,
            thisNode : {"INPUT_RULES" : { min : '' , max : '', decimal : ''}},
            thisNodeE : {"INPUT_RULES" : { min : '' , max : '', decimal : ''}},
            IS_REQUIRED : '',
            checked: false,
            //state1 : '',//DEPARTMENT_NAME
            disSea:2,
            restaurants : [], //关联科室
            DEPARTMENT_ID:'',
            checkedCount:false,
            isCount:2,//不启用出入量统计
          }
        },

        methods : {
          checWhole(){
            console.log("1111")
            if(this.checked == true){//选中
              this.disSea = 1
              //this.dynamicTags={ ids : []}
             // this.form1.DEPARTMENTS=[]
              this.DEPARTMENT_ID = ''
              this.DEPARTMENT_NAME = ''

            }else {
              this.disSea = 2
            }
          },
          //启用出入量统计
          checCount(){
            if(this.checkedCount == true){//选中
              this.isCount = 1
            }else {
              this.isCount = 2
            }
          },
          handleSelect(item) {
            console.log("item",item)
            //this.state1 = ''
            //this.dynamicTags.values.push(item.value)
           // this.dynamicTags.ids.push(item.ID)
            this.DEPARTMENT_ID = item
            /*去重*/
            // this.dynamicTags.values = Array.from(new Set(this.dynamicTags.values))
            //this.dynamicTags.ids = Array.from(new Set(this.dynamicTags.ids))
           // this.form1.DEPARTMENTS = Array.from(new Set(this.form1.DEPARTMENTS))
          },
          handleNodeClick(data,node,THIS) {
            console.log(data);
            this.rightShow = true
            this.thisNodeE = node
            this.thisNode = data
            this.$nextTick(()=>{
              this.$refs.config.jisuan()
            })
          },
          addNodeRoot(type) {
            const obj = {
              NODE_TYPE : '',
              NODE_NAME : "未命名",
              INPUT_MODE : '',
              INPUT_TYPE : '',
              NODE_UNIT : '',
              INPUT_LENGTH : '',
              IS_REQUIRED : '',
              IS_NEWLINE : '',
              IS_SHOW : '',
              IS_SHOW_IN_TABLE : '',
              OPTIONS : '',
              INPUT_RULES : { min : '' , max : '', decimal : ''},
              RELATE_TEMPLATE_ID : '',
              RELATE_NODE_ID : '',
              CHILDS : []
            }
            type == 1 ? this.thisNode.CHILDS.push(obj) : this.NODES.push(obj)
          },
          remove(node, data){
            this.rightShow = false
            node.remove()
          },
          renderContent(h, { node, data, store }) {
            return (
              <span class="custom-tree-node">
                <span class='custom'>{node.label}</span>
                <span>
                  <el-button size="mini" type="text" class='ishow' on-click={ () => this.remove(node, data) }>Delete</el-button>
                </span>
              </span>);
          },
          submit(type){
            var obj = {...this.form1 ,  NODES:JSON.stringify(this.NODES) ,id : this.ID,DEPARTMENTS:this.DEPARTMENT_ID,IS_ALL:this.disSea, IS_COUNT:this.isCount}


            if(type==1){
              this._put('datacenter/template/'+this.ID , obj , res => {
                if(res.status == 201){
                  console.log(res);
                  this.$message({
                    message: res.data.message,
                    duration:1000,
                    type: 'success'
                  });
                  this.$parent.$parent.dynamic.pop()
                  this.$parent.$parent.dynamicName.pop()
                  //将值清空
                  window.sessionStorage.editTPLAdmin = ''
                  var TYPE = this.form1.TYPE
                  this.form1 = {
                    NAME : '',
                    SHOW_NAME : '',
                    TEMPLATE_CODE : '',
                    IS_ALL : '1',
                    TYPE : '',
                    DOCUMENT_TYPE : '',
                    REPORT_TYPE : '',
                  }
                  this.NODES = []
                  this.rightShow = false
                  if(TYPE == 1){
                    this.$router.push('/managePlatform/documentAdmin/docTemplateAdmin/assessTPL')
                  }else if(TYPE == 2){
                    this.$router.push('/managePlatform/documentAdmin/docTemplateAdmin/recordTPL')
                  }else if(TYPE == 3){
                    this.$router.push('/managePlatform/documentAdmin/docTemplateAdmin/handoverTPL')
                  }else if(TYPE == 5){
                    this.$router.push('/managePlatform/documentAdmin/docTemplateAdmin/informTPL')
                  }
                }
              })
            }else{
              this.post('datacenter/template' , obj , res => {
                if(res.status == 201){
                  console.log(res);
                  this.$message({
                    message: res.data.message,
                    duration:1000,
                    type: 'success'
                  });
                  var index = this.$parent.$parent.dynamicName.indexOf('新增模板')
                  this.$parent.$parent.dynamic.splice(index)
                  this.$parent.$parent.dynamicName.splice(index)
                  //将值清空
                  window.sessionStorage.AddTPLAdmin = ''
                  let TYPE = this.form1.TYPE
                  this.form1 = {
                    NAME : '',
                    SHOW_NAME : '',
                    TEMPLATE_CODE : '',
                    TYPE : '',
                    DOCUMENT_TYPE : '',
                    REPORT_TYPE : '',
                    DEPARTMENTS : [],//关联科室
                  }
                  this.NODES = []
                  this.rightShow = false
                  if(TYPE == 1) this.$router.push('/managePlatform/documentAdmin/docTemplateAdmin/assessTPL')
                  else if(TYPE == 2) this.$router.push('/managePlatform/documentAdmin/docTemplateAdmin/recordTPL')
                  else if(TYPE == 3) this.$router.push('/managePlatform/documentAdmin/docTemplateAdmin/handoverTPL')
                  else if(TYPE == 5) this.$router.push('/managePlatform/documentAdmin/docTemplateAdmin/informTPL')
                }
              })
            }


          },

          getData(){
              var id = this.$route.params.id
              if (id){
                this.getSer("datacenter/template/"+id , { id : id },res => {
                  console.log("sssssssssss",res)
                  var data = res.data
                  this.isCount = data.IS_COUNT
                  this.checkedCount = data.IS_COUNT == 1 ? true : false
                  this.form1.NAME = data.NAME
                  this.form1.SHOW_NAME = data.SHOW_NAME
                  this.form1.TEMPLATE_CODE = data.TEMPLATE_CODE
                  this.form1.TYPE = data.TYPE +''
                  this.form1.RE_CODE = data.RE_CODE
                  this.form1.DOCUMENT_TYPE = data.DOCUMENT_TYPE + ''
                  this.form1.REPORT_TYPE = data.REPORT_TYPE + ''
                  this.ID = data.ID
                  this.NODES = data.NODES
                  this.DEPARTMENT_NAME = data.DEPARTMENT_NAME
                  this.DEPARTMENT_ID = data.DEPARTMENT_ID
                  if(data.IS_ALL==1){
                    this.checked=true
                    this.disSea = 1
                  }
                })
              }
          },
          preview(){
            this.$refs.preview.show()
          }
        },

        mounted() {
          this.$nextTick(() => {
            this.getSer('datacenter/department', { page_size : 1000 } , res => {
            console.log("科室列表",res); //科室列表
            res.data.items.forEach((item , i) => {
              this.restaurants.push({'value' : item.NAME , "ID" : item.ID})
          })
          })
            console.log(this.$store.getters.getPublicDoc);
            //从vuex中取出缓存的静态数据 用于select
            for(var k in this.$store.getters.getPublicDoc.TEMPLATE_TYPE){//所属分类
              this.TEMPLATE_TYPE.push({ value : k , label : this.$store.getters.getPublicDoc.TEMPLATE_TYPE[k]})
            }
            this.$store.getters.getPublicDoc.DOCUMENT_TYPE.forEach((item , i) => {//文书类型
              this.DOCUMENT_TYPE.push({ value : i+'' , label : item })
            })
            for(var k in this.$store.getters.getPublicDoc.REPORT_TYPE){//报表类型
              this.REPORT_TYPE.push({ value : k , label : this.$store.getters.getPublicDoc.REPORT_TYPE[k]})
            }
          })
        },

        created(){
          this.$nextTick(() => {
            this.getData()
          })
        },

        components : { preview , nodeConfig }
    }

</script>

<style scoped lang="stylus">
  .vitalist-content
    padding 0
    .btn-menu
      float right
      margin 25px 30px
    .add-template
      border-bottom 1px solid #D8E3E7
      overflow hidden
      .form_left
        width 390px
        height 610px
        border-right 1px solid #D8E3E7
        position relative
        float left
        .el-input
          width 280px
        .el-select
          height 36px
          width 150px
          left -4px
        .el-autocomplete
          left -4px
        .custom-item.department
          width 236px
      .form_center
        width 380px
        height 610px
        border-right 1px solid #D8E3E7
        position relative
        float left
        .add-node
          margin 20px 0 0 150px
        span
          position relative
          top 20px
          margin-left 20px
          color #00B3DC
        .el-tree
          margin-top 25px
          height 500px
          overflow-y auto
          overflow-x hidden
          &>>>.custom-tree-node
            width 75%
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          &::-webkit-scrollbar
            width 2px
          &::-webkit-scrollbar-thumb
            -webkit-box-shadow inset 0 0 5px rgba(0,0,0,0.2)
            background #00B3DC
            border-radius 7px
          &::-webkit-scrollbar-track
            -webkit-box-shadow inset 0 0 5px rgba(0,0,0,0.2)
            background-color #d8ebf4
            border-radius 7px
  .el-tree>>>.ishow
    visibility  hidden
    right 20px
    position absolute
    margin-top -7px
  /*.el-tree>>>.custom-tree-node .custom
      position relative
      padding-left 10px
  .el-tree>>>.custom-tree-node .custom::before
      content '├'
      position absolute
      top -1px
      left -3px*/
  .el-tree>>>.is-current .ishow
    visibility inherit
  .el-tree>>>.is-current
    background-color #f5f7fa
  .input-item
    line-height 36px
    padding-top 20px
    label
      margin 0 20px
    >>>.is-checked .el-checkbox__label
      color #606266
  .el-select >>> .el-input__inner
    height 36px
  .el-select >>> .el-input__icon
    line-height 36px
  .custom-item >>> .el-input__inner
    height 36px
  .textarea >>> .el-textarea__inner
    resize none
    height 110px
    background-color #f9f9fb
</style>
