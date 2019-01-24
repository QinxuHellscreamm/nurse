<template>
    <div>
      <span @click="popshow=!popshow" class="in-upload-partset">上传新版本</span>
      <transition name="el-zoom-in-top" >
        <div class="setcon" v-if="popshow">
          <div class="partset version-table">
            <h5 class="partset-header">{{name}}</h5>
            <table class="verPopTable">
              <tbody>
              <tr>
                <td>版本上传</td>
                <td>
                  <el-upload
                    class="upload-demo"
                    drag
                    :action="upgrAddurl()"
                    auto-upload
                    :before-upload="beforeUpload"
                    :on-success="onSuccess"
                    :on-error="onError"
                    :accept="fileType"
                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  </el-upload>
                </td>
              </tr>
              <tr>
                <td>版本号</td>
                <td><input type="text" placeholder="例:1.0.0"  v-model="upgr_version"></td>
              </tr>
              <tr>
                <td>强制更新</td>
                <td>
                  <label for="upno" >否</label>
                  <input type="radio" name ="update" id="upno" value="0" v-model="upgr_isforce">
                  <label for="upyes">是</label>
                  <input type="radio" name="update" id="upyes" value="1" v-model="upgr_isforce">
                </td>
              </tr>
              <tr>
                <td>是否启用</td>
                <td>
                  <label for="useno">否</label>
                  <input type="radio" id="useno" name="use" value="0" v-model="upgr_status">
                  <label for="useyes">是</label>
                  <input type="radio" id="useyes" name="use" value="1" v-model="upgr_status">
                </td>
              </tr>
              <tr style="height:80px">
                <td>新版本简介</td>
                <td><textarea name="intro" id="" cols="50" rows="4" v-model="upgr_intro"></textarea></td>
              </tr>
              </tbody>
            </table>
            <div class="partset-footer">
              <button class="partset-cancle" @click="popshow=false">取消</button>
              <button class="partset-sure" @click="packSave">保存</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
</template>
<script>
    export default{
        data(){
            return {
              name:"版本更新",
              popshow:false,
              num:0,
              fileType:"apk",
              upgr_addurl:"datacenter/version/pack",
              upgr_downurl:"" ,           //下载地址
              upgr_version:"",             //版本号
              upgr_isforce:0,             //是否强制更新
              upgr_intro:"",                 //版本介绍
              upgr_status:0,           //版本启用状态
              upgr_apptype:1              //默认1，护士站。2，医生站。
            }
        },
  /*  mounted(){
      document.addEventListener('click',function(e){
        if(!!this.$refs.setCon(e.target)){
          return;
        }else{
          this.popshow=false;
        }
      })
    },*/
      methods:{
        upgrAddurl(){
          return this.upgr_addurl;
        },
        beforeUpload(file){
          const filearr = file.name.split(".");
          const isAPK=filearr[filearr.length - 1];
          if (isAPK!="apk") {
            this.$message.error('上传文件只能是 apk 格式!');
          }
          return isAPK;
        },
        onSuccess(res,file,fileList){
          this.upgr_downurl = res.url
          console.log('res')
          console.log(res)
          console.log(this.upgr_downurl)
        },
        onError(err,file,fileList){
           console.log(err);
        },
        packSave(){

          var obj = {
              upgr_downurl:this.upgr_downurl,
              upgr_apptype:this.upgr_apptype,
              upgr_version:this.upgr_version,
              upgr_isforce:this.upgr_isforce,
              upgr_intro:this.upgr_intro ? this.upgr_intro : '',
              upgr_status:this.upgr_status,
          }
            if (!this.upgr_downurl)
            {
                this.$message({type : 'warning', message : '请上传升级包'})
                return
            }
            if (!this.upgr_version)
            {
                this.$message({type : 'warning', message : '请填写版本号'})
                return
            }
          if (!this.upgr_intro)
          {
              this.$message({type : 'warning', message : '请填写版本介绍'})
              return
          }

          this.post("datacenter/version",obj,res => {
               if(res.status == "201"){
                   this.popshow = false
                   this.$parent.pageAjax()
                   this.$message({type : 'success', message : '上传成功!'})
                   window.location.reload();
               }
               else {
                   this.$message({type : 'warning', message : res.data.message})
               }
            })
        }
      }
    }
</script>
<style scoped>

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
    width: 730px;
    max-height:670px;
    padding: 10px 30px;
    background: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.10);
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index:999;
  }
  .partset-header{
    padding:0;
    line-height:40px;
    text-align:center;
  }
  .partset-footer{
    width:350px;
    margin:5px auto;
    overflow:hidden;
  }
  .partset-sure {
    float:left;
    padding:12px 32px;
    background: #00B3DC;
    border-radius: 4px;
    color:#fff;
  }
  .partset-cancle{
    float:right;
    padding:12px 32px;
    background: #DDEFF9;
    border-radius: 4px;
    color: #00B3DC;
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
</style>
