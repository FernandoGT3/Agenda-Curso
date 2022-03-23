require('dotenv').config();

const express = require('express');
const app = express(); //iniciando express

const mongoose = require('mongoose');

const session = require('express-session');// para identificar o navegador de um cliente

const MongoStore = require('connect-mongo');

const flash = require('connect-flash');//para mensagens auto-destrutivas, são salvas na sessão

const routes = require('./routes');//rotas da aplicação
const path = require('path');

const helmet = require('helmet');

const csrf = require('csurf');//csrf tokens que são criados para os formulários

const { sessionUser, checkCSRFError, csrfMiddleware, errorOrSuccessMessage} = require('./src/middlewares/middleware');

app.use(express.urlencoded({ extended: true })); //podemos postar formulários para dentro da aplicação

app.use(express.json()); //fazendo parse de json para dentro da aplicação

app.use(express.static(path.resolve(__dirname, "public")));

app.use(helmet());

//configurando a sessão
const sessionOptions = session({
    secret: 'omceMCFSADFMCACFSMODmmoampdwcmpqw',

    reseva: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000*60*60*24) * 7, //tempo q vai durar o cookie (7dias)
        httpOnly: true
    },
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING})
});

mongoose.connect(process.env.CONNECTIONSTRING)//enviando os dados da conexão 
    .then(() => {
        console.log('Conectado a Base');
        app.emit('Pronto');//Fazendo com que app emita um evento, falando que o mongoose ja está conectado
    }).catch(e => console.log(e));

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, "src", "views"));
app.set('view engine', 'ejs');

app.use(csrf());//prevenindo o ataque

app.use(checkCSRFError); //checando o csrf
app.use(csrfMiddleware); //criando tokens
app.use(sessionUser);
app.use(errorOrSuccessMessage); 

app.use(routes);

app.on('Pronto', () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000/');
        console.log('Servidor Executando na Porta 3000');
    });
});

