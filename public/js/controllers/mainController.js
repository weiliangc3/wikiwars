angular
  .module("WikiWars")
  .controller("MainController", MainController);

MainController.$inject = ["$http", "URL"];
function MainController($http, URL){
  var self = this;

  console.log(URL);

  $http({
    method: "GET",
    url: "https://en.wikipedia.org"
  }).then(function(res){
    console.log(res.data);
    // self.page = res.data;
    $("main").append(res.data);
  }, function(res){
    console.log(res);
  });
}
