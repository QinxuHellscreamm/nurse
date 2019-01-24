<template>
    <div>
      <div class="out-top">
        <span>姓名</span>
        <input type="search" placeholder="姓名" @change="getData(1)"  class="out-input " v-model="title" />
        <span>工号</span>
        <input type="search" placeholder="工号" @change="getData(1)"  class="out-input " v-model="title"/>
        <el-button @change="getData()" type='primary'>搜索</el-button>
        <el-button type="success" @click="addItem()">新增</el-button>
      </div>
      <div class="out-main">
        <el-table :data="modelList" style="width: 100%">
          <el-table-column type="index" label="序号" width='100'></el-table-column>
          <el-table-column prop="ID" align="center" label="工号" min-width='100'></el-table-column>
          <el-table-column prop="NAME" label="姓名" align="center" min-width='100'></el-table-column>
          <el-table-column prop="ENGLISH" label="性别"  show-overflow-tooltip min-width='100'></el-table-column>
          <el-table-column prop="STAGE_COUNT" label="出生日期" min-width='100'></el-table-column>
          <el-table-column prop="SUM_DAYS" label="所在病区" min-width='100'></el-table-column>
          <el-table-column prop="SUM_DAYS" label="职称" min-width='100'></el-table-column>
          <el-table-column prop="SUM_DAYS" label="在职状态" min-width='100'></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="viewItem(scope.row.ID)" type="text" size="small">查看</el-button>
              <el-button @click="editItem(scope.row.ID)" type="text" size="small">编辑</el-button>
              <el-button @click="editItem(scope.row.ID)" type="text" size="small">调配</el-button>
              <el-button @click.native.prevent="deleteRow(scope.row.ID)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin:20px 0;">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="currentPage1"
            :page-size="20"
            layout="total, prev, pager, next, jumper"
            :total="adicsCount">
          </el-pagination>
        </div>
      </div>

    </div>
</template>
<script>
    export default{
        data(){
            return {
              modelList : [],//table
              pageSize:20,
              currentPage1 : 1,//当前页
              adicsCount : 0,
            }
        }
    }
</script>
<style scoped lang="stylus">
.out-top >>> .out-input
  width 200px
</style>
