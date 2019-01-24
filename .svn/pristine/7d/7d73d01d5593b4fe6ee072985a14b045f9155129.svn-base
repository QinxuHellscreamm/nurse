<template>
    <div style="margin: 0 20px;">
      <div class="out-top">
        <input type="search" v-model="bed_number"  placeholder="请输入病人姓名" class="out-input">
        <el-date-picker style="margin-left:10px"
          v-model="start_end_time"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions2">
        </el-date-picker>
        <button class="btn-small" @click="getData(1,'9')">搜索</button>
      </div>
      <div class="out-main">
        <el-table :data="outPatData">
          <el-table-column prop="BED_NUMBER" fixed label="床号" width="80"></el-table-column>
          <el-table-column prop="NAME" label="姓名" width="100">
            <template slot-scope="{row}">
              <el-button @click="go(row)" type="text">{{row.NAME}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="SEX" label="性别" width="80"></el-table-column>
          <el-table-column prop="AGE" label="年龄" width="80"></el-table-column>
          <el-table-column prop="MEDICAL_RECORD_NUM" label="住院号" width="120"></el-table-column>
          <el-table-column prop="DOCTOR" label="主治医生" width="100"></el-table-column>
          <el-table-column label="入院日期" width="164">
            <template slot-scope="{row}"><div>{{row.HOSPITALIZED_DATE | stampTotime}}</div></template>
          </el-table-column>
          <el-table-column label="出院日期" width="164">
            <template slot-scope="{row}"><div>{{row.OUTHOSPITAL_DATE | stampTotime}}</div></template>
          </el-table-column>
          <el-table-column prop="CONTACT_NUMBER" label="电话" width="120"></el-table-column>
          <el-table-column prop="WARD_NAME" label="病区" width="100"></el-table-column>
          <el-table-column prop="DEPARTMENT" label="科室" width="100"></el-table-column>
          <el-table-column prop="OUTHOSPITAL_DIAGNOSIS" label="出院诊断" width="100"></el-table-column>
        </el-table>
        <div style="margin:20px 0;">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="20"
            layout="total, prev, pager, next, jumper"
            :total="adicsCount">
          </el-pagination>
        </div>
      </div>
    </div>
</template>
<script>
    import ElButton from "../../../../node_modules/element-ui/packages/button/src/button";
    export default{
        components: {ElButton},
        data() {
        return {
          currentPage : 1,
          adicsCount : 0,
          pickerOptions2: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
          bed_number: '',
          start_end_time: '',
          value7: '',
          outPatData: [
          ]
        };
      },
      mounted(){
        this.$nextTick(()=> {
          this.getData('',1);
        })
      },
      methods: {
            //获取列表
         getData(){
             let obj = {
               'bed_number' : this.bed_number ,
               'start_time' : (this.start_end_time ? this.start_end_time[0] : '') ,
               'end_time' : (this.start_end_time ? this.start_end_time[1] : '') ,
               'page' : this.currentPage
             }
             this.getSer("datacenter/outhospital", obj, (res) => {
               if(res.status <= 400){
                 this.adicsCount = res.data.meta.totalCount
                 this.outPatData = res.data.items;
               }
             })
           },
         //当前页发生改变的时候
         handleCurrentChange(val) {
           this.currentPage = val
           this.getData();
         },
          go(row){
              console.log(row);
              this.$parent.judgePath({title : '出院-'+row.NAME , path : '/workstation/patientDOC/' + row.ID , name:'patientDOC' , id : row.ID})
              this.$router.push('/workstation/patientDOC/'+row.ID)
          }
      }
    }
</script>
<style scoped>
  .btn-small{
    display:inline-block;
    width:96px;
    height:40px;
    line-height:40px;
    margin-left:20px;
    background: #00B3DC;
    border-radius: 4px;
    color:#fff;
  }
  .out-main{
    padding: 5px 0;

  }

</style>
