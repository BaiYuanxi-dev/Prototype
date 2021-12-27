<template>
  <!-- 页面组件 -->
  <div class="vm-image-list">
    <!-- 页面顶部 -->
    <Row class="image-list-heading vm-panel">
      <div class="panel-heading" style="font-size: 100px">
        {{ title }}
      </div>
      <Row
        type="flex"
        align="middle"
        justify="space-between"
        class="panel-body"
      >
        <span class="search-bar">
          <Input
            placeholder="Please enter ..."
            v-model="keyword"
            style="width: 300px"
          ></Input>
          <Button type="primary" @click="search">搜索</Button>
        </span>
        <Row type="flex" align="middle" class="page">
          <span>Show</span>
          <Input
            :max="40"
            :min="1"
            :number="true"
            v-model="showNum"
            class="input-number"
            @change="changeShowNum"
          ></Input>
          <span class="margin-end">/ Page</span>
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
          <Icon type="md-add-circle" /><!--@后加-->
          <!-- <div
            style="font-weight: bold"
            @click="modalCreate = true"
            class="select"
          > 
                      ＋创建项目
          </div>-->
          <div
            style="font-weight: bold"
            @click="modalCreate = true"
            class="select"
          >
            创建项目
          </div>
          <!--@后加-->
        </Row>

        <Row type="flex" align="middle">
          <Icon type="md-arrow-down" /><!--@后加-->
          <!-- <p style="font-weight: bold" @click="search" class="select">
            ↓按时间倒序
          </p> -->
          <div
            id="timesort"
            style="font-weight: bold"
            @click="sort"
            class="select"
          >
            按时间倒序
          </div>
          <!--@后加-->
          <!--按时间倒序待完成-->
        </Row>
      </Row>
    </Row>
    <Row class="image-list" :gutter="16">
      <Col
        :lg="6"
        :sm="12"
        class="vm-margin"
        v-for="item in dataShow"
        :key="item.id"
      >
        <VmCard
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
    <Modal
      v-model="modalCreate"
      title="添加项目"
      ok-text="确定"
      cancel-text="取消"
      v-on:on-ok="CreateOk"
    >
      <div style="margin: 20px">
        项目名称：
        <Input
          v-model="addMsg.title"
          placeholder="Please enter ..."
          style="width: 300px"
        ></Input>
      </div>
      <div style="margin: 20px">
        项目简介：
        <Input
          v-model="addMsg.desc"
          placeholder="Please enter ..."
          style="width: 300px"
        ></Input>
      </div>
      <div style="margin: 20px">
        项目封面：
        <label type="button" class="upbtn">
          <div>上传封面</div>
          <input
            id="files"
            type="file"
            class="change"
            @change.prevent.stop="upload"
          />
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
    VmCard,
  },
  props: {
    title: {
      type: String,
      default: "Welcome to my prototype tool!",
    },
    // origin data
    data: {
      type: Array,
      default: function () {
        return [
          {
            id: "19920805",
            title: "Title",
            createdAt: "new Date()",
            img: require("@/assets/img/img-1.jpg"),
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry's standard dummy text ever since the 1500s ly dummy tly dummy tly dummy tly dummy tly dummy tly dummy t",
            to: "#",
          },
        ];
      },
    },
  },
  data: function () {
    return {
      keyword: "", // keyword for search
      dataShow: [], // data for showing
      showNum: 8, // number of item per page
      currentPage: 1,
      modalCreate: false,
      imgDataUrl: "",
      addMsg: {
        title: "",
        desc: "",
      },
      sendMsg: {
        title: "",
        desc: "",
        img: "",
      },
      wayOfOrder: 1,
      imgUrl: "",
    };
  },
  computed: {
    projects() {
      return this.$store.state.projects;
    },
  },
  methods: {
    //添加项目时上传图片
    async upload(event) {
      //@后加
      let files = event.target.files[0];
      // console.log(files.name);
      // this.fileName = this.getObjectUrl(files);
      // let filess = new window.File([this.fileName], files.name, {
      //   type: files.type,
      // });
      // this.imgUrl = filess;
      // this.imgUrl = files.name;
      this.imgUrl = await uploadFile(files);
    },

    getObjectUrl(file) {
      //@后加
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      }
      return url;
    },
    sort: function () {
      //@后加
      let div = document.querySelector("#timesort");
      if (div.textContent == "按时间倒序") {
        div.textContent = "按标题排序";
        this.wayOfOrder = 2;
        // this.$store.dispatch("requestProjects", {
        //   wayOfOrder: this.wayOfOrder,
        // });
        this.$emit("reload", this.wayOfOrder);
      } else {
        div.textContent = "按时间倒序";
        this.wayOfOrder = 1;
        // this.$store.dispatch("requestProjects", {
        //   wayOfOrder: this.wayOfOrder,
        // });
        this.$emit("reload", this.wayOfOrder);
      }
    },

    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      }
      return url;
    },
    changeShowNum() {
      this.updateDataShow();
    },
    //在这里要向服务器发送信息：并获得返回的项目信息
    async updateDataShow() {
      await this.$store.dispatch("requestProjects", this.wayOfOrder);
      let startPage = (this.currentPage - 1) * this.showNum;
      let endPage = startPage + this.showNum;
      this.dataShow = this.data.slice(startPage, endPage);
    },
    pageChange: function (page) {
      this.currentPage = page;
      this.updateDataShow();
    },
    search: function () {
      let that = this;
      let tempData = that.data;
      that.dataShow = [];
      tempData.forEach(function (elem) {
        for (let i in elem) {
          if (elem[i].toString().indexOf(that.keyword) > -1) {
            that.dataShow.push(elem);
            return;
          }
        }
      });
    },

    async CreateOk(data) {
      let param = {
        title: this.addMsg.title,
        desc: this.addMsg.desc,
        wayOfOrder: this.wayOfOrder,
        img: this.imgUrl,
      };
      await this.$store.dispatch("addProjects", param);

      this.$emit("create-ok", this.data);

      //创建成功后，后端应该返回更新的数据：更新dataList
    },

    deleteOk: function (data) {
      this.$emit("delete-ok", data);
    },
    modifyOk: function (data) {
      // this.$emit('modify-ok',data)
      this.sendMsg.title = data.title;
      this.sendMsg.desc = data.desc;
      this.sendMsg.img = data.img;
    },
    modifyandsend: function (item) {
      let param = {
        id: item.id,
        title: this.sendMsg.title,
        desc: this.sendMsg.desc,
        img: this.sendMsg.img,
      };
      this.$emit("modify-ok", param);
    },
  },

  watch: {
    data: function () {
      this.dataShow = this.data.slice(0, this.showNum); // update dataShow once data changed
      // console.log(this.dataShow);
    },
  },
  mounted: function () {
    this.dataShow = this.data.slice(0, this.showNum);
    // for(var i = 0; i < ; )
    // this.currentPage =
  },
};
</script>
