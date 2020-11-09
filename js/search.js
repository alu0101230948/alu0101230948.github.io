// FUNCIONES DE BÚSQUEDA
// Funcion heurística que usa la distancia Manhattan
function Man_dist(x0, y0, x1, y1) {
  return Math.abs(Number(x1) - Number(x0)) + Math.abs(Number(y1) - Number(y0));
}

// Funcion heurística que usa la distancia euclídea
function Eucl_dist(x0, y0, x1, y1) {
  return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
}

function Search1(car_pos, goal_pos, grid) {
  // h(n) -> costo estimado del camino más corto
  let estimation = Man_dist(car_pos[0], car_pos[1], goal_pos[0], goal_pos[1]);
  let parent = new Node(estimation, car_pos[0], car_pos[1], 0);
  let tree = new Tree(parent);
  const row_size = grid.rows.length;
  const column_size = grid.rows[0].cells.length;

  let cellRow = car_pos[0];
  let cellCol = car_pos[1];
  // gn es el coste real que se ha consumido para llegar a la casilla actual 
  let gn = 1;
  let min = row_size + column_size;
  let min_node;
  let boundary = [parent];

  grid.rows[cellRow].cells[cellCol].className = "marked";

  // TODO que las rocas no se pongan despues de mostrar la solucion
  do {
    if (boundary.length > 1) boundary.sort(function (a, b) { return (a.value - b.value) });
    parent = boundary.shift();
    cellRow = parent.i;
    cellCol = parent.j;

    if ((cellRow == goal_pos[0]) && (cellCol == goal_pos[1])) {
      grid.rows[cellRow].cells[cellCol].className = "goal";
      alert("¡Meta alcanzada!");
      while (parent.parent) {
        parent = parent.parent;
        grid.rows[parent.i].cells[parent.j].className = "solution";
      }
      return;
    }

    function Coordinates(pos, row, col) {
      if ((pos.getAttribute("data-obstacle") == "false") && (pos.className != "marked")) {
        let fn = (parent.depth + 1) + Man_dist(row, col, goal_pos[0], goal_pos[1]);
        let child = tree._addNode(fn, row, col, parent);
        boundary.push(child);
        pos.className = "marked";
        pos.innerHTML = fn;
      }
    }

    // Norte
    if (cellRow != 0) {
      let row_n = cellRow - 1;
      let north = grid.rows[row_n].cells[cellCol];
      Coordinates(north, row_n, cellCol);
    }

    // Oeste
    if (cellCol != 0) {
      let col_w = cellCol - 1;
      let west = grid.rows[cellRow].cells[col_w];
      Coordinates(west, cellRow, col_w);
    }

    // Sur
    if (cellRow != row_size - 1) {
      let row_s = cellRow + 1;
      let south = grid.rows[row_s].cells[cellCol];
      Coordinates(south, row_s, cellCol);
    }

    // Este
    if (cellCol != column_size - 1) {
      let col_e = cellCol + 1;
      let east = grid.rows[cellRow].cells[col_e];
      Coordinates(east, cellRow, col_e);
    }
  } while (boundary.length > 0);
  alert("Solución no encontrada!");
}
