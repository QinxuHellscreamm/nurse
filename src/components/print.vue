<template>
  <el-button class='printing' @click='print'></el-button>
</template>

<script>
    export default {
        name: "print",
        methods:{
          print(){
            this.$parent.print_preview()
          }
        }
    }
</script>

<style scoped lang='stylus'>
.printing
  background url("../assets/images/print.png")
  width 40px
  height 40px
.el-button
  border none
</style>
