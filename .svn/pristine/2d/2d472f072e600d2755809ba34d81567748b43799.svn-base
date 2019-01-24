<template>
    <div>
        <div class="setcon edit" v-if="popshow">
            <div class="partset">
                <div class="partset-header">
                    <h5>编辑权限资源</h5>
                    <i class="el-icon-close" @click="popshow=false"></i>
                </div>
                <div>
                    <div class="rolebox">
                        <span class="span-role">前端路由</span>
                        <el-tree
                                :data="frontroute"
                                show-checkbox
                                node-key="ID"
                                ref="tree_frontroute"
                                highlight-current
                                :props="frontrouteProps"
                                v-if="flag"
                                :default-checked-keys='frontroute_check_key'
                        >
                        </el-tree>
                        <span class="span-role">前端资源</span>
                        <el-tree
                                :data="frontresource"
                                show-checkbox
                                node-key="ID"
                                ref="tree_frontresource"
                                highlight-current
                                :props="frontresourceProps"
                                v-if="flag"
                                :default-checked-keys='frontresource_check_key'
                        >
                        </el-tree>
                        <span class="span-role">后端权限</span>
                        <el-tree
                                :data="backauths"
                                show-checkbox
                                node-key="ID"
                                ref="tree_backauths"
                                highlight-current
                                :props="backauthsProps"
                                v-if="flag"
                                :default-checked-keys="backauths_check_key"
                        >
                        </el-tree>
                    </div>
                </div>
                <div class="partset-footer">
                    <button class="btn-pop-sure"  @click="saveEdit">确定</button>
                    <button class="btn-pop-cancel" @click="popshow=false">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{

        data(){
            return {
                name : "编辑",
                popshow : false,
                moduleid : '',
                platforms : [{"ID":1,"NAME":'智慧护士工作站'},{"ID":2,"NAME":'智慧护理管理平台'},{"ID":3,"NAME":'平台管理系统'}],
                pages : [],
                flag:false,
                frontroute_check_key : [],
                frontresource_check_key : [],
                backauths_check_key : [],
                frontresource: [],
                frontroute: [],
                manage_auth: [],
                frontrouteProps: {
                    children: 'children',
                    label: 'DESC',
                    id: 'ID'
                },
                frontresourceProps: {
                    children: 'children',
                    label: 'NAME',
                    id: 'ID'
                },
                backauthsProps: {
                    children: 'children',
                    label: 'TITLE',
                    id: 'ID'
                },
            }
        },

        methods:{
            getDetail(row){
                this.moduleid = row.ID
                this.frontroute = []
                this.frontresource = []
                this.backauths = []

                this.flag = false
                this.getSer("datacenter/authresource/fontresourcerforauth" , {auth_id:row.ID} ,  res=>{
                    this.frontroute_check_key = res.data.frontroute_check_key
                    this.frontresource_check_key = res.data.frontresource_check_key
                    this.backauths_check_key = res.data.backauths_check_key
                    this.flag = true
                })

                this.getSer("datacenter/authresource/resource" , {PLATFORM:row.PLATFORM} ,  res=>{
                    this.frontroute = res.data.frontroute
                    this.frontresource = res.data.frontresource
                    this.backauths = res.data.backauths
                })
                this.popshow = true
            },

            saveEdit(){
                let arr_frontroute = this.$refs.tree_frontroute.getCheckedNodes()
                let auths_frontroute = [];
                arr_frontroute.forEach(item=>{
                    auths_frontroute.push(item.ID)
                })

                let arr_frontresource = this.$refs.tree_frontresource.getCheckedNodes()
                let auths_frontresource = [];
                arr_frontresource.forEach(item=>{
                    auths_frontresource.push(item.ID)
                })

                let arr_backauths = this.$refs.tree_backauths.getCheckedNodes()
                let auths_backauths = [];
                arr_backauths.forEach(item=>{
                    auths_backauths.push(item.ID)
                })

                if (auths_frontroute == false && auths_frontresource == false && auths_backauths == false)
                {
                    this.$message({type : 'warning',message : '请选择权限'});
                    return
                }


                let obj = {
                    id:this.moduleid,
                    frontroute:auths_frontroute == false ? '' : JSON.stringify(auths_frontroute),
                    frontresource:auths_frontresource == false ? '' : JSON.stringify(auths_frontresource),
                    backauths:auths_backauths == false ? '' : JSON.stringify(auths_backauths),
                }
                this.post('datacenter/authresource/distribution', obj, res => {
                    if (res.status == 201)
                    {
                        this.popshow = false
                        this.$message({message : res.data.message, duration : 1000, type : 'success'})
                        this.$parent.getList()
                    }
                    else
                    {
                        this.$message({message : res.data.message, duration : 1000, type : 'warning'})
                    }
                })
            }
        }
    }
</script>
<style scoped lang="stylus">
    .rolebox
        width 500px
        min-height 400px
    .userBox li{
        padding:0 5px;
        line-height:30px;
    }
    .userBox li:hover{
        background:#8cc5ff;
    }
    .setcon {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.10);
        position: absolute;
        left: 0;
        top: 0;
        z-index:10000;
    }
    .partset {
        width: 654px;
        height: 670px;
    }
    .verPopTable input,textarea{
        background:none;
    }
    .verPopTable input[type=text]{
        width:300px;
        height:40px;
        line-height:40px;
        text-align:center;
        border-radius:10px;
    }
    .verPopTable input[type=text]:hover,.verPopTable input[type=text]:focus{
        background:#fff;
    }
    .verPopTable textarea{
        display:inline-block;
        width:100%;
        padding:5px 10px;
        vertical-align:middle;
        border:none;
        outline:none;
        resize:none;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .partset-footer>i{
        float:left;
    }
    .partset-footer>button{
        float:right;
    }
    .version-table .medPopTable thead tr{
        height:34px;
        line-height:34px;
        background: #DDEFF9;
    }
    .version-table .medPopTable thead tr td{
        border: 1px solid #A5DDEA;
    }
    .version-table .medPopTable tbody td{
        width:50%;
        height:44px;
        line-height:44px;
        background:#fff;
        border:1px solid #eee;
    }
    .editPop-btnbox span{
        display:inline-block;
        color: #00B3DC;
        margin:0 15px;
        cursor:pointer;
    }
</style>
