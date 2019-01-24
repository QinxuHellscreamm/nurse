<template>
  <div>
    <button @click="addrole"  class="btn-small color-green">新增</button>
    <el-dialog :title="name" :visible.sync="popshow" width='660px'>
      <div class="rolecon add-item">
        <div>
          <div style="margin-bottom:20px;">
            <span class="span-role">角色名</span>
            <input type="text" placeholder="限10字" class="inp-role" v-model="groupName">
          </div>
          <div style="margin-bottom:20px;">
            <span class="span-role">角色等级</span>
            <select name="" v-model="RANK">
              <i class="el-icon-caret-bottom"></i>
              <option v-for="(item,index) of rankArr" :key="item.rank_name" :value="item.id" >{{ item.rank_name }}</option>
            </select>
          </div>
          <div>
            <span class="span-role">备注</span>
            <textarea name="" cols="30" rows="10" placeholder="限20个字符" class="text-role" v-model="remark"></textarea>
          </div>
        </div>
        <div>
          <span class="span-role">权限</span>
          <div class="rolebox">
            <el-tree
              :data="nurse_auth"
              show-checkbox
              node-key="ID"
              ref="tree_nurse"
              highlight-current
              :props="defaultProps"
            >
            </el-tree>
            <el-tree
              :data="nurse_manage_auth"
              show-checkbox
              node-key="ID"
              ref="tree_nurse_manage"
              highlight-current
              :props="defaultProps"
            >
            </el-tree>
            <el-tree
              :data="manage_auth"
              show-checkbox
              node-key="ID"
              ref="tree_manage"
              highlight-current
              :props="defaultProps"
            >
            </el-tree>
          </div>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="popshow=false">取 消</el-button>
        <el-button @click="saverole">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  export default{
    props:["moduleid"],
    data(){
      return {
        name:"新增",
        rankArr : [{'rank_name' : '护士' , "id" : '1'},{'rank_name' : '护士长' , "id" : '2'},{'rank_name' : '护理部' , "id" : '3'},{'rank_name' : '超级管理员' , "id" : '4'}],
        popshow:false,
        groupName:"",
        remark:"",
        RANK:1,
        acl:"",
        nurse_auth: [],
        nurse_manage_auth: [],
        manage_auth: [],
        auths:[],
        defaultProps: {
          children: '_child',
          label: 'TITLE',
          id: 'ID'
        }
      }
    },
    methods:{
      addrole(){
        this.popshow = true
        this.auths = {}
        this.groupName = ''
        this.remark = ''
        this.getSer("datacenter/auth/authforrole" , [] ,  res=>{
          this.nurse_auth = res.data.nurse_auth
          this.nurse_manage_auth = res.data.nurse_manage_auth
          this.manage_auth = res.data.manage_auth
        })
      },
      saverole(){

        let arr_nurse = this.$refs.tree_nurse.getCheckedNodes()
        let auths_nurse = [];
        arr_nurse.forEach(item=>{
            auths_nurse.push(item.ID)
        })
        let arr_nurse_manage = this.$refs.tree_nurse_manage.getCheckedNodes()
        let auths_nurse_manage = [];
        arr_nurse_manage.forEach(item=>{
            auths_nurse_manage.push(item.ID)
        })
        let arr_manage = this.$refs.tree_manage.getCheckedNodes()
        let auths_manage = [];
        arr_manage.forEach(item=>{
            auths_manage.push(item.ID)
        })

          this.auths = {'work_station': auths_nurse,'manage' : auths_nurse_manage,'systerm' : auths_manage};

          if (this.groupName == '')
          {
            this.$message({type : 'warning',message : '角色名称不能为空'});
            return
          }
          if(this.groupName.length > 10){
            this.$message({type : 'warning',message : '角色名称不能超过10个字'});
            return
          }
          if (this.remark == '')
          {
              this.$message({type : 'warning',message : '备注不能为空'});
              return
          }
          if ( ! this.auths)
          {
              this.$message({type : 'warning',message : '权限不能为空'});
              return
          }
        this.post("datacenter/role" , { GROUP_NAME : this.groupName , ACL : JSON.stringify(this.auths), REMARK : this.remark, RANK : this.RANK },res => {
            console.log(res.status)
          if (res.status == 201)
          {
              this.groupName = ''
              this.remark = ''
              this.RANK = 1
              this.popshow =! this.popshow
              this.$message({type: 'success', message: '新增成功!'});
          }
          else {
              this.$message({type : 'warning',message : res.data.message});
              return
          }
        })
        this.$parent.getList()
      }
    }
  }
</script>
<style scoped lang='stylus'>

</style>
