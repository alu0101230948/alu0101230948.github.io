// FUNCIONES DE BÚSQUEDA
function distance(x0, x1, y0, y1) {
  return Math.abs(Number(y0) - Number(x0)) + Math.abs(Number(y1) - Number(x1))
}

function Search1(car_pos, goal_pos, grid) {
  // h(n) -> costo estimado del camino más corto
  let estimation = distance(car_pos[0], car_pos[1], goal_pos[0], goal_pos[1]);
  let parent = new Node(estimation, car_pos[0], car_pos[1]);
  let tree = new Tree(parent);
  const row_size = grid.rows.length;
  const column_size = grid.rows[0].cells.length;

  let cellRow = car_pos[0];
  let cellCol = car_pos[1];
  // gn es el coste real que se ha consumido para llegar a la casilla actual 
  let gn = 1;
  let min = row_size + column_size;
  let min_node;
  let boundary = [];

  grid.rows[cellRow].cells[cellCol].className = "marked";

  // TODO arreglarlo todo xd
  do {
    console.log("[" + cellRow + " " + cellCol + "]")
    if ((cellRow == goal_pos[0]) && (cellCol == goal_pos[1])) {alert("¡Meta alcanzada!"); return;}

    // Norte
    if (cellRow != 0) {
      let north = grid.rows[cellRow - 1].cells[cellCol];
      if ((north.getAttribute("data-obstacle") == "false") && (north.className != "marked") ) {
        let fn = gn + distance(cellRow - 1, cellCol, goal_pos[0], goal_pos[1]);
        let child = tree._addNode(fn, cellRow - 1, cellCol, parent);
        boundary.push(child);
        north.className = "marked";
        north.innerHTML = fn;
      }
    }

    // Oeste
    if (cellCol != 0) {
      let west = grid.rows[cellRow].cells[cellCol - 1];
      if ((west.getAttribute("data-obstacle") == "false") && (west.className != "marked")) {
        let fn = gn + distance(cellRow, cellCol - 1, goal_pos[0], goal_pos[1]);
        let child = tree._addNode(fn, cellRow, cellCol - 1, parent);
        boundary.push(child);
        west.className = "marked";
        west.innerHTML = fn;
      }
    }

    // Sur
    if (cellRow != row_size - 1) {
      let south = grid.rows[cellRow + 1].cells[cellCol];
      if ((south.getAttribute("data-obstacle") == "false") && (south.className != "marked")) {
        let fn = gn + distance(cellRow + 1, cellCol, goal_pos[0], goal_pos[1]);
        let child = tree._addNode(fn, cellRow + 1, cellCol, parent);
        boundary.push(child);
        south.className = "marked";
        south.innerHTML = fn;
      }
    }

    // Este
    if (cellCol != column_size - 1) {
      let east = grid.rows[cellRow].cells[cellCol + 1];
      if ((east.getAttribute("data-obstacle") == "false") && (east.className != "marked")) {
        let fn = gn + distance(cellRow, cellCol + 1, goal_pos[0], goal_pos[1]);
        let child = tree._addNode(fn, cellRow, cellCol + 1, parent);
        boundary.push(child);
        east.className = "marked";
        east.innerHTML = fn;
      }
    }

    boundary.sort(function(a, b){return (a.value - b.value)});
    parent = boundary.shift();
    cellRow = parent.i;
    cellCol = parent.j;

    gn++;
  } while (boundary.length > 0);
}
