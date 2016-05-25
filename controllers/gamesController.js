var Game = require("../models/game");

function gamesIndex(req, res){
  Game.find({}, function(err, games) {
    if (err) return res.status(404).send(err);
    res.status(200).send(games);
  });
}

function gamesCreate(req, res){
  var game = new Game(req.body.game);
  game.save(function(err, game) {
    if (err) return res.status(500).send(err);
    res.status(201).send(game);
  });
}

function gamesShow(req, res){
  var id = req.params.id;
  Game.findById({ _id: id }).populate("projects").exec(function(err, game) {
    if (err) return res.status(500).send(err);
    if (!game) return res.status(404).send(err);
    res.status(200).send(game);
  });
}

function gamesUpdate(req, res){
  var id = req.params.id;

  Game.findByIdAndUpdate({ _id: id }, req.body.game, function(err, game){
    if (err) return res.status(500).send(err);
    if (!game) return res.status(404).send(err);
    res.status(200).send(game);
  });
}

function gamesDelete(req, res){
  var id = req.params.id;
  Game.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
}

module.exports = {
  gamesIndex:  gamesIndex,
  gamesCreate: gamesCreate,
  gamesShow:   gamesShow,
  gamesUpdate: gamesUpdate,
  gamesDelete: gamesDelete
};
