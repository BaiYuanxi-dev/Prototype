import {
    Sequelize
} from "sequelize";
import {
    Users
} from "../model/user";

//引入jwt做token验证
import jwt from "jsonwebtoken";
import { tools } from "../tool";

//统一设置token有效时间  为了方便观察，设为10s
const expireTime = '4h';

export class UsersController {
    async SignIn(payload) {

        const user = await Users.findAll({
            where: {
                username: payload.username
            }
        });
        let state = ''
        let token = "";
        if (user.length == 0) {
            state = 'wrong username';
        } else if (user[0].password != payload.password) {
            state = 'wrong password';
        } else {
            state = 'ok';
            token = new tools().tokenSet(payload.username, payload.password);
            
        }
        let params = {
            state: state,
            token: token,
        }
        return params;
    }

    async SignUp(payload) {
        const user = await Users.findAll({
            where: {
                username: payload.username
            }
        });

        // return {"length": user.length};
        if (user.length == 0) {
            await Users.create({
                username: payload.username,
                password: payload.password,
            })
            return true;
        } else {
            return false
        }
    }

    
}