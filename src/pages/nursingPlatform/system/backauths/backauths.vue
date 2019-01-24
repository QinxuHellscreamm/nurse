<template>
    <div>
        <div class="out-top">
            <input type="search" placeholder="搜索权限描述" class="out-input" v-model="authname" @blur="searchList()">
            <button class="btn-small" @click="searchList()">搜索</button>
            <div style="display:inline-block;vertical-align:middle;float:right">
                <addauth></addauth>
            </div>
        </div>
        <div class="out-main">
            <el-table :data='authData'>
                <el-table-column label="ID" prop="ID" min-width='20'></el-table-column>
                <el-table-column label="权限描述" prop="TITLE" min-width='40'></el-table-column>
                <el-table-column label="所属平台" prop="PLATFORM_NAME" min-width='40'></el-table-column>
                <el-table-column label="路由" prop="ROUTE" min-width='40'></el-table-column>
                <el-table-column label="路由属性" prop="ROUTE_ATTRIBUTE" min-width='40'></el-table-column>
                <el-table-column label="创建时间" prop="CREATED_AT_SHOW" min-width='40'></el-table-column>
                <el-table-column label="添加人" prop="PLUG_NAME" min-width='40'></el-table-column>
                <el-table-column label="操作" min-width='40'>
                    <template slot-scope="{row}">
                        <div style="display:inline-block" class="marr20">
                            <button @click="editShow(row)" class="pop-btn">编辑</button>
                        </div>
                        <div style="display:inline-block" class="marr20">
                            <span class="del" @click="deleteRow(row.ID)">删除</span>
                        </div>
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
                        :total="authCount">
                </el-pagination>
            </div>
        </div>
        <editauth ref='editauth'></editauth>
    </div>
</template>
<script>
    import addauth from "./addauth.vue"
    import editauth from "./editauth.vue"
    export default{
        data() {
            return {
                authname : "",
                authCount : 0,
                currentPage : 1,
                page_size : 2000,
                authData : []
            };
        },
        components : { addauth , editauth},

        mounted(){
            this.$nextTick(()=>{
                this.getList()
            })
        },

        methods:{
            getList(){
                this.getSer("datacenter/backauth",{"TITLE":this.trim(this.authname), "page":this.currentPage, "page_size" : this.page_size}, res=>{
                    this.authCount = parseInt(res.data.meta.totalCount)
                    this.authData = res.data.items
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
            addaction(row){
                this.$refs.addaction.getDetail(row)
            },
            //删除列表行
            deleteRow(id){
                this.$confirm('是否删除该权限?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    this._delete('datacenter/backauth/'+id,{id}, res => {
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
