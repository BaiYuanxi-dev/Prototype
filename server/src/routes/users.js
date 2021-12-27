import KoaRouter from 'koa-router';
import {UsersController} from '../controllers/users';
const userRoute = new KoaRouter({
    prefix: '/api/sign'
});

userRoute.post('/login', async function(ctx){
    const payload = ctx.request.body;
    const state = await new UsersController().SignIn(payload);
    if(state.length == 0){
        ctx.body = {
            message:'wrong username',
        }
    } else if(state[0].password != payload.password){
        ctx.body = {
            message:'wrong password',
        }
    } else {
        ctx.body = {
            message:'ok',
        }
    }
});

userRoute.post('/regist', async function(ctx){
    const payload = ctx.request.body;
    const state = await new UsersController().SignUp(payload);
})

export {
    userRoute
}