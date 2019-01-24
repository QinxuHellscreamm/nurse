<template>
  <div>
    <div class="out-top">
      <input type="search" placeholder="搜索角色名" class="out-input" v-model="rolename" @blur="searchList()">
      <button class="btn-small" @click="searchList()">搜索</button>
      <div style="display:inline-block;vertical-align:middle;float:right">
        <addrole></addrole>
      </div>
    </div>
    <div class="out-main">
      <el-table :data='roleData'>
        <el-table-column label="ID" prop="ID" min-width='40'></el-table-column>
        <el-table-column label="角色名称" prop="GROUP_NAME" min-width='40'></el-table-column>
        <el-table-column label="备注" prop="REMARK" min-width='40'></el-table-column>
        <el-table-column label="创建时间" prop="CREATE_TIME" min-width='40'></el-table-column>
        <el-table-column label="添加人" prop="PLUG_NAME" min-width='40'></el-table-column>
        <el-table-column label="操作" min-width='40'>
          <template slot-scope="{row}">
            <!--<div style="display:inline-block" class="marr20">-->
              <!--<viewrole :role_name="row.GROUP_NAME" :remark="row.REMARK"></viewrole>-->
            <!--</div>-->
            <div style="display:inline-block" class="marr20">
              <button @click="editShow(row)" class="pop-btn">编辑</button>
            </div>
            <span class="del" @click="deleteRow(row.ID)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin:20px 0;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="page_size"
          layout="total, prev, pager, next, jumper"
          :total="roleCount">
        </el-pagination>
      </div>
    </div>
    <editrole ref='editrole'></editrole>
  </div>
</template>
<script>
  import addrole from "./addrole.vue"
  import viewrole from "./viewrole.vue"
  import editrole from "./editrole.vue"
  export default{
    data() {
      return {
        rolename : "",
        roleCount : 0,
        currentPage : 1,
        page_size : 20,
        roleData : []
      };
    },

    components : { addrole , viewrole , editrole},

    mounted(){
      this.$nextTick(()=>{
        this.getList()
      })
    },

    methods:{
      getList(){
        this.getSer("datacenter/role",{"role_name":this.trim(this.rolename), "page":this.currentPage, "page_size" : this.page_size}, res=>{
          this.roleCount = parseInt(res.data.meta.totalCount)
          this.roleData = res.data.items
        })
      },
      searchList()
      {
          this.currentPage = 1;
          this.getList();
      },
      handleCurrentChange(val) {       //当前页变化的时候
        this.currentPage = val;
        this.getList();
      },
      editShow(row){
        this.$refs.editrole.editShow(row)
      },
      //删除列表行
      deleteRow(id){
        this.$confirm('是否删除该角色?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this._delete('datacenter/role/'+id,{id}, res => {
          console.log(res.status);
          if(res.status == 204){
              this.$message({type: 'success', message: '删除成功!'});
              this.getList();
          }
          })
        })
      },
    }
  }
</script>
