<template>
    <div class='page-main'>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="护理问题" disabled></el-tab-pane>
        <el-tab-pane :label="item.DIS_NAME" :name="index+1+''" v-for='(item,index) of tabPane' :key='index' >
          <span slot="label" @contextmenu.prevent="tabRightClick($event,'ND',item)">
            <i class='tab-status' :class='"tab-status" + item.STATUS'></i>
            <span>{{ item.DIS_NAME }}</span>
          </span>
          <painContent :STAGE='item.STAGE' :TARGET='item.TARGET' :STATUS1='item.STATUS'></painContent>
        </el-tab-pane>
      </el-tabs>
      <transition name="el-zoom-in-top">
        <div class='fixed' ref='fix' v-show='fixShow' @mouseout='fixMouseOut'>
          <div class='complete' @click='getAxios(2)'>完成</div>
          <div class='cancel' @click='getAxiosa(1)' v-if='type =="ND"'>取消</div>
          <div class='termination' @click='getAxios(3)'>终止</div>
        </div>
      </transition>
      <div class='add-edit'>
        <el-button @click='addClick'><i class='el-icon-circle-plus-outline' style='color: #11C462; font-size: 22px'></i></el-button>
        <el-button @click='editClick'><i class='el-icon-edit' style='color: #00b3dc; font-size: 22px'></i></el-button>
        <el-button @click='deleteClick'><i class='el-icon-delete' style='color: #E63922; font-size: 22px'></i></el-button>
        <el-button><i class='el-icon-printer' style='color: #00b3dc; font-size: 22px'></i></el-button>
      </div>
      <editNursingPath  ref='edit' :INPATIENT_NUMBER='INPATIENT_NUMBER'></editNursingPath>
    </div>
</template>

