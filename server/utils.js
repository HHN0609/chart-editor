const jwt = require("jsonwebtoken");
const config = require("./config");

const secretkey = config.express.secretkey;
const tokenSignOptions = {
    expiresIn:'3600s',
};
/**
 * 签发一个token
 * @param {string | object | Buffer} paylod 用户自定义的payload
 * @returns {string}
 */
const signToken = (paylod) => {
    return jwt.sign(paylod, secretkey, tokenSignOptions);
};

/**
 * 验证token是否有效，有效就返回解析出来的结果，无效返回false
 * @param {string} token 
 * @returns {object | false}
 */
const verifyToken = (token) => {
    try {
        const res = jwt.verify(token, secretkey);
        return res;
    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 * generateUUID 生成UUID
 * @returns {string} 返回字符串
 */
 function generateUUID(){
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
}

module.exports = {
    signToken,
    verifyToken,
    generateUUID
}