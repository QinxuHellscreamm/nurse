<template>
  <div style="margin-top: 20px;">
    <div class="realmin" >
      <div class="out-top">
        <span>时间</span>
        <el-date-picker
          v-model="start_end_time"
          type="datetimerange"
          value-format='yyyy-MM-dd	HH:mm'
          format="yyyy-MM-dd	HH:mm"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
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
      <div>
        <tempSta :department_id="department_id"></tempSta>
      </div>

    </div>

  </div>
</template>
<script>
  import tempSta from './tempSta'
  export default{
    data(){
      return {
        start_end_time: [],
        department:'骨科一病区',
        department_id:"10015",
        wardTes:[],
      }
    },

    components : { tempSta},

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
</style>
