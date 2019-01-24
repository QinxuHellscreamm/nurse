<template>
    <div>
        <button @click="addUser"  class="btn-small color-green" style="margin-bottom:8px">新增</button>
        <transition name="info">
            <div class="setcon edit" v-if="popshow">
                <div class="partset">
                    <div class="partset-header">
                        <h5>新增权限</h5>
                        <i class="el-icon-close" @click="popshow=false"></i>
                    </div>
                    <ul class="add-item">
                        <li>
                            <span>权限名称</span>
                            <input type="text" v-model="TITLE">
                        </li>
                        <li>
                            <span>权限编码</span>
                            <input type="text" v-model="AUTH_CODE">
                        </li>
                        <li>
                            <span>所属平台</span>
                            <select name="PLATFORM" v-model="PLATFORM">
                                <i class="el-icon-caret-bottom"></i>
                                <option v-for="(item,index) of platforms" :key="item.NAME" :value="item.ID" >{{item.NAME}}</option>
                            </select>
                        </li>
                        <li>
                            <span>权限类型</span>
                            <select name="PLATFORM" v-model="TYPE">
                                <i class="el-icon-caret-bottom"></i>
                                <option v-for="(item,index) of types" :key="item.NAME" :value="item.ID" >{{item.NAME}}</option>
                            </select>
                        </li>
                        <li>
                            <span>上级权限</span>
                            <select name="PLATFORM" v-model="PID">
                                <i class="el-icon-caret-bottom"></i>
                                <option v-for="(item,index) of pages" :key="item.TITLE" :value="item.ID" >{{item.TITLE}}</option>
                            </select>
                        </li>
                        <li>
                            <span>控制器</span>
                            <input type="text" v-model="CONTROLLER">
                        </li>
                        <li>
                            <span>动作</span>
                            <input type="text" v-model="ACTION">
                        </li>
                        <li>
                            <span>动作属性</span>
                            <input type="text" v-model="ACTION_ATTRIBUTE">
                        </li>
                        <li>
                            <span>前端路由</span>
                            <input type="text" v-model="VUE_ROUTE">
                        </li>
                        <!--<li>-->
                            <!--<span>排序</span>-->
                            <!--<input type="text" v-model="SORT">-->
                        <!--</li>-->
                    </ul>
                    <div class="partset-footer">
                        <button class="btn-pop-sure"  @click="saveAdd">确定</button>
                        <button class="btn-pop-cancel" @click="popshow=false">取消</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    const delay = (function() {
        let timer = 0;
        return function(callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();
    export default{
        props:["moduleid"],
        data(){
            return {
                platforms : [{"ID":1,"NAME":'智慧护士工作站'},{"ID":2,"NAME":'智慧护理管理平台'},{"ID":3,"NAME":'平台管理系统'}],
                types : [{"ID":1,"NAME":'页面'},{"ID":2,"NAME":'动作'}],
                pages : [],
                popshow:false,
                TITLE:'',
                AUTH_CODE:'',
                PLATFORM:1,
                CONTROLLER:'',
                ACTION:'',
                ACTION_ATTRIBUTE:'',
                VUE_ROUTE:'',
                TYPE:1,
                PID:0,
                SORT:1,
            }
        },
        methods: {
            addUser(){
                this.popshow = !this.popshow;
                this.TITLE=''
                this.AUTH_CODE=''
                this.PLATFORM=1
                this.CONTROLLER=''
                this.ACTION=''
                this.ACTION_ATTRIBUTE=''
                this.VUE_ROUTE=''
                this.TYPE=1
                this.PID=0
                this.SORT=1
                this.getSer('datacenter/auth/getpages/',{} , res => {
                    console.log(res.data)
                    this.pages = res.data
                })
            },
            saveAdd(){
                if (this.TITLE == '')
                {
                    this.$message({type : 'warning',message : '权限名称不能为空'});
                    return
                }
                if (this.AUTH_CODE == '')
                {
                    this.$message({type : 'warning',message : '权限编码不能为空'});
                    return
                }
                //如果是页面 不需要判断这些
//                if (this.TYPE == 2)
//                {
//                    if (this.CONTROLLER == '')
//                    {
//                        this.$message({type : 'warning',message : '控制器不能为空'});
//                        return
//                    }
//                    if (this.ACTION == '')
//                    {
//                        this.$message({type : 'warning',message : '动作不能为空'});
//                        return
//                    }
////                if (this.ACTION_ATTRIBUTE == '')
////                {
////                    this.$message({type : 'warning',message : '动作属性不能为空'});
////                    return
////                }
//                }

//                if (this.VUE_ROUTE == '')
//                {
//                    this.$message({type : 'warning',message : '前端路由不能为空'});
//                    return
//                }

                var obj =  {
                    "TITLE" : this.TITLE,
                    "AUTH_CODE" : this.AUTH_CODE,
                    "PLATFORM" : this.PLATFORM,
                    "CONTROLLER" : this.CONTROLLER,
                    "ACTION" : this.ACTION,
                    "ACTION_ATTRIBUTE" : this.ACTION_ATTRIBUTE,
                    "VUE_ROUTE" : this.VUE_ROUTE,
                    "TYPE" : this.TYPE,
                    "PID" : this.PID,
                    "SORT" : this.SORT,
                }
                this.post('datacenter/auth' , obj , res => {
                    this.$message({
                        message : res.data.message,
                        duration : 1000,
                        type : 'success'
                    });
                    this.popshow = !this.popshow
                    this.$parent.getList()
                })

            },
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
        height: 770px;
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
