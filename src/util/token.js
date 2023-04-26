const jwt = require('jsonwebtoken');

const checktoken = async (token, id, key)=> jwt.verify(token, key, (err, decoded)=>{
    /*tem que testar se esse id e key (nick) foram mesmo usados pra criar esse token*/
});

const setToken = async(id, key)=>{
    console.log(id);
    if(id){
        return jwt.sign({id}, key, {expiresIn: 28800});
    }
    return false;
};

module.exports = {
    checktoken,
    setToken
}