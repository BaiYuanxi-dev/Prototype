<template>
  <div class="all">
    <div class="header0">
      <div class="head">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">文件</template>
            <el-menu-item index="1-1" @click="save()">保存</el-menu-item>
            <el-menu-item index="1-2" @click="img_export()">导出</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">置入</template>
            <el-menu-item
              index="2-1"
              @click="
          getRectangle(
            200,
            300,
            200,
            50,
            '#fff',
            '#000',
            1,
            '#000',
            10,
            10,
            10,
            ''
          )
        "
            >矩形</el-menu-item>
            <el-menu-item
              index="2-2"
              @click="
          getCircle(200, 300, 50, '#fff', '#000', 1, '#000', 10, 10, 10, '')
        "
            >圆形</el-menu-item>
            <el-menu-item
              index="2-3"
              @click="
          getTrangle(
            200,
            300,
            200,
            50,
            '#fff',
            '#000',
            1,
            '#000',
            10,
            10,
            10,
            ''
          )
        "
            >三角形</el-menu-item>
            <el-menu-item
              index="2-4"
              @click="
          getStar(
            200,
            300,
            200,
            200,
            '#fff',
            '#000',
            1,
            '#000',
            10,
            10,
            10,
            ''
          )
        "
            >星形</el-menu-item>
          </el-submenu>
          <el-menu-item index="3">
            <a href="#" target="_blank">帮助</a>
          </el-menu-item>
          <el-menu-item index="4">
            <button class="btn_back" @click="backToPage">返回</button>
            <!-- <a href="#" target="_blank">返回</a> -->
          </el-menu-item>
        </el-menu>
      </div>
    </div>

    <div class="main">
      <Row :gutter="16">
        <Col :xs="4" :sm="4" :md="3" :lg="5" :xl="3" class="hidden-md-and-down">
          <div class="aa">
            <div class="a">
              <el-col :span="12">
                <layers
                  :layers="arrLayer"
                  :numItems="numItem"
                  v-on="{
                    itemDelete: itemDelete,
                    itemhide: itemhide,
                    itemshow: itemshow,
                  }"
                  ref="layers"
                ></layers>
              </el-col>
            </div>
          </div>
        </Col>
        <Col :xs="18" :sm="20" :md="20" :lg="20" :xl="18">
          <div class="b">
            <div id="container" ref="container" class="container" />
          </div>
        </Col>
        <Col :xs="6" :sm="4" :md="4" :lg="4" :xl="3">
          <div class="cc">
            <div class="c">
              <div>
                <h4 style="font-size: 14px">参数</h4>
                <div class="para">
                  <div class="x">
                    x:
                    <input type="text" v-model="x" @change="change()" id="X" />
                  </div>
                  <div class="y">
                    y:
                    <input type="text" v-model="y" @change="change()" id="X" />
                  </div>
                  <div class="w">
                    w:
                    <input type="text" v-model="width" @change="change()" id="X" />
                  </div>
                  <div class="h">
                    h:
                    <input type="text" v-model="height" @change="change()" id="X" />
                  </div>
                </div>
              </div>
              <div>
                <h4 style="font-size: 14px; margin-top: 20px">背景色</h4>
                <div>
                  颜色
                  <el-color-picker
                    v-model="color1"
                    @change="changeColor()"
                    size="large"
                    style="display: block; margin-bottom: 10px"
                  ></el-color-picker>
                  <input
                    type="text"
                    style="border-radius: 5px; width: 100px"
                    v-model="color"
                    @change="Color()"
                  />
                </div>
                <!-- <div class="demonstration" style="margin:20px 0">颜色</div> -->
              </div>
              <div>
                <h4 style="font-size: 14px; margin-top: 20px">边框</h4>
                <div>
                  颜色
                  <el-color-picker
                    v-model="color2"
                    @change="changeColor1()"
                    size="large"
                    style="display: block; margin-bottom: 10px"
                  ></el-color-picker>粗细
                  <input
                    type="text"
                    style="border-radius: 5px; width: 100px"
                    v-model="borderWidth"
                    @change="changeWidth()"
                  />
                </div>
              </div>
              <div>
                <h4 style="font-size: 14px">阴影</h4>
                <div>
                  颜色
                  <el-color-picker
                    v-model="color3"
                    @change="changeColor2()"
                    size="large"
                    style="display: block; margin-bottom: 10px"
                  ></el-color-picker>
                  <div>
                    x&nbsp;偏移
                    <input
                      type="text"
                      style="border-radius: 5px; width: 100px"
                      v-model="x1"
                      @change="changeX()"
                    />
                  </div>
                  <div>
                    y&nbsp;偏移
                    <input
                      type="text"
                      style="border-radius: 5px; width: 100px"
                      v-model="y1"
                      @change="changeY()"
                    />
                  </div>
                  <div>
                    模糊度
                    <input
                      type="text"
                      style="border-radius: 5px; width: 100px"
                      v-model="blur"
                      @change="changeBlur()"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>


<style scoped>
.para {
  width: 100%;
  font-size: 15px;
}
.el-col-12 {
  width: 100%;
}
.main .a {
  position: fixed;
  /* float: left; */
  /* height: 1000px; */
  width: 14%;
  /* background-color: lightgray; */
}
.main .aa {
  float: left;
  /* height: 1000px; */
  /* width: 13%; */
  /* background-color: lightgray; */
}
.main .b {
  float: left;
  height: 100%;
  width: 100%;
  background-color: lightgray;
}
.main .cc {
  float: left;
  height: 100%;
  margin-top: 30px;
  width: 100%;
}
.main .cc .c {
  position: fixed;
}
h4 {
  text-align: left;
  margin: 10 0;
}
.demonstration {
  float: left;
  font-size: 12px;
  margin: 5px;
  /* //height: 40px; */
}
.el-col {
  border-radius: 4px;
}
.btn_back {
  background-color: transparent;
  border-style: none;
  color: white;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.header0 {
  height: 61px;
  width: 100%;
}
.head {
  position: fixed;
  z-index: 2;
  width: 100%;
}
#X {
  padding: 5px 0;
  width: 50%;
  height: 20px;
  border: 1px solid lightgrey;
  border-radius: 5px;
}

