<template>
    <div class='pain-right'>
      <div class='pain-title'>阶段</div>
      <div class='stage-box'>
        <div class='order'>
          <div class="title">执行医嘱</div>
          <ul>
            <li v-for='item of active_STAGE.EXECUTE_ORDER' @contextmenu.prevent="liRightClick($event,'NEO',item)">
              <i :class='"status" + item.STATUS'></i>
              <p>{{item.EXECUTE_ORDER}}</p>
            </li>
          </ul>
        </div>
        <div class="guidance">
          <div class="title">护理与健康指导</div>
          <ul>
            <li v-for='item of active_STAGE.HEALTH_NOTES' @contextmenu.prevent="liRightClick($event,'NHN',item)">
              <i :class='"status"+item.STATUS'></i>
              <p>{{item.HEALTH_NOTES}}</p>
            </li>
          </ul>
        </div>
        <div class="variation">
          <div class="title">变异</div>
          <ul v-if='active_STAGE'>
            <li @contextmenu.prevent='variation(1)'>
              <i :class='{"status1":active_STAGE.IS_ABNORMAL.trim() != "","status2":active_STAGE.IS_ABNORMAL.trim() == ""}'></i>
              <p>无变异</p>
            </li>
            <li @contextmenu.prevent='dialogShow'>
              <i :class='{"status1":active_STAGE.IS_ABNORMAL.trim() == "","status2":active_STAGE.IS_ABNORMAL.trim() != ""}'></i>
              <p>有变异</p>
            </li>
          </ul>
          <div style='padding:5px 15px 30px' v-if='active_STAGE'>
            <el-input type="textarea"  placeholder="变异原因尚未发现" v-model="active_STAGE.IS_ABNORMAL" readonly></el-input>
          </div>
        </div>
      </div>
      <el-dialog :visible.sync="popshow" title='变异原因' width='444px'>
        <el-input type="textarea"  placeholder="请输入内容" v-model="active_STAGE.IS_ABNORMAL"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="popshow=false">取 消</el-button>
          <el-button @click="variation(2)" type='primary'>确 定</el-button>
        </div>
      </el-dialog>
      <transition name="el-zoom-in-top">
        <div class='fixed' ref='fix' v-show='fixShow' @mouseout='fixMouseOut'>
          <div class='complete' @click='getAxios(2)'>完成</div>
          <div class='termination' @click='getAxios(1)' >取消</div>
        </div>
      </transition>
    </div>
</template>

<script>
    export default {
        name: "painRight",

        props: ['active_STAGE','STUTUS1'],

        data(){
          return{
            popshow : false,
            fixShow : false,
            obj : {},
            id : '',
            type : ''

          }
        },

        methods:{
          fixMouseOut(e){
            if(e.toElement.className == 'complete' || e.toElement.className == 'termination'){
              return
            }
            this.fixShow = false
          },
          liRightClick(e,type,item){
            if(this.STATUS1 ==2) return
            if(this.active_STAGE.STATUS ==2) return
            this.$refs.fix.style.left = e.clientX - 5  + 'px'
            this.$refs.fix.style.top = e.clientY - 5  + 'px'
            this.fixShow = true
            this.type = type
            this.id = item.ID
            this.obj = item
          },
          getAxios(status){
            this.fixShow = false
            this.getSer('datacenter/nursingplan/operate' ,{ id : this.id , status , type : this.type } , res=>{
              console.log(res);
              if(res.status < 400){
                this.$message({ type: 'success', message : '编辑成功'})
                this.obj.STATUS = status
              }
            })
          },
          variation(type){
            if(this.STATUS1 ==2) return
            if(this.active_STAGE.STATUS ==2) return
            if(type == 1) this.active_STAGE.IS_ABNORMAL = ""

            let str = this.active_STAGE.IS_ABNORMAL ? this.active_STAGE.IS_ABNORMAL : ' '
            this.getSer('datacenter/nursingplan/operate' ,{ id : this.active_STAGE.ID , status : str , type : 'NB' } , res=>{
              console.log(res);
              if(res.status < 400){
                this.$message({ type: 'success', message : '编辑成功'})
                this.popshow = false
              }
            })
          },
          dialogShow(){
            if(this.STATUS1 ==2) return
            if(this.active_STAGE.STATUS ==2) return
            this.popshow = true
          }

        },

        watch:{
          'active_STAGE':function (to) {
            console.log(to)
            //this.$parent.$parent.getData()
          }
        }
    }
</script>

<style scoped lang='stylus'>
  .pain-right
    flex 1
    .pain-title
      text-align center
      border-bottom 1px solid #ebeef5
      line-height 36px
      font-weight 600
      font-size 16px
    .stage-box
      display flex
      .order
        flex 1
        border-bottom 1px solid #ebeef5
        border-right 1px solid #ebeef5
      .guidance
        flex 1
        border-bottom 1px solid #ebeef5
        border-right 1px solid #ebeef5
      .variation
        flex 1
        border-bottom 1px solid #ebeef5
        border-right 1px solid #ebeef5
      .title
        line-height 30px
        border-bottom 1px solid #ebeef5
        text-align center
        font-weight 600
      ul
        padding 5px 0
        li
          display flex
          p
            line-height 32px
            flex 1
          i
            display block
            width 18px
            height 18px
            position relative
            top 7px
            margin 0 10px 0 17px
          .status1
            background url("./image/status1.png")
          .status2
            background url("./image/status2.png")
    .el-textarea
      &>>>.el-textarea__inner
        resize none
        background-color #F9F9FB
        height 180px
    .el-button
      padding 12px 32px
    .el-button--primary
      padding 12px 42px
    .fixed
      position fixed
      width 130px
      z-index 3000
      background-color #00B3DC
      line-height 34px
      text-align center
      .complete
        border-bottom 1px solid #FFFFFF
        color #FFFFFF
      .termination
        color #FFFFFF
</style>
