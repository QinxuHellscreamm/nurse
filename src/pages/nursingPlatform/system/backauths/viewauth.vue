<template>
    <div>
        <button @click="view(moduleid)"  class="pop-btn" >查看</button>
        <el-dialog :visible.sync="popshow" title='查看' width='454px'>

            <ul class="add-item" v-if='userDetail'>
                <li>
                    <span>用户姓名</span>
                    <span class="uninput">{{userDetail.REALNAME}}</span>
                </li>
                <li>
                    <span>病区</span>
                    <span class="partcon uninput"><i v-for="(item,index) of userDetail.WARD_NAMES" :key="index">{{item}}</i></span>
                </li>
                <li>
                    <span>角色</span>
                    <span class="uninput">{{userDetail.GROUP_NAME}}</span>
                </li>
                <li>
                    <span>登录账号</span>
                    <span class="partcon uninput">{{userDetail.USERNAME}}</span>
                </li>
                <li>
                    <span>使用状态</span>
                    <span class="uninput">{{userDetail.STATUS=="1"?"使用中":"停用"}}</span>
                </li>
            </ul>
            <div class="partset-footer">
                <button class="btn-pop-sure"  @click="popshow = false">确定</button>
            </div>
        </el-dialog>
        <div class="setcon" v-if="popshow">

        </div>

    </div>
</template>
<script>
    export default{
        props:["moduleid"],
        data(){
            return {
                name:"查看",
                popshow:false,
                userDetail:null,
                roleName:""
            }
        },
        methods:{
            view(moduleid){
                this.popshow=!this.popshow;
                console.log('this.getSer');
                this.getSer('datacenter/nadmin/'+moduleid ,{ id : moduleid } , res => {
                    console.log(res)
                    console.log(res.data)
                    this.userDetail=res.data;
                })
            }
        }
    }
</script>
<style scoped>
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
        height: 570px;
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
