const jwt = require('jsonwebtoken');

/*tem que testar se esse id e key (nick) foram mesmo usados pra criar esse token*/

const checktoken = async (token, id, key)=> {
    console.log("token: "+token)
    console.log("id: "+id)
    console.log("key: "+key)
    try {
        const decoded = jwt.verify(token, key);
        if (decoded.id == id) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log("Erro em checktoken: " + e);
        return false;
    }
};

const setToken = async(id, key)=>{
    console.log("id do settoken: "+id);
    if(id){
        console.log("set token foi");
        return jwt.sign({id}, key, {expiresIn: 28800});
    }
    console.log("set token nao foi")
    return false;
};

module.exports = {
    checktoken,
    setToken
}