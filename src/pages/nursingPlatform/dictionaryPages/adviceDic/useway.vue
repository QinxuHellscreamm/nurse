<template>
  <div>
    <span class="advice-title1">用药途径</span>
    <ul class="advice-list">
      <li v-for="(item,index) of usedics" :key="item.ID">{{item.NAME}}</li>
    </ul>
    <div class="block" style="margin:20px 0;">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-size="32"
        layout="total, prev, pager, next, jumper"
        :total="useCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        currentPage1:1,
        useCount:0,
        usedics:[]
      }
    },
    mounted(){
      this.$nextTick(()=> {
        this.pageAjax(1,"32");      //进入页面默认请求第一页
    })
    },
    methods:{
      pageAjax(page,pageSize){
        this.getSer("datacenter/druguse",{
          'page' : page,
          'page_size' : pageSize
        }, res =>{
          console.log(res)
          if(res.status <= 400){
            this.usedics = res.data.items;
            this.useCount = parseInt(res.data.meta.totalCount);
          }
        })
      },
      handleCurrentChange(val) {       //当前页变化的时候
        this.pageAjax(val,"32");
      }
    }
  }
</script>
<style>

</style>
