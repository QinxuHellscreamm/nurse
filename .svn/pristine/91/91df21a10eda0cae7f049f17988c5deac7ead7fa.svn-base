<template>
    <div>
        <div class="out-top">
            <input type="search" placeholder="搜索路由名称" class="out-input" v-model="frontroutesname" @blur="searchList()">
            <button class="btn-small" @click="searchList()">搜索</button>
            <div style="display:inline-block;vertical-align:middle;float:right">
                <addfrontroutes></addfrontroutes>
            </div>
        </div>
        <div class="out-main">
            <el-table :data='frontroutesData'>
                <el-table-column label="ID" prop="ID" min-width='20'></el-table-column>
                <el-table-column label="路由中文描述" prop="DESC" min-width='40'></el-table-column>
                <el-table-column label="路由名称" prop="NAME" min-width='40'></el-table-column>
                <el-table-column label="路由标识" prop="PATH" min-width='40'></el-table-column>
                <el-table-column label="所属平台" prop="PLATFORM_NAME" min-width='40'></el-table-column>
                <el-table-column label="创建时间" prop="CREATED_AT_SHOW" min-width='40'></el-table-column>
                <el-table-column label="添加人" prop="PLUG_NAME" min-width='40'></el-table-column>
                <el-table-column label="操作" min-width='50'>
                    <template slot-scope="{row}">
                        <div style="display:inline-block" class="marr20">
                            <button @click="addaction(row)" class="pop-btn">子路由</button>
                        </div>
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
                        :total="frontroutesCount">
                </el-pagination>
            </div>
        </div>
        <editfrontroutes ref='editfrontroutes'></editfrontroutes>
        <addaction ref='addaction'></addaction>
    </div>
</template>
<script>
    import addfrontroutes from "./addfrontroutes.vue"
    import editfrontroutes from "./editfrontroutes.vue"
    import addaction from "./addaction.vue"
    export default{
        data() {
            return {
                frontroutesname : "",
                frontroutesCount : 0,
                currentPage : 1,
                page_size : 2000,
                frontroutesData : []
            };
        },

        components : { addfrontroutes , editfrontroutes, addaction},

        mounted(){
            this.$nextTick(()=>{
                this.getList()
            })
        },

        methods:{
            getList(){
                this.getSer("datacenter/frontroute",{"DESC":this.trim(this.frontroutesname), "page":this.currentPage, "page_size" : this.page_size}, res=>{
                    this.frontroutesCount = parseInt(res.data.meta.totalCount)
                    this.frontroutesData = res.data.items
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
                this.$refs.editfrontroutes.getDetail(row.ID)
            },
            addaction(row){
                this.$refs.addaction.getDetail(row)
            },
            //删除列表行
            deleteRow(id){
                this.$confirm('是否删除该路由?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    this._delete('datacenter/frontroute/'+id,{id}, res => {
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
