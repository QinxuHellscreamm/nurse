<template>
  <div class='line'>
    <svg style='width: 755px;height:663px'>
      <circle :cx="item.x" :cy="item.y" r="5" fill="white" stroke="red" v-for='item of spotArr'/>
      <line :x1="item.x1" :y1="item.y1" :x2="item.x2" :y2="item.y2" stroke="red" stroke-width="2"  v-for='item of lineArr' v-if='item.y'/>
      <line :x1="item.x" :y1="item.y1" :x2="item.x" :y2="item.y2" stroke="red" stroke-width="2" stroke-dasharray='4,2' v-for='item of deside'/>
    </svg>
  </div>
</template>

<script>
  export default {
    name: "brokenLine2",

    props:['sign'],

    data(){
      return{
        spotArr : [],
        lineArr : [],
        deside : []
      }
    },

    mounted(){
      this.$nextTick(()=>{
        let arr = []

        setTimeout(()=>{
          this.sign.items.forEach(index=>{
            for(var k in index){
              var obj = {}
              index[k].forEach(item=>{
                item.VS_CODE == "T10200" ? obj.value = item.VS_VALUE : null
                item.VS_CODE == "T10201" ? obj.select_code = item.VS_VALUE : null
              })
              arr.push(obj)
            }
          })

          arr.forEach((item,index)=>{
            item.x = 18*(index+0.5)
            item.value == '' || item.value == null ? null : item.y = -( (item.value > 42 ? 42 : item.value) - 42)*65 +15
            item.y ? this.spotArr.push(item) : null
          })
          console.log(window.spotArr);
          arr.forEach((item,index)=>{
            if(item.y){
              window.spotArr[index].y ? this.deside.push({ x:item.x, y1:item.y, y2 : window.spotArr[index].y }) : null
            }
          })
          console.log(this.deside);
          this.spotArr.forEach((item,i)=>{
            if(i==this.spotArr.length-1){

            }else{
              this.lineArr.push({ x1 : item.x , y1 : item.y, x2 : this.spotArr[i+1].x , y2 : this.spotArr[i+1].y })
            }
          })
        })
      })
    }
  }
</script>

<style scoped lang='stylus'>
  .line
    position absolute
    left 93px
    top 78px

</style>
