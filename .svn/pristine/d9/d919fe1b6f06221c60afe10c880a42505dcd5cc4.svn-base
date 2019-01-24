<template>
      <tr v-if='sign.SIGN_CODE !="T10400"'>
        <td :colspan='6*ten' style='width: 83px;word-wrap: break-word; word-break: normal; '>{{sign.NAME}}</td>
        <td v-for='(item,index) of signs' :key=index :colspan='6*ten/frequency' style='' :class='{"red":sign.SIGN_CODE == "T12200"}'><div style='width: 100%;max-width: 95px'>{{item[0].VS_VALUE}}</div></td>
      </tr>
</template>

<script>
    export default {
        name: "tableTr",

        props : ['sign'],

        data(){
          return{
            ten : 30,
            signs : [],
            frequency : 0
          }
        },

        methods : {

        },

        mounted(){
          this.$nextTick(()=>{
            let arr = []
            console.log(this.sign);
            if(this.sign.SIGN_CODE != 'T10900' && this.sign.SIGN_CODE != 'T10700'){
              this.sign.items.forEach(oneDay=>{
                for(var k in oneDay){
                  arr.push(oneDay[k])
                }
              })
            }else{
              //小便
                if(this.sign.SIGN_CODE == 'T10900'){
                  this.sign.items.forEach(oneDay=>{
                    for(var k in oneDay){
                      if(oneDay[k][0].VS_VALUE){

                      }else{
                        if(oneDay[k][1].VS_VALUE && oneDay[k][1].VS_VALUE!='0'){
                          console.log(oneDay[k][1].VS_VALUE);
                          oneDay[k][1].VS_VALUE != 2 ? oneDay[k][0].VS_VALUE = '+' : null
                          oneDay[k][1].VS_VALUE == 1 ? oneDay[k][0].VS_VALUE = '0' : null
                          oneDay[k][1].VS_VALUE == 2 ? oneDay[k][0].VS_VALUE = '*' : null
                        }
                      }
                      arr.push(oneDay[k])
                    }
                  })
                }else{
                  /* 大便
                  如果大便方式==1，显示0；大便方式==2，取T10703的值显示；大便方式==4，显示取T10703的值/☆；大便方式>=5，显示*；
                  大便方式==3，T10702,T10703/E
                  */
                  this.sign.items.forEach(oneDay=>{
                    for(var k in oneDay){
                        oneDay[k][1].VS_VALUE == 1 ? oneDay[k][0].VS_VALUE = '0' : null
                        oneDay[k][1].VS_VALUE == 2 ? oneDay[k][0].VS_VALUE = oneDay[k][3].VS_VALUE : null

                        oneDay[k][1].VS_VALUE == 4 ? oneDay[k][0].VS_VALUE = oneDay[k][3].VS_VALUE + '/☆' : null
                        oneDay[k][1].VS_VALUE >= 5 ? oneDay[k][0].VS_VALUE = '*' : null

                      if(oneDay[k][1].VS_VALUE == 3 ){//灌肠
                        oneDay[k][2].VS_VALUE ? oneDay[k][0].VS_VALUE = oneDay[k][2].VS_VALUE + ',' + oneDay[k][3].VS_VALUE+'/E' : oneDay[k][0].VS_VALUE = oneDay[k][3].VS_VALUE+'/E'
                      }
                    }
                    arr.push(oneDay[k])

                  })
                }
            }

            this.signs = arr
            this.frequency = arr.length / 7
          })
        },



    }
</script>

<style scoped lang='stylus'>
  td
    font-size 12px
    line-height 1
    height 20px
    text-align center
  .red
    color red
</style>
