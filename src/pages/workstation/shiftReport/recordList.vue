<template>
    <div style="font-size: 0;">
      <el-table :data="recordList" style="width: 100%;display: inline-block;vertical-align: top;">
        <el-table-column prop="ID" label="床号" ></el-table-column>
        <el-table-column prop="NAME" label="姓名" ></el-table-column>
        <el-table-column prop="SEX" label="性别"></el-table-column>
        <el-table-column prop="BIRTHDAY" label="年龄" >
          <!--<template slot-scope="{row}">
            <span>{{row.BIRTHDAY | stampTotime}}</span>
          </template>-->
        </el-table-column>
        <el-table-column prop="DIAGNOSTIC_RESULTS" label="出院诊断"></el-table-column>

        <el-table-column prop="RECORD1" :label="sheets[0].SH_ID">

        </el-table-column>
        <el-table-column prop="RECORD2" :label="sheets[1].SH_ID"></el-table-column>
        <el-table-column prop="RECORD3" :label="sheets[2].SH_ID"></el-table-column>
        <el-table-column prop="" label="操作" min-width="60">
          <template slot-scope="{row}">
            <span @click="edit(row)" class="ver-btn">编辑</span>
          </template>
        </el-table-column>
      </el-table>
      <ediShiftRecord ref='ediShiftRecord' :titleTexts='titleTexts'></ediShiftRecord>
    </div>
</template>
<script>
  import ediShiftRecord from './ediShiftRecord'
    export default{

      props :['recordList','titleText','ruleForm','recordSheet'],//sheet
        data(){
          return {
            titleTexts : '',
    /*        record_content:[{
              RECORD1:"1",
              RECORD2:"222",
              RECORD3:"333",
            }],*/

            recordLi: [{
              "ID": "11491",
              "NAME": "李美丽",
              "SEX": "女",
              "BIRTHDAY": "1999-06-12 00:04:15",
              "DIAGNOSTIC_RESULTS": null,
              RECORD1:"111",
              RECORD2:"222",
              RECORD3:"333",
              "record_content": [
              {
                "RE_ID": "35",
                "PATIENT_ID": "11491",
                "SHEET_ID": "25",
                "RECORD": "注意血压的变化111",
                "RE_NAME": "早班"
              },
              {
                "RE_ID": "38",
                "PATIENT_ID": "11491",
                "SHEET_ID": "29",
                "RECORD": "注意血压的变化",
                "RE_NAME": "小夜班"
              },
                {
                  "RE_ID": "38",
                  "PATIENT_ID": "11491",
                  "SHEET_ID": "23",
                  "RECORD": "注意血压的变化",
                  "RE_NAME": "小夜班"
                }
            ]},
              {
                "ID": "11491",
                "NAME": "李美丽2",
                "SEX": "女",
                "BIRTHDAY": "1999-06-12 00:04:15",
                "DIAGNOSTIC_RESULTS": null,
                "record_content": [
                  {
                    "RE_ID": "35",
                    "PATIENT_ID": "11491",
                    "SHEET_ID": "25",
                    "RECORD": "注意血压222的变化111",
                    "RE_NAME": "早班"
                  },
                  {
                    "RE_ID": "38",
                    "PATIENT_ID": "11491",
                    "SHEET_ID": "29",
                    "RECORD": "注意血压的变化2222",
                    "RE_NAME": "小夜班"
                  },
                  {
                    "RE_ID": "38",
                    "PATIENT_ID": "11491",
                    "SHEET_ID": "23",
                    "RECORD": "注意血压2222的变化",
                    "RE_NAME": "小夜班"
                  }
                ]},
            ],
            sheets: [
              {
                "SH_ID": "",
                "SCHEDULE_DATE": "",
                "SHEET_SORT": "",
                "ROWNUMID": ""
              },
              {
                "SH_ID": "",
                "SCHEDULE_DATE": "",
                "SHEET_SORT": "",
                "ROWNUMID": ""
              },
              {
                "SH_ID": "",
                "SCHEDULE_DATE": "",
                "SHEET_SORT": "",
                "ROWNUMID": ""
              }
            ],

          }
        },
      components:{ ediShiftRecord },
      methods:{

        grtDatas(){
          console.log("q211211",this.ruleForm)
          this.titleTexts = this.titleText




        },

        edit(item){
          //this.$refs.child.getData(item)
          this.$refs.ediShiftRecord.popshows = true
        }

      },

      mounted(){
        this.$nextTick(()=>{
          console.log("88888888",this.ruleForm)
          this.grtDatas()
        })
      },
    }
</script>
<style scoped>

</style>
