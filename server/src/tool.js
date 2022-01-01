import jwt from "jsonwebtoken"


const expireTime = '30s';
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
        if(nowtime >= decoded.payload.exp){
            throw("timeout1");
        }
        return decoded.payload.user;

    }
    
}