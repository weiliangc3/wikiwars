var express         = require("express");
var morgan          = require("morgan");
var methodOverride  = require("method-override");
var bodyParser      = require("body-parser");
var mongoose        = require("mongoose");
var cors            = require("cors");

var config          = require("./config/config");
var routes          = require("./config/routes");

var app             = express();

mongoose.connect(config.database);

var Game            = require("./models/game");

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static(__dirname + "/public"));
app.use("/", express.static(__dirname + "/bower_components"));

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === "object" && "_method" in req.body){
    var method = req.body_method;
    delete req.body_method;
    return method;
  }
}));

app.use("/api",routes);

app.get("/*",function (req,res){
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(config.port,function(){
  console.log("Welcome to the PWR Fight Club", config.port);
});
