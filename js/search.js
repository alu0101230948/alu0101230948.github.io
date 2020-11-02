// FUNCIONES DE BÚSQUEDA
function distance(x0, x1, y0, y1) {
  return Math.abs(Number(y0) - Number(x0)) + Math.abs(Number(y1) - Number(x1))
}

function Search1(car_pos, goal_pos, grid) {
  // h(n) -> costo estimado del camino más corto
  let estimation = distance(car_pos[0], car_pos[1], goal_pos[0], goal_pos[1]);
  let parent = new Node(estimation);
  let tree = new Tree(parent);

  let cellRow = car_pos[0];
  let cellCol = car_pos[1];
  let row_size = grid.rows.length;
  let column_size = grid.rows[0].cells.length;

  // gn es el coste real que se ha consumido para llegar a la casilla actual 
  let gn = 1;
  let min = row_size + column_size;

  // Norte
  if (cellRow != 0)
    if (grid.rows[cellRow - 1].cells[cellCol].getAttribute("data-obstacle") == "false") {
      let fn = gn + distance(cellRow - 1, cellCol, goal_pos[0], goal_pos[1]);
      tree._addNode(fn, parent);
      min = fn < min ? fn : min;
    }

  // Sur
  if (cellRow != row_size - 1)
    if (grid.rows[cellRow + 1].cells[cellCol].getAttribute("data-obstacle") == "false") {
      let fn = gn + distance(cellRow + 1, cellCol, goal_pos[0], goal_pos[1]);
      tree._addNode(fn, parent);
      min = fn < min ? fn : min;
    }

  // Oeste
  if (cellCol != 0)
    if (grid.rows[cellRow].cells[cellCol - 1].getAttribute("data-obstacle") == "false") {
      let fn = gn + distance(cellRow, cellCol - 1, goal_pos[0], goal_pos[1]);
      tree._addNode(fn, parent);
      min = fn < min ? fn : min;
    }
  // Este
  if (cellCol != column_size - 1)
    if (grid.rows[cellRow].cells[cellCol + 1].getAttribute("data-obstacle") == "false") {
      let fn = gn + distance(cellRow, cellCol + 1, goal_pos[0], goal_pos[1]);
      tree._addNode(fn, parent);
      min = fn < min ? fn : min;
    }

  console.log(tree);
}
