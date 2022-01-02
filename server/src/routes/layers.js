import KoaRouter from 'koa-router';
import {
    LayersController
} from '../controllers/layers';
import {
    tools
} from "../tool";

const layerRoute = new KoaRouter({
    prefix: '/api/layers'
});


// 获取指定页面的所有图层
layerRoute.post('/getLayer', async function (ctx) {
    const payload = ctx.request.body;
    // const pageId = Number(ctx.params.pageId);
    const data = await new LayersController().initialLayers(payload);
    const ids = await new LayersController().getIds(payload);
    ctx.body = {
        data,
        ids,
        message: 'ok'
    }
})



// 添加图形图层
layerRoute.post('/addGraph', async function (ctx) {
    const payload = ctx.request.body;
    new LayersController().deleteAll(payload);
    new LayersController().addGraph(payload);
    ctx.body = {
        message: 'ok'
    };

});

// 添加文字图层
layerRoute.post('/addText', async function (ctx) {
    const payload = ctx.request.body;
    console.log(payload)
    const id =  await new LayersController().addGraph(payload);
    ctx.body = {
        message: 'ok'
    };
});

// 删除指定图层
layerRoute.delete('/:layerId', async function (ctx) {
    const layerId = Number(ctx.params.layerId);
    if (isNaN(layerId)) {
        ctx.statusCode = 400;
        ctx.body = {
            message: 'layerId must be string',
        };
    } else {
        await new LayersController().deleteLayer(layerId);
        ctx.body = {
            message: 'ok'
        }
    }

});

// 更新指定图形
layerRoute.put('/updateGraph/:layerId', async function (ctx) {
    const layerId = String(ctx.params.layerId);
    const payload = ctx.request.body;
    if (isNaN(layerId)) {
        ctx.statusCode = 400;
        ctx.body = {
            message: 'layerId must be string',
        };
    } else {
        await new LayersController().updateGraph(layerId, payload);
        ctx.body = {
            message: 'ok'
        }
    }
});

// 更新指定文字
layerRoute.put('/updateText/:layerId', async function (ctx) {
    const layerId = String(ctx.params.layerId);
    const payload = ctx.request.body;
    if (isNaN(layerId)) {
        ctx.statusCode = 400;
        ctx.body = {
            message: 'layerId must be string',
        };
    } else {
        await new LayersController().updateText(layerId, payload);
        ctx.body = {
            message: 'ok'
        }
    }
});

export {
    layerRoute
}
