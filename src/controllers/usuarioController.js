const token = require("../util/token");
const usuarioModel = require("../models/usuarioModel");

exports.entrar = async (nick) => {
    let resp = await usuarioModel.registrarUsuario(nick);
    if(resp.insertedId){
        return {
            "idUser":resp.insertedId,
            "token": await token.setToken(JSON.stringify(resp.insertedId).replace(/"/g,''),nick),
            "nick":nick
        }
    }
}

const db = require('./db');
async function registrarUsuario(nick){
    return await db.insertOne('usuario',{"nick":nick});
}

module.exports = {registrarUsuario};