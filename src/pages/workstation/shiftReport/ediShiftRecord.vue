<template>
  <el-dialog :visible.sync="popshow" width='712px' class='custom'>
    <div slot='title'>
      <span class="el-dialog__title" v-if=' type == "add" '>{{titleText}}</span>
      <button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button>
    </div>
    <div style="display: inline-block;width: 230px;vertical-align: top;border-right: 1px solid #D8E3E7;border-top: 1px solid #D8E3E7;" class="recoNum">
      <ul class="wardNumList">
        <li class="active">
          <p  class="patTar">
            <span>{{patientList.ID}}</span>
            <span>{{patientList.NAME}}</span>
            <span>{{patientList.SEX}}</span>
            <span>{{patientList.AGE}}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="rightre">
      <p style="float: right;line-height: 36px;"><el-button type="text" @click="save">PDA交班记录</el-button></p>
      <div>
        <ul>
          <li v-for="(item,index) of getrecord">
            <p style="font-size: 16px;line-height: 36px;">{{item.SHEET_NAME}}</p>
            <el-input :disabled="index != '2'" :readonly="readonly" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :rows="2" placeholder="" v-model="item.RECORD"></el-input>
            <span>{{item.UPDATE_AT}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.NURSE_NAME}}</span>
          </li>
        </ul>
      </div>
      <PDAShiftRecord ref='PDAShif' :dateTime="dateTime" :pa_id="pa_id"></PDAShiftRecord>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="popshow = false">取 消</el-button>
        <el-button type="primary" @click="addNewGrant">确 定</el-button>
    </span>

  </el-dialog>
</template>

<script>
  import PDAShiftRecord from "./PDAShiftRecord.vue"
  export default {
    components : { PDAShiftRecord },
    name: "addShiftRecord",

    props :['titleText','date','sort','SHEET_ID'],

    data(){
      return{
        current:-1,
        popshow : false,
        type : 'add',
        recoNum : '',
        dateTime : '',
        pa_id:'',
        textareaA:'',
        tableData: [],
        patientList: [],
        war_id:'',
        getrecord:[],
        addrecord:[],
        readonly: false,
        seachinput:'',
      }
    },

    methods:{
      save(){
        this.$refs.PDAShif.init()
      },
      addNewGrant(){
        const admin_id = decodeURIComponent(this.getCookieVal("nurse_id"))
        this.getrecord.forEach(res => {
          if(res.RE_ID == undefined){
          res.RE_ID = ""
        }
      })
        let obj = {
          ID : this.getrecord[2].RE_ID,
          PATIENT_ID : this.pa_id,
          SCHED_ID:this.getrecord[2].ID,
          SHEET_ID : this.getrecord[2].SHEET_ID,
          NURSE_ID : admin_id,
          RECORD : this.getrecord[2].RECORD,
        }

        this.post('datacenter/changeshift' , {
          data:JSON.stringify(obj)
        } , res => {
          if(res.data.status=="201"){
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
          this.$parent.getData()
          this.popshow = false
        }
      })
      },

      edigrtData(val){
        console.log("编辑1",val)
        this.patientList = val
        this.dateTime =  this.date
        this.pa_id = val.ID
        console.log("dddd22",this.dateTime,this.pa_id)
        this.patTar()
      },
      patTar(){
        this.getSer("datacenter/changeshift/getrecord" ,{
          stamp:this.date,
          sort:this.sort,
          pa_id:this.patientList.ID,
          war_id:this.$store.state.userinfo.ward_id,
        }, (res) => {
          this.getrecord = res.data.items.reverse()
        console.log("交班报告-编辑/新增--某患者交班记录",this.getrecord)
      })
      },
    },

    mounted(){
      this.$nextTick(()=>{

    })
    },
  }
</script>
<style scoped lang='stylus'>
  .custom
    &>>>.el-dialog__header
      padding 20px 20px 10px
    &>>>.el-dialog__body
      padding 10px 20px
    &>>>.el-dialog__title
      color #2B3A50
      font-weight bold
    .recoNum
      .active
        background #00B3DC
        color #fff
      &>>>.el-input .el-input__inner
        background #F9F9FB
      .patTar
        text-align center
        border-bottom 1px solid #EEEEEE
        line-height 36px
      .wardNumList
        max-height 500px
        overflow auto
      &>>> ::-webkit-scrollbar
        height 8px
        width 8px
      &>>>  ::-webkit-scrollbar-track
        background-color #dff4f9
      &>>>  ::-webkit-scrollbar-thumb
        background-color #00B3DC
        border-radius 10px
  .dialog-footer button
    padding 12px 20px !important
  .rightre
    display inline-block
    width 420px
    vertical-align top
    margin-left -4px
    border-top 1px solid #D8E3E7
    padding 10px
    &>>> .el-textarea__inner
      background #F9F9FB

</style>
