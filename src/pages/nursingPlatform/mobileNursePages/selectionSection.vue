<template>
  <div>
    <span>选择科室</span>
    <el-select ref="ruleSel" v-model="value" placeholder="选择科室" style="margin-left:10px" @change="getID" >
      <el-option
        v-for="item in partlist"
        :key="item.ID"
        :label="item.NAME"
        :value="item.ID">
      </el-option>
    </el-select>
  </div>
</template>
<script>
    export default {
      data(){
        return {
          partlist:[],
          value:"",
          ruleSel:'',
        }
      },
      mounted(){
        this.$nextTick(()=>{
          this.getData();
        })
      },
      methods:{
        getData(){
          this.getSer("datacenter/department", {'page' : 1, 'page_size': 1000}, (res) =>{
            console.log(res);
            if( res.status <= 400){
              this.partlist = res.data.items;
            }
          })
        },
        getID(){
//          console.log('id开...');
//          console.log(id);
//          //this.$emit('serchId',id);
        }
      }
    }
</script>
<style scoped>
</style>
