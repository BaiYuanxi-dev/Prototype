import KoaRouter from 'koa-router';
import {
    UsersController
} from '../controllers/users';
const userRoute = new KoaRouter({
    prefix: '/api/sign'
});

userRoute.post('/login', async function (ctx) {
    const payload = ctx.request.body;
    const params = await new UsersController().SignIn(payload);
    ctx.body = {
        data: params,
        message: params.state,
    }
});

userRoute.post('/regist', async function (ctx) {
    const payload = ctx.request.body;
    const state = await new UsersController().SignUp(payload);

    if (state) {
        ctx.body = {
            data: state,
            message: 'ok',
        }
    } else {
        ctx.body = {
            data: state,
            message: 'exist username',
        }
    }
})


export {
    userRoute
}