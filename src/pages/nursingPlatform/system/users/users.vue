<template>
  <div>
    <div class="out-top">
      <el-input type="search" placeholder="用户姓名"  style="margin-right:10px" v-model="name" ></el-input>
      <el-input type="search" placeholder="登录账户名"  v-model="username" ></el-input>
      <el-select v-model="role_id" filterable placeholder="选择角色">
        <el-option
                v-for="item in role_list"
                :key="item.ID"
                :label="item.GROUP_NAME"
                :value="item.ID"
        >
        </el-option>
      </el-select>
      <el-button @click="getUsers()">搜索</el-button>
      <div style="display:inline-block;vertical-align:middle;float:right">
         <adduser @success="addok"></adduser>
      </div>
    </div>
    <div class="out-main users">
      <el-table :data='userData'>
        <el-table-column label="ID" prop="ID" min-width='40'></el-table-column>
        <el-table-column label="用户姓名" prop="REALNAME" min-width='80'></el-table-column>
        <el-table-column label="角色" prop="GROUP_NAME" min-width='80'></el-table-column>
        <el-table-column label="病区" prop="WARD_NAMES" min-width='80'></el-table-column>
        <el-table-column label="登录账户名" prop="USERNAME" min-width='80'></el-table-column>
        <el-table-column label="创建时间" prop="CREATED_AT" min-width='100'>
          <template slot-scope="{row}">
            <span>{{row.CREATED_AT | stampTotime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" prop="CREATED_USER_NAME" min-width='60'></el-table-column>
        <el-table-column label="状态" prop="STATUS" min-width='60'>
          <template slot-scope="{row}">
            <span>{{row.STATUS=="1" ? "使用中" : "停用"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width='80'>
          <template slot-scope="{row}">
            <div style="display:inline-block" class="marr20"><viewuser :moduleid="row.ID"></viewuser></div>
            <div style="display:inline-block" class="marr20" @click='edit(row.ID)'><button class="pop-btn">编辑</button></div>
            <span class="del" @click="deleteRow(row.ID,row.$index,userData)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin:4px 0;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="page_size"
          layout="total, prev, pager, next, jumper"
          :total="userCount">
        </el-pagination>
      </div>
      <edituser ref='edit'></edituser>
    </div>
  </div>
</template>
<script>
  import adduser from "./adduser.vue"
  import edituser from "./edituser.vue"
  import viewuser from "./viewuser.vue"
  export default{

    data() {
      return {
        name : "",
        username : "",
        userCount : 0,
        currentPage : 1,
        userData : [],
        page_size : 10,
          role_list:[],
          role_id:'',

      }
    },

    components : { adduser , edituser , viewuser },

    mounted(){
      this.$nextTick(() => {
        this.getUsers()
        this.getRoles()
      })
    },

    methods:{
      getUsers(){
        this.getSer("datacenter/nadmin",{page:this.currentPage,page_size:this.page_size,username:this.username,realname:this.name,role_id:this.role_id},(res)=>{
          this.userData = res.data.items
          this.userCount = parseInt(res.data.meta.totalCount);
        })
      },
      getRoles(){
          this.getSer("datacenter/role",{page:1,page_size:1000},(res)=>{
              this.role_list = res.data.items
          })
      },
      handleCurrentChange(val) {       //当前页变化的时候
        this.currentPage = val
        this.getUsers()
      },
      //删除列表行
      deleteRow(id){
        this.$confirm('是否删除该管理员?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this._delete('datacenter/nadmin/'+id,{id}, res => {
            if(res.status == 204){
                this.$message({type: 'success', message: '删除成功!'})
                this.getUsers()
            }else this.$message({type: 'error', message: '删除失败!'})
          })
        })
      },

      addok(){
        this.getUsers()
      },

      edit(id){
        this.$refs.edit.getDetail(id)
      }
    }
  }
</script>
<style scoped lang='stylus'>
  .el-input
    width 200px
  .el-button
    background-color #00B3DC
    margin-left 10px
    color #ffffff
  .users .mytable tr
    height 40px
    text-align left
  .user .mytable td
    height 40px !important

</style>
