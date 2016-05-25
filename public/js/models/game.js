angular
  .module("WikiWars")
  .factory("Game", Game);

Game.$inject = ["$resource"];
function Game($resource){
  return $resource("http://localhost:3000/api/games/:id",
  { id: "@_id" },
  { update: { method: "PUT" }
  });
}
