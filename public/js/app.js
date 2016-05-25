angular
  .module("WikiWars", ["ngResource", "ui.router"])
  .constant("URL", "https://en.wikipedia.org/wiki/")
  .config(Router);

  Router.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
  function Router($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true);

    $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "/html/home.html"
    })
    .state("index", {
      url: "/wiki/:name",
      templateUrl: "/html/game.html",
      controller: "MainController",
      controllerAs: "Game"
    })
    .state("win", {
      url: "/win",
      templateUrl: "/html/win.html"
    });

    $urlRouterProvider.otherwise("/");
  }
