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

  function changePage(name){
    var Url;
    if (name){
      Url = URL + name;
    } else {
      Url = URL + $stateParams.name;
    }

    counter();

    $http({
      method: "GET",
      url: Url
    }).then(function(res){
      if(($scope.$parent.Main.endPageLink)&&($stateParams.name === $scope.$parent.Main.endPageLink)){
        $scope.$parent.Main.gameStatus = "You Won";
      }
      $("#game-pane").html(res.data);
    }, function(res){
      console.log(res);
    });
  }

  function getPage(){
    $http({
      method: "GET",
      url: URL + "Special:RandomInCategory/Featured_articles"
    }).then(function(res){
      var regex = /(<h1\b([\s\S]+?)>([\s\S]+?)<\/h1>)/;
      var result = regex.exec(res.data);

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
    self.startPage = null;
    self.endPage = null;
    self.gameStatus = "Race begun.";
    if (!$scope.$parent.Main){
      getPage();
      getPage();
    }
  }

  function addGame(){
    Game.save({
      startPage: "Electropop",
      startPageLink: "Electropop",
      endPage: "Electronic Music",
      endPageLink: "Electronic_Music"
    }, function(data){
      console.log(data);
    });
  }
  addGame();
  console.log(Game.query());
  
  // changePage($stateParams.name);
}
