<template>
    <div class='line'>
      <svg style='width: 755px;height:680px'>
        <line :x1="item.x1" :y1="item.y1" :x2="item.x2" :y2="item.y2" stroke="blue" stroke-width="1" v-for='item of lineArr'/>
        <template v-for='item of spotArr'>

          <circle :cx="item.x" :cy="item.y" r="5" stroke="red" fill="white" v-if='item.select_code == 1 && item.type == 1'/>
          <text :x="item.x-5" :y="item.y+5" font-size="12" style="fill:blue" v-if='item.select_code == 1 '>×</text>

          <circle :cx="item.x" :cy="item.y" r="5" stroke="red" fill="white" v-if='item.select_code == 2 && item.type == 1'/>
          <path fill="blue" stroke="blue" :d="item.str" v-if='item.select_code == 2 && item.type == 1'/>
          <path fill="blue" stroke="blue" :d="item.str2" v-if='item.select_code == 2 && item.type != 1'/>

          <circle :cx="item.x" :cy="item.y" r="5" stroke="red" fill="white" v-if='item.select_code == 3 && item.type == 1'/>
          <circle :cx="item.x" :cy="item.y" r="5" stroke="blue" fill="blue" v-if='item.select_code == 3 && item.type != 1'/>
          <circle :cx="item.x" :cy="item.y" r="3" stroke="blue" fill="blue" v-if='item.select_code == 3 && item.type == 1' />


          <circle :cx="item.x" :cy="item.y" r="5" stroke="blue" fill="white" v-if='item.select_code == 4'/>
          <circle :cx="item.x" :cy="item.y" r="1" stroke="red" fill="white" v-if='item.select_code == 4 && item.type == 1'/>
        </template>
      </svg>
    </div>
</template>

<script>
    export default {
        name: "brokenLine",

        props:['sign'],

        data(){
          return{
            spotArr:[],
            lineArr:[]
          }
        },

        mounted(){
          this.$nextTick(()=>{
            let arr = []
            console.log(this.sign)
            this.sign.items.forEach(index=>{
              for(var k in index){
                var obj = {}
                index[k].forEach(item=>{
                  item.VS_CODE == "T10100" ? obj.value = item.VS_VALUE : null
                  item.VS_CODE == "T10101" ? obj.select_code = item.VS_VALUE : null
                })
                arr.push(obj)
              }
            })
            console.log(arr)
            setTimeout(()=>{
              arr.forEach((item,index)=>{
                item.x = 18*(index+0.5)
                item.value == '' ? null : item.y = -(item.value - 42)*75 +18


                if(item.x == window.spotArr3[index].x && item.y == window.spotArr3[index].y && item.y){
                  console.log(item.x , window.spotArr3[index].x , item.y , window.spotArr3[index].y)
                  item.type = 1
                }



                if(item.select_code == 2){
                  if(item.y){
                    item.str = 'M'+item.x+' '+(item.y-2)+' '+'L'+(item.x-2)+' '+(item.y+2)+' '+'L'+(item.x+2)+' '+(item.y+2)+' '+'Z'
                    item.str2 = 'M'+item.x+' '+(item.y-4)+' '+'L'+(item.x-4)+' '+(item.y+4)+' '+'L'+(item.x+4)+' '+(item.y+4)+' '+'Z'
                    this.spotArr.push(item)
                  }else {
                    this.spotArr.push(item)
                  }
                }else{
                  item.y ? this.spotArr.push(item) : null
                }
              })
              this.spotArr.forEach((item,i)=>{

                if(i == this.spotArr.length - 1){

                }else{
                  this.lineArr.push({ x1 : item.x , y1 : item.y, x2 : this.spotArr[i+1].x , y2 : this.spotArr[i+1].y })
                }
              })
            })
            window.spotArr = arr

          })
        }
    }
</script>

<style scoped lang='stylus'>
  .line
    position absolute
    left 93px
    top 105px

</style>
