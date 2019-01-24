<template>
  <div style="margin-top: 20px;">
    <div class="realmin" >
      <div class="out-top">
        <span>时间</span>
        <el-date-picker
          v-model="years"
          type="year"
          value-format='yyyy'
          format="yyyy"
          placeholder="选择年份">
        </el-date-picker>
        <span>病区</span>
        <el-select v-model="department" filterable placeholder="病区" @change="getID">
          <el-option
            v-for="item in wardTes"
            :key="item.ID"
            :label="item.NAME"
            :value="item">
          </el-option>
        </el-select>
        <el-button type='primary' @click="pageAjax()">搜索</el-button>
       </div>
      <div class="minechaet">
        <ul>
          <li style="margin-right: 2%">
            <p style="text-align: center;">床位使用率</p>
            <anEchartsA :department_id="department_id" :years="years"></anEchartsA>
          </li>
          <li>
            <p style="text-align: center;">平均病床工作日</p>
            <anEchartsB :department_id="department_id" :years="years"></anEchartsB>
          </li>
        </ul>

        <ul>
          <li style="margin-right: 2%">
            <p style="text-align: center;">床位使用率</p>
            <anEchartsC :department_id="department_id" :years="years"></anEchartsC>
          </li>
          <li>
            <p style="text-align: center;">平均病床工作日</p>
            <anEchartsD :department_id="department_id" :years="years"></anEchartsD>
          </li>
        </ul>


      </div>
    </div>
  </div>
</template>
<script>
  import anEchartsA from './anEchartsA'
  import anEchartsB from './anEchartsB'
  import anEchartsC from './anEchartsC'
  import anEchartsD from './anEchartsD'
  export default{

    data(){
      return {
        wardTes:[],
        department:'骨科一病区',
        department_id:"10015",
        years:''
      }
    },

    components : { anEchartsA ,anEchartsB, anEchartsC ,anEchartsD},

    mounted() {
      this.$nextTick(() => {
        this.ward()
      })
    },

    methods:{
      ward(){
        this.getSer("datacenter/ward" ,{}, (res) => {
          this.wardTes = res.data.items;
      })
      },
      getID(item){
        this.department = item.NAME
        this.department_id = item.ID
      },
    },
  }
</script>
<style scoped  lang="stylus">
  .realmin
    background #fff
    padding 5px 20px
    width 100%
    box-shadow 0 0 10px 0 rgba(0,0,0,0.04)
    border-radius 4px
    box-sizing border-box
    overflow auto
    .out-top .el-button
      padding 12px 20px
    .minechaet
      width 100%
      min-width 1140px
      overflow auto
      ul
        font-size 0
        li
          width 49%
          margin 0 auto
          display inline-block
</style>
