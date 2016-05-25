angular
.module("WikiWars")
.controller("MainController", MainController);

MainController.$inject = ["$http", "URL", "$stateParams", "$scope", "$state"];
function MainController($http, URL, $stateParams, $scope, $state){
  var self = this;
  self.changePage = changePage;
  self.startGame  = startGame;
  self.count      = 0;

  function changePage(name){
    if (name){
      var Url = URL + name;
    } else {
      var Url = URL + $stateParams.name;
    }

    counter();

    $http({
      method: "GET",
      url: Url
    }).then(function(res){
      // console.log($scope.$parent)
      if(($scope.$parent.Main.endPageLink)&&($stateParams.name === $scope.$parent.Main.endPageLink)){
        alert("YOU WON");
      }
      $("#game-pane").html(res.data);
    }, function(res){
    });
  }

  function getPage(){
    $http({
      method: "GET",
      url: URL + "Special:Random"
    }).then(function(res){
      var regex = /(<h1\b([\s\S]+?)>([\s\S]+?)<\/h1>)/;
      var result = regex.exec(res.data);

      var stubfinder = /You can help Wikipedia/;
      var ifinder = /<i>/;
      var badcharfinder = /[\|\$\%\^\&\*\(\{\}\'\[\#\;@\?]/;
      if (stubfinder.exec(res.data) || ifinder.exec(result) || badcharfinder.exec(result)) {
        // alert("dontwant");
        getPage();
      } else {
        if (!self.startPage) {
          self.startPage     = result[0].slice(53, result[0].length-5);
          self.startPageLink = self.startPage.replace(/ /g,"_");
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
      $scope.$parent.Main.count++;
    }
  }

  function startGame(){
    self.startPage = null;
    self.endPage = null;
    if (!$scope.$parent.Main){
      getPage();
      getPage();
    } else {
      console.log("start stopped");
    }
  }

  startGame();
  changePage($stateParams.name);
}
