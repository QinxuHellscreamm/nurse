<template>

     <div class='right-bar'>
       <i class='el-icon-d-arrow-right' @click='$store.state.patientShow = !$store.state.patientShow'></i>
       <div class='no-show' v-if='!$store.state.patientShow'> 病人详情 </div>
         <div class='show' v-if='$store.state.patientShow'>
           <h5>病人详情</h5>
           <ul>
             <li><div>床号</div><div>{{detile.BED_NUMBER}}</div></li>
             <li><div>住院号</div><div>{{detile.MEDICAL_RECORD_NUM}}</div></li>
             <li><div>姓名</div><div>{{detile.NAME}}</div></li>
             <li><div>性别</div><div>{{detile.SEX}}</div></li>
             <li><div>入院时间</div><div>{{detile.HOSPITALIZED_DATE.slice(0,10)}}</div></li>
             <li><div>病人费别</div><div>{{detile.FEEBY}}</div></li>
             <li><div style='position: absolute;'>入院诊断</div><div style='margin-left: 7em;'>{{detile.DIAGNOSTIC_RESULTS}}</div></li>
             <li><div>护理级别</div><div>{{detile.NURSING_GRADE}}</div></li>
             <li><div>主管医师</div><div>{{detile.DOCTOR}}</div></li>
             <li><div>职业</div><div>{{detile.OCCUPATION}}</div></li>
             <li><div>民族</div><div>{{detile.NATION}}</div></li>
             <li><div>文化程度</div><div>{{detile.EDUCATIONLEVEL}}</div></li>
             <li><div>婚姻状况</div><div>{{detile.MARITAL_STATUS}}</div></li>

             <li v-for='(item,index) of detile.BABY_INFO_ARR'><div>新生儿{{index+1}}</div><el-button type="text" @click.stop='showDOC(item)'>{{item.NAME}}</el-button></li>
             <!--
             <li><div>总预交</div><div>{{detile.TOTAL_PREPAY}}</div></li>
             <li><div>总费用</div><div>{{detile.TOTAL_COST}}</div></li>
             <li><div>欠费/余额</div><div :class="{'colorE63922':detile.BALANCE - 0 < 0}">{{detile.BALANCE}}</div></li>
             -->
           </ul>
         </div>

     </div>
  <!--{{$store.state.patientDetile.AGE}}-->
</template>

<script>
    export default {
        name: "patientDetile",

        data(){
          return{
            detile : {}
          }
        },
      watch:{
          '$store.state.patientDetile' : function () {
            console.log(this.detile);
            this.detile = this.$store.state.patientDetile
          }
      },
        methods : {
            showDOC(data){
                console.log(this.$parent.$parent)
                this.$parent.judgePath({title : data.NAME , path : '/workstation/patientDOC/' + data.ID , name:'patientDOC' , id : data.ID})
                this.$router.push({path:'/workstation/patientDOC/' + data.ID})
            },
        }
    }
</script>

<style scoped lang='stylus'>
  .right-bar
    position relative
    background-color #E6EBF0
    margin-top 56px
    height 100%
    i
      position absolute
      top 23px
      left -30px
      width 30px
      height 30px
      background-color #E6EBF0
      &.el-icon-d-arrow-right
        color #6C8B97
        font-size 20px
        line-height 30px
        text-align center
    .show
      width 266px
      h5
        line-height 50px
        padding 0 20px
        font-size 18px
        color #324668
    .no-show
      font-size 18px
      color #E6EBF0
      line-height 22px
      width 30px
      text-align center
      margin-top 30px
    ul
      li
        padding 0 20px
        line-height 30px
        border-bottom 1px solid #D8E3E7
        width 226px
        div
          display inline-block
          color #324668
          &.colorE63922
            color #E63922
          &:last-of-type
            width 9.5em
          &:first-of-type
            height 100%
            width 6.5em

</style>
