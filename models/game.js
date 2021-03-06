var mongoose = require("mongoose");

var gameSchema = mongoose.Schema({
  startPage: String,
  startPageLink: String,
  endPage: String,
  endPageLink: String,
  player: String,
  count: String,
  timeTaken: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);
