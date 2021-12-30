import {
    Sequelize
} from "sequelize";
import {
    Layers
} from "../model/layers";
// import {
//     Layers_pages
// } from "../model/layers_pages";

// var pageId;
export class LayersController {
    async layers() {
        return await this.layers.findAll();
    }

    async initialLayers(payload) {
        const layers = await Layers.findAll({
            where: {
                pageId: payload.pageId,
                projectId: payload.projectId,
            }   
        })
        // const data = await Layers_pages.findAll({
        //     where: {
        //         pageId: payload.pageId,
        //         projectId: payload.projectId,
        //     }
        // });
        // let layers = [];
        // for (let i = 0; i < data.length; i++) {
        //     layers.push(await Layers.findAll({
        //         where: {
        //             layerId: data[i].layerId,
        //         }
        //     }))
        // }

        return layers;
    }

    async getIds(payload) {
        const data = await Layers.findAll({
            attributes: ['layerId'],
            where: {
                pageId: payload.pageId,
                projectId:payload.projectId
            }
        });
    
        return data;
    }



    deleteAll(payload){
        Layers.destroy({
            where: {
                pageId: payload.pageId,
                projectId:payload.projectId,
            }
        });
    }
    // 添加新的图形
    addGraph(payload) {
        
        // for(let i = 0; i < payload.rect.length; i++){
        //     const newLayer_pages = Layers_pages.create({
        //         pageId : payload.pageId,
        //         layerId: payload.rect[i].layerId,
        //     });
        // }
        for (let i = 0; i < payload.rect.length; i++) {
            const newLayer = Layers.create({
                layerId: payload.rect[i].layerId,
                pageId: payload.pageId,
                projectId: payload.projectId,
                username:payload.username,
                bgColor: payload.rect[i].bgColor,
                borderColor: payload.rect[i].borderColor,
                borderWidth: payload.rect[i].borderWidth,
                height: payload.rect[i].height,
                shadowBlur: payload.rect[i].shadowBlur,
                shadowColor: payload.rect[i].shadowColor,
                shadowOffsetX: payload.rect[i].shadowOffsetX,
                shadowOffsetY: payload.rect[i].shadowOffsetY,
                width: payload.rect[i].width,
                x_co: payload.rect[i].x_co,
                y_co: payload.rect[i].y_co,
            });
        }
    }

    // 添加新的文字
    async addText(payload) {
        const newLayer = await Layers.create({
            layerId: payload.layerId,
            bgColor: payload.bgColor,
            borderColor: payload.borderColor,
            borderWidth: payload.rect[i].borderWidth,
            height: payload.height,
            shadowBlur: payload.shadowBlur,
            shadowColor: payload.shadowColor,
            shadowOffsetX: payload.shadowOffsetX,
            shadowOffsetY: payload.shadowOffsetY,
            width: payload.width,
            x_co: payload.x_co,
            y_co: payload.y_co,
            
        });
    }

    // 删除指定图层
    async deleteLayer(layerId) {
        await this.layers.destroy({
            where: {
                LayerId
            }
        });
    }

    // 更新指定图形
    async updateGraph(layerId, payload) {
        await Layers.update({
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
        }, {
            where: {
                layerId
            }
        });
    }

    // 更新指定文字
    async updateText(layerId, payload) {
        await Layers.update({
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
            borderWidth: payload.borderColor,
        }, {
            where: {
                layerId
            }
        });
    }
}