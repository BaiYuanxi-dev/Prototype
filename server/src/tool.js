// const getToken = require('jsonwebtoken')

import getToken from "jsonwebtoken"

async function tools(token) {
    return new Promise((resolve, rejece) => {
        const info = getToken.verify(token.split(' ')[1], "123456");
        resolve(info);
    })
}

export {
    tools
}