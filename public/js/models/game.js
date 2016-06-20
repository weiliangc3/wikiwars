angular
  .module("WikiWars")
  .factory("Game", Game);

Game.$inject = ["$resource"];
function Game($resource){
  return $resource("https://pwrwikiwars.herokuapp.com/api/games/:id",
  { id: "@_id" },
  { update: { method: "PUT" }
  });
}
