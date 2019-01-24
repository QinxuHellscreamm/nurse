<template>
  <div style="margin-top: 20px;" class="assess">
    <div class="realmin" >
      <div class="out-top">
        <span>时间</span>
        <el-date-picker
          v-model="start_end_time"
          type="date"
          value-format='yyyy-MM-dd'
          format="yyyy-MM-dd">
        </el-date-picker>
        <span>病区</span>
        <el-select v-model="department" filterable placeholder="病区" @change="getID">
          <el-option
            v-for="item in wardTes"
            :key="item.ID"
            :label="item.NAME"
            :value="item">
          </el-option>
        </el-select>
        <el-button type='primary' @click="pageAjax()">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="病区"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="床位"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="实际开放床位">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        start_end_time:'',
        tableData: [{
          date: '一病区',
          name: '30',
          address: '30'
        }, {
          date: '二病区',
          name: '50',
          address: '30'
        }]
      }
    }
  }
</script>
<style scoped  lang="stylus">
.assess
  padding 0 40px;
  height calc(100% - 60px)
  overflow-y scroll
  .realmin
    background #fff
    padding 5px 20px
    width 100%
    box-shadow 0 0 10px 0 rgba(0,0,0,0.04)
    border-radius 4px
    box-sizing border-box
</style>
