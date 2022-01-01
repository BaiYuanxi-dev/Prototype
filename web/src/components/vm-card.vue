<template>
<!-- 自定义card控件：用于增加和修改项目  -->
  <div
    :class="[
      type === 'horizantal' ? 'vm-card-horizantal' : 'vm-card-vertical',
      'vm-panel',
    ]"
  >
    <div class="card-img">
      <img :src="img" alt="" />
      <div v-if="editable && type == 'vertical'" class="control">
        <span class="edit">
            <Icon type="md-create" @click="modalModify = true" />
        </span>
        <span class="delete">
          <Icon type="ios-trash" @click="modalDelete = true" />
        </span>
      </div>
    </div>
    
    <div class="card-desc panel-body">
      <h2>{{ title }}</h2>
      <div>{{ createdAt }}</div>
      <p>{{ desc }}</p>
      <Button type="text" @click="move"> more > </Button>
    </div>
    <Modal
      v-model="modalDelete"
      title="删除项目"
      ok-text="确定"
      cancel-text="取消"
      v-on:on-ok="deleteOk"
    >
      确定删除此项目吗？
    </Modal>
    <Modal
      v-model="modalModify"
      title="编辑项目"
      ok-text="确定"
      cancel-text="取消"
      v-on:on-ok="modifyOk"
    >
      <div style="margin: 20px">
        项目名称：
        <Input
          v-model="modifyMsg.title"
          placeholder="Please enter ..."
          style="width: 300px"
        ></Input>
      </div>
      <!--v-model="keyword"-->
      <div style="margin: 20px">
        项目简介：
        <Input
          v-model="modifyMsg.desc"
          placeholder="Please enter ..."
          style="width: 300px"
        ></Input>
      </div>
      <div style="margin: 20px">
        项目封面：
        <label type="button" class="upbtn">
          <div>上传封面</div>
          <input type="file" @change.prevent.stop="upload" class="change" />
          <!--@后加-->
        </label>
      </div>
    </Modal>
  </div>
</template>
<script>
import { formatDate } from "../utils/date.js";
import { uploadFile } from "../utils/upload.js"
export default {
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
  },
  name: "VmCard",
  props: {
    username:"",
    id: {
      type: Number,
      default: 1,
    },
    type: {
      type: String,
      default: "vertical",
    },
    editable: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Title",
    },
    createdAt: {
      type: String,
      default: "time",
    },
    img: {
      type: String,
      default: require("@/assets/img/img-1.jpg"),
    },
    desc: {
      type: String,
      default:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    detailUrl: {
      type: String,
      default: "#",
    },
    editUrl: {
      type: String,
      default: "#",
    },
  },
  data: function () {
    return {
      
      modalDelete: false,
      modalModify: false,
      modifyMsg: {
        title: "",
        desc: "",
      },
      fileName: "", //@后加
      imgUrl: "",
      imgname:"",
    };
  },

  methods: {
    //点击 确认 删除
    deleteOk: function () {
      this.$emit("delete-ok");
    },

    //点击 确认 修改
    modifyOk: function () {
      // 将修改后的信息发送到服务器，服务器返回成功后将前端信息修改
      // 首先要获得id
      console.log(this.imgUrl);
      let param = {
        title: this.modifyMsg.title,
        desc: this.modifyMsg.desc,
        img: this.imgUrl,
      };

      //修改提交到服务器
      // await this.$store.dispatch('updateProjects', this.modifyMsg);

      //修改成功后将前端界面内容修改
      this.$emit("modify-ok", param);
    },

    //页面跳转
    move() {
      this.$router.push({
        name: 'mtpg1',
        query:{
          //页面跳转参数：页面id
          projectName: this.title,
          username: this.username,
          projectId:this.id,
        }
      });
    },

    async upload(event) {
      let files = event.target.files[0];
      this.imgUrl = await uploadFile(files);
    },
  },

  watch: {
    username:function(){
      // console.log("???")
      console.log("username", this.username);
    },
    title: function(){
      console.log("title", this.title);
    }
  },
  mounted(){
    
    this.modifyMsg.title = this.title; 
    this.modifyMsg.desc = this.desc;
    this.imgUrl = this.img;
    ;
  }
};
</script>


<style scoped>
.buttons:hover {
  background-color: #1568a6;
  color: #fff;
}

.card-img{
  /* width: 410px; */
  height: 236px;
}
.card-img img{
  width: 100%;
  height: 100%;
} 
</style>