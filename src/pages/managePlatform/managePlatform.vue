<template>
  <div>
    <div class="header">
      <div class="logo"><img src="../../assets/images/logo.png" alt="hokai"></div>
      <h5>智慧护理管理平台</h5>
      <div class="header-right">
        <user :name='name'></user>
      </div>
    </div>
    <sidebar></sidebar>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import sidebar from "./component/sidebar/sidebar.vue"
  import user from '@/components/user'
  export default{
    data(){
      return {
        name:"",
        value:"",
      }
    },

    mounted(){
      this.$nextTick(()=>{
        let info = JSON.parse(localStorage.info)
        let admin_id = this.getCookieVal('admin_id')
        info.forEach(item=>{
        item.admin_id == admin_id ? this.$store.state.userinfo = item : null
    })
      console.log('this.$store.state.userinfo');
      console.log(this.$store.state.userinfo);
      this.name = this.$store.state.userinfo.real_name
    })
    },

    methods:{
      loginout(){
        this.getSer("selectChange()",{},res => {
          if(res.status=="201"){
          this.$store.state.userinfo = null;
          this.$router.push({
            path: '/login'
          })
        }
      })
      },

      selectChange(){
        this.post('datacenter/wardcookie',{ward_id : this.value}, res=>{
          if(res.status<400){
          this.$message({
            type: 'success',
            message: '切换成功!',
          });
          setTimeout(()=>{
            window.location.reload()
        },1000)
          localStorage.info = JSON.stringify({ ...JSON.parse(localStorage.info) , ward_id : this.value })
        }
      })
      }
    },

    components:{ sidebar ,user},

  }
</script>
<style scoped lang='stylus'>
  .popclose{
    width:14px;
    height:14px;
    background:url(../../assets/images/popclose.png) no-repeat center center;
    background-size:cover;
    cursor:pointer;
    vertical-align:middle;
  }
  .main
    height calc(100% - 60px)
    margin-left 184px
    box-sizing border-box
    &>div
      height 100%
  .header
    display flex
    height 60px
    padding-right 30px
    line-height 60px
    background #fff
    box-sizing border-box
    img
      vertical-align middle
    .logo
      position fixed
      img
        width 184px
        height 60px
    h5
      flex 1
      padding-left 224px
      font-family AlBayan
      font-size 24px
      color #1E668A
      font-weight normal
    .el-select >>> .el-input__inner
      width 130px
      height 32px
      background rgba(0,179,220,0.70)
      border none
      border-radius 4px
      color #fff
      text-align center
    .el-select >>> .el-icon-arrow-up:before
      color #FFFFFF

</style>
