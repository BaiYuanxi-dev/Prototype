//前后端连接数据交互

import Vue from 'vue';
import Vuex from 'vuex';
import {
    reqInstance
} from '../request/config';
import moment from 'moment'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        projects: [],
        dataImageList: [],
        pagesList: [],
        layers: [],
        ids: [],
        login: 401,
        regist: 401,
        // 存储token
        token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
    },
    mutations: {
        // 修改token，并将token存入localStorage
        changeLogin(state, user) {
            state.token = user.token;
            localStorage.setItem('token', user.token);
        },

        setLogin(state, message) {

            if (message == "ok") {
                state.login = 200;
            } else if (message == "wrong username") {
                state.login = 401;
            } else if (message == "wrong password") {
                state.login = 402;
            }

        },
        setRegist(state, message) {
            if (message == "ok") {
                state.regist = 200;
            } else if (message == "exist username") {
                state.regist = 401;
            }
        },


        setProjects(state, dataImageList) {
            state.dataImageList = dataImageList;
            for (let i = 0; i < state.dataImageList.length; i++) {
                // state.dataImageList[i].img = require('../assets/img/' + state.dataImageList[i].img);
                let str = "require(\"" + state.dataImageList[i].img + "\")";
                if (state.dataImageList[i].createdAt == null) {
                    state.dataImageList[i].createdAt = "时间未记录"
                } else {
                    state.dataImageList[i].createdAt = moment(state.dataImageList[i].createdAt).format('YYYY-MM-DD HH:mm:ss')
                }

                if (state.dataImageList[i].desc == "") {
                    state.dataImageList[i].desc = "简介"
                }
            }
        },
        addData(state, newData) {
            state.dataImageList.splice(0, 0, newData);
        },
        changeData(state, changeData) {
            for (let i = 0; i < state.dataImageList.length; i++) {
                if (state.dataImageList[i].id == changeData.id) {
                    state.dataImageList.splice(i, 1, changeData);
                }
            }
        },

        setPages(state, value) {
            state.pagesList = value.data;
            for (let i = 0; i < state.pagesList.length; i++) {
                // state.dataImageList[i].img = require('../assets/img/' + state.dataImageList[i].img);
                if (state.pagesList[i].createdAt == null) {
                    state.pagesList[i].createdAt = "时间未记录"
                } else {
                    state.pagesList[i].createdAt = moment(state.pagesList[i].createdAt).format('YYYY-MM-DD HH:mm:ss')
                }
                if (state.pagesList[i].updatedAt == null) {
                    state.pagesList[i].updatedAt = "时间未记录"
                } else {
                    state.pagesList[i].updatedAt = moment(state.pagesList[i].updatedAt).format('YYYY-MM-DD HH:mm:ss')
                }
            }
            // state.text = value.text[0].text;
        },
        addPage(state, value) {
            if (value.createdAt == null) {
                value.createdAt = "时间未记录"
            } else {
                value.createdAt = moment(value.createdAt).format('YYYY-MM-DD HH:mm:ss')
            }
            if (value.updatedAt == null) {
                value.updatedAt = "时间未记录"
            } else {
                value.updatedAt = moment(value.updatedAt).format('YYYY-MM-DD HH:mm:ss')
            }
            state.pagesList.push(value);
        },
        changePage(state, value) {
            for (let i = 0; i < state.pagesList.length; i++) {
                if (state.pagesList[i].pageId == value.pageId) {
                    state.pagesList.splice(i, 1, value);
                }
            }
        },


        setLayers(state, value) {
            // state.layers = layers;
            console.log(value.data);
            // console.log(value.ids);
            let len = value.data.length;
            for (let i = 0; i < len; i++) {
                state.layers.push(value.data[i]);
            }
            len = value.ids.length;
            for (let i = 0; i < len; i++) {
                state.ids.push(value.ids[i].layerId);
            }
            console.log(state.ids);
        },
    },
    actions: {
        async login(context, payload) {
            let value = await reqInstance.post('/sign/login', {
                username: payload.username,
                password: payload.password
            });

            context.commit('setLogin', value.message);
        },

        async regist(context, payload) {
            let value = await reqInstance.post('/sign/regist', {
                username: payload.username,
                password: payload.password
            });
            context.commit('setRegist', value.message);
        },
        //请求所有project
        async requestProjects(context, payload) {
            /**
             * wayoforder：排序方式
             * value: 服务器返回的值
             */
            let value = await reqInstance.post('/projects/getall', {
                username: payload.username,
                wayOfOrder: payload.wayOfOrder,
            });
            if (value.message == "ok") {
                context.commit('setProjects', value.data); //设置页面要显示的内容
            }
        },

        /**增加project */
        async addProjects(context, payload) {
            let addMsg = await reqInstance.post('/projects', {
                title: payload.title,
                desc: payload.desc,
                img: payload.img
            });
            if (addMsg.message == "ok") {
                context.commit('addData', addMsg.data[0]);
            }

        },

        /**更新project 包括图片，描述，标题 */
        async updateProjects(context, payload) {
            const value = await reqInstance.post(`/projects/update`, {
                id: payload.id,
                title: payload.title,
                desc: payload.desc,
                img: payload.img,
            });
            if (value.message == "ok") {
                context.commit('changeData', value.data[0]);
            }
        },

        /**删除project */
        async deleteProjects(context, payload) {
            await reqInstance.delete(`/projects/${payload.id}`);
        },



        /**
         * 请求该页面的所有page
         */
        async requestPages(context, payload) {
            const value = await reqInstance.post('/pages', {
                id: payload.id
            });
            if (value.message == "ok") {
                context.commit('setPages', value); //设置页面要显示的内容
            }

        },
        async addPages(context, payload) {
            const value = await reqInstance.post('/pages/add', {
                pageId: payload.pageId,
                pageText: payload.pageText,
                projectId: payload.projectId
            });
            if (value.message == "ok") {
                context.commit('addPage', value.data[value.data.length - 1]);
            }
        },
        async updatePage(context, payload) {
            const value = await reqInstance.post(`/pages/update`, {
                pageId: payload.pageId,
                pageText: payload.pageText,
                projectId: payload.projectId,
            });
            if (value.message == "ok") {
                context.commit('changePage', value.data[0]);
            }

        },
        async deletePage(context, payload) {
            console.log("delete", payload.pageId, payload.projectId);
            const value = await reqInstance.post(`/pages/deletePage`, {
                pageId: payload.pageId,
                projectId: payload.projectId,
            });
        },





        async requestLayers(context, payload) {
            let value = await reqInstance.post(`/layers/getLayer`, {
                pageId: payload.pageId,
                projectId: payload.projectId,
                username: payload.username,
            });
            await context.commit('setLayers', value);
        },



        async addGraph(context, payload) {
            console.log(payload);
            await reqInstance.post('/layers/addGraph', {
                pageId: payload.pageId,
                projectId: payload.projectId,
                rect: payload.arr
            });
        },

        async addText(context, payload) {
            await reqInstance.post('/layers/addText', {
                layerId: payload.layerId,
                bgColor: payload.bgColor,
                borderColor: payload.borderColor,
                height: payload.height,
                shadowBlur: payload.shadowBlur,
                shadowColor: payload.shadowColor,
                shadowOffsetX: payload.shadowOffsetX,
                shadowOffsetY: payload.shadowOffsetY,
                width: payload.width,
                x_co: payload.x_co,
                y_co: payload.y_co,
                text: payload.text,
                align: payload.align,
                borderColor: payload.borderColor,
                borderWidth: payload.borderColor
            });
        },

        async deleteLayer(context, payload) {
            await reqInstance.delete(`/layers/${payload.layerId}`);
        },

        async updateGraph(context, payload) {
            await reqInstance.put(`/layers/updateGraph/${payload.layerId}`, {
                bgColor: payload.bgColor,
                borderColor: payload.borderColor,
                height: payload.height,
                shadowBlur: payload.shadowBlur,
                shadowColor: payload.shadowColor,
                shadowOffsetX: payload.shadowOffsetX,
                shadowOffsetY: payload.shadowOffsetY,
                width: payload.width,
                x_co: payload.x_co,
                y_co: payload.y_co
            });
        },

        async updateText(context, payload) {
            await reqInstance, put(`/layers/updateText/${payload.layerId}`, {
                bgColor: payload.bgColor,
                borderColor: payload.borderColor,
                height: payload.height,
                shadowBlur: payload.shadowBlur,
                shadowColor: payload.shadowColor,
                shadowOffsetX: payload.shadowOffsetX,
                shadowOffsetY: payload.shadowOffsetY,
                width: payload.width,
                x_co: payload.x_co,
                y_co: payload.y_co,
                text: payload.text,
                align: payload.align,
                borderColor: payload.borderColor,
                borderWidth: payload.borderColor
            });
        },
    }
})