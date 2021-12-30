import KoaRouter from 'koa-router';
import { PagesController } from '../controllers/pages';
import { ProjectsController } from '../controllers/projects';
const pageRoute = new KoaRouter({
    prefix: '/api/pages'
});


//初始化：发送项目的页信息
pageRoute.post('/', async function (ctx) {
    const payload = ctx.request.body;
    const data = await new PagesController().pages(payload.id);
    ctx.body = {
        data,
        message: 'ok'
    };
});


//根据
// pageRoute.post('/getPage', async function(ctx){
//     const payload = ctx.request.body;
//     const data = await new PagesController().pagesChoose(payload);
//     ctx.body = {
//         data,
//         message:'ok'
//     };
// });

// 新建页， 返回 该项目所有页
pageRoute.post('/add', async function(ctx) {
    const payload = ctx.request.body;
    const msg = await new PagesController().createPages(payload);
    ctx.body = {
        data: msg,
        message: 'ok'
    };
});

//更新项目数据
pageRoute.post('/update', async function(ctx) {
    // const id = Number(ctx.params.id);
    const payload = ctx.request.body;
    if (isNaN(payload.pageId)) {
        ctx.statusCode = 400;
        ctx.body = {
            message: 'id must be number',
        };
    } else { 
        const data = await new PagesController().updatePages(payload);
        ctx.body = {
            data,
            message: 'ok'
        }
    }
});

//删除
pageRoute.post('/deletePage', async function(ctx) {
    const payload = ctx.request.body;
    const id = payload.pageId;
    if (isNaN(id)) {
        ctx.statusCode = 400;
        ctx.body = {
            message: 'id must be number',
        };
    } else {
        await new PagesController().deletePages(payload);
        ctx.body = {
            message: 'ok'
        }
    }
});


export {
    pageRoute
}
