import { Sequelize } from "sequelize";
import { Users } from "../model/user";

export class UsersController{
    SignIn(payload){
        return Users.findAll({
            where: {
                username: payload.username
            }
        })
    }

    async SignUp(payload){
        const user = await Users.findAll({
            where: {
                username: payload.username
            }
        });
        
        // return {"length": user.length};
        if (user.length == 0){
            await Users.create(
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