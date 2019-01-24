<template>
  <div class='line3'>
    <svg style='width: 755px;height:290px' v-if='this_events.length'>
      <text :x="item.x" y="1" fill="red" style=" writing-mode: tb;font-size: 12px;" v-for='(item,index) of this_events' >{{item.lable_name}}</text>
    </svg>
  </div>
</template>

<script>
    export default {
        name: "brokenLine6",

        props:['events','dateFormatArr'],

        data(){
          return{
             this_events:[]
          }
        },

        methods:{
          setData(){
            this.$nextTick(()=>{
              this.this_events = JSON.parse(JSON.stringify(this.events))
              let firstDay = new Date(this.dateFormatArr[0]+' 00:00:00').getTime()
              this.this_events.forEach(item=>{
                var time;
                if(!item.lable_time) return false
                time = (new Date(item.lable_time).getTime() - firstDay) / 86400000
                let day = Math.floor(time)
                let houre = (time - day) * 24
                item.x = day*108 + 8 + + (Math.round((houre-2)/4)*18)
              })

              this.this_events.forEach((item1,index1)=>{
                this.this_events.forEach((item2,index2)=>{
                    if(item1.x == item2.x && index1 != index2){
                      item1.lable_name += item2.lable_name
                      item2.lable_name = ''
                    }
                })
              })

            })
          }
        },

        mounted(){
          this.$nextTick(()=>{

          })
        }
    }
</script>

<style scoped lang='stylus'>
  .line3
    position absolute
    left 93px
    top 80px
</style>
