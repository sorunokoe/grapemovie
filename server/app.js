"use strict";

var express = require('express');
var compression = require("compression");
var helmet = require("helmet");
var morgan = require("morgan");
var cors = require("cors");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var routes = require('./api/routes');
const mongoose = require('mongoose');

var app = express();
app.set('views', __dirname+'/views')
app.set('view engine', 'jade');
app.set('view cache', true);
app.enable('trust proxy');
app.use(morgan("common"));
app.use(helmet());
app.use(cors({
    origin: "*",
    credentials: true
}));
require('./config/domain')(app)
require('./config/cluster')(app)

app.use(cookieParser(config.cookieSecret));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

app.set('port', process.env.PORT || config.ports.http);
app.use(express.static(__dirname + './../client/public'));


mongoose.connect("mongodb://sorunokoe:"
    + process.env.MONGO_ATLAS_PASSWORD
    +"@cluster0-shard-00-00-c3wec.mongodb.net:27017,cluster0-shard-00-01-c3wec.mongodb.net:27017,cluster0-shard-00-02-c3wec.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
    { useNewUrlParser: true })
    .then(() => {
        console.log("mongodb connect: success")
    })
    .catch((err) => {
        console.log("mongodb connect: error")
        console.log(err)
        throw err;
    });


app.set('secretKey', 'grapeSecretKey');
routes(app);

switch(app.get('env')){
    case 'development':
        app.use(morgan('dev'));
        break;
    case 'production':
        app.use(require('express-logger')({
            path: __dirname + '/log/requests.log'
        }));
        break;
}

function startServer() {
    var server = app.listen(app.get('port'), function() {
        console.log('Mode ' + app.get('env') + ' ' + config.host + ' ' + app.get('port'));
    });
    return server
}
if(require.main === module){
    startServer();
} else {
    module.exports = startServer();
}
