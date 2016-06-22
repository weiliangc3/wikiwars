angular
.module("WikiWars")
.controller("MainController", MainController);

MainController.$inject = ["$http", "URL", "$stateParams", "$scope", "$state", "Game"];
function MainController($http, URL, $stateParams, $scope, $state, Game){
  var self = this;
  self.changePage = changePage;
  self.startGame  = startGame;
  self.count      = 0;
  self.play       = false;
  self.gameStatus = "Ready to Rumble";
  self.loadGame   = loadGame;
  self.saved      = false;
  self.saveGame   = saveGame;
  getGames();

  function saveGame(){
    self.saved = true;
    if (self.startPage){
      Game.save({
        startPage:      self.startPage,
        startPageLink:  self.startPageLink,
        endPage:        self.endPage,
        endPageLink:    self.endPageLink,
        count:          self.count,
        player:         self.player,
        timeTaken:      self.timeTaken
      },function(res){
      });
    }
  }

  function changePage(name){
    var Url;
    if (name){
      Url = URL + name;
    } else {
      Url = URL + $stateParams.name;
    }

    counter();

    $http({
      method: "POST",
      url: "/api/getpage",
      data: { url: Url }
    }).then(function(res){
      console.log(res);
      if($scope.$parent.Main){
        if((!!$scope.$parent.Main.endPageLink)&&($stateParams.name === $scope.$parent.Main.endPageLink)){
          var endTime = new Date();
          var milli = endTime - $scope.$parent.Main.startTime;
          var timer = new Date(milli);
          var timeTaken = timer.getHours() + " hours, " + timer.getMinutes() + " minutes and " + timer.getSeconds() + " seconds.";
          $scope.$parent.Main.timeTaken = timeTaken;
          console.log(timeTaken);
          $scope.$parent.Main.gameStatus = "You Won";
          $state.go('win', {url: "win"});
        }
      }
      $("#game-pane").html(res.data);
    }, function(res){
      console.log(res);
    });
  }

  function getPage(){
    var Url = URL + "Special:RandomInCategory/Featured_articles";
    $http({
      method: "POST",
      url: "/api/getpage",
      data: { url: Url }
    }).then(function(res){
      console.log(res);
      var regex = /(<h1\b([\s\S]+?)>([\s\S]+?)<\/h1>)/;
      var result = regex.exec(res.data);
      console.log("result:", result);

      var stubfinder = /You can help Wikipedia/;
      var ifinder = /<i>/;
      var badcharfinder = /[\|\$\%\^\&\*\(\{\}\'\[\#\;@\?\À-ÿ]/;
      if (stubfinder.exec(res.data) || ifinder.exec(result) || badcharfinder.exec(result)) {
        getPage();
      } else {
        if (!self.startPage) {
          self.startPage     = result[0].slice(53, result[0].length-5);
          self.startPageLink = self.startPage.replace(/ /g,"_");
          $state.go('index', {name: self.startPageLink});
        } else {
          self.endPage       = result[0].slice(53, result[0].length-5);
          self.endPageLink   = self.endPage.replace(/ /g,"_");
        }
      }
    }, function(res){
      console.log(res);
    });
  }

  function counter(){
    if ($scope.$parent.Main) {
      if ($scope.$parent.Main.play === false) {
        $scope.$parent.Main.play = true;
      } else {
        $scope.$parent.Main.count++;
      }
    }
  }

  function startGame(){
    self.count = 0;
    self.play = false;
    self.startPage = null;
    self.endPage = null;
    self.count = 0;
    self.saved = false;
    self.startTime = new Date();
    self.gameStatus = "Race begun.";
    if (!$scope.$parent.Main){
      getPage();
      getPage();
    }
  }

  function loadGame(game){
    self.count = 0;
    self.play = false;
    self.startTime = new Date();
    self.startPage = game.startPage;
    self.startPageLink = game.startPageLink;
    self.endPage = game.endPage;
    self.endPageLink = game.endPageLink;
    self.gameStatus = "Race begun.";
    $state.go('index', {name: self.startPageLink});
  }

  function getGames(){
    var games = Game.query();
    games.slice(0, 10);
    console.log(games);
    self.games = games;
  }


  if ($stateParams.name){
    changePage($stateParams.name);
    if ($scope.$parent.Main.gameStatus === "Ready to Rumble") {
      $state.go('home');
    }
  }

  if ($state === 'win'){
    console.log("TES");
  }

}
