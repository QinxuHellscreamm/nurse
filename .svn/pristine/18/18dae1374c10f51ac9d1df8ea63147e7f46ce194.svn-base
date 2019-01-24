<template>
    <div>
        <div class="setcon edit" v-if="popshow">
            <div class="partset">
                <div class="partset-header">
                    <h5>添加子权限</h5>
                    <i class="el-icon-close" @click="popshow=false"></i>
                </div>
                <ul class="add-item">
                    <li>
                        <span>权限名称</span>
                        <input type="text" v-model="form.TITLE">
                    </li>
                    <li>
                        <span>所属平台</span>
                        <select name="PLATFORM" v-model="form.PLATFORM">
                            <i class="el-icon-caret-bottom"></i>
                            <option v-for="(item,index) of platforms" :key="item.NAME" :value="item.ID" >{{item.NAME}}</option>
                        </select>
                    </li>
                    <li>
                        <span>上级权限</span>
                        <select name="PLATFORM" v-model="form.PID">
                            <i class="el-icon-caret-bottom"></i>
                            <option v-for="(item,index) of pages" :key="item.TITLE" :value="item.ID" >{{item.TITLE}}</option>
                        </select>
                    </li>
                </ul>
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
                form : {
                    TITLE : "",
                    PLATFORM : '',
                    PID : '',
                },
                platforms : [{"ID":1,"NAME":'智慧护士工作站'},{"ID":2,"NAME":'智慧护理管理平台'},{"ID":3,"NAME":'平台管理系统'}],
                pages : [],
                isSelect:false
            }
        },

        methods:{
            getDetail(row){
                this.popshow = true
                this.form.TITLE = row.TITLE
                this.form.PLATFORM = row.PLATFORM
                this.form.PID = row.ID

                this.getSer('datacenter/auth/getpages/',{} , res => {
                    this.pages = res.data
                })
            },

            saveEdit(){
                if (this.form.TITLE == '')
                {
                    this.$message({type : 'warning',message : '权限名称不能为空'});
                    return
                }

                this.post('datacenter/auth'  , this.form, res => {
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
<style scoped>
    .userBox{
        width:330px;
        max-height:200px;
        padding:5px 0;
        background:#fff;
        box-shadow:0  1px 3px 2px #eee;
        border-radius:5px;
        overflow-y:scroll;
        position:absolute;
        top:135px;
        left:110px;
        z-index:1200;
    }
    .userBox li{
        padding:0 5px;
        line-height:30px;
    }
    .userBox li:hover{
        background:#8cc5ff;
    }
    .advice-content{
        max-height:300px;
        overflow-y:scroll;
    }

    .info-enter,.info-leave-active{
        opacity:0;
        transform:translate3d(0,-40%,0);
    }
    .info-enter-active,.info-leave-active{
        transition:all .6s cubic-bezier(0.4,0,0,1.5);
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
    .in-upload-partset{
        display:inline-block;
        height:40px;
        line-height:40px;
        padding:0 16px;
        background: #11C462;
        border-radius: 4px;
        color:#fff;
        cursor:pointer;
    }
    .partset {
        width: 454px;
        height: 470px;
    }
    .verPopTable{
        width:100%;
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
    .medPopTable{
        width:100%;
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
