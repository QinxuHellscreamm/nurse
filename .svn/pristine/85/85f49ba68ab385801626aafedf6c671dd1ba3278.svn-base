<template>
  <div>
    <el-dialog :title="name" :visible.sync="popshow" width='660px'>
      <div class="rolecon add-item">
        <div>
          <div style="margin-bottom:20px;">
            <span class="span-role">角色名</span>
            <input type="text" placeholder="护士" class="inp-role" v-model="GROUP_NAME">
          </div>
          <div style="margin-bottom:20px;">
            <span class="span-role">角色等级</span>
            <select name="roles" v-model="RANK">
              <i class="el-icon-caret-bottom"></i>
              <option v-for="(item,index) of rankArr" :key="item.rank_name" :value="item.id" >{{item.rank_name}}</option>
            </select>
          </div>
          <div>
            <span class="span-role">备注</span>
            <textarea name="" cols="30" rows="10" placeholder="无" class="text-role" v-model="REMARK"></textarea>
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
              v-if="flag"
              :default-checked-keys = 'checked_keys_nurse'
            >
            </el-tree>
            <el-tree
              :data="nurse_manage_auth"
              show-checkbox
              node-key="ID"
              ref="tree_nurse_manage"
              highlight-current
              :props="defaultProps"
              v-if="flag"
              :default-checked-keys = 'checked_keys_nurse_manage'
            >
            </el-tree>
            <el-tree
              :data="manage_auth"
              show-checkbox
              node-key="ID"
              ref="tree_manage"
              highlight-current
              :props="defaultProps"
              v-if="flag"
              :default-checked-keys = 'checked_keys_manage'
            >
            </el-tree>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <button class="btn-pop-sure"  @click="saverole">确定</button>
        <button class="btn-pop-cancel" @click="popshow=false">取消</button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default{

    data(){
      return {
        name : "编辑",
        ID : 0,
          flag:false,
        GROUP_NAME : "123123",
        RANK : "",
        REMARK : "",
        rankArr : [{'rank_name' : '护士' , "id" : '1'},{'rank_name' : '护士长' , "id" : '2'},{'rank_name' : '护理部' , "id" : '3'},{'rank_name' : '超级管理员' , "id" : '4'}],
        popshow : false,
        row : {},
        nurse_auth: [],
        nurse_manage_auth: [],
        manage_auth: [],
        auths:[],
        checked_keys_nurse: [],
        checked_keys_nurse_manage: [],
        checked_keys_manage: [],
        defaultProps: {
            children: '_child',
            label: 'TITLE',
            id: 'ID'
        }
      }
    },

    methods:{
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

           if (!this.GROUP_NAME)
           {
               console.log('GROUP_NAME is ')
               console.log(this.GROUP_NAME)
               return
           }
         this._put('datacenter/role/' + this.ID,{id : this.ID , GROUP_NAME : this.GROUP_NAME, RANK : this.RANK , ACL : JSON.stringify(this.auths),REMARK : this.REMARK}, res=>{
             console.log(res)
            if(res.status == 201){
                this.popshow = !this.popshow;
                this.$message({ message : res.data.message , duration : 1000 , type : 'success'})
                this.$parent.getList()
            }else this.$message(res.data.message)
         })
       },
      editShow(row){
        console.log(row);
        this.popshow = true
        this.getSer("datacenter/auth/authforrole" , [] ,  res=>{
            this.nurse_auth = res.data.nurse_auth
            this.nurse_manage_auth = res.data.nurse_manage_auth
            this.manage_auth = res.data.manage_auth
        })
          this.flag = false
        this.getSer("datacenter/role/" + row.ID, {'id': row.ID} ,  res=>{
            this.ID = row.ID
            this.GROUP_NAME = res.data.GROUP_NAME
            this.RANK = res.data.RANK
            this.REMARK = res.data.REMARK
            let checked_keys = JSON.parse(res.data.ACL)
            this.checked_keys_nurse = checked_keys.work_station
            this.checked_keys_nurse_manage = checked_keys.manage
            this.checked_keys_manage = checked_keys.systerm
            this.flag = true
        })
      }
    }
  }
</script>
<style scoped lang='stylus'>

</style>
