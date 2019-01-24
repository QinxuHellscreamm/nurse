<template>
    <div>
        <button @click="addUser"  class="btn-small color-green" style="margin-bottom:8px">新增</button>
        <transition name="info">
            <div class="setcon edit" v-if="popshow">
                <div class="partset">
                    <div class="partset-header">
                        <h5>新增前端资源</h5>
                        <i class="el-icon-close" @click="popshow=false"></i>
                    </div>
                    <ul class="add-item">
                        <li>
                            <span>资源名称</span>
                            <input type="text" v-model="NAME">
                        </li>
                        <li>
                            <span>资源标识</span>
                            <input type="text" v-model="PATH">
                        </li>
                        <li>
                            <span>上级资源</span>
                            <select name="PLATFORM" v-model="PID">
                                <i class="el-icon-caret-bottom"></i>
                                <option v-for="(item,index) of pages" :key="item.NAME" :value="item.ID" >{{item.NAME}}</option>
                            </select>
                        </li>
                        <li>
                            <span>所属平台</span>
                            <select name="PLATFORM" v-model="PLATFORM">
                                <i class="el-icon-caret-bottom"></i>
                                <option v-for="(item,index) of platforms" :key="item.NAME" :value="item.ID" >{{item.NAME}}</option>
                            </select>
                        </li>
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
                pages : [],
                popshow:false,
                NAME:'',
                PATH:'',
                PLATFORM:1,
                PID:0,
            }
        },
        methods: {
            addUser(){
                this.popshow = !this.popshow;
                this.NAME=''
                this.PATH=''
                this.PLATFORM=1
                this.PID=0
                this.getSer('datacenter/frontresource/getpages/',{} , res => {
                    console.log(res.data)
                    this.pages = res.data
                })
            },
            saveAdd(){
                if (this.NAME == '')
                {
                    this.$message({type : 'warning',message : '前端资源名称不能为空'});
                    return
                }
                if (this.PATH == '')
                {
                    this.$message({type : 'warning',message : '前端资源标识不能为空'});
                    return
                }

                var obj =  {
                    "NAME" : this.NAME,
                    "PATH" : this.PATH,
                    "PLATFORM" : this.PLATFORM,
                    "PID" : this.PID,
                }
                this.post('datacenter/frontresource' , obj , res => {
                    if (res.status == 201)
                    {
                        this.$message({
                            message : res.data.message,
                            duration : 1000,
                            type : 'success'
                        });
                        this.popshow = !this.popshow
                        this.$parent.getList()
                    }
                    else
                    {
                        this.$message({
                            message : res.data.message,
                            duration : 1000,
                            type : 'warning'
                        });
                    }
                })

            },
        }
    }
</script>
<style scoped>
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
        width: 454px;
        height: 470px;
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