<script>
  import painContent from './painContent'
  import editNursingPath from './editNursingPath'
  import {_YMD} from '@/global'
    export default {
        name: "nursingPlan",

        props: ['INPATIENT_NUMBER','INPATIENT_AREA_DATE'],

        components:{ painContent , editNursingPath },

        data(){
          return{
            activeName: '',
            tabPane : [],
            fixShow : false,
            type : '',
            id : '',
            obj : {},
            currentData : {},
          //  vals:false,
          }
        },

        methods:{
     /*     vall() {
            this.vals = true
            console.log("ssssssssssss",this.vals)
          },*/
          getAxiosa(status){
            this.fixShow = false
            this.getSer('datacenter/nursingplan/operate' ,{ id : this.id , status , type : this.type } , res=>{
              if(res.status < 400){
              this.$message({ type: 'success', message : '编辑成功'})
              this.obj.STATUS = status
            }
          })
          },
          getAxios(status){
            this.fixShow = false
            this.getSer('datacenter/nursingplan/operate' ,{ id : this.id , status , type : this.type } , res=>{
              if(res.status < 400){
                this.$message({ type: 'success', message : '编辑成功'})
                this.obj.STATUS = status
              }
            })
          },
          getData(){
            this.getSer("datacenter/nursingplan/planlist",{ number:this.INPATIENT_NUMBER }, res => {
              let today = new Date(_YMD()).getTime()
              console.log("琪琪",res)
              let tabPane = []
              res.data.items.forEach(stage=>{
                let numberOfDays = 0 //住院天数
                let frequency = 0 //手术次数
                let frequencyArr = []
                let current = 0//当前执行的阶段
                let beHospitalized = new Date(this.INPATIENT_AREA_DATE.split(' ')[0]).getTime()
                stage.STAGE.forEach(item=>{
                  item.numberOfDays = []
                  item.operation = []

                  if( today <= beHospitalized + (item.FEW_DATS*86400000)){
                    current++
                    item.current = current
                  }else{
                    beHospitalized = beHospitalized + (item.FEW_DATS*86400000)
                  }
                  for (var i = 0;i < item.FEW_DATS;i++){
                    numberOfDays++
                    item.numberOfDays.push(numberOfDays)
                    if(i < item.THAT_DAY.DAYS - 1){//该阶段手术前
                      if(frequency == 0){
                        item.operation.push({ type:'2', num:'' ,day : numberOfDays})
                      }else{
                        let obj = this.computedfss(frequencyArr)
                        let str = obj.str
                        frequencyArr = obj.arr
                        item.operation.push({ type:'2', num : str ,day : numberOfDays})
                      }
                    }else if(i == item.THAT_DAY.DAYS - 1){ //该阶段做手术的那天
                      frequency ++
                      frequencyArr.push(0)
                      frequencyArr = this.computedsss(frequencyArr)
                      item.operation.push({ type:'1', num:'' ,day : numberOfDays })
                    }else if(i > item.THAT_DAY.DAYS - 1){ //该阶段手术后
                      let obj = this.computedfss(frequencyArr)
                      let str = obj.str
                      frequencyArr = obj.arr
                      item.operation.push({ type:'2', num :str , day : numberOfDays})
                    }

                  }
                })
                tabPane.push(stage)
              })
              this.tabPane = tabPane
              this.currentData = tabPane[0]
              this.activeName = '1'

            })
          },
          tabRightClick(e,type,item){
            console.log(this.$refs)
            this.$refs.fix.style.left = e.clientX-4  + 'px'
            this.$refs.fix.style.top = e.clientY-4  + 'px'
            this.fixShow = true
            this.type = type
            this.id = item.ID
            this.obj = item
          },
          fixMouseOut(e){
            console.log(e);
            if(e.toElement.className == 'complete' || e.toElement.className == 'termination' || e.toElement.className == 'cancel'){
                return
            }
            this.fixShow = false
          },
          computedsss(arr){
            var newARR = []
            arr.forEach((item,index)=>{
              if(arr.length - 1 == index) newARR.push(item)
              else newARR.push(++item)
            })
            return newARR
          },
          computedfss(arr){
            let str = ''
            var newARR = []
            arr.forEach((item,index)=>{
              if(arr.length - 1 == index){
                item += 1
                newARR.push(item)
                if(item <= 7){
                  str += item
                }
              }else{
                item += 1
                if(item <= 7){
                  str += (item+'-')
                }
                newARR.push(item)
              }
            })
            return { arr : newARR ,str : str }
          },
          addClick(){
            this.$refs.edit.emptyData()
          },
          editClick(){
            let obj = {...this.currentData , TARGET:[...this.currentData.TARGET] , STAGE : [...this.currentData.STAGE]}
            this.$refs.edit.setData(obj)
          },
          deleteClick(){
            console.log(1);
            this._delete('datacenter/nursingplan/'+ this.currentData.ID,{ id : this.currentData.ID },res => {
              if(res.status == 204){
                this.$message({type: 'success', message: '删除成功!'})
                this.getData()
              }
            })
          }
        },

        mounted(){
          this.$nextTick(()=>{
            this.getData()

          })
        },

        watch:{
          'activeName':function (to) {
            this.currentData = this.tabPane[to-1]
          },
       /*   'vals'(val, oldVal){
            if(val == true){
              this.getData()
              // this.$refs.see.seeDtae()
              console.log("doing",val)

            }
          }*/
        }
    }
</script>

<style scoped lang='stylus'>
  .page-main
    position relative
    .add-edit
      position absolute
      top 10px
      right 15px
      .el-button
        padding 0
        border none
    &>>>.el-tabs__item
      span
        padding-left 8px
    &>>>.is-active
      border-bottom 2px solid #00B3DC !important
    &>>>.el-tabs__header
      margin 0
    .tab-status
      position absolute
      width 18px
      height 18px
      left 10px
      top 11px
      &.tab-status1
        background url("./image/status1.png")
      &.tab-status2
        background url("./image/status2.png")
      &.tab-status3
        background url("./image/status3.png")
    .fixed
      position fixed
      width 130px
      z-index 3000
      background-color #00B3DC
      line-height 34px
      text-align center
      .complete,.cancel
        border-bottom 1px solid #FFFFFF
        color #FFFFFF
      .termination
        color #FFFFFF
</style>
