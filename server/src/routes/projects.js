import KoaRouter from 'koa-router';
import {ProjectsController} from '../controllers/projects';
const projectRoute = new KoaRouter({
    prefix: '/api/projects'
});

// //初始化：发送一页的信息：不能是所有的除非不够一页
// projectRoute.get('/', async function (ctx) {
//     const data = await new ProjectsController().projects();
//     ctx.body = {
//         data,
//         message: 'ok'
//     };
// });


//根据发送来的排序方式 返回排序后的数据给前端
projectRoute.post('/try', async function(ctx){
    const payload = ctx.request.body;
    const data = await new ProjectsController().projectsChoose(payload);
    ctx.body = {
        data,
        message:'ok'
    };
});

//新建项目命令
projectRoute.post('/', async function(ctx) {
    const payload = ctx.request.body;
    const id = await new ProjectsController().createProjects(payload);
    ctx.body = {
        data: id,
        message: 'ok'
    };
});

//更新项目数据
projectRoute.post('/update', async function(ctx) {
    // const id = Number(ctx.params.id);
    const payload = ctx.request.body;
    const id = Number(payload.id)
    if (isNaN(id)) {
        ctx.statusCode = 400;
        ctx.body = {
            message: 'id must be number',
        };
    } else {
        const data = await new ProjectsController().updateProjects(payload);
        ctx.body = {
            data,
            message: 'ok'
        }
    }
});


//更新项目正文数据
projectRoute.post('/updateText', async function(ctx) {
    // const id = Number(ctx.params.id);
    const payload = ctx.request.body;
    const id = Number(payload.id)
    if (isNaN(id)) {
        ctx.statusCode = 400;
        ctx.body = {
            message: 'id must be number',
        };
    } else {
        const data = await new ProjectsController().updateText(payload);
        ctx.body = {
            data,
            message: 'ok'
        }
    }
});


//删除
projectRoute.delete('/:id', async function(ctx) {
    const id = Number(ctx.params.id);
    if (isNaN(id)) {
        ctx.statusCode = 400;
        ctx.body = {
            message: 'id must be number',
        };
    } else {
        await new ProjectsController().deleteProjects(id);
        ctx.body = {
            message: 'ok'
        }
    }
});


export {
    projectRoute
}
