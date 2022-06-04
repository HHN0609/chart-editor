const jwt = require("jsonwebtoken");
const config = require("./config");

const secretkey = config.express.secretkey;
const tokenSignOptions = {
    expiresIn:'30s',
};
const signToken = (paylod) => {
    return jwt.sign(paylod, secretkey, tokenSignOptions);
};
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