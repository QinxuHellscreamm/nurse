<template>
    <div class='card-content'>
        <div class='card-item' v-for="(item,index) of bed_sign_list" :key='index' @click='setStore(item.ID,index)' @contextmenu='rightClick($event,item)' :class='{"active":activeIndex == index}'>
          <div class='top'>
            <span class='bed-code'>{{item.BED_NUMBER}}</span>
            <span class='bed-type' v-if='$store.state.bedType == "to_be_set_patient_count"'>待安置</span>
            <span class='bed-type' v-else='$store.state.bedType == "to_be_set_patient_count"'>{{item.BED_CATEGORY_NAME}}</span>
          </div>
          <div class='center'>
            <div class='center1'>
              <span class='name' @click.stop='showDOC(item)'>{{item.NAME}}</span>
              <span class='sex'>{{item.SEX}}</span>
              <span class='old'>{{item.PATIENT_AGE}}</span>
              <i class='bed-leave' :class='"bed-leave" + Number(item.NURSING_GRADE_ID)'></i>
            </div>
            <div class='center2'>
              <span class='department' v-if="item.DEPARTMENT">科室：{{item.DEPARTMENT}}</span>
             <!-- <span style="float: right;" v-if="item."><span>男宝(1)</span><span>女宝(1)</span></span>-->
            </div>
            <div class='center3'>
              <span class='diagnostic-results' v-if="item.DIAGNOSTIC_RESULTS">诊断：{{item.DIAGNOSTIC_RESULTS | nullfilter}}</span>
            </div>
          </div>
          <div class='bottom'>
            <div class='doctor' v-if="item.DOCTOR">医生：{{ item.DOCTOR }}</div>
            <div class='in-date' v-if="item.HOSPITALIZED_DATE">入院：{{ item.HOSPITALIZED_DATE }}</div>
          </div>
        </div>
        <transition name='el-zoom-in-center'>
          <div class='right-menu' :style='menuStyle' v-if='rightMenuShow & $store.state.bedType != "empty_bed_count" & $store.state.bedType != "to_be_set_patient_count" & thisData.INPATIENT_NUMBER != null'>
            <ul>
              <li @click.stop='dy'>腕带打印</li>
              <li @click.stop=''>床头卡打印</li>
              <li @click.stop='turnBed(thisData)'>病人转床</li>
              <!--<li @click.stop='leaveBed(thisData)'>病人离床</li>-->
              <!--<li @click.stop='turnDepartment(thisData)'>转科申请</li>-->
              <!--<li @click.stop='newBorn(thisData)' v-if="thisData.DEPARTMENT_ID=='10087'">新生儿登记</li>-->
              <li @click.stop='setPrimarynurse(thisData)' v-if="thisData.IS_PRIMARY">取消责任床</li>
              <li @click.stop='setPrimarynurse(thisData)' v-else>设置责任床</li>
            </ul>
          </div>
        </transition>
        <!--<transition name='el-zoom-in-center'>-->
          <!--<div class='right-menu' :style='menuStyle' v-if='rightMenuShow & $store.state.bedType == "empty_bed_count"'>-->
            <!--<ul>-->
              <!--<li @click.stop='safeBed()'>床位安置</li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</transition>-->
        <!--<transition name='el-zoom-in-center'>-->
          <!--<div class='right-menu' :style='menuStyle' v-if='rightMenuShow & $store.state.bedType == "to_be_set_patient_count"'>-->
            <!--<ul>-->
              <!--<li @click.stop='safeBed(thisData)'>床位安置</li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</transition>-->
        <!--<transition name='el-zoom-in-center'>-->
          <!--<div class='right-menu' :style='menuStyle' v-if='rightMenuShow & thisData.INPATIENT_NUMBER == null '>-->
            <!--<ul>-->
              <!--<li @click.stop='safeBed(thisData)'>床位安置</li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</transition>-->
        <turnBed ref='turnBed' :thisData='thisData' ></turnBed>
        <leaveBed ref='leaveBed' :thisData='thisData'></leaveBed>
        <safeBed ref='safeBed' :thisData='thisData'></safeBed>
        <turnDepartment ref='turnDepartment' :thisData='thisData'></turnDepartment>
        <!--<newBorn ref='newBorn' :thisData='thisData' v-if='thisData'></newBorn>-->
    </div>
</template>

