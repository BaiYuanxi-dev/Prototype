import jwt, { decode } from "jsonwebtoken"


const expireTime = '80s';
export class tools {
    tokenSet(username, password){
        const token = jwt.sign({
            user: username,
            passWord: password
        }, '123456', {
            expiresIn: expireTime,
            algorithm: 'HS256',
        });
        return token;

    }

    //成功返回message，失败抛出异常
    verToken(token){
        const decoded = jwt.decode(token, {complete: true});
        const nowtime = Date.parse(new Date())/1000;
        let param = {
            message: "",
            nowtime: nowtime,
            endtime: decode.exp,
        }
        if(nowtime >= decoded.payload.exp){
            return "timeout";
        }
        return "ok";

    }
    
}