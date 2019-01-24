<template>
  <div style="display:inline-block">
    <el-dialog :title="name" :visible.sync="dialogTableVisible" class='dialog' width='444px'>
          <div class='input-item edition'>
            <label>版本号</label>
            <el-input v-model='versionDetail.UPGR_VERSION'></el-input>
          </div>

          <div class='input-item radio'>
            <label>强制更新</label>
            <el-radio-group v-model="versionDetail.UPGR_ISFORCE">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </div>
          <div class='input-item radio'>
            <label>是否启用</label>
            <el-radio-group v-model="versionDetail.UPGR_STATUS">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </div>
          <div class='textarea'>
            <label>新版本简介</label>
            <el-input type='textarea' v-model="versionDetail.UPGR_INTRO"></el-input>
          </div>

          <!--<table class="verPopTable">-->
            <!--<tbody>-->
            <!--<tr>-->
              <!--<td>版本号</td>-->
              <!--<td><span>{{versionDetail.UPGR_VERSION}}</span></td>-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td>强制更新</td>-->
              <!--<td>-->
                <!--<label for="upno" >否</label>-->
                <!--<input type="radio" name ="update" id="upno" :checked="versionDetail.UPGR_ISFORCE==0" >-->
                <!--<label for="upyes">是</label>-->
                <!--<input type="radio" name="update" id="upyes" :checked="versionDetail.UPGR_ISFORCE==1" >-->
              <!--</td>-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td>是否启用</td>-->
              <!--<td>-->
                <!--<label for="upno" >否</label>-->
                <!--<input type="radio" name ="use" id="useno" :checked="versionDetail.UPGR_STATUS==0" >-->
                <!--<label for="upyes">是</label>-->
                <!--<input type="radio" name="use" id="useyes" :checked="versionDetail.UPGR_STATUS==1" >-->
              <!--</td>-->
            <!--</tr>-->
            <!--<tr style="height:80px">-->
              <!--<td>新版本简介</td>-->
              <!--<td>{{versionDetail.UPGR_INTRO}}</td>-->
            <!--</tr>-->
            <!--</tbody>-->
          <!--</table>-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="save" type="primary">确 定</el-button>
      </div>

    </el-dialog>
  </div>
</template>
<script>
  export default{

    data(){
      return {
        name:"版本详情",
        popshow:false,
        dialogTableVisible : false,
        versionDetail:{}
      }
    },

    methods:{
      viewClick(id){
        this.dialogTableVisible = true
          this.getSer("datacenter/version/"+id,{ id : id}, res => {
            console.log(res.data)
            this.versionDetail = res.data
            this.versionDetail.UPGR_ISFORCE += ''
            this.versionDetail.UPGR_STATUS += ''
        })
      },
      save(){
          var obj = {
              id : this.versionDetail.ID,
              UPGR_CODE : this.versionDetail.UPGR_CODE ? this.versionDetail.UPGR_CODE : '',
              UPGR_DEVICE : this.versionDetail.UPGR_DEVICE,
              UPGR_INTRO : this.versionDetail.UPGR_INTRO ? this.versionDetail.UPGR_INTRO : '',
              UPGR_ISFORCE : this.versionDetail.UPGR_ISFORCE,
              UPGR_STATUS : this.versionDetail.UPGR_STATUS,
              UPGR_TYPE : this.versionDetail.UPGR_TYPE,
              UPGR_VERSION : this.versionDetail.UPGR_VERSION,
          }
          this._put("datacenter/version/" + this.versionDetail.ID, obj, res => {
              if(res.data.status=="201"){
                  //成功回调
                  this.dialogTableVisible = false
                  this.$message({
                      type: 'success',
                      message: '编辑成功!'
                  })
                  this.$parent.pageAjax()
              }
          })
      }
    },

  }
</script>
<style scoped lang='stylus'>
  /*background: #00B3DC;*/
  .input-item
    line-height 40px
    margin-bottom 20px
  .edition
    label
      margin-right 10px
    .el-input
      width 310px
      &>>>.el-input__inner
        background-color #F9F9FB
  .radio
    label
      margin-right 20px
  .textarea
    label
      line-height 40px
  .el-textarea
    &>>>.el-textarea__inner
      resize none
      height 150px
      background-color #F9F9FB

</style>
