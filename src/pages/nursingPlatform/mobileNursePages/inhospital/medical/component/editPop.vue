<template>
  <div>
    <el-dialog :visible.sync="popshow" :title='name' width='730px'>

      <el-table :data='module_type_data' border>
        <el-table-column  label="医嘱类别"  min-width="60">
          <template slot-scope="scope">
            <el-select v-if='scope.row.detail_content.add == true' v-model='scope.row.detail_content.his_advice_id' @change='doctorsOrderChange(scope.row)' >
              <el-option v-for="item in doctorsOrder"  :key="item.ID"  :label="item.NAME" :value="item.ID"></el-option>
            </el-select>
            <span v-if='!scope.row.detail_content.add'>{{ scope.row.detail_content.his_advice_name }}</span>
          </template>
        </el-table-column>
        <el-table-column  label="用药途径"  min-width="60">
          <template slot-scope="scope">
            <span>{{scope.row.detail_content.chose_me_advice_desc}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="操作" min-width="60">
          <template slot-scope="scope">
            <el-button type='text' v-if='scope.row.detail_content.his_way_by_hisadviceid.length != 0' @click='editUseDrug(scope.row)'>编辑</el-button>
            <el-button type='text' @click='delAdvice(scope.$index)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <span class="tip" v-if="tipshow">西药医嘱类别必须选择用药途径</span>
      <div slot="footer" class="dialog-footer">
        <el-button><i class="el-icon-circle-plus" @click="addNew"></i><span>新增</span></el-button>
        <button class="btn-pop-cancel" @click="popshow = false">取消</button>
        <button class="btn-pop-sure"  @click="editSure">确定</button>
      </div>
      <addAdviceWay ref='child'></addAdviceWay>
    </el-dialog>

  </div>
</template>
<script>
  import addAdviceWay from "./addAdviceWay.vue"
  export default{

    data(){
      return {
        id:"",      //自有医嘱id
        tipshow : false,    //是否显示红色提示
        popshow : false,     //是否显示弹框
        name : '',
        doctorsOrder : [],
        doctorsOrder2 : [],
        module_type_data:[],
      }
    },

    components:{addAdviceWay},

    methods:{
      getAdviceDe(row){     //点击编辑，显示详情
        this.popshow = !this.popshow;
        this.name = row.module_type_name
        this.id = row.id
        this.getSer("datacenter/advice/"+row.id,{ id : row.id },(res) => {
          console.log(res);
          if (res.status <= 400) res.data.module_type_data.constructor == Array ? this.module_type_data = res.data.module_type_data : this.module_type_data = []
　      })
      },
      addNew(){
        let obj = {
          detail_content : {
            chose_me_advice_desc : "",
            chose_me_advice_ids : [],
            his_advice_id : '',
            his_advice_name : '',
            his_way_by_hisadviceid : [],
            add : true
          }
        }
        this.module_type_data.push(obj)
        this.duplicate()
      },

      doctorsOrderChange(data){ //当医嘱类别变化的时候初始化用药途径list
        this.duplicate()
        let id = data.detail_content.his_advice_id
        console.log(data);
        this.getSer("datacenter/hisadvice/" + id ,{ id }, res => {
          console.log(res);
          data.detail_content.his_way_by_hisadviceid = []
          data.detail_content.chose_me_advice_desc = ''
          res.data.items.forEach(item=>{
            data.detail_content.his_way_by_hisadviceid.push({
              HIS_WAY_ID: item.ID,
              IS_SELECT: 0,
              NAME : item.NAME
            })
          })
        })
      },
      duplicate(){ //医嘱类别去重
        let arr = []
        this.doctorsOrder2.forEach(item => {
          var flag = true
          this.module_type_data.forEach(select => {
            item.ID == select.detail_content.his_advice_id ? flag = false : null
          })
          flag == true ? arr.push(item) : null
        })
        this.doctorsOrder = arr
      },
      delAdvice(index){
          this.module_type_data.splice(index,1);
      },
      editSure(){
        let obj = {
          module_type_id : this.id,
          module_type_data : []
        }
        this.module_type_data.forEach(item => {
          obj.module_type_data.push({"his_medical_advice_type_id":item.detail_content.his_advice_id, "me_advice_id":item.detail_content.chose_me_advice_ids})
        })
        console.log(obj);
        obj.module_type_data = JSON.stringify(obj.module_type_data)

        this.post('datacenter/advice',obj, res =>{
          if(res.status <= 400){
            this.popshow = false;
            this.$parent.advice()
            this.$message({type: 'success', message: '编辑成功!'});
          }
        })
      },
      editUseDrug(data){
        this.$refs.child.getData(data)
      }
    },

    created(){
      this.$nextTick(()=>{
        this.getSer("datacenter/hisadvice",[],res=>{
          console.log(res);
          this.doctorsOrder = res.data
          this.doctorsOrder2 = res.data
        })
      })
    },

  }
</script>
<style scoped lang='stylus'>
  .el-dialog__footer
    .el-button
      float left
      padding 12px 16px 12px 32px
      position relative
      background-color #F9F9FB
      border-color #EEEEEE
      .el-icon-circle-plus
        position absolute
        font-size 24px
        color #11C462
        left 8px
        top 7px
  .el-table >>> .el-table__body-wrapper
    td
      padding 0
      &.el-table_2_column_6
        .cell
          padding 0 10px
      .cell
        line-height 40px
        padding 0
        span
          padding-left 10px
        .el-select
          width 100%
          .el-input__inner
            border none
            background-color #FFFFFF
            padding 0 10px
  .el-table >>> .el-table__header-wrapper
    th
      .cell
        line-height 40px
</style>
