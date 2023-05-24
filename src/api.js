var express = require("express");
var app = express();
const usuarioController = require('./controllers/usuarioController');
const salaController = require('./controllers/salaController');
const token = require("./util/token");
app.use(express.urlencoded({extended : true}));
app.use(express.json());
let nickAtual, tokenAtual, idAtual;

const router = express.Router();
app.use('/', router.get('/', (req, res, next) => {
    res.status(200).send("<h1>API - CHAT<h1>");
}));

app.use("/",router.get("/sobre", (req, res, next) => {
    res.status(200).send({
        "nome":"API - CHAT",
        "versão":"0.1.0",
        "autor":"Ana"
    });
}));

app.use('/entrar',router.post('/entrar',async(req, res, next)=>{
    let resp = await usuarioController.entrar(req.body.nick);
    nickAtual = resp.nick;
    tokenAtual = resp.token;
    idAtual = resp.idUser;
    res.status(200).send(resp);
}));

app.use("/salas",router.get("/salas/listar", async (req, res, next) => {
    req.headers.nick = nickAtual;
    req.headers.token = tokenAtual;
    req.headers.iduser = idAtual;
    console.log(req.headers)
    if(await token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
    {
        let resp = await salaController.get();
        res.status(200).send("vo lista os negocio pra tu: "+resp);
    }else{
        res.status(400).send({msg:"Usuário não autorizado"});
    }
}))

app.use('/salas/entrar',router.get('/salas/entrar', async(req, res)=>{
    req.headers.nick = nickAtual;
    req.headers.token = tokenAtual;
    req.headers.iduser = idAtual;
    if(await token.checktoken(req.headers.token, req.headers.iduser, req.headers.nick))
    {
        let resp = await salaController.entrar(req.headers.iduser, req.query.idsala);
        res.status(200).send("pode entra mlk: "+JSON.stringify(resp));
    }else{
        res.status(400).send({msg:"Usuário não autorizado"});
    }
        
    
}));

app.use("/salas/mensagem", router.post("/salas/mensagem", async (req, res) => {
    if(!token.checktoken(req.headers.token,req.headers.iduser,req.headers.nick))
    return false;
    let resp = await salaController.enviarMensagem(req.headers.nick,req.body.msg,req.body.idSala);
    res.status(200).send(resp);
}))

module.exports=app;