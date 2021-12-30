<template>
  <div class="page">
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="">
      <el-breadcrumb-item  ><button @click="beforePage" class="noborder">{{title}}</button></el-breadcrumb-item>
      <el-breadcrumb-item>页面管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <!--搜索区域-->
          <el-input  v-model="pageNo" placeholder="页码">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
          <!-- <el-col :span="6">
            <el-input placeholder="简介" v-model="pageText">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col> -->
        <el-col :span="4">
          <el-button type="primary" @click="addPage">添加页面</el-button>
        </el-col>
      </el-row>
    </el-card>
    <addBaseModel
        v-if="addModalDisplay"
        :form="addForm"
        @close="hideAddModal"
    />
    <update-base-modal
        v-if="updateModalDisplay"
        :form="updatedForm"
        @close="hideUpdateModal"
    />

    <el-table :data="pages">
      <el-table-column label="页码" prop="pageId"/>
      <!-- <el-table-column label="页标题" prop="pageName"/> -->
      <el-table-column label="页面简介" prop="pageText"/>
      <el-table-column label="创建时间" prop="createdAt"/>
      <el-table-column label="更新时间" prop="updatedAt"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button  type="primary" icon="el-icon-edit" @click="updatePage(scope.row)" circle>
          </el-button>
          <el-button type="danger"  icon="el-icon-delete" @click="deletePage(scope.row)" circle>
          </el-button>
          <el-button type="info" icon="el-icon-message" circle @click="toLayer(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import UpdateBaseModal from '../components/pages/UpdataBaseModel.vue'
import addBaseModel from '../components/pages/addPageModel.vue'
export default {
  components: { UpdateBaseModal, addBaseModel },

  data() {
    return {
      title:'项目',
      updateModalDisplay: false,
      addModalDisplay:false,
      updatedForm: {
        // pageNo:'',
        pageText:'',
      },
      addForm:{
        pageNo:'',
        pageText:'',
      },
      pages:[],
      pageNo:'',
      pageText:'',
      projectId:-1,
      username:"",
    }
  },
  created() {
    // 获取列表信息
    // this.getlist()
  },
  methods:{
    beforePage(){
      this.$router.push({
        name: 'ImageList',
        query:{
          username:this.username,
        }
      })
    },
    getlist(){
      var param = {
        pageindex: this.pageinfo.pageindex,
        pagesize: this.pageinfo.pagesize
      };
    },
    hideUpdateModal() {
      this.updateModalDisplay = false;
    },
    hideAddModal: function(){
      this.addModalDisplay = false;
    },

    addPage(){
      this.addForm = {
        projectId: this.projectId, 
      }
      this.addModalDisplay = true;
    },
    updatePage(payload) {
      this.updatedForm = {
        projectId: this.projectId,
        pageId:payload.pageId,
        pageText:payload.pageText,
      };
      this.updateModalDisplay = true;
    },


    async deletePage(payload) {
      let param = {
        pageId: payload.pageId,
        projectId: this.projectId
      }
      try {
        await this.$confirm('确认删除该Page？', '提示', {
          type: 'warning'
        });
        await this.$store.dispatch('deletePage', param);
        //这里应该等后端判断删除成功后才删除。。。
        for(let i = 0; i < this.pages.length; i ++){
          if(this.pages[i].pageId == param.pageId){
            this.pages.splice(i, 1);
          }
        }
        
      } catch (e) {

      }
    },
    async init(){
      this.username = this.$route.query.username;
      this.projectId = this.$route.query.projectId;
      this.title = this.title + this.projectId;
      await this.$store.dispatch("requestPages", {id: this.projectId});
      this.pages = this.$store.state.pagesList;
    },

    toLayer(payload){
      this.$router.push({
        name: 'try',
        query:{
          //页面跳转参数：页面id
          pageId:payload.pageId,
          projectId:this.projectId,
          username:this.username,
        }
      });
    }
  },

  
  watch: {
    pages: function () {
      this.pages = this.$store.state.pagesList; // update dataShow once data changed
    },
  },
  async mounted(){
    this.init();
  }

}
</script>

<style>

.noborder{
  border: none;
}
.el-breadcrumb{
  margin-top:15px;
  margin-bottom: 15px;
  margin-left:30px;
  font-size: 15px;
}
.el-card{
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1) !important;
}
</style>