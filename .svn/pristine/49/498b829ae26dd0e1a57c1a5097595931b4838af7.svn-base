<template>
  <div>
    <div class="topBox">
      <span>选择科室</span>
      <el-select v-model="departmentId" style="margin-left:10px" @change="getID" >
        <el-option v-for="item in partlist" :key="item.ID" :label="item.NAME" :value="item"></el-option>
      </el-select>
      <el-button type='success' @click="addItem()">添加生命体征</el-button>
    </div>

    <div class="out-main">
      <el-table :data="modelList" style="width: 100%">
        <el-table-column label="ID" prop="ID" min-width='60'></el-table-column>
        <el-table-column label="生命体征ID" prop="VS_ITEM_ID" min-width='60'></el-table-column>
        <el-table-column label="已选生命体征" prop="NAME" min-width='200'></el-table-column>
        <el-table-column label="添加时间" prop="NAME" min-width='150'></el-table-column>
        <el-table-column label="操作人" prop="NAME" min-width='150'></el-table-column>
        <el-table-column label="操作" min-width='40'>
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.row.ID)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <addVital :id="value" :depart_id='depart_id' ref='add'></addVital>
  </div>
</template>
<script>
  import addVital from './addVital'
    export default{

      components:{ addVital },

      data(){
            return {
              depart_id:'',
              value : "",
              modelList : [],
              partlist : [],
              departmentId : ''
            }
      },

      methods:{
        getData(){
          this.getSer("datacenter/vsopt",{ depart_id : this.depart_id}, res => {
            console.log(res);
            if (res.status <= 400) {
              this.modelList = res.data.items;
            }
    　    })
        },
        getID(item){
          this.departmentId = item.NAME
          this.depart_id = item.ID
          this.getData()
          this.$refs.add.getData()
        },
        addItem(){
          if (this.departmentId == "") this.$message.warning("请选择科室");
          else{
            this.$refs.add.setData(this.modelList)
          }
        },
        departmentData(){//全部科室
          this.getSer("datacenter/department", {'page': 1, 'page_size': 1000}, (res) =>{
            console.log(res);
            if( res.status <= 400){
              this.partlist = res.data.items;
            }
          })
        },
        deleteRow(id){
          this.$confirm('是否删除该生命体征?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
              this._delete('datacenter/vsopt/'+id,{id}, res => {
                if(res.status == 204){
                  this.$message({type: 'success', message: '删除成功!'});
                  console.log(this.$refs.add.depart_id);
                  this.getData(this.$refs.add.depart_id);
                }
              })
            })
        },
      },

      mounted(){
        this.$nextTick(()=>{
          this.departmentData()
        })
      }
    }

</script>
<style lang="stylus">
  .topBox
    margin 15px 0
  .el-button--success
    background-color #11c462
    margin-left 10px
    &:hover
      background-color #14d462

</style>
