angular
  .module("WikiWars")
  .controller("MainController", MainController);

MainController.$inject = ["$http", "URL", "$stateParams"];
function MainController($http, URL, $stateParams){
  var self = this;
  self.changePage = changePage;

  function changePage(){
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

  function getPage(){
    $http({
      method: "GET",
      url: URL + "Special:Random"
    }).then(function(res){
      var regex = /(<h1\b([\s\S]+?)>([\s\S]+?)<\/h1>)/;
      var result = regex.exec(res.data);

      self.startPage = result[0].slice(53, result[0].length-5);
      if (self.startPage) {
        self.endPage = result[0].slice(53, result[0].length-5);
        console.log(self.startPage, self.endPage);
      }
    }, function(res){
      console.log(res);
    });
  }
  getPage();
  getPage();
  // changePage($stateParams);
}
