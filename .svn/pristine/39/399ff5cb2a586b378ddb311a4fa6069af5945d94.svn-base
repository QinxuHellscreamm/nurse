<template>
  <el-dialog :visible.sync="popshow" width='850px' class='custom'>
    <div slot='title'>
      <span class="el-dialog__title" v-if=' type == "add" '>{{titleText}}</span>
      <button type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button>
    </div>
    <div class="leftAdd">
      <el-table
        :data="tableData"
        :show-header="false"
        @row-click="openDetails"
        style="width: 100%">
        <el-table-column
          prop="NAME"
          label="病人类型">
        </el-table-column>
      </el-table>
    </div>
    <div class="recoNum">
      <div style="padding: 10px;">
        <el-input v-model="recoNum" placeholder="请输入内容" @blur="wardNum"></el-input>
      </div>
      <ul class="wardNumList">
        <li v-for='(item,index) of patientList' :key='index' :class="{'active':index==current}">
          <p @click='patTar(index,item)' class="patTar">
            <span>{{item.BED_NUMBER}}</span>
            <span>{{item.NAME}}</span>
            <span>{{item.SEX}}</span>
            <span>{{item.AGE}}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="rightre">
      <p style="float: right;    line-height: 36px;"><el-button type="text" @click="save">PDA交班记录</el-button></p>
      <div>
        <ul>
          <li v-for="(item,index) of getrecord">
            <p style="font-size: 16px;line-height: 36px;">{{item.SHEET_NAME}}</p>
            <el-input :disabled="index != '2'" :readonly="readonly" type="textarea" :rows="2" :autosize="{ minRows: 2, maxRows: 4}" placeholder="" v-model="item.RECORD"></el-input>
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
            getrecord:[

            ],
            addrecord:[],
            readonly: false,
            seachinput:'',

          }
        },


      methods:{

        wardNum(val){
          console.log("val",this.recoNum)
          this.getSer("datacenter/changeshift/patient" ,{
            type:this.seachinput,
            number:this.recoNum,
            war_id:this.war_id,
          }, (res) => {
            console.log("病人列表筛选",res)
          this.patientList = res.data.items
        })
        },
        grtData(){
          this.getSer("datacenter/changeshift/states" ,{}, (res) => {
            console.log("班的序号",this.SHEET_ID)
          this.tableData = res.data.items
          this.dateTime =  this.date
          this.war_id = this.$store.state.userinfo.ward_id
          this.tableData.unshift({NAME:"全部",TYPE:''})
          console.log("病区id", this.tableData)
        })
        this.openDetails()
        },
        openDetails(row) {
          console.log(row)
          if(row==undefined){
            this.seachinput = ""
          }else {
            this.seachinput = row.TYPE
          }
          this.getSer("datacenter/changeshift/patient" ,{
            type:this.seachinput,
            number:this.recoNum,
            war_id:this.$store.state.userinfo.ward_id,
          }, (res) => {
            console.log("病人列表筛选",res)
          this.patientList = res.data.items
        })
        },
        patTar(index,item){
          console.log(item)
          this.current=index;
          this.pa_id=item.ID;
          this.getSer("datacenter/changeshift/getrecord" ,{
            stamp:this.date,
            sort:this.sort,
            pa_id:this.pa_id,
            war_id:this.$store.state.userinfo.ward_id,
          }, res => {
            this.getrecord = res.data.items.reverse()
        })
        },
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


      },

      mounted(){
        this.$nextTick(()=>{
        //  this.grtData()

      })
      },
    }
</script>

<style scoped lang='stylus'>
  .custom
    &>>>.el-dialog__header
      padding 16px 20px
    &>>>.el-dialog__body
      padding 0px
    &>>>.el-dialog__title
      color #2B3A50
      font-weight bold
    .recoNum
      display inline-block
      width 230px
      vertical-align top
      border-right 1px solid #D8E3E7
      border-top 1px solid #D8E3E7
      ul li
        cursor pointer
      .active
        background #00B3DC
        color #fff
      &>>>.el-input .el-input__inner
        background #F9F9FB
      .patTar
        text-align center
        border-bottom 1px solid #EEEEEE
        line-height 35px
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
    .leftAdd
      width 130px
      border 1px solid #D8E3E7
      display inline-block
      vertical-align top
      margin-right -4px
      border-left none
      .el-table >>>.el-table__body-wrapper tr td
        cursor pointer
        border-bottom 1px solid #eee
        .cell
          text-align center
          padding 3px 5px
      .el-table >>>.el-table__body-wrapper .current-row>td
        background-color #00B3DC
        color #fff
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
