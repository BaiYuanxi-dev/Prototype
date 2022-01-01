import {
    Sequelize
} from "sequelize";
import {
    Users
} from "../model/user";

//引入jwt做token验证
import jwt from "jsonwebtoken";
// const jwt = require('jsonwebtoken')

//解析token
import {
    tools
} from "../tool";
// const tools = require('../public/tool')

//统一设置token有效时间  为了方便观察，设为10s
const expireTime = '10s'

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
            token = jwt.sign({
                user: payload.username,
                passWord: payload.password
            }, '123456', {
                expiresIn: expireTime
            });
        }
        let params = {
            state: state,
            token: token,
        }

        // const token = jwt.sign({ id: payload.username }, config.secret, {
        //     expiresIn: 60, // 24 hours
        //   });

        //   let authorities = [];
        //   const roles = await user.getRoles();
        //   for (let i = 0; i < roles.length; i++) {
        //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
        //   }

        //   req.session.token = token;

        //   let params = {
        //     state: state,
        //     token: token,
        // }
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