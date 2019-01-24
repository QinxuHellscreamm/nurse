<template>
    <div>
      <div class='out-main' style="padding-top: 20px;">
        <div class='sort-box'>
          <el-button type='primary' class='serch-btn' @click="getAss" :disabled="patientAss.length!=0">病人评估</el-button>
          <div style="float: right;">
            <el-button type='primary' class='serch-btn add' @click="getAdd"  :disabled="patientAss.length==0">新增</el-button>
          </div>
        </div>
        <div style="padding-bottom: 20px;border-bottom: 1px dashed #D8E3E7;margin-bottom: 20px;">
          <el-table :data="patientAss" style="width: 100%" >
            <el-table-column  label="评估时间" min-width="120">
              <template slot-scope="{row}">
                <span>{{ row.ASSESS_TIME | stampTotime }}</span>
              </template>
            </el-table-column>
            <el-table-column :prop="item.prop" :label="item.label" v-for='(item,i) of columns_top' :key='i'></el-table-column>
          </el-table>
        </div>
        <div style="">
          <el-table :data="census" style="width: 100%">
            <el-table-column label="教育时间" prop="EDUCATION_TIME" min-width="120"></el-table-column>
            <el-table-column :label="item.label" :prop="item.prop" v-for='(item,i) of column_bottom' :key='i'></el-table-column>
            <el-table-column prop="" label="操作" width="240">
              <template slot-scope="{row}">
                <span @click="see(row)" class="ver-btn">查看</span>
                <span @click="del(row)" class="ver-btn">删除</span>
                <span @click="edit(row)" class="ver-btn">宣教评价</span>
                <span class="ver-btn" @click='printView(row)'>打印</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <assessment ref='assessment' :NAME="NAME" :INPATIENT_NUMBER="INPATIENT_NUMBER"></assessment>
      <add  ref='add' :INPATIENT_NUMBER="INPATIENT_NUMBER" :list_item='list_item'></add>
      <el-dialog :visible.sync="popshow" title='预览' width='1280px'>
        <div ref='print'>
          <div v-html='print_content'></div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click='popshow = false'>取消</el-button>
          <el-button @click="print" type='primary'>打印</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
  import assessment from './assessment'
  import add from './add'

    export default{
      components : { assessment ,add  },
      props: ['NAME','INPATIENT_NUMBER'],
      data(){
          return {
            popshow : false,
            patientAss: [],
            census : [],
            disabled : false,
            columns_top : [{prop:"CAREGIVERS",label:"照顾者"},{prop:"NEED_TRANSLATE",label:"需翻译"},{prop:"MENTALITY",label:"心理"},{prop:"LITERACY",label:"识字"},{prop:"AMNESIA",label:"失忆"},{prop:"RELIGION",label:"宗教/文化习俗"},{prop:"HEARING",label:"听力"},{prop:"LEFT_VISION",label:"视力(左)"},{prop:"RIGHT_VISION",label:"视力(右)"},{prop:"LANGUAGE_EXPRESS",label:"语言表达"},{prop:"IS_CAREGIVERS",label:"无照顾者"},{prop:"OTHER",label:"其他"}],
            column_bottom:[{prop:"EDUCATION_PROJECT",label:"教育项目"},{prop:"EDUCATION_OBJ",label:"教育对象"},{prop:"EDUCATION_OPP",label:"教育时机"},{prop:"EDUCATION_METHOD",label:"教育方法"},{prop:"EFFECT_EVALUATE",label:"效果评价"},{prop:"ASSESSER",label:"评价者"},{prop:"ASSESS_TIME",label:"评价时间"}],
            list_item : {},
            print_content : ''
          }
      },

      methods : {
        getAdd(){
          this.$refs.add.popshow = true
          this.$refs.add.title = '新增宣教'
        },
        see(row){
          this.$refs.add.popshow = true
          this.list_item = JSON.parse(JSON.stringify(row))
          this.$refs.add.title = '查看宣教'
        },
        edit(row){
          this.$refs.add.popshow = true
          this.list_item = JSON.parse(JSON.stringify(row))
          this.$refs.add.title = '编辑宣教'
        },
        del(row){
          console.log(row.id)
          this.$confirm('是否确定删除该条宣教内容?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
            this._delete("datacenter/education/"+row.ID,{id:row.ID}, res => {
              if(res.status == 204){
                this.$message({type: 'success', message: '删除成功!'})
                this.getData()
              }
            })
          })
        },
        getAss(){
          this.$refs.assessment.popshow = true
        },
        printView(row){
          console.log(row);
          this.print_content = row.EDUCATION_CONTENT
          this.popshow = true
        },
        print(){
          var LODOP = this.$getLodop()
          LODOP.PRINT_INIT("");
          LODOP.SET_PREVIEW_WINDOW(2);
          LODOP.SET_PRINT_PAGESIZE(1,"","","a4");
          LODOP.SET_PRINT_STYLE("FontSize",18);
          LODOP.SET_PRINT_STYLE("Bold",1);
          LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Auto-Width");
          LODOP.ADD_PRINT_HTM(20,20,'100%','100%',this.$refs.print.innerHTML);//xx ←边距 xx height
          LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED",1)
          LODOP.PREVIEW()
        },
        getData(){
          this.getSer('datacenter/education', {id:this.INPATIENT_NUMBER}, res => {
            this.patientAss = res.data.parent_assessment
            this.census = res.data.items
          })
        },
      },

      mounted(){
        this.$nextTick(()=>{
          this.getData()
        })
      },


    }
</script>
<style scoped lang='stylus'>
.out-main
  .sort-box
    .serch-btn
      padding 10px 32px !important
      background #00B3DC
      border-color #00B3DC
    .serch-btn.add
      background #11C462
      border-color #11C462
  .el-table::before
    height: 0px;
  &>>> .el-table thead th>div
    font-size 14px
</style>
