<template>
  <!-- 页面组件 -->
  <div class="vm-image-list">
    <!-- 页面顶部 -->
    <Row class="image-list-heading vm-panel">
      <div class="panel-heading" style="font-size: 100px">{{ title }}</div>
      <Row type="flex" align="middle" justify="space-between" class="panel-body">
        <span class="search-bar">
          <Input placeholder="Please enter ..." v-model="search" style="width: 300px"></Input>
          <Button type="primary" @click="searchProject">搜索</Button>
        </span>
        <Row type="flex" align="middle" class="page">
          <span class="total">Total {{ data.length }}</span>
          <!-- 页码 -->
          <Page
            :total="data.length"
            :current="currentPage"
            :page-size="showNum"
            @on-change="pageChange"
          ></Page>
        </Row>
        <Row type="flex" align="middle">
          <Icon type="md-add-circle" />
          <div style="font-weight: bold" @click="modalCreate = true" class="select">创建项目</div>
          <!--@后加-->
        </Row>

        <Row type="flex" align="middle">
          <Icon type="md-arrow-down" />
          <div ref="timesort" style="font-weight: bold" @click="sort" class="select">{{sortWay}}</div>
        </Row>

        <Row type="flex" align="middle">
          <el-button type="primary" round @click="back">退出登录</el-button>
        </Row>
      </Row>
    </Row>
    <Row class="image-list" :gutter="16">
      <Col :lg="6" :sm="12" class="vm-margin" v-for="item in dataShow" :key="item.id">
        <VmCard
          :username="userId"
          ref="child"
          :id="item.id"
          :editable="true"
          :title="item.title"
          :img="item.img"
          :createdAt="item.createdAt"
          :desc="item.desc"
          :detailUrl="item.detailUrl"
          :editUrl="item.editUrl"
          @delete-ok="deleteOk(item)"
          @modify-ok="modifyOk($event), modifyandsend(item)"
        ></VmCard>
      </Col>
    </Row>

    <!-- 需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal 在当前页面正中打开一个浮层，承载相应的操作。 -->
    <Modal v-model="modalCreate" title="添加项目" ok-text="确定" cancel-text="取消" v-on:on-ok="CreateOk">
      <div style="margin: 20px">
        项目名称：
        <Input v-model="addMsg.title" placeholder="Please enter ..." style="width: 300px"></Input>
      </div>
      <div style="margin: 20px">
        项目简介：
        <Input v-model="addMsg.desc" placeholder="Please enter ..." style="width: 300px"></Input>
      </div>
      <div style="margin: 20px">
        项目封面：
        <label type="button" class="upbtn">
          <div>上传封面</div>
          <input id="files" type="file" class="change" @change.prevent.stop="upload" />
        </label>
      </div>
    </Modal>
  </div>
</template>

<script>
import VmCard from "@/components/vm-card";
import { uploadFile } from "../utils/upload.js";
export default {
  name: "VmImageList",
  components: {
    VmCard
  },
  props: {
    username: {
      type: String,
      default: "1@qq.com"
    },
    title: {
      type: String,
      default: "Welcome to my prototype tool!"
    },
    // origin data
    data: {
      type: Array,
      default: function() {
        return [
          {
            id: "19920805",
            title: "Title",
            createdAt: "new Date()",
            img: require("@/assets/img/img-1.jpg"),
            desc:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry's standard dummy text ever since the 1500s ly dummy tly dummy tly dummy tly dummy tly dummy tly dummy t",
            to: "#"
          }
        ];
      }
    }
  },
  data: function() {
    return {
      // search:"",
      userId: "",
      search: "", // keyword for search
      dataShow: [], // data for showing
      showNum: 8, // number of item per page
      currentPage: 1,
      modalCreate: false,
      imgDataUrl: "",
      addMsg: {
        title: "",
        desc: ""
      },
      sendMsg: {
        title: "",
        desc: "",
        img: ""
      },
      wayOfOrder: 1,
      imgUrl: "",
      sortWay: "按时间排序"
    };
  },
  computed: {
    projects() {
      return this.$store.state.projects;
    }
  },
  methods: {
    //添加项目时上传图片
    async upload(event) {
      let files = event.target.files[0];
      this.imgUrl = await uploadFile(files);
    },

    sort: function() {
      //@后加
      let div = this.$refs.timesort.innerHTML;
      if (div == "按时间排序") {
        this.sortWay = "按标题排序";
        this.wayOfOrder = 1;
        this.$emit("reload", this.wayOfOrder);
      } else {
        this.sortWay = "按时间排序";
        this.wayOfOrder = 2;
        this.$emit("reload", this.wayOfOrder);
      }
    },

    pageChange: function(page) {
      this.currentPage = page;
      this.updateDataShow();
    },
    searchProject: function() {
      console.log("??", this.search);
      if (this.search == "") {
        this.dataShow = this.data.slice(0, this.showNum);
      } else {
        this.dataShow = [];
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].title.indexOf(this.search) > -1) {
            this.dataShow.push(this.data[i]);
          }
        }
      }
    },

    async CreateOk(data) {
      let param = {
        username: this.username,
        title: this.addMsg.title,
        desc: this.addMsg.desc,
        wayOfOrder: this.wayOfOrder,
        img: this.imgUrl
      };
      await this.$store.dispatch("addProjects", param);
      let token = localStorage.getItem("token");
      // console.log(token);
      if (token === null || token === "" || token === undefined) {
        this.$router.push({
          name: "Login",
        });
      } 
      this.$emit("create-ok", this.data);

      //创建成功后，后端应该返回更新的数据：更新dataList
    },

    deleteOk: function(data) {
      this.$emit("delete-ok", data);
      console.log("...", this.$store.state.timeout);
      let token = localStorage.getItem("token");
      // console.log(token);
      if (token === null || token === "" || token === undefined) {
        this.$router.push({
          name: "Login",
        });
      } 
    },
    modifyOk: function(data) {
      // this.$emit('modify-ok',data)
      this.sendMsg.title = data.title;
      this.sendMsg.desc = data.desc;
      this.sendMsg.img = data.img;
      let token = localStorage.getItem("token");
      // console.log(token);
      if (token === null || token === "" || token === undefined) {
        this.$router.push({
          name: "Login",
        });
      } 
    },
    modifyandsend: function(item) {
      let param = {
        id: item.id,
        title: this.sendMsg.title,
        desc: this.sendMsg.desc,
        img: this.sendMsg.img
      };
      this.$emit("modify-ok", param);
      let token = localStorage.getItem("token");
      // console.log(token);
      if (token === null || token === "" || token === undefined) {
        this.$router.push({
          name: "Login",
        });
      } 
    },
    back: function() {
      // console.log(localStorage.getItem("token"));
      localStorage.clear();
      this.$router.push({
        name: "Login"
      });
    }
  },

  watch: {
    data: function() {
      this.dataShow = this.data.slice(0, this.showNum); // update dataShow once data changed
      // console.log(this.dataShow);
    },
    datashow: function() {},
    showNum: function() {
      if (this.showNum == "") {
        this.showNum = this.data.length;
      }
    },
    username: function() {
      this.userId = this.username;
    }
  },
  mounted: function() {
    this.dataShow = this.data.slice(0, this.showNum);
  }
};
</script>
