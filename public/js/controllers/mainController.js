angular
  .module("WikiWars")
  .controller("MainController", MainController);

MainController.$inject = ["$http", "URL", "$stateParams", "$scope"];
function MainController($http, URL, $stateParams, $scope){
  var self = this;
  self.changePage = changePage;
  self.startGame  = startGame;

  function changePage(name){
    if (name){
      var Url = URL + name;
    } else {
      var Url = URL + $stateParams.name;
    }

    $http({
      method: "GET",
      url: Url
    }).then(function(res){
      // self.page = res.data;
      $("#game-pane").html(res.data);
    }, function(res){
      if($stateParams.name === $scope.$parent.endPageLink){
        alert("YOU WON");
      }
    });
  }

  function getPage(){
    $http({
      method: "GET",
      url: URL + "Special:Random"
    }).then(function(res){
      var regex = /(<h1\b([\s\S]+?)>([\s\S]+?)<\/h1>)/;
      var result = regex.exec(res.data);

      if (!self.startPage) {
        self.startPage     = result[0].slice(53, result[0].length-5);
        self.startPageLink = self.startPage.replace(/ /g,"_");
      } else {
        self.endPage       = result[0].slice(53, result[0].length-5);
        self.endPageLink   = self.endPage.replace(/ /g,"_");

        console.log("start:", self.startPageLink,"| end:", self.endPageLink);
      }
    }, function(res){
      console.log(res);
    });
  }

  function startGame(){
    getPage();
    getPage();

  }
  getPage();
  getPage();
  changePage($stateParams.name);
}
