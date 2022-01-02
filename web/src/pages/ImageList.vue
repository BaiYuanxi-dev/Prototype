<template>
  <VmImageList
    :username="username"
    :data="dataImageList"
    ref="child"
    @create-ok="createfn"
    @delete-ok="deletefn"
    @modify-ok="modifyfn"
    @reload="reloadfn"
    class="vm-margin"
  ></VmImageList>
</template>

<script>
import VmImageList from "@/components/vm-image-list";
//  :表示 用 后面的数据替换
//  @表示 v-on
//  emit（‘’， ）第一个参数表示 （定义）v-on的类型 ：或者叫 触发当前实例上的实践
// import moment from "moment";
export default {
  name: "ImageList",
  components: {
    VmImageList,
  },
  // data:function(){
  //   return{

  //   }
  // },

  methods: {
    //新建项目
    createfn: function (data) {
      this.dataImageList = this.$store.state.dataImageList;
    },

    //删除项目:
    deletefn: function (data) {
      for (let i = 0; i < this.dataImageList.length; i++) {
        if (this.dataImageList[i].id === data.id) {
          this.$store.dispatch("deleteProjects", {
            id: data.id,
            wayOfOrder: this.$refs.child.wayOfOrder,
          });
          let token = localStorage.getItem("token");
          // console.log(token);
          if (token === null || token === "" || token === undefined) {
            this.$router.push({
              name: "Login",
            });
          }
          this.dataImageList.splice(i, 1);
        }
      }
    },

    //修改项目的图片等等
    modifyfn: function (data) {
      for (let i = 0; i < this.dataImageList.length; i++) {
        if (this.dataImageList[i].id === data.id) {
          console.log("dataimg", data.img);
          let param = {
            id: data.id,
            title: data.title,
            desc: data.desc,
            img: data.img,
            wayOfOrder: this.$refs.child.wayOfOrder,
          };
          this.$store.dispatch("updateProjects", param);
          let token = localStorage.getItem("token");
          // console.log(token);
          if (token === null || token === "" || token === undefined) {
            this.$router.push({
              name: "Login",
            });
          }
        }
      }
    },

    //重新加载
    reloadfn: function (data) {
      this.$store.dispatch("requestProjects", {
        wayOfOrder: data,
        username: this.username,
      });
      if (this.$store.state.timeout != "ok") {
        this.$router.push({
          name: "Login",
        });
      }
      this.dataImageList = this.$store.state.dataImageList;
    },
  },
  data: function () {
    return {
      username: "",
      dataImageList: [],
    };
  },

  async mounted() {
    this.username = this.$route.query.username;
    //初始化界面
    await this.$store.dispatch("requestProjects", {
      username: this.username,
      wayOfOrder: this.$refs.child.wayOfOrder,
    });
    this.dataImageList = this.$store.state.dataImageList;
  },
};
</script>
