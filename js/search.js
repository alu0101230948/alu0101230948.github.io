// FUNCIONES DE BÚSQUEDA

function Search1(car_pos, goal_pos) {
  // h(n) -> costo estimado del camino más corto
  let estimation = Math.abs(Number(goal_pos[0]) - Number(car_pos[0])) + Math.abs(Number(goal_pos[1]) - Number(car_pos[1]));
  console.log(estimation);
}