#container {
  width: 100%;
  height: 100%;
}
</style>

<script>
import Konva from "konva";
import { Transform } from "konva/lib/Util";
import Layers from "../pages/Layer.vue";

export default {
  name: "Star",
  components: { Layers }, //注册组件

  data() {
    return {
      arrLayer: [],
      numItem: 0,

      activeIndex: "1",
      activeIndex2: "1",
      x: "0",
      y: "0",
      width: "0",
      height: "0",
      stage: null,
      color1: "#FFFFFF",
      color: "#FFFFFF",
      color2: "#000",
      color3: "#000",

      borderWidth: 1,
      x1: 0,
      y1: 0,
      blur: 0,
      chaneID: "",
      numsRect: [],
      numsStar: [],
      numsCircle: [],
      numsTrangle: [],
      numsText: [],
      rect: [],
      star: [],
      circle: [],
      trangle: [],
      allGraphs: [],
      arr: [],
      arrId: [],
      rectId: [],
      circleId: [],
      starId: [],
      textId: [],
      tranId: [],
      idd: "",
      test: 0,

      pageId: -1,
      projectId: -1,
      username: "",
      projectName: ""
    };
  },

  methods: {
    async backToPage() {
      this.arr = [];
      this.$store.state.layers = [];
      this.arrId = [];
      this.$store.state.ids = [];
      this.numsRect = [];
      this.numsStar = [];
      this.numsCircle = [];
      this.numsTrangle = [];
      this.rect = [];
      this.star = [];
      this.circle = [];
      this.tragnle = [];
      this.allGraphs = [];
      this.rectId = [];
      this.circleId = [];
      this.starId = [];
      this.textId = [];
      this.tranId = [];
      console.log("???", this.numsRect);
      await this.$router.push({
        name: "mtpg1",
        query: {
          username: this.username,
          projectId: this.projectId,
          projectName: this.projectName
        }
      });
    },
    destroy(idd) {
      let shape = this.stage.find(idd)[0];
      // console.log(this.numsCircle);
      // shape.destroy();
      shape.move({
        x: 10000,
        y: 10000
      });
    },
    hide(idd) {
      let shape = this.stage.find(idd)[0];
      shape.hide();
    },
    show(idd) {
      let shape = this.stage.find(idd)[0];
      shape.show();
    },
    itemshow: function(name_count) {
      //("我收到了" + name_count);
      this.$refs.layers._data.numItem--;
      // this.numItem--;
      if (name_count.indexOf("rect") == 0) {
        let num = name_count.slice(9);
        this.idd = "#myRect" + this.numsRect[num - 1];
      } else if (name_count.indexOf("star") == 0) {
        let num = name_count.slice(4);
        this.idd = "#myStar" + this.numsStar[num - 1];
      } else if (name_count.indexOf("cir") == 0) {
        let num = name_count.slice(8);
        this.idd = "#mycircle" + this.numsCircle[num - 1];
      } else if (name_count.indexOf("tr") == 0) {
        let num = name_count.slice(8);
        this.idd = "#myTrangle" + this.numsTrangle[num - 1];
      }
      this.show(this.idd);
    },

    itemDelete: function(name_count) {
      // console.log(name_count);
      this.$refs.layers._data.numItem--;
      // this.numItem--;
      if (name_count.indexOf("rect") == 0) {
        let num = name_count.slice(9);
        this.idd = "#myRect" + num;

        for (let i = 0; i < this.numsRect.length; i++) {
          if (this.numsRect[i] == num) {
            // console.log(num);
            this.numsRect.splice(i, 1);
          }
        }
      } else if (name_count.indexOf("star") == 0) {
        let num = name_count.slice(4);
        this.idd = "#myStar" + num;
        for (let i = 0; i < this.numsStar.length; i++) {
          if (this.numsStar[i] == num) {
            // console.log(num);
            this.numsStar.splice(i, 1);
          }
        }
      } else if (name_count.indexOf("cir") == 0) {
        let num = name_count.slice(8);

        this.idd = "#mycircle" + num;
        // console.log(name_count);
        for (let i = 0; i < this.numsCircle.length; i++) {
          if (this.numsCircle[i] == num) {
            // console.log(num + ",,,,,,");
            this.numsCircle.splice(i, 1);
          }
        }
      } else if (name_count.indexOf("tr") == 0) {
        let num = name_count.slice(8);
        this.idd = "#myTrangle" + num;

        // console.log("num: " + num);
        for (let i = 0; i < this.numsTrangle.length; i++) {
          if (this.numsTrangle[i] == num) {
            // console.log(num);
            this.numsTrangle.splice(i, 1);
          }
        }
        // console.log(this.numsTrangle);
      }
      this.destroy(this.idd);
    },
    itemhide: function(name_count) {
      //("我收到了" + name_count);
      this.$refs.layers._data.numItem--;
      // this.numItem--;
      if (name_count.indexOf("rect") == 0) {
        let num = name_count.slice(9);
        this.idd = "#myRect" + this.numsRect[num - 1];
      } else if (name_count.indexOf("star") == 0) {
        let num = name_count.slice(4);
        this.idd = "#myStar" + this.numsStar[num - 1];
        //(num)
        //("sb")
      } else if (name_count.indexOf("cir") == 0) {
        let num = name_count.slice(8);
        this.idd = "#mycircle" + this.numsCircle[num - 1];
      } else if (name_count.indexOf("tr") == 0) {
        let num = name_count.slice(8);
        this.idd = "#myTrangle" + this.numsTrangle[num - 1];
      }
      //(this.idd);
      this.hide(this.idd);
    },
    async addGraph() {
      ////(this.numsRect);
      for (let i = 0; i < this.numsRect.length; i++) {
        let shape = this.stage.find("#myRect" + this.numsRect[i])[0];
        //(this.stage.find("#myRect" + this.numsRect[i])[0]);
        let layerId = shape.attrs.id;
        let bgColor = shape.attrs.fill;
        let borderColor = shape.attrs.stroke;
        let borderWidth = shape.attrs.strokeWidth;

        let height = Math.abs(Math.round(shape.height() * shape.scaleY()));
        let shadowBlur = shape.attrs.shadowBlur;
        let shadowColor = shape.attrs.shadowColor;
        let shadowOffsetX = shape.attrs.shadowOffsetX;
        let shadowOffsetY = shape.attrs.shadowOffsetY;
        let width = Math.round(shape.width() * shape.scaleX());
        let x_co = shape.attrs.x;
        let y_co = shape.attrs.y;

        this.allGraphs.push({
          layerId,
          bgColor,
          borderColor,
          borderWidth,
          height,
          shadowBlur,
          shadowColor,
          shadowOffsetX,
          shadowOffsetY,
          width,
          x_co,
          y_co
        });
      }

      for (let i = 0; i < this.numsStar.length; i++) {
        let shape = this.stage.find("#myStar" + this.numsStar[i])[0];
        //(this.stage.find("#myStar" + this.numsStar[i])[0]);
        let layerId = shape.attrs.id;
        let bgColor = shape.attrs.fill;
        let borderColor = shape.attrs.stroke;
        let borderWidth = shape.attrs.strokeWidth;
        let height = Math.abs(Math.round(shape.height() * shape.scaleY()));
        let shadowBlur = shape.attrs.shadowBlur;
        let shadowColor = shape.attrs.shadowColor;
        let shadowOffsetX = shape.attrs.shadowOffsetX;
        let shadowOffsetY = shape.attrs.shadowOffsetY;
        let width = Math.round(shape.width() * shape.scaleX());
        let x_co = shape.attrs.x;
        let y_co = shape.attrs.y;

        // console.log("ddddddddddd");
        // console.log(shape.attrs.stroke);
        // console.log(shape.attrs);
        // console.log("ddddddddddd");
        // console.log(borderWidth);

        this.allGraphs.push({
          layerId,
          bgColor,
          borderColor,
          borderWidth,
          height,
          shadowBlur,
          shadowColor,
          shadowOffsetX,
          shadowOffsetY,
          width,
          x_co,
          y_co
        });
      }

      for (let i = 0; i < this.numsCircle.length; i++) {
        let shape = this.stage.find("#mycircle" + this.numsCircle[i])[0];
        //(this.stage.find("#mycircle" + this.numsCircle[i])[0]);
        console.log(this.numsCircle);
        let layerId = shape.attrs.id;
        let bgColor = shape.attrs.fill;
        let borderColor = shape.attrs.stroke;
        let borderWidth = shape.attrs.strokeWidth;
        let height = Math.abs(Math.round(shape.height() * shape.scaleY()));
        let shadowBlur = shape.attrs.shadowBlur;
        let shadowColor = shape.attrs.shadowColor;
        let shadowOffsetX = shape.attrs.shadowOffsetX;
        let shadowOffsetY = shape.attrs.shadowOffsetY;
        let width = Math.round(shape.width() * shape.scaleX());
        let x_co = shape.attrs.x;
        let y_co = shape.attrs.y;

        // console.log("ddddddddddd");
        // console.log(shape.attrs.stroke);
        // console.log(shape.attrs)
        // console.log("ddddddddddd");
        // console.log(borderWidth);

        this.allGraphs.push({
          layerId,
          bgColor,
          borderColor,
          borderWidth,
          height,
          shadowBlur,
          shadowColor,
          shadowOffsetX,
          shadowOffsetY,
          width,
          x_co,
          y_co
        });
      }

      // console.log(this.numsTrangle.length);
      for (let i = 0; i < this.numsTrangle.length; i++) {
        let shape = this.stage.find("#myTrangle" + this.numsTrangle[i])[0];
        //(this.stage.find("#myTrangle" + this.numsTrangle[i])[0]);
        let layerId = shape.attrs.id;
        let bgColor = shape.attrs.fill;
        let borderColor = shape.attrs.stroke;
        let borderWidth = shape.attrs.strokeWidth;
        let height = Math.abs(Math.round(shape.height() * shape.scaleY()));
        let shadowBlur = shape.attrs.shadowBlur;
        let shadowColor = shape.attrs.shadowColor;
        let shadowOffsetX = shape.attrs.shadowOffsetX;
        let shadowOffsetY = shape.attrs.shadowOffsetY;
        let width = Math.round(shape.width() * shape.scaleX());
        let x_co = shape.attrs.x;
        let y_co = shape.attrs.y;

        this.allGraphs.push({
          layerId,
          bgColor,
          borderColor,
          borderWidth,
          height,
          shadowBlur,
          shadowColor,
          shadowOffsetX,
          shadowOffsetY,
          width,
          x_co,
          y_co
        });
      }
      // //(this.rect.length);

      // this.allGraphs = this.allGraphs.concat(this.rect);
      // this.allGraphs = this.allGraphs.concat(this.star);
      // this.allGraphs = this.allGraphs.concat(this.circle);
      // this.allGraphs = this.allGraphs.concat(this.trangle);

      // this.allGraphs.push(this.rect);
      // // this.allGraphs.push(this.star);
      // this.allGraphs.push(this.circle);
      // this.allGraphs.push(this.trangle);
      // 添加图形的前端方法调用
      //(this.pageId)
      let param = {
        arr: this.allGraphs,
        pageId: this.pageId,
        projectId: this.projectId,
        username: this.username
      };
      //(this.allGraphs);
      await this.$store.dispatch("addGraph", param);
    },

    handleSelect(key, keyPath) {
      //(key, keyPath);
    },
    handleOpen(key, keyPath) {
      //(key, keyPath);
    },
    handleClose(key, keyPath) {
      //(key, keyPath);
    },

    save() {
      this.addGraph();
    },

    img_export() {
      var dataURL = this.stage.toDataURL({ pixelRatio: 3 });
      this.downloadURI(dataURL, "layer.png");
    },

    downloadURI(uri, name) {
      var link = document.createElement("a");
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // delete link;
      link = null;
    },

    changeX() {
      // //(this.x1 + "x");

      var shape = this.stage.find("#" + this.chaneID)[0];
      shape.shadowOffsetX(parseInt(this.x1));
    },
    changeY() {
      // //(this.y1 + "y");
      var shape = this.stage.find("#" + this.chaneID)[0];
      shape.shadowOffsetY(parseInt(this.y1));
    },
    changeBlur() {
      var shape = this.stage.find("#" + this.chaneID)[0];
      ////(this.blur);
      shape.shadowBlur(parseInt(this.blur));
    },
    changeColor2() {
      var shape = this.stage.find("#" + this.chaneID)[0];
      ////(this.color3);
      shape.shadowColor(this.color3);
    },
    changeColor() {
      ////(this.color1);
      this.color = this.color1;
      var shape = this.stage.find("#" + this.chaneID)[0];
      ////(shape);
      shape.fill(this.color1);
    },
    Color() {
      this.color1 = this.color;
      ////(this.color1);
      var shape = this.stage.find("#" + this.chaneID)[0];
      shape.fill(this.color1);
    },
    changeColor1() {
      var shape = this.stage.find("#" + this.chaneID)[0];
      ////(this.color2);
      shape.stroke(this.color2);
      this.layer.draw();
    },
    changeWidth() {
      ////("....");
      var shape = this.stage.find("#" + this.chaneID)[0];
      shape.strokeWidth(parseInt(this.borderWidth));
      ////(shape.layer);
      this.layer.draw();
    },
    change() {
      // //(id);
      var shape = this.stage.find("#" + this.chaneID)[0];

      let tween = new Konva.Tween({
        node: shape,
        duration: 0,
        x: Math.round(this.x),
        y: Math.round(this.y),
        easing: Konva.Easings.Linear
      });
      tween.play();
      ////(tween.node.attrs.width);
    },
    getStar(
      x,
      y,
      w,
      h,
      bgColor,
      strokeColor,
      strokeWidth,
      shadowColor,
      shadowOffsetX,
      shadowOffsetY,
      shadowBlur,
      idName
    ) {
      var num = this.numsStar.length;
      if (idName == "") {
        //("....");

        // let number =
        this.numsStar[num] = parseInt(Math.random() * 100 + 1); //随机数范围是1-100
        for (var i = 0; i < num; i++) {
          //内层控制当前生成的随机数和前一个数进行比较，重复则重新生成，反之存入新数组
          if (this.numsStar[num] == this.numsStar[i]) {
            num--;
          }
        }
        idName = "myStar" + String(this.numsStar[num]);
      }
      //(idName);
      //("name")
      const star = new Konva.Star({
        x,
        y,
        numPoints: 5,
        innerRadius: w / 3,
        outerRadius: h / 2,
        fill: bgColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        shadowBlur: shadowBlur,
        shadowOffset: { x: shadowOffsetX, y: shadowOffsetY },
        shadowOpacity: 0.5,
        draggable: true,
        shadowColor: shadowColor,
        id: idName
      });

      this.chaneID = star.id();
      const tr = new Konva.Transformer();
      this.layer.add(tr);
      // by default select all shapes
      tr.nodes([star]);
      this.layer.add(star);
      this.stage.add(this.layer);
      this.layer.draw();
      this.x = star.attrs.x;
      this.y = star.attrs.y;
      this.width = star.getWidth();
      this.height = star.getHeight();

      this.color = star.attrs.fill;
      this.color1 = star.attrs.fill;
      this.color2 = star.attrs.stroke;
      this.color3 = star.attrs.shadowColor;
      this.borderWidth = star.attrs.strokeWidth;
      this.x1 = star.attrs.shadowOffsetX;
      this.y1 = star.attrs.shadowOffsetY;
      this.blur = star.attrs.shadowBlur;

      let sum =
        this.numsRect.length +
        this.numsCircle.length +
        this.numsStar.length +
        this.numsTrangle.length +
        this.numsText.length;

      //(this.numsStar.length);
      //("star");
      //(sum);
      // console.log(num + " ...........");
      let params = {
        id: sum,
        type: "star",
        count: parseInt(this.numsStar.length),
        ran: this.numsStar[this.numsStar.length - 1]
      };
      this.arrLayer.push(params);

      // console.log("params", params);
      this.$refs.layers._data.numItem++;
      star.on("dragmove", event => {
        ////()
        this.x = Math.round(star.attrs.x);
        this.y = Math.round(star.attrs.y);
        this.width = Math.round(star.width() * star.scaleX());
        this.height = Math.abs(Math.round(star.height() * star.scaleY()));
        this.color = star.attrs.fill;
        this.color1 = star.attrs.fill;
        this.color2 = star.attrs.stroke;
        this.color3 = star.attrs.shadowColor;
        this.borderWidth = star.attrs.strokeWidth;
        this.x1 = star.attrs.shadowOffsetX;
        this.y1 = star.attrs.shadowOffsetY;
        this.blur = star.attrs.shadowBlur;

        this.x = Math.round(star.attrs.x);
        this.y = Math.round(star.attrs.y);
      });

      star.on("transform", event => {
        this.x = Math.round(star.attrs.x);
        this.y = Math.round(star.attrs.y);
        this.width = Math.round(star.width() * star.scaleX());
        this.height = Math.abs(Math.round(star.height() * star.scaleY()));
        this.color = star.attrs.fill;
        this.color1 = star.attrs.fill;
        this.color2 = star.attrs.stroke;
        this.color3 = star.attrs.shadowColor;
        this.borderWidth = star.attrs.strokeWidth;
        this.x1 = star.attrs.shadowOffsetX;
        this.y1 = star.attrs.shadowOffsetY;
        this.blur = star.attrs.shadowBlur;

        this.width = Math.round(star.width() * star.scaleX());
        this.height = Math.abs(Math.round(star.height() * star.scaleY()));
        ////(this.height);
      });

      this.stage.on("click", event => {
        ////(event.evt.layerX);
        if (
          event.evt.layerX <= this.x - 20 ||
          event.evt.layerX >= this.x + this.width + 20 ||
          event.evt.layerY <= this.y - 20 ||
          event.evt.layerY >= this.y + this.height + 20
        ) {
          tr.enabledAnchors([]);
          tr.ignoreStroke(true);
          tr.rotateEnabled(false);
        }
      });

      star.on("click", event => {
        tr.enabledAnchors([
          "top-left",
          "top-center",
          "top-right",
          "middle-right",
          "middle-left",
          "bottom-left",
          "bottom-center",
          "bottom-right"
        ]);
        tr.rotateEnabled(true);
        this.chaneID = star.id();

        this.x = star.attrs.x;
        this.y = star.attrs.y;
        this.width = Math.round(star.width() * star.scaleX());
        this.height = Math.abs(Math.round(star.height() * star.scaleY()));
        this.color = star.attrs.fill;
        this.color1 = star.attrs.fill;
        this.color2 = star.attrs.stroke;
        this.color3 = star.attrs.shadowColor;
        this.borderWidth = star.attrs.strokeWidth;
        this.x1 = star.attrs.shadowOffsetX;
        this.y1 = star.attrs.shadowOffsetY;
        this.blur = star.attrs.shadowBlur;

        this.change(this.chaneID);
        this.changeColor(this.chaneID);
        this.changeColor1(this.chaneID);
        this.changeColor2(this.chaneID);
        this.Color(this.chaneID);
        this.changeX(this.chaneID);
        this.changeY(this.chaneID);
        this.changeWidth(this.chaneID);
        this.changeBlur(this.chaneID);
      });
    },

    getRectangle(
      x,
      y,
      w,
      h,
      bgColor,
      strokeColor,
      strokeWidth,
      shadowColor,
      shadowOffsetX,
      shadowOffsetY,
      shadowBlur,
      idName
    ) {
      // var nums[];
      var num = this.numsRect.length;
      if (idName == "") {
        //("....");

        // let number =
        this.numsRect[num] = parseInt(Math.random() * 100 + 1); //随机数范围是1-100
        for (var i = 0; i < num; i++) {
          //内层控制当前生成的随机数和前一个数进行比较，重复则重新生成，反之存入新数组
          if (this.numsRect[num] == this.numsRect[i]) {
            num--;
          }
        }
        idName = "myRect" + String(this.numsRect[num]);
      }
      //(num);

      const rect = new Konva.Rect({
        x,
        y,
        width: w,
        height: h,
        fill: bgColor,
        stroke: strokeColor,
        shadowColor: shadowColor,
        strokeWidth: strokeWidth,
        shadowBlur: shadowBlur,
        shadowOffset: { x: shadowOffsetX, y: shadowOffsetY },
        shadowOpacity: 0.5,
        draggable: true,
        id: idName
      });

      this.chaneID = rect.id();
      // //()

      const tr = new Konva.Transformer();
      this.layer.add(tr);

      tr.nodes([rect]);
      this.layer.add(rect);
      this.stage.add(this.layer);
      this.layer.draw();
      this.x = rect.attrs.x;
      this.y = rect.attrs.y;
      this.width = Math.round(rect.width() * rect.scaleX());
      this.height = Math.abs(Math.round(rect.height() * rect.scaleY()));
      this.color = rect.attrs.fill;
      this.color1 = rect.attrs.fill;
      this.color2 = rect.attrs.stroke;
      this.color3 = rect.attrs.shadowColor;
      this.borderWidth = rect.attrs.strokeWidth;
      this.x1 = rect.attrs.shadowOffsetX;
      this.y1 = rect.attrs.shadowOffsetY;
      this.blur = rect.attrs.shadowBlur;

      let sum =
        this.numsRect.length +
        this.numsCircle.length +
        this.numsStar.length +
        this.numsTrangle.length +
        this.numsText.length;
      //("rect");
      //(sum);
      // console.log("num", num);
      let params = {
        id: sum,
        type: "rectangle",
        count: parseInt(this.numsRect.length),

        ran: this.numsRect[this.numsRect.length - 1]
      };
      // console.log("test", params);
      this.arrLayer.push(params);

      this.$refs.layers._data.numItem++;

      rect.on("dragmove", event => {
        ////(rect.attrs.x);
        this.x = Math.round(rect.attrs.x);
        this.y = Math.round(rect.attrs.y);
        this.width = Math.round(rect.width() * rect.scaleX());
        this.height = Math.abs(Math.round(rect.height() * rect.scaleY()));
        this.color = rect.attrs.fill;
        this.color1 = rect.attrs.fill;
        this.color2 = rect.attrs.stroke;
        this.color3 = rect.attrs.shadowColor;
        this.borderWidth = rect.attrs.strokeWidth;
        this.x1 = rect.attrs.shadowOffsetX;
        this.y1 = rect.attrs.shadowOffsetY;
        this.blur = rect.attrs.shadowBlur;

        this.x = Math.round(rect.attrs.x);
        this.y = Math.round(rect.attrs.y);
      });

      rect.on("transform", event => {
        this.x = Math.round(rect.attrs.x);
        this.y = Math.round(rect.attrs.y);
        this.width = Math.round(rect.width() * rect.scaleX());
        this.height = Math.abs(Math.round(rect.height() * rect.scaleY()));
        this.color = rect.attrs.fill;
        this.color1 = rect.attrs.fill;
        this.color2 = rect.attrs.stroke;
        this.color3 = rect.attrs.shadowColor;
        this.borderWidth = rect.attrs.strokeWidth;
        this.x1 = rect.attrs.shadowOffsetX;
        this.y1 = rect.attrs.shadowOffsetY;
        this.blur = rect.attrs.shadowBlur;

        this.width = Math.round(rect.width() * rect.scaleX());
        this.height = Math.abs(Math.round(rect.height() * rect.scaleY()));
        // //(this.height);
        // //(this.width);
      });

      this.stage.on("click", event => {
        if (
          event.evt.layerX <= this.x - 20 ||
          event.evt.layerX >= this.x + this.width + 20 ||
          event.evt.layerY <= this.y - 20 ||
          event.evt.layerY >= this.y + this.height + 20
        ) {
          tr.enabledAnchors([]);
          tr.rotateEnabled(false);
          tr.ignoreStroke(true);
        }
      });

      rect.on("click", event => {
        tr.enabledAnchors([
          "top-left",
          "top-center",
          "top-right",
          "middle-right",
          "middle-left",
          "bottom-left",
          "bottom-center",
          "bottom-right"
        ]);
        tr.rotateEnabled(true);
        this.chaneID = rect.id();

        ////(rect.attrs.x);

        this.x = Math.round(rect.attrs.x);
        this.y = Math.round(rect.attrs.y);
        this.width = Math.round(rect.width() * rect.scaleX());
        this.height = Math.abs(Math.round(rect.height() * rect.scaleY()));
        this.color = rect.attrs.fill;
        this.color1 = rect.attrs.fill;
        this.color2 = rect.attrs.stroke;
        this.color3 = rect.attrs.shadowColor;
        this.borderWidth = rect.attrs.strokeWidth;
        this.x1 = rect.attrs.shadowOffsetX;
        this.y1 = rect.attrs.shadowOffsetY;
        this.blur = rect.attrs.shadowBlur;

        //(rect);

        this.change(this.chaneID);
        this.changeColor(this.chaneID);
        this.changeColor1(this.chaneID);
        this.changeColor2(this.chaneID);
        this.Color(this.chaneID);
        this.changeX(this.chaneID);
        this.changeY(this.chaneID);
        this.changeWidth(this.chaneID);
        this.changeBlur(this.chaneID);
      });
    },

    getCircle(
      x,
      y,
      h,
      bgColor,
      strokeColor,
      strokeWidth,
      shadowColor,
      shadowOffsetX,
      shadowOffsetY,
      shadowBlur,
      idName
    ) {
      var num = this.numsCircle.length;

      if (idName == "") {
        this.numsCircle[num] = parseInt(Math.random() * 100 + 1); //随机数范围是1-100
        for (var i = 0; i < num; i++) {
          //内层控制当前生成的随机数和前一个数进行比较，重复则重新生成，反之存入新数组
          if (this.numsCircle[num] == this.numsCircle[i]) {
            num--;
          }
        }
        idName = "mycircle" + String(this.numsCircle[num]);
        // alert(idName);
      }
      //("circleNum");
      //(num);

      const circle = new Konva.Circle({
        x,
        y,
        radius: h / 2,
        fill: bgColor,
        stroke: strokeColor,
        strokeWidth,
        shadowBlur,
        shadowColor,
        shadowOffset: { x: shadowOffsetX, y: shadowOffsetY },
        shadowOpacity: 0.5,
        draggable: true,
        id: idName
      });

      this.chaneID = circle.id();
      const tr = new Konva.Transformer();
      this.layer.add(tr);
      // by default select all shapes
      tr.nodes([circle]);
      this.layer.add(circle);
      this.stage.add(this.layer);
      this.layer.draw();
      this.x = Math.round(circle.attrs.x);
      this.y = Math.round(circle.attrs.y);
      this.width = Math.round(circle.width() * circle.scaleX());
      this.height = Math.abs(Math.round(circle.height() * circle.scaleY()));
      this.color = circle.attrs.fill;
      this.color1 = circle.attrs.fill;
      this.color2 = circle.attrs.stroke;
      this.color3 = circle.attrs.shadowColor;
      this.borderWidth = circle.attrs.strokeWidth;
      this.x1 = circle.attrs.shadowOffsetX;
      this.y1 = circle.attrs.shadowOffsetY;
      this.blur = circle.attrs.shadowBlur;

      let sum =
        this.numsRect.length +
        this.numsCircle.length +
        this.numsStar.length +
        this.numsTrangle.length +
        this.numsText.length;
      // alert(sum);
      let params = {
        id: sum,
        type: "circular",
        count: parseInt(this.numsCircle.length),
        ran: this.numsCircle[this.numsCircle.length - 1]
      };
      this.arrLayer.push(params);
      this.$refs.layers._data.numItem++;

      circle.on("dragmove", event => {
        this.x = Math.round(circle.attrs.x);
        this.y = Math.round(circle.attrs.y);
        this.width = Math.round(circle.width() * circle.scaleX());
        this.height = Math.abs(Math.round(circle.height() * circle.scaleY()));
        this.color = circle.attrs.fill;
        this.color1 = circle.attrs.fill;
        this.color2 = circle.attrs.stroke;
        this.color3 = circle.attrs.shadowColor;
        this.borderWidth = circle.attrs.strokeWidth;
        this.x1 = circle.attrs.shadowOffsetX;
        this.y1 = circle.attrs.shadowOffsetY;
        this.blur = circle.attrs.shadowBlur;

        this.x = Math.round(circle.attrs.x);
        this.y = Math.round(circle.attrs.y);
      });

      circle.on("transform", event => {
        this.x = Math.round(circle.attrs.x);
        this.y = Math.round(circle.attrs.y);
        this.width = Math.round(circle.width() * circle.scaleX());
        this.height = Math.abs(Math.round(circle.height() * circle.scaleY()));
        this.color = circle.attrs.fill;
        this.color1 = circle.attrs.fill;
        this.color2 = circle.attrs.stroke;
        this.color3 = circle.attrs.shadowColor;
        this.borderWidth = circle.attrs.strokeWidth;
        this.x1 = circle.attrs.shadowOffsetX;
        this.y1 = circle.attrs.shadowOffsetY;
        this.blur = circle.attrs.shadowBlur;

        this.width = Math.round(circle.width() * circle.scaleX());
        this.height = Math.abs(Math.round(circle.height() * circle.scaleY()));
      });
      this.stage.on("click", event => {
        if (
          event.evt.layerX <= this.x - 20 ||
          event.evt.layerX >= this.x + this.width + 20 ||
          event.evt.layerY <= this.y - 20 ||
          event.evt.layerY >= this.y + this.height + 20
        ) {
          tr.enabledAnchors([]);
          tr.rotateEnabled(false);
          tr.ignoreStroke(true);
        }
      });

      circle.on("click", event => {
        tr.enabledAnchors([
          "top-left",
          "top-center",
          "top-right",
          "middle-right",
          "middle-left",
          "bottom-left",
          "bottom-center",
          "bottom-right"
        ]);
        tr.rotateEnabled(true);
        this.chaneID = circle.id();

        ////(circle.attrs.x);

        this.x = Math.round(circle.attrs.x);
        this.y = Math.round(circle.attrs.y);
        this.width = Math.round(circle.width() * circle.scaleX());
        this.height = Math.abs(Math.round(circle.height() * circle.scaleY()));
        this.color = circle.attrs.fill;
        this.color1 = circle.attrs.fill;
        this.color2 = circle.attrs.stroke;
        this.color3 = circle.attrs.shadowColor;
        this.borderWidth = circle.attrs.strokeWidth;
        this.x1 = circle.attrs.shadowOffsetX;
        this.y1 = circle.attrs.shadowOffsetY;
        this.blur = circle.attrs.shadowBlur;

        ////(this.color2);

        this.change(this.chaneID);
        this.changeColor(this.chaneID);
        this.changeColor1(this.chaneID);
        this.changeColor2(this.chaneID);
        this.Color(this.chaneID);
        this.changeX(this.chaneID);
        this.changeY(this.chaneID);
        this.changeWidth(this.chaneID);
        this.changeBlur(this.chaneID);
      });
    },

    getTrangle(
      x,
      y,
      w,
      h,
      bgColor,
      strokeColor,
      strokeWidth,
      shadowColor,
      shadowOffsetX,
      shadowOffsetY,
      shadowBlur,
      idName
    ) {
      var num = this.numsTrangle.length;
      if (idName == "") {
        //("....");

        // let number =
        this.numsTrangle[num] = parseInt(Math.random() * 100 + 1); //随机数范围是1-100
        for (var i = 0; i < num; i++) {
          //内层控制当前生成的随机数和前一个数进行比较，重复则重新生成，反之存入新数组
          if (this.numsTrangle[num] == this.numsTrangle[i]) {
            num--;
          }
        }
        idName = "myTrangle" + String(this.numsTrangle[num]);
      }
      //(num);

      ////("33");
      const line = new Konva.RegularPolygon({
        x: x,
        y: y,
        sides: 3,
        radius: 60,
        fill: bgColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        shadowBlur: shadowBlur,
        shadowOffset: { x: shadowOffsetX, y: shadowOffsetY },
        shadowOpacity: 0.5,
        draggable: true,
        shadowColor: shadowColor,
        //closed: trueD
        id: idName
      });

      this.chaneID = line.id();
      const tr = new Konva.Transformer();
      this.layer.add(tr);
      // by default select all shapes
      tr.nodes([line]);
      this.layer.add(line);
      this.stage.add(this.layer);
      this.layer.draw();

      //TODO
      this.x = line.attrs.x;
      this.y = line.attrs.y;
      this.width = Math.round(line.width() * line.scaleX());
      this.height = Math.abs(Math.round(line.height() * line.scaleY()));
      this.color = line.attrs.fill;
      this.color1 = line.attrs.fill;
      this.color2 = line.attrs.stroke;
      this.color3 = line.attrs.shadowColor;
      this.borderWidth = line.attrs.strokeWidth;
      this.x1 = line.attrs.shadowOffsetX;
      this.y1 = line.attrs.shadowOffsetY;
      this.blur = line.attrs.shadowBlur;

      // let params = {
      //   id: parseInt(num),
      //   type: "trangle",
      // };
      // this.arrLayer.push(params);

      let sum =
        this.numsRect.length +
        this.numsCircle.length +
        this.numsStar.length +
        this.numsTrangle.length +
        this.numsText.length;

      //("triangle");
      //(sum);
      let params = {
        id: sum,
        type: "triangle",
        count: parseInt(this.numsTrangle.length),

        ran: this.numsTrangle[this.numsTrangle.length - 1]
      };
      this.arrLayer.push(params);
      this.$refs.layers._data.numItem++;
      line.on("dragmove", event => {
        this.x = Math.round(line.attrs.x);
        this.y = Math.round(line.attrs.y);
        this.width = Math.round(line.width() * line.scaleX());
        this.height = Math.abs(Math.round(line.height() * line.scaleY()));
        this.color = line.attrs.fill;
        this.color1 = line.attrs.fill;
        this.color2 = line.attrs.stroke;
        this.color3 = line.attrs.shadowColor;
        this.borderWidth = line.attrs.strokeWidth;
        this.x1 = line.attrs.shadowOffsetX;
        this.y1 = line.attrs.shadowOffsetY;
        this.blur = line.attrs.shadowBlur;

        this.x = Math.round(line.attrs.x);
        this.y = Math.round(line.attrs.y);
      });

      line.on("transform", event => {
        this.x = Math.round(line.attrs.x);
        this.y = Math.round(line.attrs.y);
        this.width = Math.round(line.width() * line.scaleX());
        this.height = Math.abs(Math.round(line.height() * line.scaleY()));
        this.color = line.attrs.fill;
        this.color1 = line.attrs.fill;
        this.color2 = line.attrs.stroke;
        this.color3 = line.attrs.shadowColor;
        this.borderWidth = line.attrs.strokeWidth;
        this.x1 = line.attrs.shadowOffsetX;
        this.y1 = line.attrs.shadowOffsetY;
        this.blur = line.attrs.shadowBlur;

        this.width = Math.round(line.width() * line.scaleX());
        this.height = Math.abs(Math.round(line.height() * line.scaleY()));
        // //(this.height);
        // //(this.width);
      });

      this.stage.on("click", event => {
        if (
          event.evt.layerX <= this.x - 20 ||
          event.evt.layerX >= this.x + this.width + 20 ||
          event.evt.layerY <= this.y - 20 ||
          event.evt.layerY >= this.y + this.height + 20
        ) {
          tr.enabledAnchors([]);
          tr.rotateEnabled(false);
          tr.ignoreStroke(true);
        }
      });

      line.on("click", event => {
        tr.enabledAnchors([
          "top-left",
          "top-center",
          "top-right",
          "middle-right",
          "middle-left",
          "bottom-left",
          "bottom-center",
          "bottom-right"
        ]);
        tr.rotateEnabled(true);
        this.chaneID = line.id();

        ////(rect.attrs.x);

        this.x = Math.round(line.attrs.x);
        this.y = Math.round(line.attrs.y);
        this.width = Math.round(line.width() * line.scaleX());
        this.height = Math.abs(Math.round(line.height() * line.scaleY()));
        this.color = line.attrs.fill;
        this.color1 = line.attrs.fill;
        this.color2 = line.attrs.stroke;
        this.color3 = line.attrs.shadowColor;
        this.borderWidth = line.attrs.strokeWidth;
        this.x1 = line.attrs.shadowOffsetX;
        this.y1 = line.attrs.shadowOffsetY;
        this.blur = line.attrs.shadowBlur;

        //(line);

        this.change(this.chaneID);
        this.changeColor(this.chaneID);
        this.changeColor1(this.chaneID);
        this.changeColor2(this.chaneID);
        this.Color(this.chaneID);
        this.changeX(this.chaneID);
        this.changeY(this.chaneID);
        this.changeWidth(this.chaneID);
        this.changeBlur(this.chaneID);
      });
    },

    async initialLayers() {
      // console.log("init", this.numsRect);
      this.pageId = this.$route.query.pageId;
      this.projectId = this.$route.query.projectId;
      this.username = this.$route.query.username;
      this.projectName = this.$route.query.projectName;
      await this.$store.dispatch("requestLayers", {
        pageId: this.pageId,
        projectId: this.projectId,
        username: this.username
      });
      // this.arr = this.$store.state.layers;
      // console.log("arr11", this.arr);
      // alert(this.$store.state.layers[0].pageId);
      this.arr = await this.$store.state.layers;
      if (this.arr.length == 0) {
        return;
      }
      console.log("arr22", this.pageId, this.arr);
      //(this.arr);
      this.arrId = await this.$store.state.ids;
      console.log("cjz", this.arrId, this.arrId.length);
      this.test = await this.$store.state.len;
      console.log("emm", this.test);
      // this.arrId.push(this.$store.state.ids);
      // console.log("cjz", this.arrId, this.arrId[0]);

      for (let i = 0; i < this.test; i++) {
        if (this.arrId[i].indexOf("myRect") == 0) {
          console.log("..");
          this.rectId.push(this.arrId[i]);
          this.numsRect.push(this.arrId[i].slice(6));
          console.log("numsRect", this.numsRect);

          //(this.numsRect);
          this.getRectangle(
            this.arr[i].x_co,
            this.arr[i].y_co,
            this.arr[i].width,
            this.arr[i].height,
            this.arr[i].bgColor,
            this.arr[i].borderColor,
            this.arr[i].borderWidth,
            this.arr[i].shadowColor,
            this.arr[i].shadowOffsetX,
            this.arr[i].shadowOffsetY,
            this.arr[i].shadowBlur,
            this.arr[i].layerId
          );
        } else if (this.arrId[i].indexOf("mycircle") == 0) {
          await this.circleId.push(this.arrId[i]);
          await this.numsCircle.push(this.arrId[i].slice(8));
          console.log("numsCircle", this.numsCircle);
          await this.getCircle(
            this.arr[i].x_co,
            this.arr[i].y_co,
            //this.arr[i].width,
            this.arr[i].height,
            this.arr[i].bgColor,
            this.arr[i].borderColor,
            this.arr[i].borderWidth,
            this.arr[i].shadowColor,
            this.arr[i].shadowOffsetX,
            this.arr[i].shadowOffsetY,
            this.arr[i].shadowBlur,
            this.arr[i].layerId
          );
        } else if (this.arrId[i].indexOf("myStar") == 0) {
          await this.starId.push(this.arrId[i]);
          await this.numsStar.push(this.arrId[i].slice(6));
          console.log("numsStar", this.numsStar);
          //(this.numsStar);
          await this.getStar(
            this.arr[i].x_co,
            this.arr[i].y_co,
            this.arr[i].width,
            this.arr[i].height,
            this.arr[i].bgColor,
            this.arr[i].borderColor,
            this.arr[i].borderWidth,
            this.arr[i].shadowColor,
            this.arr[i].shadowOffsetX,
            this.arr[i].shadowOffsetY,
            this.arr[i].shadowBlur,
            this.arr[i].layerId
          );
        } else if (this.arrId[i].indexOf("myTrangle") == 0) {
          await this.tranId.push(this.arrId[i]);
          await this.numsTrangle.push(this.arrId[i].slice(9));
          console.log("numsTrangle", this.numsTrangle);
          await this.getTrangle(
            this.arr[i].x_co,
            this.arr[i].y_co,
            this.arr[i].width,
            this.arr[i].height,
            this.arr[i].bgColor,
            this.arr[i].borderColor,
            this.arr[i].borderWidth,
            this.arr[i].shadowColor,
            this.arr[i].shadowOffsetX,
            this.arr[i].shadowOffsetY,
            this.arr[i].shadowBlur,
            this.arr[i].layerId
          );
        }
        //(this.numsStar.length);
      }
    }
  },

  mounted() {
    this.stage = new Konva.Stage({
      container: "container", // id of container <div>
      width: 1274,
      height: 1000
    });
    var tween;
    // this.$store.dispatch('reqrequestLayers')
    this.initialLayers();
    this.layer = new Konva.Layer();
  }
};
</script>