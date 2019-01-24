<template>
    <div class='sidebar-main'>
      <el-menu default-active="0-0" >
        <el-submenu v-for='(item,index) of menuList' v-if='item.is_father == 1' :key=index :index="index+''">
          <template slot="title">
            <span>{{ item.TITLE }}</span>
          </template>
          <el-menu-item-group v-for='(child,i) of item.CHILDS' :key=i>
            <el-menu-item :index='index+"-"+i'  @click='menuClick(child)'>{{child.TITLE}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-for='(item,index) of menuList' v-if='item.is_father == 0 ' :key=index :index="index+''" class='el-submenu__title' @click='menuClick(item)'>{{item.TITLE}}</el-menu-item>
      </el-menu>
    </div>
</template>

<script>
    export default {
        name: "documentSidebar",
      props : ['id'],
        data(){
          return{
            menuList : [

            ]
          }
        },

        methods : {
          getMenu(){
            console.log('menu');

              this.getSerin('datacenter/menu/get-document-menu',{ pati_id : this.id} , res => {
                this.menuList = res.data
              console.log('menu',this.menuList);
              })

          },
          resize(){
            let height = document.getElementsByClassName('main')[0].clientHeight
            document.getElementsByClassName('sidebar-main')[0].style.minHeight = height + 'px'
          },
          menuClick(item){
            console.log(item);
            this.$parent.toggle(item)
          }
        },

        mounted(){
          this.$nextTick(() => {
            this.getMenu()
            this.resize()
          })
        },

        watch:{
          '$route.params.id' : function (to) {
            if(typeof to - 0 == 'number') this.getMenu()
          },
        }
    }
</script>

<style scoped lang='stylus'>
  .sidebar-main
    width 184px
    background-color #E6EBF0
    .el-menu
      background-color #E6EBF0
      .el-menu-item
        min-width 180px
        font-size 16px
        &.is-active
          background-color #F3F3F8
          color #00B3DC
      .el-menu-item-group
        background-color #E6EBF0
        &>>>.el-menu-item-group__title
          padding 0
        .el-menu-item
          white-space normal
          height auto
          line-height 20px
          font-size 12px
          padding 5px
          margin-left -10px
          overflow hidden
      &>>>.el-submenu__title
        border-bottom 1px solid #D8E3E7
        height 42px
        line-height 42px
        span
          font-size 16px
    /*height calc(100% - 56px)*/

</style>
