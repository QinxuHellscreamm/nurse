<template>
    <el-menu default-active="1-1" text-color="#000000">
      <el-submenu index="1">
        <template slot="title">
          <i class='slidebar-icon icon1'></i>
          <span>在院病人</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index='1+"-"+index' v-for="(item,index) of screen" :key=index @click='goIndex(item.sign)'>
            <template slot="title">
              <i :class="item.sign" class='custom-icon'></i>
              <span>{{item.title}}({{item.count}})</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item :index="''+item.index" class='custom-h' v-for='item of customSidebar' :key=item.index @click='test(item)'>
        <i class='slidebar-icon' :class='item.icon'></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>

    </el-menu>
</template>

<script>
    export default {
        name: "sidebar",

        data(){
          return{
            screen : [{count:"6",sign:"in_hospital_bed_count",title:"在院病人"}],
            customSidebar : [
              // {title : '出院病人' , index:2 , path : '/workstation/outPatients' , name : 'outPatients' , id : ''},
              // {title : '授权病人' , index:3 , path : '/workstation/accPatients' , name : 'accPatients' , id : ''},
              // {title : '生命体征批量录入',index:4, path:'/workstation/batchEntryOfSigns' ,name : 'batchEntryOfSigns', id : ''},
              // {title : '交班报告',index:5 , path:'/workstation/ShiftReport' , name : 'shiftReport' , id : ''},
              // {title : '责任床设置',index:6 , path : '/workstation/batchBedSetUp' , name : 'batchBedSetUp', id : ''},
              // {title : '医嘱校对',index:7, path : '/workstation/doctorPro' , name : 'doctorPro', id : ''},
              // {title : '医嘱执行',index:8, path : '/workstation/doctorImp' , name : 'doctorImp', id : ''},
              // {title : '不良事件报告单',index:9, path : '/workstation/adverseEventRep' , name : 'adverseEventRep', id : '' },
              // {title : '排班预览',index:10,path : '/workstation/workPreview' , name : 'workPreview', id : ''  },
            ],
            bedTypes:'in_hospital_bed_count',
          }
        },

        methods:{
          test(item){
            this.$parent.judgePath(item)
            this.$router.push(item.path)
          },
          goIndex(sign){
            //console.log("222",this.bedTypes);
            this.bedTypes = sign
            this.$router.push('inPatients')
            this.$store.state.bedType = this.bedTypes
          },
          getData(){
            this.getSer("datacenter/bedhead",{}, res => {
              this.screen = res.data.items
            })
            this.$store.state.bedType = this.bedTypes

          }
        },

        created(){
          this.$nextTick(() => {
            this.getData()
            let routes = JSON.parse(sessionStorage.routes)
            routes.children.forEach((item,index)=>{
              switch (item.name) {
                case 'inPatients':
                  break
                case 'outPatients':
                  this.customSidebar.push({title : '出院病人' , index:index+1 , path : item.path , name : item.name , id : '' ,icon :'icon2'})
                  break
                case 'accPatients':
                  this.customSidebar.push({title : '授权病人' , index:index+1 , path : item.path , name : item.name , id :'',icon :'icon3'})
                  break
                case 'batchEntryOfSigns':
                  this.customSidebar.push({title : '生命体征批量录入' , index:index+1 , path : item.path , name : item.name , id : '',icon :'icon4'})
                  break
                case 'bloodSugarEntry':
                  this.customSidebar.push({title : '血糖批量录入' , index:index+1 , path : item.path , name : item.name , id : '',icon :'icon4'})
                  break
                case 'docSugarEntry':
                  this.customSidebar.push({title : '护理记录批量录入' , index:index+1 , path : item.path , name : item.name , id : '',icon :'icon4'})
                  break
                case 'shiftReport':
                  this.customSidebar.push({title : '交班报告' , index:index+1 , path : item.path , name : item.name , id :'',icon : 'icon5'})
                  break
                case 'batchBedSetUp':
                  this.customSidebar.push({title : '责任床设置' , index:index+1 , path : item.path , name : item.name , id :'',icon : 'icon6'})
                  break
                case 'doctorPro':
                  this.customSidebar.push({title : '医嘱执行' , index:index+1 , path : item.path , name : item.name , id :'',icon : 'icon7'})
                  break
                case 'doctorImp':
                  this.customSidebar.push({title : '医嘱校对' , index:index+1 , path : item.path , name : item.name , id : '',icon :'icon8'})
                  break
                case 'adverseEventRep':
                  this.customSidebar.push({title : '不良事件报告单' , index:index+1 , path : item.path , name : item.name , id :'',icon : 'icon9'})
                  break
                case 'workPreview':
                  this.customSidebar.push({title : '排班预览' , index:index+1 , path : item.path , name : item.name , id :'',icon : 'icon10'})
                  break
              }
            })

          })
        }
    }
</script>

<style scoped lang='stylus'>
  .el-menu
    margin-top 56px
    width 184px
    height calc(100% - 56px)
    background-color #E6EBF0
    .el-menu-item
      min-width 0
      height 30px
      line-height 30px
      background-color #E6EBF0
      &.is-active
        color #000000
    .el-submenu,.el-menu-item
      span
        font-size 16px
      .slidebar-icon
        width 18px
        height 18px
        background-repeat no-repeat
        background-size 100% 100%
      .el-menu-item
        &.is-active
          background-color #F3F3F8
        span
          font-size 14px
    .el-menu-item-group
      &>>>.el-menu-item-group__title
        padding 0
    &>>>.el-submenu__title,.custom-h
      height 42px
      line-height 42px
  .slidebar-icon
    display inline-block
    position relative
    top -1px
    margin-right 6px
    width 18px
    height 18px
    &.icon1
      background-image url("./image/inHospital.png")
    &.icon2
      background-image url("./image/leaveHospital.png")
    &.icon3
      background-image url("./image/authorization.png")
    &.icon4
      background-image url("./image/icon4.png")
    &.icon5
      background-image url("./image/icon5.png")
    &.icon6
      background-image url("./image/icon6.png")
    &.icon7
      background-image url("./image/icon7.png")
    &.icon8
      background-image url("./image/icon8.png")
    &.icon9
      background-image url("./image/icon9.png")
    &.icon10
     background-image url("./image/icon9.png")
  .custom-icon
    display inline-block
    width 14px
    height 14px
    background-repeat no-repeat
    background-size 100% 100%
    margin-right 2px
    &.new_in_hospital_bed_count
      background-image url("./image/greenCircle.png")
    &.no_stool_in_three_days_count
      background-image url("./image/violetCircle.png")
    &.in_hospital_serven_bed_count
      background-image url("./image/blueCircle.png")
    &.not_normal_count
      background-image url("./image/redCircle.png")
    &.number_grade_1_bed_count
      background-image url("./image/one.png")
    &.number_grade_2_bed_count
      background-image url("./image/two.png")
    &.number_grade_3_bed_count
      background-image url("./image/three.png")
    &.number_grade_0_bed_count
      background-image url("./image/super.png")
</style>
