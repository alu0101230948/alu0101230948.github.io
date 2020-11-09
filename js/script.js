// Cuadrícula 
let grid = document.getElementById("grid");

// La tabla puede estar:
// Vacía: no tiene coche ni meta 
// Con coche: solo tiene el coche colocado 
// Con meta: coche y meta colocados
let Board = "empty";
let isManual = Boolean(false);

let vehicle;
let endpoint;

document.getElementById("random").style.display = "inline";
document.getElementById("man").style.display = "none";

generateGrid();

// Generar una cuadrícula donde cada celda es clicable 
function generateGrid() {
  Board = "empty";
  // Coge los datos de los campos de texto ofrecidos al usuario
  let n_rows = document.getElementById("ask_rows").value;
  let n_columns = document.getElementById("ask_columns").value;

  if ((n_rows < 1) || (n_columns < 1)) alert("¡Introduzca valores mayores que 0!");

  resizeGrid(n_rows, n_columns);

  // Modo manual o aleatorio
  if (document.getElementById("random").style.display === "inline") {
    isManual = false;
    RandomObstacles(n_rows, n_columns);
  } else {
    isManual = true;
  }
}

// Añade tantos obstáculos como el usuario desee de manera aleatoria 
function RandomObstacles(M, N) {
  n_obs = document.getElementById("ask_obstacles").value;
  if ((n_obs >= 0) && (n_obs < (Number(M) * Number(N) - 1))) {
    for (let i = 0; i < n_obs; i++) {
      let row = Math.floor(Math.random() * M);
      let col = Math.floor(Math.random() * N);
      let cell = grid.rows[row].cells[col];
      if (cell.getAttribute("data-obstacle") == "true") {
        i--;
      } else {
        cell.setAttribute("data-obstacle", "true");
        cell.innerHTML = "<img src=\"img/rock.png\" width=\"65px\" height=\"42px\">";
      }
    }
  } else {
    alert("El número de obstáculos debe estar entre 0 y " + (Number(M) * Number(N) - 2));
  }
}

// Funcion que aplica una técnica de búsqueda para encontrar la meta
function startSearch() {
  if (Board == "empty") {
    alert("¡Coloca el coche!");
  } else if (Board == "with_car") {
    alert("¡Coloca la meta!");
  } else {
    let vehicle_pos = [vehicle.parentNode.rowIndex, vehicle.cellIndex];
    let endpoint_pos = [endpoint.parentNode.rowIndex, endpoint.cellIndex];
    Search1(vehicle_pos, endpoint_pos, grid);
  }
}

// Dependiendo del estado de la tabla, efectúa una acción u otra
function clickCell(cell) {
  // Comprueba si la celda clicada es un obstáculo. 
  // Si está el modo manual, se permite deseleccionar
  if (cell.getAttribute("data-obstacle") == "true") {
    if (isManual == true) {
      cell.setAttribute("data-obstacle", "false");
      cell.innerHTML = "";
    } else {
      alert("Obstáculo");
    }

    // Comprueba si la celda clicada es un coche
  } else if (cell.getAttribute("data-car") == "true") {
    alert("Coche");

    // Comprueba si la celda clicada es la meta
  } else if (cell.getAttribute("data-end") == "true") {
    alert("Meta");

    // Si la tabla está vacía, el usuario coloca un coche
  } else if (Board == "empty") {
    cell.setAttribute("data-car", "true");
    cell.innerHTML = "<img src=\"img/car.png\" width=\"65px\" height=\"42px\">";
    Board = "with_car";
    vehicle = cell;

    // Si la tabla contiene un coche, se coloca la meta
  } else if (Board == "with_car") {
    cell.setAttribute("data-end", "true");
    Board = "with_end";
    cell.className = "goal";
    endpoint = cell;

    // Si el usuario activó el modo manual, se permite poner obstáculos
  } else if (isManual == true) {
    cell.setAttribute("data-obstacle", "true");
    cell.innerHTML = "<img src=\"img/rock.png\" width=\"65px\" height=\"42px\">";
  }
}

function loadFile() {
  grid.innerHTML = "";

  let reader = new FileReader();
  reader.onload = function (event) {
    let data = event.target.result;
    let lines = data.split(/\n/);
    let info = lines[0].split(" ");
    let n_rows = info[0];
    let n_col = info[1];
    let n_obs = info[2];

    resizeGrid(n_rows, n_col);

    let car_pos = lines[1].split(" ");
    vehicle = grid.rows[Number(car_pos[0])].cells[Number(car_pos[1])];
    vehicle.setAttribute("data-car", "true");
    vehicle.innerHTML = "<img src=\"img/car.png\" width=\"65px\" height=\"42px\">";

    let goal_pos = lines[2].split(" ");
    endpoint = grid.rows[Number(goal_pos[0])].cells[Number(goal_pos[1])];
    endpoint.setAttribute("data-end", "true");
    endpoint.className = "goal";

    Board = "with-end";

    for (let i = 0; i < n_obs; i++) {
      let pos = lines[i + 3].split(" ");
      let r = Number(pos[0]);
      let c = Number(pos[1]);
      grid.rows[r].cells[c].setAttribute("data-obstacle", "true");
      grid.rows[r].cells[c].innerHTML = "<img src=\"img/rock.png\" width=\"65px\" height=\"42px\">";
    }
  }

  reader.onerror = function (event) {
    console.error("File could not be read! Code " + event.target.error.code);
  }

  reader.readAsText(document.getElementById("file-selector").files[0]);
}

// Genera una cuadrícula con las columnas y filas pasadas como parámetros
function resizeGrid(rows, cols) {
  // Genera una cuadrícula de M*N
  grid.innerHTML = "";
  for (let i = 0; i < rows; i++) {
    row = grid.insertRow(i);
    for (let j = 0; j < cols; j++) {
      cell = row.insertCell(j);

      // Permite clicar sobre una celda y dependiendo del estado de la tabla se realizan acciones distintas
      cell.onclick = function () { clickCell(this); };

      // Por defecto ninguna celda contiene coche ni obstáculos ni meta
      // Tipo de dato coche para saber si una celda contiene un coche
      let car = document.createAttribute("data-car");
      car.value = "false";
      cell.setAttributeNode(car);

      // Tipo de dato fin para saber si una celda es la final
      let goal = document.createAttribute("data-end");
      goal.value = "false";
      cell.setAttributeNode(goal);

      // Tipo de dato obstáculo para saber si una celda contiene uno
      let obstacle = document.createAttribute("data-obstacle");
      obstacle.value = "false";
      cell.setAttributeNode(obstacle);
    }
  }
}