angular
  .module("WikiWars")
  .controller("MainController", MainController);

MainController.$inject = ["$http", "URL"];
function MainController($http, URL){
  var self = this;
  console.log(URL);

  self.page = $http({
    method: "GET",
    url: URL
  }).then(function(res){
    console.log(res);
  });
}
