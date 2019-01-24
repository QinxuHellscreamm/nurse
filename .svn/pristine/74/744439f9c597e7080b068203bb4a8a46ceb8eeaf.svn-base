<template>
    <div>
      <ul class="vitalist">
        <li v-for="(item,index) of vitalList" :key="index" @click="tabClick(index)" :class="{'active':index===current}">{{item}}</li>
      </ul>
     <ul class="vitalist-content">
       <li v-for="(item,index) of vitalList" :key="index" :style="{display:index===current?'block':'none'}">
         <div :is="temps[index]"></div>
       </li>
     </ul>
    </div>
</template>
<script>
  import temp from "../components/temp.vue"
    export default{
        data(){
            return {
              current:0,
              vitalList:["体温","体表其它项目"],
              temps:[temp]
            }
        },
      components:{temp}
    }
</script>
<style scoped>
.vitalist{
  display:flex;
  height:40px;
  line-height:40px;
  margin-top:44px;
}
  .vitalist li{
    margin-left: 10px;
    padding:0 24px;
    background: #DDEFF9;
    border-radius:5px 5px 0 0;
    cursor:pointer;
  }
  .vitalist li.active{
    background:#fff;
  }
  .vitalist-content{
    width:calc(100% - 56px);
    height:700px;
    padding:30px 20px;
    background: #FFFFFF;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.04);
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
