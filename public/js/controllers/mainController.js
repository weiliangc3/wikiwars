angular
  .module("WikiWars")
  .controller("MainController", MainController);

MainController.$inject = ["$http", "URL"];
function MainController($http, URL){
  var self = this;
  self.changePage = changePage;

  function changePage(name){$http({
      method: "GET",
      url: "https://en.wikipedia.org/wiki/" + name
    }).then(function(res){
      console.log(res.data);
      // self.page = res.data;
      $("main").append(res.data);
    }, function(res){
      console.log(res);
    });
  }
  changePage("Main_Page");
}
