<template>
  <div>
    <div class="topBox">
      <span>选择科室</span>
      <el-select v-model="departmentId" style="margin-left:10px" @change="getID" >
        <el-option v-for="item in partlist" :key="item.ID" :label="item.NAME" :value="item"></el-option>
      </el-select>
      <el-button style="margin-left: 20px;margin-bottom:8px;" @click="addItem()" type='success'>添加宣教</el-button>
    </div>
    <div class="out-main">
      <el-table :data="modelList" style="width: 100%" >
        <el-table-column label="ID" prop="ID" min-width='60'></el-table-column>
        <el-table-column label="健康宣教ID" prop="INFORM_ID" min-width="200">></el-table-column>
        <el-table-column label="已选宣教标题" prop="TITLE" min-width='100'></el-table-column>
        <el-table-column label="添加时间" prop="" min-width='100'>
          <template slot-scope="{row}">
            <span>{{ row.CREATE_AT | stampTotime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作人" prop="REALNAME" min-width='100'></el-table-column>
        <el-table-column label="操作" min-width='40'>
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.row.ID)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <addHealthEdu :id="value" :depart_id='depart_id' ref='add'></addHealthEdu>
  </div>
</template>
<script>
  import addHealthEdu from './addHealthEdu'
    export default{

      components:{addHealthEdu},

      data(){
            return {
              depart_id : '',
              partlist : [],
              value : "",
              modelList : [],
              departmentId : ''
            }
      },

      methods:{
        getData(){//健康宣教列表数据
           this.getSer("datacenter/informdepart",{"depart_id":this.depart_id}, res => {
             console.log(res);
               if (res.status <= 400) {
                 this.modelList = res.data.items;
               }
    　      })
        },

        getID(item){//选择科室变化后
          this.depart_id = item.ID
          this.departmentId = item.NAME
          this.getData()
          //this.$refs.add.getData()
        },
        addItem(){
          if (this.departmentId == "") this.$message.warning("请选择科室")
          else{
            this.$refs.add.getData()
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
          this.$confirm('是否删除该宣教标题?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
              this._delete('datacenter/informdepart/'+id,{id}, res => {
                if(res.status == 204){
                  this.$message({type: 'success', message: '删除成功!'});
                  this.getData();
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
<style lang="stylus" scoped>
  .topBox
    margin 15px 0
  .el-button--success
    background-color #11c462
    &:hover
      background-color #14d462
</style>
