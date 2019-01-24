<template>
  <div>
    <button @click="addUser"  class="btn-small color-green" style="margin-bottom:8px">新增</button>
    <transition name="info">
      <div class="setcon edit" v-if="popshow">
        <div class="partset">
          <div class="partset-header">
            <h5>新增用户</h5>
            <i class="el-icon-close" @click="popshow=false"></i>
          </div>
         <ul class="add-item">
           <li>
             <span>用户姓名</span>
             <input type="text" v-model="name" placeholder="输入" @keyup="search(name)" @focus="namesShow=!namesShow" >
             <ul v-if="namesShow" class="userBox">
               <li v-for="(item,index) of names" @click="handleSelect(item)">{{item.NAME}}</li>
             </ul>
           </li>
           <li>
             <span>病区</span>
             <span>
               <i v-for="(item2,index) of row.WARD_ARR">{{item2}}</i>
             </span>
           </li>
           <li>
             <span>角色</span>
             <select name="roles" v-model="value">
               <i class="el-icon-caret-bottom"></i>
               <option v-for="(item,index) of roles" :key="item.GROUP_NAME" :value="item.ID" >{{item.GROUP_NAME}}</option>
             </select>
           </li>
           <li>
             <span>登录账号</span>
             <span v-model="row.JOB_NUMBER">{{row.JOB_NUMBER}}</span>
           </li>
           <li>
             <span>密码</span>
             <input type="text" placeholder="6-16字节，不可重复" v-model="password" maxlength='16'>
           </li>
           <li>
             <span>使用状态</span>
             <el-radio v-model="radio" label="1">启用</el-radio>
             <el-radio v-model="radio" label="0">停用</el-radio>
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

  export default{
    props:["moduleid"],
    data(){
      return {
        radio:"1",
        value:"",
        password:"",
        roles:[],
        popshow:false,
        names:[],
        row:{},
        name:"",
        namesShow:false
      }
    },

    methods: {
      addUser(){
        this.radio = '1'
        this.value = ''
        this.password = ''
        this.row = {}
        this.name = ''
        this.popshow = true

        this.getSer("datacenter/nurse/nurselistforaddadmin",{},res =>{                 //获取姓名字典
            this.names=res.data.items
        })
        this.getSer("datacenter/role",{ page : 1 , page_size : 200 }, res => {
            this.roles = res.data.items;
        })
      },
      saveAdd(){

        if (!this.row.ID)
        {
            this.$message({type : 'warning',message : '请选择护士'});
            return
        }
        if (this.value == '')
        {
            this.$message({type : 'warning',message : '角色不能为空'});
            return
        }
        if (this.password == '')
        {
            this.$message({type : 'warning',message : '密码不能为空'});
            return
        }

        var obj =  {
          "STATUS" : this.radio,
          "PLUG_ID" : this.value,
          "PASSWORD" : this.password,
          "USERNAME" : this.row.JOB_NUMBER,
          "REALNAME" : this.name,
          "NURSE_ID" : this.row.ID,
        }

        this.post('datacenter/nadmin' , obj , res => {
         if(res.status<400){
           this.popshow = false
           this.$message({
             message : res.data.message,
             duration : 1000,
             type : 'success'
           })
         }
          this.$parent.getUsers()
        })

      },
      search(inp){
        this.getSer("datacenter/nurse/nurselistforaddadmin",{nurse_name:inp},res =>{                 //获取姓名字典
            this.names=res.data.items
        })
      },
      handleSelect(item) {
        var that=this;
        that.namesShow=!that.namesShow;
        that.row=item;
        that.name=item.NAME;
      }
      },
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
