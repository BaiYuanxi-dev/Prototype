<template>
  <div class="page">
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right" class>
      <el-breadcrumb-item>
        <button @click="beforePage" class="noborder">{{ title }}</button>
      </el-breadcrumb-item>
      <el-breadcrumb-item>页面管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <!--搜索区域-->
          <el-input v-model="search" placeholder="页码">
            <i slot="append" class="el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addPage">添加页面</el-button>
        </el-col>
      </el-row>
    </el-card>
    <addBaseModel v-if="addModalDisplay" :form="addForm" @close="hideAddModal" />
    <update-base-modal v-if="updateModalDisplay" :form="updatedForm" @close="hideUpdateModal" />

    <el-table
      ref="dormitoryTable"
      :data="tables"
      tooltip-effect="dark"
      stripe
      style="width: 100%"
      border="true"
    >
      <el-table-column label="页码" prop="pageId" align="center" sortable />
      <!-- <el-table-column label="页标题" prop="pageName"/> -->
      <el-table-column label="页面简介" prop="pageText" align="center" />
      <el-table-column label="创建时间" prop="createdAt" align="center" sortable />
      <el-table-column label="更新时间" prop="updatedAt" align="center" sortable />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="updatePage(scope.row)" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deletePage(scope.row)" circle></el-button>
          <el-button type="info" icon="el-icon-message" circle @click="toLayer(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, jumper"
      @size-change="queryByNewSize"
      @current-change="queryByPageNum"
      :page-size.sync="page.size"
      :pager-count="page.count"
      :current-page.sync="page.current"
      :total="pages.length"
    ></el-pagination>
  </div>
</template>

<script>
import UpdateBaseModal from "../components/pages/UpdataBaseModel.vue";
import addBaseModel from "../components/pages/addPageModel.vue";
export default {
  components: { UpdateBaseModal, addBaseModel },

  data() {
    return {
      roleList: [],
      search: "",
      title: "项目",
      updateModalDisplay: false,
      addModalDisplay: false,
      updatedForm: {
        // pageNo:'',
        pageText: ""
      },
      addForm: {
        pageNo: "",
        pageText: ""
      },
      pages: [],
      pageNo: "",
      pageText: "",
      projectId: -1,
      username: "",
      page: {
        size: 7,
        //显示页码个数，超过8页折叠，值范围：[5,21]
        count: 7,
        current: 1
      }
    };
  },
  created() {
    // 获取列表信息
    // this.getlist()
  },
  methods: {
    beforePage() {
      this.$router.push({
        name: "ImageList",
        query: {
          username: this.username
        }
      });
    },
    getlist() {
      var param = {
        pageindex: this.pageinfo.pageindex,
        pagesize: this.pageinfo.pagesize
      };
    },
    hideUpdateModal(payload) {
      this.pages = this.$store.state.pagesList;
      this.resetRoleList();
      this.updateModalDisplay = false;
    },
    hideAddModal: function() {
      this.addModalDisplay = false;
    },

    addPage() {
      this.addForm = {
        projectId: this.projectId
      };
      this.addModalDisplay = true;
    },
    async updatePage(payload) {
      this.updatedForm = {
        projectId: this.projectId,
        pageId: payload.pageId,
        pageText: payload.pageText
      };
      //修改后
      // for(let i = 0; i < this.pages.length; i ++){
      //   if(this.pages[i].pageId == this.updatePage)
      // }
      this.pages = await this.$store.state.pagesList;

      this.resetRoleList();
      this.updateModalDisplay = true;
    },

    async deletePage(payload) {
      let param = {
        pageId: payload.pageId,
        projectId: this.projectId
      };
      try {
        await this.$confirm("确认删除该Page？", "提示", {
          type: "warning"
        });
        await this.$store.dispatch("deletePage", param);
        //这里应该等后端判断删除成功后才删除。。。
        for (let i = 0; i < this.pages.length; i++) {
          if (this.pages[i].pageId == param.pageId) {
            this.pages.splice(i, 1);
          }
        }
      } catch (e) {}
    },
    async init() {
      this.username = this.$route.query.username;
      this.projectId = this.$route.query.projectId;
      this.title = this.title + this.$route.query.projectName;
      await this.$store.dispatch("requestPages", { id: this.projectId });
      this.pages = this.$store.state.pagesList;
      this.resetRoleList();
    },

    toLayer(payload) {
      this.$router.push({
        name: "try",
        query: {
          //页面跳转参数：页面id
          pageId: payload.pageId,
          projectId: this.projectId,
          username: this.username
        }
      });
    },

    //分页
    queryByNewSize(newSize) {
      this.page.size = newSize;
      this.resetRoleList();
    },
    queryByPageNum(newPageNum) {
      this.page.current = newPageNum;
      this.resetRoleList();
    },
    resetRoleList() {
      let start = (this.page.current - 1) * this.page.size;
      let end = this.page.current * this.page.size;

      this.roleList = this.pages.slice(start, end);
    }
  },
  computed: {
    // 模糊搜索
    tables() {
      const search = this.search;
      if (search) {
        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        // 注意： filter() 不会对空数组进行检测。
        // 注意： filter() 不会改变原始数组。
        return this.pages.filter(data => {
          // some() 方法用于检测数组中的元素是否满足指定条件;
          // some() 方法会依次执行数组的每个元素：
          // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
          // 如果没有满足条件的元素，则返回false。
          // 注意： some() 不会对空数组进行检测。
          // 注意： some() 不会改变原始数组。
          return data.pageId.toString().indexOf(search) > -1;
          // return Object.keys(data).some((key) => {
          //   // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
          //   // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
          //   // return String(data[key]).toLowerCase().indexOf(search) > -1;
          //   return data[key] == search;
          // });
        });
      } else {
        return this.roleList;
      }
      // return this.pages;
    }
  },

  watch: {
    pages: function() {
      this.pages = this.$store.state.pagesList; // update dataShow once data changed
    }
    // search: function () {
    //   // console.log(this.roleList);
    //   // console.log(this.search);
    // },
  },
  async mounted() {
    this.init();
  }
};
</script>

<style>
.noborder {
  border: none;
}
.el-breadcrumb {
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 30px;
  font-size: 15px;
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1) !important;
}
</style>