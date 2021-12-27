import { Sequelize } from "sequelize";
import { Users } from "../model/user";

export class UsersController{
    async SignIn(payload){
        return await Users.findAll({
            where: {
                username: payload.username
            }
        })
    }

    async SignUp(payload){
        let user = await Users.findAll({
            where: {
                username: payload.username
            }
        });
        if (user.length == 0){
            await Users.update(
                {
                    username: payload.username,
                    password: payload.password,
                }
            )
            return true;
        }else {
            return false
        }
    }
}