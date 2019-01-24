<template>
  <div>
    <span @click="showPop()" class="in-left-partset">病区设置</span>
    <transition name="info" >
      <div class="setcon" v-if="popshow">
        <div class="partset"   >
          <div class="partset-title">
            <span>病区设置</span>
            <span class="popclose" @click="popshow=false"></span>
          </div>
          <div class="partset-content">
            <ul class="partset-con-title">
              <li @click="tabpop()" :class="{'active':tabsign===true}">病人标识项</li>
              <li @click="tabpop2()" :class="{'active':showsign===true}">卡片显示项</li>
            </ul>
            <ul class="partset-list">
              <li v-show="tabsign" class="partset1">
                <el-checkbox-group v-model="show_list_arr_1">
                    <el-checkbox v-for="item in bed_sign_list" :label="item.ID" :key="item.ID">{{item.NAME}}</el-checkbox>
                </el-checkbox-group>
              </li>
              <li v-show="showsign" class="partset1">
                <el-checkbox-group v-model="show_list_arr_2">
                    <el-checkbox v-for="item in card_show_list" :label="item.ID" :key="item.ID">{{item.NAME}}</el-checkbox>
                </el-checkbox-group>
              </li>
            </ul>
          </div>
          <div class="partset-footer">
            <button class="partset-sure" @click="saveSetopt()">应用</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        popshow:false,
        tabsign: true,
        showsign: false,
        partset1Check:false,
        bed_sign_list:[],
        card_show_list:[],
        show_list_arr_1:[],
        show_list_arr_2:[],
        opt_list:[]  //已选择选项ID
      }
    },

    methods: {
        getSetoptList()
        {
            this.getSer("datacenter/bedoverviewset",{}, (res) => {
                if(res.status <= 400){
                    this.bed_sign_list = res.data.bed_sign_list;
                    this.card_show_list = res.data.card_show_list;
                }
            }),
            this.getSer("datacenter/bedoverviewset/10045",{id:10045}, (res) => {
                if(res.status <= 400){
                    this.opt_list = res.data.items;
                }
            })
        },
        saveSetopt()
        {
            console.log('saveSetopt');
            this.popshow=false;
            this.show_list_arr_1.push(...this.show_list_arr_2);
            this.opt_list = this.show_list_arr_1;
            if ( ! this.show_list_arr_1)
            {
                this.$message({type: 'warning', message: '设置参数为空!'});
                return false;
            }
            this.post("datacenter/bedoverviewset",{items:JSON.stringify(this.opt_list)}, (res) => {
                if(res.status <= 400){
                    this.popshow=false;
                    this.$message({type: 'success', message: '设置成功!'});
                }
            })

        },
        showPop()
        {
            this.getSetoptList();
            this.popshow=true;
        },
        tabpop(){
            this.tabsign = true;
            this.showsign = false;
        },
        tabpop2(){
            this.tabsign = false;
            this.showsign = true;
        },

    }
  }
</script>
<style scoped>
  .info-enter,.info-leave-active{
    opacity:0;
    transform:translate3d(0,-40%,0);
  }
  .info-enter-active,.info-leave-active{
    transition:all .6s cubic-bezier(0.4,0,0,1.5);
  }
  .in-left-partset{
    display:inline-block;
    height:50px;
    line-height:50px;
    padding:0 10px 0 36px;
    opacity: 0.77;
    background: #E2E9EE url("../assets/images/wardset.png") no-repeat 10px center;
    background-size:18px 18px;
    border-radius: 5px;
    cursor:pointer;
  }
  .setcon {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.10);
    position: absolute;
    left: 0;
    top: 0;
  }
  .partset {
    width: 730px;
    height: 450px;
    padding: 24px 30px;
    background: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.10);
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index:999;
  }

  .partset-sure {
    float: right;
    width: 140px;
    height: 40px;
    background: #00B3DC;
    border-radius: 4px;
    color: #fff;
  }

  .partset-title {
    display: flex;
    justify-content: space-between;
    line-height:20px;
    font-size: 20px;
    margin-bottom:18px;
  }
 .partset-title span{
   font-size:20px;
 }
 .partset-con-title{
   display:flex;
   line-height:44px;
   margin-bottom:30px;
 }
 .partset-con-title li{
   margin-right:30px;
   border-bottom:2px solid transparent;
   cursor:pointer;
 }
 .partset-con-title li:last-of-type{
   margin-right:0;
 }
 .partset-con-title li.active{
   color: #00B3DC;
   border-bottom:2px solid  #00B3DC;
 }
 .partset1 ul{
   display:flex;
   flex-wrap:wrap;
 }
 .partset1 ul li{
   width:110px;
   margin:0 30px 40px 0;
   line-height:20px;
 }
 .partset1 ul li:nth-of-type(5n+5){
   margin-right:0;
 }
 .partset1 ul li input[type="checkbox"] + label::before {
   content: "\a0";
   display: inline-block;
   vertical-align: middle;
   width: 20px;
   height: 20px;
   margin-right: .2em;
   border-radius: .2em;
   background-color: #F9F9FB;
   border:1px solid #6C8B97;
   text-indent: .15em;
  /* line-height: 20px;  !*行高不加单位，子元素将继承数字乘以自身字体尺寸而非父元素行高*!*/
 }
  .partset1 ul li input[type="checkbox"]:checked + label::before {
    content: "\2713";
    background: #00CACF;
    border-radius: 2px;
    width:20px;
    height:20px;
  }
  .partset1 ul li input {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
  .partset1 ul li input[type="checkbox"]:disabled + label::before {
    background-color: gray;
    box-shadow: none;
    color: #555;
  }
  .partset-footer {
    height: 104px;
    line-height: 104px;
  }
</style>
