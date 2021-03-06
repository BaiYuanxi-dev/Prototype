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
        try: 0,
        login: 401,
        regist: 401,
        len: 0,
        timeout: "ok",
        // 存储token
        token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
    },
    mutations: {
        timeout(state, message) {
            state.message = message;
            if(state.message != "ok"){
                localStorage.clear();
            }  else {
                // alert("timeout!");
            }
        },

        // 修改token，并将token存入localStorage
        changeLogin(state, user) {
            state.token = user.token;
            localStorage.setItem('token', user.token);
        },

        setLogin(state, value) {
            const message = value.message;

            // const token = value.token;
            if (message == "ok") {
                state.login = 200;
                state.token = value.data.token;
                // console.log(state.token);
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
                if (state.dataImageList[i].updatedAt == null) {
                    state.dataImageList[i].updatedAt = "时间未记录"
                } else {
                    state.dataImageList[i].updatedAt = moment(state.dataImageList[i].updatedAt).format('YYYY-MM-DD HH:mm:ss')
                }
                if (state.dataImageList[i].desc == "") {
                    state.dataImageList[i].desc = "简介"
                }
            }
        },
        addData(state, newData) {
            if (newData.createdAt == null) {
                newData.createdAt = "时间未记录"
            } else {
                newData.createdAt = moment(newData.createdAt).format('YYYY-MM-DD HH:mm:ss')
            }
            if (newData.updatedAt == null) {
                newData.updatedAt = "时间未记录"
            } else {
                newData.updatedAt = moment(newData.updatedAt).format('YYYY-MM-DD HH:mm:ss')
            }
            state.dataImageList.splice(0, 0, newData);
        },
        changeData(state, changeData) {
            for (let i = 0; i < state.dataImageList.length; i++) {
                if (state.dataImageList[i].id == changeData.id) {
                    if (changeData.createdAt == null) {
                        changeData.createdAt = "时间未记录"
                    } else {
                        changeData.createdAt = moment(changeData.createdAt).format('YYYY-MM-DD HH:mm:ss')
                    }
                    if (changeData.updatedAt == null) {
                        changeData.updatedAt = "时间未记录"
                    } else {
                        changeData.updatedAt = moment(changeData.updatedAt).format('YYYY-MM-DD HH:mm:ss')
                    }
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
            for (let i = 0; i < state.pagesList.length; i++) {
                if (state.pagesList[i].pageId == value.pageId) {
                    state.pagesList.splice(i, 1, value);
                }
            }
        },


        async setLayers(state, value) {
            for (let i = 0; i < value.data.length; i++) {
                await state.layers.push(value.data[i]);
            }
            state.len = value.ids.length;
            console.log("nmsl", state.len)
            for (let i = 0; i < state.len; i++) {

                await state.ids.push(value.ids[i].layerId);
            }
        },
    },
    actions: {
        async login(context, payload) {
            let value = await reqInstance.post('/sign/login', {
                username: payload.username,
                password: payload.password
            });
            // console.log(value);
            context.commit('setLogin', value);
        },

        async regist(context, payload) {
            let value = await reqInstance.post('/sign/regist', {
                username: payload.username,
                password: payload.password
            });
            context.commit('setRegist', value.message);
        },

        /**
         * 请求所有project
         * wayoforder：排序方式
         * value: 服务器返回的值
         */
        async requestProjects(context, payload) {
            let value = await reqInstance.post('/projects/getall', {
                username: payload.username,
                wayOfOrder: payload.wayOfOrder,
            });
            // console.log(value.message);
            if (value.message == "ok") {
                context.commit('setProjects', value.data); //设置页面要显示的内容
            }
            // context.commit('timeout', value.message);
        },

        /**增加project */
        async addProjects(context, payload) {
            let addMsg = await reqInstance.post('/projects', {
                username: payload.username,
                title: payload.title,
                desc: payload.desc,
                img: payload.img
            });
            if (addMsg.message == "ok") {
                context.commit('addData', addMsg.data[0]);
            }
            context.commit('timeout', addMsg.message);
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
            console.log("update pro ",value.message)
            // context.commit('timeout', value.message);
            
        },

        /**删除project */
        async deleteProjects(context, payload) {
            const value = await reqInstance.delete(`/projects/${payload.id}`);
            console.log("del pro ",value.message)
            // context.commit('timeout', value.message);
        },


        /**
         * 请求该页面的所有page
         */
        async requestPages(context, payload) {
            const value = await reqInstance.post('/pages', {
                id: payload.id
            });
            // console.log("message", value.message);
            // console.log("value", value.data);
            if (value.message == "ok") {
                await context.commit('setPages', value); //设置页面要显示的内容
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
            // context.commit('timeout', value.message);
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
            // context.commit('timeout', value.message);
        },

        
        async deletePage(context, payload) {
            // console.log("delete", payload.pageId, payload.projectId);
            const value = await reqInstance.post(`/pages/deletePage`, {
                pageId: payload.pageId,
                projectId: payload.projectId,
            });
            // context.commit('timeout', value.message);
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
            // console.log(payload);
            let value = await reqInstance.post('/layers/addGraph', {
                pageId: payload.pageId,
                projectId: payload.projectId,
                rect: payload.arr,
                username: payload.username,
            });
            // context.commit('timeout', value.message);
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