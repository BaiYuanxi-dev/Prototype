<template>
  <div class="left_panel">
    <div class="left_panel-layers">
      <el-col :span="12">
        <div style="border: 2px solid #e5e5e5">
          <span style="font-size: 30px">图 层</span>
        </div>
        <el-menu
          style="font-size:30px ! important;"
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#fff"
          text-color="#545c64"
          active-text-color="#ffd04b"
        >
          <!-- <el-menu-item index="1">
            <span slot="title" @click="getRectangle()">矩形</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span slot="title" @click="getCircle()">圆形</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span slot="title" @click="getTrangle()">三角形</span>
          </el-menu-item>
          <el-menu-item index="4">
            <span slot="title" @click="getStar()">星形</span>
          </el-menu-item>
          </el-menu>-->
          <!-- <el-menu-item v-for="num in layers" index="1">
            <span :class="iconfont layers_before-rectangle></span>
          </el-menu-item>-->
          <el-menu-item
            v-for="(num) in layers"
            :key="num.ran"
            :index="num.id.toString()"
            @mouseover.native="mousein(num.id)"
            @mouseleave.native="mouseleave"
            @click.self="clickon(num.id)"
            :ref="num.id"
          >
            <span class="iconfont" :class="getClassType(num.type)"></span>
            <span class="layers-content">{{ num.type + num.count}}</span>
            <span class="iconfont after" @click.stop="deleteItem(num.id, num.type, num.ran)"></span>
            <span class="iconfont eye" @click.stop="close(num.id,num.type,num.count)"></span>
            <span class="iconfont close" @click.stop="open(num.id,num.type,num.count)"></span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
@font-face {
  font-family: "iconfont";

  src: url("../../public/font_icon/iconfont.woff2?t=1631623985689")
      format("woff2"),
    url("../../public/font_icon/iconfont.woff?t=1631623985689") format("woff"),
    url("../../public/font_icon/iconfont.ttf?t=1631623985689")
      format("truetype");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  float: left;
  line-height: 36px;
}
.iconfont2 {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  float: right;
}
.left_panel {
  width: 100%;
}
.el-col-12 {
  width: 100%;
}
.el-menu-item {
  height: 40px;
  line-height: 36px;
}
.layers_before-rectangle::before {
  content: "\e67d";
  margin-right: 20px;
}
.layers_before-triangle::before {
  content: "\e624";
  margin-right: 20px;
}
.layers_before-circular::before {
  content: "\e66c";
  margin-right: 20px;
}
.layers_before-star::before {
  content: "\e81a";
  margin-right: 20px;
}
.layers_before-line::before {
  content: "\e66d";
  margin-right: 20px;
}
.layers_before-arrow::before {
  content: "\e637";
  margin-right: 20px;
}

.after {
  position: absolute;
  right: 20px;
  display: none;
}
.eye {
  position: absolute;
  right: 0px;
  display: none;
}
.eye::after {
  content: "\eb46";
  font-size: 15px;
  position: absolute;
  right: 10px;
}
.close {
  position: absolute;
  right: 0px;
  display: none;
}
.close::after {
  content: "\eb45";
  font-size: 15px;
  position: absolute;
  right: 10px;
}

.after::after {
  content: "\e864";
  font-size: 10px;
  position: absolute;
  right: 10px;
}
.layers-content {
  float: left;
  font-size: 18px;
}
.el-menu-vertical-demo {
  width: 100%;
}
</style>
<script>
import { Layer } from "konva/lib/Layer";
export default {
  props: {
    layers: {
      type: Array,
      required: true
    },
    count: {
      type: Number
    }
    // numItems: 0
  },
  data() {
    return {
      isDisplay: false,
      numItem: this.layers.length
    };
  },

  // watch: {
  //   numItem: "change"
  // },
  methods: {
    mousein: function(id) {
      if (this.$refs[id][0]) {
        this.$refs[id][0].$el.children[2].style.display = "block";
        this.$refs[id][0].$el.children[3].style.display = "block";
      }
    },
    mouseleave: function() {
      for (var k = 1; k <= this.numItem; k++) {
        if (this.$refs[k][0]) {
          this.$refs[k][0].$el.children[2].style.display = "none";
          this.$refs[k][0].$el.children[3].style.display = "none";
        }
      }
    },
    clickon: function(count) {},
    deleteItem: function(id, name, count) {
      // console.log(id);
      //, name, count
      // console.log("id", id);
      // console.log("name", name);
      // console.log("count", count);
      this.$emit("itemDelete", name + count);
      // console.log(this.layers[0]);
      // for (let i = 0; i < this.layers.length; i++) {
      // if (count == this.layers[i].ran) {
      // this.layers.delete[i];
      // }
      // }
      // console.log("cjz", this.$refs[id][0].$el);
      console.log("layers", this.layers);
      console.log("..", this.layers[id - 1]);

      // this.layers[0].id--;
      this.$refs[id][0].$el.style.display = "none";
    },

    close: function(id, name, count) {
      this.$refs[id][0].$el.children[3].style.display = "none";
      this.$refs[id][0].$el.children[4].style.display = "block";
      this.$emit("itemhide", name + count);
    },
    open: function(id, name, count) {
      this.$refs[id][0].$el.children[3].style.display = "block";
      this.$refs[id][0].$el.children[4].style.display = "none";
      this.$emit("itemshow", name + count);
    },
    // change: function () {
    //   this.$forceUpdate();
    // },
    getClassType(type) {
      switch (type) {
        case "arrow":
          return " layers_before-arrow";
        case "star":
          return " layers_before-star";

        case "rectangle":
          return " layers_before-rectangle";

        case "triangle":
          return " layers_before-triangle";

        case "circular":
          return " layers_before-circular";

        case "line":
          return " layers_before-line";
      }
    }
  },
  watch: {
    layers: function() {
      // console.log("layers", this.layers);
    }
  }
};
</script>
