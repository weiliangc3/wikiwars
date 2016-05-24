angular
  .module("WikiWars")
  .controller("MainController", MainController);

MainController.$inject = ["$http", "URL"];
function MainController($http, URL){
  var self = this;

  console.log(URL);

  $http({
    method: "GET",
    url: URL
  }).then(function(res){
    console.log(res);
    // self.page = res;
  }, function(res){
    console.log(res);
  });
}
