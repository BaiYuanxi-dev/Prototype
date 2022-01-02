import KoaRouter from 'koa-router';
import {
    ProjectsController
} from '../controllers/projects';
import {
    tools
} from "../tool";


const projectRoute = new KoaRouter({
    prefix: '/api/projects'
});


//根据发送来的排序方式 返回排序后的数据给前端
projectRoute.post('/getall', async function (ctx) {
    const payload = ctx.request.body;
    const token = ctx.headers.token;
    const data = await new ProjectsController().projectsChoose(payload);
    ctx.body = {
        data,
        message: "ok",
    };
    // if (token != null) {
    //     try {
    //         let result = new tools().verToken(token);
    //         const data = await new ProjectsController().projectsChoose(payload);
    //         ctx.body = {
    //             data,
    //             message: "ok",
    //         };
    //     } catch (error) {
    //         ctx.body = {
    //             message: error,
    //         }
    //     }
    // } else {
    //     ctx.body = {
    //         message: 'timeout2',
    //     }
    // }

});

//新建项目命令
projectRoute.post('/', async function (ctx) {
    const payload = ctx.request.body;
    const token = ctx.headers.token;

    // const id = await new ProjectsController().createProjects(payload);
    // ctx.body = {
    //     data: id,
    //     message: 'ok'
    // };
    if (token != null) {
        try {
            let result = new tools().verToken(token);
            const id = await new ProjectsController().createProjects(payload);
            ctx.body = {
                data: id,
                message: 'ok'
            };
        } catch (error) {
            ctx.body = {
                message: error,
            }
        }
    } else {
        ctx.body = {
            message: 'timeout2',
        }
    }

});

//更新项目数据
projectRoute.post('/update', async function (ctx) {
    // const id = Number(ctx.params.id);
    const payload = ctx.request.body;
    const token = ctx.headers.token;


    // const data = await new ProjectsController().updateProjects(payload);
    // ctx.body = {
    //     data,
    //     message: 'ok'
    // }
    if (token != null) {
        try {
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
        } catch (error) {
            ctx.body = {
                message: error,
            }
        }
    } else {
        ctx.body = {
            message: 'timeout2',
        }
    }

});





//删除
projectRoute.delete('/:id', async function (ctx) {
    const id = Number(ctx.params.id);

    const token = ctx.headers.token;
    if (isNaN(id)) {
        ctx.statusCode = 400;
        ctx.body = {
            message: 'id must be number',
        };
    } else {
        if (token != null) {
            try {
                const id = Number(payload.id)
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
            } catch (error) {
                ctx.body = {
                    message: error,
                }
            }
        } else {
            ctx.body = {
                message: 'timeout2',
            }
        }

    }
});


export {
    projectRoute
}