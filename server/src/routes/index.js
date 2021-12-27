import combineRouters from 'koa-combine-routers';
import {
    projectRoute
} from './projects.js';
import {
    pageRoute
} from './pages.js';
import {
    layerRoute
} from './layers.js';
import {
    userRoute
} from './users.js';
const router = combineRouters(projectRoute, pageRoute, layerRoute, userRoute);


export default router;