const jwt = require("jsonwebtoken");
const config = require("./config");

const secretkey = config.express.secretkey;
const tokenSignOptions = {
    expiresIn:'30s',
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

module.exports = {
    signToken,
    verifyToken
}