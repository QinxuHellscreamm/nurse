<template>
  <div>
    <button @click="popshow = !popshow"  class="pop-btn">查看</button>
    <el-dialog :title="name" :visible.sync="popshow" width='660px'>
      <div class="rolecon">
        <div>
          <div style="margin-bottom:20px;">
            <span class="span-role">角色名</span>
            <input type="text" placeholder="护士" class="inp-role" disabled v-model="role_name">
          </div>
          <div>
            <span class="span-role">备注</span>
            <textarea name="" cols="30" rows="10" placeholder="无" class="text-role" disabled v-model="remark"></textarea>
          </div>
        </div>
        <div>
          <span class="span-role">权限</span>
          <div class="rolebox">
            <el-tree
              :data="data2"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[1,17,2,5]"
              :default-checked-keys="[4,11,5]"
              :props="defaultProps">
            </el-tree>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <button class="btn-pop-sure"  @click="popshow = false">确定</button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  export default{

    props:["moduleid","role_name","remark"],

    data(){
      return {
        name:"查看",
        popshow:false,
        data2: [{
          id: 1,
          label: '病区总览',
          children: [{
            id: 4,
            label: '在院病人',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          },{
            id: 11,
            label: '出院病人',
            children: [{
              id: 12,
              label: '三级 1-1-1'
            }, {
              id: 13,
              label: '三级 1-1-2'
            }]
          },{
            id: 14,
            label: '授权病人',
            children: [{
              id:15,
              label: '三级 1-1-1'
            }, {
              id: 16,
              label: '三级 1-1-2'
            }]
          },{
            id: 17,
            label: '护理文书',
            children: [{
              id: 18,
              label: '新增护理文书'
            }, {
              id: 19,
              label: '修改本人护理文书'
            },
              {
                id: 20,
                label: '修改他人护理文书'
              }]
          }]
        }, {
          id: 2,
          label: '护理管理',
          children: [{
            id: 5,
            label: '护士排班',
            children:[{
              id:21,
              label:'新增排班'
            },{
              id:22,
              label:'审核排班'
            },{
              id:23,
              label:'修改审核后排班'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    }
  }
</script>
<style scoped lang='stylus'>
</style>
