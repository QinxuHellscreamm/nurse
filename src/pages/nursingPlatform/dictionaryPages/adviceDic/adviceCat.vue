<template>
    <div>
      <span class="advice-title1">医嘱类别</span>
      <ul class="advice-list">
        <li v-for="(item,index) of catdics" :key="item.ID">{{item.NAME}}</li>
      </ul>
    </div>
</template>
<script>
  export default{
    data(){
      return {
        catdics:[]
      }
    },
    mounted(){
      this.$nextTick(()=> {
        this.pageAjax();
    })
    },
    methods:{
      pageAjax(va,page,pageSize){
        this.getSer("datacenter/hisadvice",{}, res =>{
          if(res.status <= 400){
            this.catdics = res.data;
          }
        })
      },
    }
  }
</script>
<style>

</style>