<script>
  import turnBed from './rightButtonMenu/turnBed'//转床组件
  import leaveBed from './rightButtonMenu/leaveBed'//离床组件
  import safeBed from './rightButtonMenu/safeBed'//安床组件
  import turnDepartment from './rightButtonMenu/turnDepartment'//转科组件
  import newBorn from './rightButtonMenu/newBorn'//新生儿组件

  import patientDoc from '@workstation/PatientDOC/PatientDocPage'

  import { _debounce } from "@/global"
    export default {
        name: "cardShow",

        components : { turnBed , safeBed, leaveBed, turnDepartment , newBorn},

        data(){
          return {
            bed_sign_list : [],
            currentPage : 1,
            own : 0,
            serch_value : '',
            menuStyle : {
              left : '',
              top : ''
            },
            activeIndex : -1,
            rightMenuShow : false,
            thisData : '',
            pageCount : 0,
            watchBedType : false
          }
        },

        methods : {
          setStore(id,index){
            if (typeof id == "undefined" || id == null){  //病人为空  没有动作
                return
            }
            this.activeIndex = index
            this.getSer("datacenter/patient/" + id, {id} , res => {
              console.log(res)
              if(res.status <= 400){
                this.$store.state.patientDetile = res.data
                this.$store.state.patientShow = true
              }
            })
          },
          rightClick(event,item){

            event.preventDefault()
            this.menuStyle.left = event.clientX +'px'
            this.menuStyle.top = event.clientY +'px'
            this.rightMenuShow = true
            this.thisData = item
            console.log(this.thisData);
          },
          getData(){
            this.getSer("datacenter/bed",{ filterfuc : this.$store.state.bedType , page_size : 20 , page : this.currentPage , is_onlyprimary : this.own, inpatient_number : this.serch_value }, res => {
              console.log(res)
              if(res.status <= 400) {
                this.bed_sign_list = res.data.items
                this.pageCount = res.data.meta.pageCount
              }
            })
          },
          pushData(){
            this.getSer("datacenter/bed",{ filterfuc : this.$store.state.bedType , page_size : 20 , page : this.currentPage , is_onlyprimary : this.own, inpatient_number : this.serch_value }, res => {
              console.log(res)
              if(res.status <= 400) this.bed_sign_list.push(...res.data.items)
            })
          },
          dy(){
            console.log(1);
          },
          waterfall : _debounce(function (obj) {
            obj.innerHeight + obj.scrollY >= document.body.scrollHeight && this.pageCount > this.currentPage ? this.currentPage += 1 : null
          }),
          turnBed(data){
            this.$refs.turnBed.show(data)
          },
          newBorn(data){
            this.$refs.newBorn.show(data)
          },
          leaveBed(data){
              this.$refs.leaveBed.popshow = true
          },
          turnDepartment(data){
            this.$refs.turnDepartment.show(data)
          },
          safeBed(data){
            this.$refs.safeBed.show(data)
          },
          showDOC(data){
            this.$parent.$parent.judgePath({title : data.NAME , path : '/workstation/patientDOC/' + data.ID , name:'patientDOC' , id : data.ID})
            this.$router.push('/workstation/patientDOC/' + data.ID)
            setTimeout(()=>{
              document.getElementsByClassName('router-link-active')[0].style.display = 'block'
            })
          },
          setPrimarynurse(data){
            this.post('datacenter/primarynurse/updatestatus',{patient_id:data.ID} , res => {
                if(res.status<400){
                  this.$message({type: 'success', message: res.data.message})
                  this.rightMenuShow = false
                  this.getData()
                }
            })
          }
        },

        mounted(){
          this.$nextTick(()=>{
            document.oncontextmenu = event => {  event.preventDefault()  }
            document.onclick = () => { this.rightMenuShow = false }
            this.getData()
            let vm = this
            window.addEventListener('scroll' , function () { //瀑布流
              vm.waterfall(this)
              vm.rightMenuShow = false
            })
        })
      },

        watch : {
          '$store.state.bedType' : function () {
            this.currentPage = 1
            this.activeIndex = -1
            this.$store.state.patientDetile = ''
            this.$store.state.patientShow = false
            this.getData()
            this.watchBedType = true
            setTimeout(()=>{
              this.watchBedType = false
            },10)
          },
          'currentPage' : function () {
            !this.watchBedType ? this.pushData() : null
          },
          '$parent.own' : function () {
            this.$parent.own == true ? this.own = 1 : this.own = 0
            this.getData()
          }
        },
    }
</script>

<style scoped lang='stylus'>
  .card-content
    width 100%
    /*padding 0 23px*/
    padding-left 10px
    overflow hidden
    .card-item
      background #FFFFFF
      box-shadow 0 0 9px 0 rgba( 0 , 0 , 0 , 0.08)
      border-radius 4px
      height 217px
      float left
      overflow hidden
      &:hover
        box-shadow: 0 0 9px 0 rgba(0,179,220,0.45)
        cursor pointer
        .name
          text-decoration underline
          color #00B3DC
      &.active
        .top
          background-color #00B3DC
          span
            color #FFFFFF
      .top
        padding 0 13px
        line-height 36px
        overflow hidden
        height 36px
        .bed-code
          color #000
          float left
          font-weight 600
          font-size 20px
        .bed-type
          float right
          color #6C8B97
      .center
        background-color #F9F9FB
        height 88px
        padding 10px 13px
        line-height 30px
        .center1
          color #2B3A50
          font-family MicrosoftYaHei-Bold
          font-weight bold
          span
            margin-right 6px
          .bed-leave
            display inline-block
            width 14px
            height 14px
            float right
            position relative
            top 8px
          .bed-leave2
            background-image url("../component/sidebar/image/one.png")
          .bed-leave3
            background-image url("../component/sidebar/image/two.png")
          .bed-leave1
            background-image url("../component/sidebar/image/super.png")
          .bed-leave4
            background-image url("../component/sidebar/image/three.png")
        .center2
          .department
            font-family MicrosoftYaHei-Bold
            font-weight bold
        .center3
          .center3
            .diagnostic-results
              color #324668
      .bottom
        padding 9px 13px
        line-height 22px
        color #2B3A50
        div
          line-height 28px
  @media screen and (min-width 1800px)
    .card-item
      width 18.5%
      margin 0 0 1% 1%
      &:nth-child(5n - 4)
        margin-left 0
  @media screen and (max-width 1799px) and (min-width 1600px)
    .card-item
      width 23%
      margin 0 0 1.2% 1.2%
      &:nth-child(4n - 3)
        margin-left 0
  @media screen and (max-width 1599px)
    .card-item
      width 31%
      margin 0 0 1.4% 1.4%
      &:nth-child(3n - 2)
        margin-left 0
  .right-menu
    position fixed
    width 145px
    background-color #FFFFFF
    box-shadow: 0 0 9px 0 rgba(0,179,220,0.45)
    border-radius 4px
    ul
      padding 10px 0
      li
        line-height 30px
        padding 0 20px
        &:hover
          background-color rgba(0,179,220,0.45)

</style>
