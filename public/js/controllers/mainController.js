angular
  .module("WikiWars")
  .controller("MainController", MainController);

MainController.$inject = ["$http", "URL", "$stateParams"];
function MainController($http, URL, $stateParams){
  var self = this;
  self.changePage = changePage;

  function changePage(name){
    $http({
      method: "GET",
      url: URL + $stateParams.name
    }).then(function(res){
      // self.page = res.data;
      $("#game-pane").html(res.data);
    }, function(res){
      console.log(URL + $stateParams);
    });
  }
  changePage($stateParams);
}
