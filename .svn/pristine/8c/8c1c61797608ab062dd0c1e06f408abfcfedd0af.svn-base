<template>
  <div>
    <div style='margin:0 20px'>
      <div class="pro-top">
        <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
        <span style="padding: 0 20px;">请选择医嘱类型(必选项)</span>
        <el-radio-group v-model="radioWhole">
          <el-radio :label="1">全部</el-radio>
          <el-radio :label="2">新医嘱</el-radio>
          <el-radio :label="3">修改医嘱</el-radio>
        </el-radio-group>
        <span style="padding: 0 20px;color: #D8E3E7">|</span>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="药品"></el-checkbox>
          <el-checkbox label="检查"></el-checkbox>
          <el-checkbox label="检验"></el-checkbox>
          <el-checkbox label="治疗"></el-checkbox>
          <el-checkbox label="其他"></el-checkbox>
        </el-checkbox-group>
        <span style="padding: 0 20px;color: #D8E3E7">|</span>
        <el-radio-group v-model="order">
          <el-radio :label="4">长期医嘱</el-radio>
          <el-radio :label="5">临时医嘱</el-radio>
        </el-radio-group>
        <el-button size="small"  type="primary" @click='getData' style="margin-left: 20px;padding: 9px 25px;">搜索</el-button>
      </div>
      <div>
        <div class="pro-le">
          <div style="line-height: 50px;background: #F9F9FB;">
            <el-select v-model="value2" placeholder="全部科室" size="small">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
              </el-option>
            </el-select>
            <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
            <el-button icon="el-icon-search" type="primary"  size="mini"></el-button>
          </div>

          <el-table
            border
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              min-width="32">
            </el-table-column>
            <el-table-column
              label="床号"
              min-width="52">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              min-width="84">
            </el-table-column>
            <el-table-column
              prop="address"
              label="科室"
              min-width="110"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>

      </div>
      <detailedList :selecData="selecData"></detailedList>
    </div>
  </div>
</template>
<script>
  import detailedList from './detailedList'
  import record from './record'

  export default{

    components:{ detailedList },

    data(){
      return {
        radioWhole:1,
        order: "",
        input: "",
        checkList: [''],
        tableData3: [{
          date: '20',
          name: '王小',
          address: '上海'
        }, {
          date: '201',
          name: '王小',
          address: '上海'
        }, {
          date: '201',
          name: '王小',
          address: '上弄'
        }, {
          date: '2001',
          name: '王虎',
          address: '上弄'
        }, {
          date: '2018',
          name: '王虎',
          address: '上弄'
        }, {
          date: '206',
          name: '王虎',
          address: '上海'
        }, {
          date: '207',
          name: '王虎',
          address: '上弄'
        }],
        selecData:[],

      }
    },

    mounted(){
      this.$nextTick(()=> {
        this.getData();
    })
    },

    methods: {
      //获取列表
      /*  getData(){
       let obj = {
       'bed_number' : this.bed_number ,
       'advice_type' : this.advice_type ,
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
       },*/

      handleSelectionChange(val) {
        console.log(val)
        this.selecData = val;
      }
    },


  }
</script>
<style scoped lang='stylus'>
  .pro-top
    margin 20px 0 0
    background #fff
    height 50px
    line-height 50px
    border-bottom 1px solid #D8E3E7
    .el-input
      width 200px
      margin-left 10px
    .el-checkbox-group
      display inline-block
  .pro-le
    float left
    width 20%
    min-height 500px
    background #fff
    .el-select
      width 110px
      margin-left 10px
    .el-input
      width 100px
    .el-table >>> .has-gutter tr th
      background #DDEFF9
      padding 3px 0
      border-right 1px solid #A5DDE9
    .el-table >>> .el-table__body-wrapper tr td
      padding 3px 0
    .el-table >>> .el-table__row tr td
      border-right none

</style>
