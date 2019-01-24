<template>
    <div class='index-page' style='background-color: #fff;'>
      <div class="main">
        <div>
          <infosharePoc :id="id" v-if="status==201"></infosharePoc>
        </div>
      </div>



    </div>
</template>
<script>
  import infosharePoc from './PatientDOC/infosharePoc'
    export default {
        name: "infoshare",
      components : { infosharePoc },
        data(){
          return{
            status :'',
            id:this.$route.params.id,
            name : "",
            value : "",
            wardList : [],
            wardName : '',
            routerList : [],
            indexFlag : 0,
            linkBtnShow : false,
            linkMAX : 0,
            linkMIN : 0,
            showLength : '',
            screenValue : '',
            keepAlive : ['PatientDocPage']//需要缓存的组件 的name
          }
        },

      methods:{

      },

      created(){
        this.$nextTick(()=>{
        this.postin("datacenter/site/loginapi",{"USERNAME":"zlhis","PASSWORD":'zhonglianhis'} , res => {
          console.log("yes",res)
          this.status = res.status
        })
        })
      },

      watch:{

      }
    }
</script>

<style scoped lang='stylus'>

</style>
