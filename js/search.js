/* Autor: Viren Sajju Dhanwani Dhanwani

*/

// FUNCIONES DE BÚSQUEDA
// Funcion heurística que usa la distancia Manhattan
function Man_dist(x0, y0, x1, y1) {
  return Math.abs(Number(x1) - Number(x0)) + Math.abs(Number(y1) - Number(y0));
}

// Funcion heurística que usa la distancia euclídea
function Eucl_dist(x0, y0, x1, y1) {
  return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
}

function Search(car_pos, goal_pos, grid) {
  let heur;
  if (document.getElementById("functions").value == "s_man") heur = Man_dist;
  else if (document.getElementById("functions").value == "s_eucl") heur = Eucl_dist;

  // estimation o h(n) -> costo estimado del camino más corto
  let estimation = heur(car_pos[0], car_pos[1], goal_pos[0], goal_pos[1]);
  let actual_node = new Node(estimation, car_pos[0], car_pos[1], 0);
  const row_size = grid.rows.length;
  const column_size = grid.rows[0].cells.length;

  let cellRow = car_pos[0];
  let cellCol = car_pos[1];
  let boundary = [actual_node];

  grid.rows[cellRow].cells[cellCol].className = "marked";

  do {
    if (boundary.length > 1) boundary.sort(function (a, b) {
      if (a.value > b.value) return 1;
      if (a.value <= b.value) return -1;
      return 0;
    });

    actual_node = boundary.shift();
    cellRow = actual_node.i;
    cellCol = actual_node.j;

    if ((cellRow == goal_pos[0]) && (cellCol == goal_pos[1])) {
      grid.rows[cellRow].cells[cellCol].className = "goal";
      alert("¡Meta alcanzada!");
      while (actual_node.parent) {
        actual_node = actual_node.parent;
        grid.rows[actual_node.i].cells[actual_node.j].className = "solution";
      }
      return;
    }

    let is_lower = false;

    function MarkCell(pos, row, col) {
      if ((pos.getAttribute("data-obstacle") == "false")) {
        let fn = (actual_node.depth + 1) + heur(row, col, goal_pos[0], goal_pos[1]);
        for (let it = 0; it < boundary.length; it++) {
          if ((boundary[it].i == row) && (boundary[it].j == col)) {
            if (fn < boundary[it].value) {
              is_lower = true;
              break;
            }
          }
        }

        if ((is_lower) || (pos.className != "marked")) {
          let child = actual_node._addNode(fn, row, col);
          boundary.push(child);
          pos.className = "marked";
          // Descomentar la siguiente línea si se quiere mostrar el valor de la función dentro de cada casilla
          // pos.innerHTML = fn;
        }
      }
    }

    // Norte
    if (cellRow != 0) {
      let row_n = cellRow - 1;
      let north = grid.rows[row_n].cells[cellCol];
      MarkCell(north, row_n, cellCol);
    }

    // Oeste
    if (cellCol != 0) {
      let col_w = cellCol - 1;
      let west = grid.rows[cellRow].cells[col_w];
      MarkCell(west, cellRow, col_w);
    }

    // Sur
    if (cellRow != row_size - 1) {
      let row_s = cellRow + 1;
      let south = grid.rows[row_s].cells[cellCol];
      MarkCell(south, row_s, cellCol);
    }

    // Este
    if (cellCol != column_size - 1) {
      let col_e = cellCol + 1;
      let east = grid.rows[cellRow].cells[col_e];
      MarkCell(east, cellRow, col_e);
    }
  } while (boundary.length > 0);
  alert("Solución no encontrada!");
}
