<template>
  <div style="height:100%">
    <div class="header">
      <div class="logo"><img src="../assets/images/logo.png" alt="hokai"></div>
      <h5>护理管理信息平台</h5>
      <div class="header-right">
        <div><img src="../assets/images/mesg.png"></div>
          <el-select v-model="ward" filterable placeholder="内科病区" style="margin-right:20px">
            <el-option
              v-for="item in  wardList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        <el-select  v-model="ward2" placeholder="LILY">
          <el-option v-for="item in owner" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
    </div>
    <div class="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        wardList: [{
          value: '选项1',
          label: '内科病区'
        }, {
          value: '选项2',
          label: '骨科病区'
        }, {
          value: '选项3',
          label: '妇科病区'
        }, {
          value: '选项4',
          label: '内科病区二'
        }, {
          value: '选项5',
          label: '内科病区三'
        }],
        ward: '',
        ward2:'',
        owner: [{
          value: 'name',
          label: 'Lily'
        }, {
          value: 'pwd',
          label: '修改密码'
        }, {
          value: 'quit',
          label: '退出账号'
        }]
      }
    }
  }
</script>
<style>
  * {
    padding: 0;
    margin: 0;
    font-size: 16px;
  }
  html, body {
    min-width:1000px;
    height: 100%;
    font-family: MicrosoftYaHei, 'Avenir', Helvetica, Arial, sans-serif;
    color: #2B3A50;
    overflow-y:hidden;
  }

  a {
    text-decoration: none;
    border: none;
  }

  ul {
    list-style: none;
  }
  input,img,button{
    border:none;
    outline:none;
  }
  button,input[type=submit]{
    cursor:pointer;
  }
  .header {
    display: flex;
    height: 60px;
    padding-right: 30px;
    line-height: 60px;
    background: #fff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .header img {
    vertical-align: middle;
  }

  .logo img {
    width: 184px;
    height: 60px;
  }

  .header h5 {
    flex: 1;
    padding-left: 20px;
    font-family: AlBayan;
    font-size: 24px;
    color: #1E668A;
    font-weight: normal;
  }

  .header-right {
    display: flex;
  }

  .header-right img {
    width: 32px;
    height: 32px;
    margin-right: 30px;
  }
  .header-right .el-input__inner{
    width:130px;
    height:32px;
    background: rgba(0,179,220,0.70);
    border:none;
    border-radius: 4px;
    color:#fff;
  }
  .header-right .el-icon-arrow-up:before{
    color:#fff;
  }
  .header-right .el-input__inner{
    text-align:center;
  }
  .header-right .el-popper[x-placement^=bottom],.header-right .el-select-dropdown{
    margin:0 !important;
  }
  .container{
    height:calc(100% - 60px);
    background:#eee;
  }
  .container>div{
   height:100%;
  }
.popclose{
   width:14px;
   height:14px;
   background:url(../assets/images/popclose.png) no-repeat center center;
   background-size:cover;
   cursor:pointer;
   vertical-align:middle;
 }
</style>
