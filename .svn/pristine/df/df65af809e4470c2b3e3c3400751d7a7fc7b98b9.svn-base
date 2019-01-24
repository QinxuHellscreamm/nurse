<template>
  <div>
    <div style='font-size: 20px;color:#FFFFFF;line-height: 38px;background-color: #2b3a50;text-indent: 1em;font-weight: 600;'>护理信息平台</div>
    <div class="bg">
      <div class="login-box">
        <div class="login-title">
          <h1 style='font-size: 20px;position: relative;top:2px;'>登录</h1>
        </div>
        <div>
          <input type="text" placeholder="请输入用户名" class="login-inp bg-user marb30" v-model="user.name" maxlength='18'>
          <input type="password" placeholder="请输入密码" class="login-inp bg-pwd" v-model="user.pwd" @keyup.enter="login">
          <input type="button" value="登录" class="login-inp login-btn" @click="login">
        </div>
      </div>
    </div>
    <loginForm ref='child' :platform='platform' :frontroute='jur.frontroute'></loginForm>
  </div>
</template>
<script>
  import loginForm from "./loginForm.vue"

    export default{
      data() {
          return {
            user : {name : '',pwd : ''},
            ward_ar:"",
            jur:{},
            platform:[]
          }
      },
      components:{ loginForm },

      methods:{
        login(){
            if (this.user.name == '' && this.user.pwd == ''){
                this.$message({message: '请输入用户名和密码',type: 'warning'})
                return
            }
            if (!this.user.name){
                this.$message({message: '请输入用户名',type: 'warning'})
                return
            }
            if (!this.user.pwd){
                this.$message({message: '请输入密码',duration:1000,type: 'warning'})
                return
            }
            if (/^(\d)\1+$/.test(this.user.pwd)){
                this.$message({message: '密码不可重复',duration:1000,type: 'warning'})
                return
            }

          this.post("datacenter/site/loginapi",{"USERNAME":this.user.name,"PASSWORD":this.user.pwd} , res => {
            console.log(res);
            if( res.status < 400 ){
                this.$message({ message: res.data.message,type: 'success' })
                // this.type == '平台管理系统' ? this.$router.push("/nursingPlatform/nurse") : this.$router.push("/workstation")
                const admin_id = decodeURIComponent(this.getCookieVal("admin_id"))
                const real_name = decodeURIComponent(this.getCookieVal("real_name"))
                const username = decodeURIComponent(this.getCookieVal("username"))
                const arr = decodeURIComponent(this.getCookieVal("ward_arr"))
                const ward_arr = JSON.parse(arr)

                sessionStorage.admin_id = admin_id

                console.log(arr)

                let ward_id = decodeURIComponent(this.getCookieVal("ward_id")) ? decodeURIComponent(this.getCookieVal("ward_id")) : ward_arr[0]
                this.setCookie('ward_id',ward_id)

                sessionStorage.userinfo = JSON.stringify({ admin_id, real_name, username, ward_arr, ward_id })
                this.$store.state.userinfo = { admin_id, real_name, username, ward_arr, ward_id }

                //1、判断是否存在 localStorange.info 存在就判断info 是否存在当前登录过的账号id

                this.getSer('datacenter/auth/getauthforlogin',{},res=>{

                  sessionStorage.jur = res.data

                  this.jur = res.data
                  this.platform = this.jur.platform
                  console.log(this.platform)
                  this.$refs.child.computedPlatfrom()
                })



            }
          })
        },
        getCookieVal(cname){
          var name = cname + "=";
          var ca = document.cookie.split(';');
          for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
          }
          return "";
        }
      }
    }
</script>
<style scoped lang='stylus'>
  .el-select
    margin-bottom 20px
    &>>>.el-input__inner
      width 380px
      background-color #f9f9fb
      height 54px
      line-height 54px
      font-size 18px
  .bg{
    height:calc(100% - 54px)
    background: url("../../assets/images/loginbg.png") no-repeat left top;
  }
  .login-box{
    width:496px;
    padding:54px 57px;
    background-color #FFFFFF
    border: 1px solid #eee;
    border-radius: 4px;
    box-shadow:20px 20px 0 0 rgba(0,0,0,0.1);
    position:absolute;
    left:50%;
    top:50%;
    margin-left: -248px;
    margin-top: -236px;
    box-sizing: border-box;
  }
  .login-title{
    line-height:30px;
    padding-left:124px;
    margin-bottom:35px;
    font-size: 20px;
    color: #2B3A50;
    background:url("../../assets/images/loginlogo.png") no-repeat left center;
    background-size:114px 30px;
  }
  .login-inp{
    width:380px;
    height:54px;
    line-height:54px;
    border: 1px solid #D8E3E7;
    border-radius: 5px;
    font-size: 18px;
    outline: none;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .login-btn{
    background: #00B3DC;
    border:none;
    font-size: 20px;
    color: #fff;
    line-height:54px;
    text-align:center;
    cursor:pointer;
    margin-top 40px;
  }
  .bg-user,.bg-pwd{
    padding-left:52px;
    background-size:22px 22px;
  }
  .bg-user{
    background:#F9F9FB url("../../assets/images/user.png") no-repeat 19px center;
  }
  .bg-pwd{
    background:#F9F9FB url("../../assets/images/pwd.png") no-repeat 19px center;
  }
  .marb30{
    margin-bottom:20px !important
  }


</style>
