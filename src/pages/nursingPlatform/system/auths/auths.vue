<template>
    <div>
        <div class="out-top">
            <input type="search" placeholder="搜索权限名称" class="out-input" v-model="authname" @blur="searchList()">
            <button class="btn-small" @click="searchList()">搜索</button>
            <div style="display:inline-block;vertical-align:middle;float:right">
                <addauth></addauth>
            </div>
        </div>
        <div class="out-main">
            <div class="custom-tree-container">
              <div class="block">
                <h2>权限管理</h2>
                <el-tree
                  :data="authData"
                  show-checkbox
                  node-key="ID"
                  default-expand-all
                  :props="authsProps"
                  :expand-on-click-node="false">
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                      <el-button
                        type="text"
                        size="mini"
                        @click="() => addaction(data)">
                        子权限
                      </el-button>
                      <el-button
                        type="text"
                        size="mini"
                        @click="() => editShow(data)">
                        编辑权限
                      </el-button>
                      <el-button
                          type="text"
                          size="mini"
                          @click="() => editResource(data)">
                          编辑资源
                        </el-button>
                        <el-button
                            type="text"
                            size="mini"
                            @click="() => deleteRow(data)">
                            删除
                          </el-button>
                    </span>
                  </span>
                </el-tree>
              </div>
            </div>



        </div>
        <editauth ref='editauth'></editauth>
        <addaction ref='addaction'></addaction>
        <editResource ref='editResource'></editResource>
    </div>
</template>
<script>
    import addauth from "./addauth.vue"
    import editauth from "./editauth.vue"
    import addaction from "./addaction.vue"
    import editResource from "./editResource.vue"

    let id = 1000;
    export default{
        data() {
            return {
                authname : "",
                authCount : 0,
                currentPage : 1,
                page_size : 2000,
                authData : [],
                authsProps: {
                    children: 'children',
                    label: 'TITLE',
                    id: 'ID'
                },
            };
        },

        components : { addauth , editauth, addaction, editResource},

        mounted(){
            this.$nextTick(()=>{
                this.getList()
            })
        },

        methods:{
            getList(){
                this.getSer("datacenter/auth",{"TITLE":this.trim(this.authname)}, res=>{
                    console.log('this.authData')
                    console.log(res.data)
                    this.authData = [res.data]
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
                this.$refs.editauth.getDetail(row.ID)
            },
            editResource(row){
                this.$refs.editResource.getDetail(row)
            },
            addaction(row){
                this.$refs.addaction.getDetail(row)
            },
            //删除列表行
            deleteRow(data){
                this.$confirm('是否删除该权限?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    this._delete('datacenter/auth/'+data.ID,{id:data.ID}, res => {
                        console.log(res.status);
                        if(res.status == 204){
                            this.$message({type: 'success', message: '删除成功!'});
                            this.getList();
                        }
                    })
                })
            }

        }
    }
</script>
<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>