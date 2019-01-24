<template>
    <div>
        <div class="out-main">
          <el-table :data='medicalList'>
            <el-table-column label="ID" prop="id" min-width='60'></el-table-column>
            <el-table-column label="模块" prop="module_type_name" min-width='100'></el-table-column>
            <el-table-column label="医嘱来源" prop="source" min-width='400'></el-table-column>
            <el-table-column label="操作"  min-width='60'>
              <template slot-scope="{row}">
                <span @click="getAdviceDe(row)"  class="ver-btn">编辑</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      <editPop ref='editPop'></editPop>
    </div>
</template>
<script>
  import editPop from "./component/editPop.vue"

  export default{

    data(){
      return {
        medicalList:[]    //包含id、模块、医嘱来源、
      }
    },

    created(){
      this.$nextTick(()=>{
        this.advice()
      })
    },

    components : { editPop },

    methods: {

      advice(){
        this.getSer("datacenter/advice", {} ,res => {
          console.log(res)
          if(res.status=="200") this.medicalList = res.data.items;
        })
      },

      getAdviceDe(row){
        this.$refs.editPop.getAdviceDe(row)
      }
    }
  }
</script>


