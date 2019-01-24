<template>

</template>

<script>
    export default {
        name: "templatejs",

        props:['TEMPLATE_HTML'],

        methods:{
          h(){
            setTimeout(()=>{
              document.getElementById('preview').innerHTML = new String(this.TEMPLATE_HTML)
              let dom = document.getElementById('preview').getElementsByClassName('drop')
              for(var i=0;i<dom.length;i++){
                dom[i].ondrop = function (e) {
                  e.preventDefault()
                  console.log(e);
                  e.target.innerText = '%%'+e.dataTransfer.getData("Text")+'%%'
                }
                dom[i].ondragover=function(e){
                  e.preventDefault()
                }
              }
            })
          }
        },

        created(){
            this.$nextTick(()=>{
              this.h()
            })
        }
    }
</script>

<style scoped>

</style>
