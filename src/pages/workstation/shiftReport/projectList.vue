<template>
    <div>
      <ul class="statisul">
        <li  v-for='(item,index) of patientList' :key='index'>
          <div class='licell1'>{{item.name}}</div>
          <div class='licell2'>
            <span v-for="(items,index) of item.typenum" >
              <span v-if="items.constructor === String">
                    {{items}}
              </span>
              <span v-else >
                <span v-for="(val,idx) in items">
                  <span>{{val}} , </span>
                </span>
            </span>
            </span>
            <i class='el-icon-plus' style='color: #11C462;line-height: 36px; cursor: pointer;' @click='patTar(index,item)' v-if='index != target_current'></i>
            <el-input v-if='target_current == index' placeholder='备注' @blur="inputTe" v-model="pattext"></el-input>
          </div>
        </li>
      </ul>
    </div>
</template>
<script>
    export default{

        data(){
            return {
              target_current:-1,
              flag : false ,
              pattext:'',
              input:'',
              typenum:[{numer:''}],
              patientList: [
                {
                  type: "ss",
                  name: "手术",
                  note: "",
                  typenum:[],
                },
                {
                  type: "fm",
                  name: "分娩",
                  typenum:[],
                  note: "",
                },
                {
                  type: "bw",
                  name: "病危",
                  typenum:[],
                  note: "",
                },
                {
                  type: "bz",
                  name: "病重",
                  typenum:[],
                  note: "",
                },
                {
                  type: "lzylg",
                  name: "留置引流管",
                  typenum:[],
                  note: "",
                },
                {
                  type: "yc",
                  name: "压疮",
                  typenum:[],
                  note: "222",
                },
                {
                  type: "dd",
                  name: "跌倒",
                  typenum:[],
                  note: "",
                },
                {
                  type: "zc",
                  name: "坠床",
                  typenum:[],
                  note: "",
                }
              ],
              jremarksType:'',
              typenuma:'',
            }
        },

      methods:{
        grtData(val){
          console.log("rrrrrrrrrr",val)
          if(val != undefined){
            this.typenum = val
          }

          this.patientList.forEach((item , i) => {
            if(item.type == "ss"){
            item.typenum=this.typenum.ss
          }
          if(item.type == "fm"){
            item.typenum=this.typenum.fm
          }
          if(item.type == "bw"){
            item.typenum=this.typenum.bw
          }
          if(item.type == "bz"){
            item.typenum=this.typenum.bz
          }
          if(item.type == "lzylg"){
            item.typenum=this.typenum.lzylg
          }
          if(item.type == "yc"){
            item.typenum=this.typenum.yc
          }
          if(item.type == "dd"){
            item.typenum=this.typenum.dd
          }
          if(item.type == "zc"){
            item.typenum=this.typenum.zc
          }
          })

        },
        inputTe(){
          this.target_current=-1
          this.post("datacenter/changeshift/jremarks" ,{
            type:this.jremarksType,
            note:this.pattext
          }, res => {
            if(res.data.status=="201"){
            this.$message({
              type: 'success',
              message: '备注成功!'
            })
              this.$parent.getData()
          }
        })

        },
        patTar(index,item){
          this.pattext=""
          console.log(index,item.type)
          this.jremarksType = item.type
          this.current=index;
          this.target_current = index
        },
      },

      mounted(){
        this.$nextTick(()=>{
          this.grtData()
      })
      },
    }
</script>
<style scoped lang='stylus'>
  .statisul
    li
      line-height 36px
      display flex
      .licell1
        background-color #F9F9FB
        width 200px
        text-align center
        border 4px solid #FFFFFF
      .licell2
        background-color #F9F9FB
        flex 1
        display flex
        border 4px solid #FFFFFF
        padding 0 10px 0 20px
        .el-icon-plus
          margin-left 5px
        .el-input
          margin-left 15px
          &>>>.el-input__inner
            line-height 30px
            height 30px
</style>
