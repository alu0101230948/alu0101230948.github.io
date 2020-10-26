// Cuadrícula 
let grid = document.getElementById("grid");

let Board = "empty";
let isManual = Boolean(false);
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

  // Genera una cuadrícula de M*N
  grid.innerHTML = "";
  for (let i = 0; i < n_rows; i++) {
    row = grid.insertRow(i);
    for (let j = 0; j < n_columns; j++) {
      cell = row.insertCell(j);

      // Permite clicar sobre una celda
      cell.onclick = function () { clickCell(this); };

      // Tipo de dato coche para saber si una celda contiene un coche
      let car = document.createAttribute("data-car");
      car.value = "false";
      cell.setAttributeNode(car);

      // Tipo de dato fin para saber si una celda es la final
      let goal = document.createAttribute("data-end");
      goal.value = "false";
      cell.setAttributeNode(goal);

      // Tipo de dato obstáculo para saber si una celda contiene uno
      // Por defecto ninguna celda contiene obstáculos
      let obstacle = document.createAttribute("data-obstacle");
      obstacle.value = "false";
      cell.setAttributeNode(obstacle);
    }
  }

  if (document.getElementById("random").style.display === "inline") {
    isManual = false;
    RandomObstacles(n_rows, n_columns);
  } else {
    isManual = true;
  }
}

// Añade obstáculos de manera aleatoria
// TODO que aparezcan las rocas que deberian
function RandomObstacles(M, N) {
  n_obs = document.getElementById("ask_obstacles").value;
  for (let i = 0; i < n_obs; i++) {
    let row = Math.floor(Math.random() * M);
    let col = Math.floor(Math.random() * N);
    let cell = grid.rows[row].cells[col];
    cell.setAttribute("data-obstacle", "true");
    cell.innerHTML = "<img src=\"img/rock.png\" width=\"65px\" height=\"42px\">";
  }
}

// Funcion que aplicará una técnica de búsqueda para encontrar la meta
function startSearch() {
  alert("EN PROGRESO");
}

// Dependiendo del estado de la tabla, efectúa una acción u otra
function clickCell(cell) {
  // Comprueba si la celda clicada es un obstáculo
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

    // TODO que se haga con un botón
    // Si la tabla está vacía, el usuario coloca un coche
  } else if (Board == "empty") {
    cell.setAttribute("data-car", "true");
    cell.innerHTML = "<img src=\"img/car.png\" width=\"65px\" height=\"42px\">";
    Board = "with_car";

    // Si la tabla contiene un coche, se coloca la meta
  } else if (Board == "with_car") {
    cell.setAttribute("data-end", "true");
    Board = "with_end";
    cell.className = "goal";

    // Si el usuario activó el modo manual, se permite poner obstáculos
  } else if (isManual == true) {
    cell.setAttribute("data-obstacle", "true");
    cell.innerHTML = "<img src=\"img/rock.png\" width=\"65px\" height=\"42px\">";

  } else {
    cell.className = "clicked";
    //Count and display the number of adjacent obstacles
    let obstacleCount = 0;
    let cellRow = cell.parentNode.rowIndex;
    let cellCol = cell.cellIndex;
    let row_size = grid.rows.length;
    let column_size = grid.rows[0].cells.length
    // alert(cellRow + " " + cellCol);  

    // Norte
    if (cellRow != 0)
      if (grid.rows[cellRow - 1].cells[cellCol].getAttribute("data-obstacle") == "true")
        obstacleCount++;
    // Sur
    if (cellRow != row_size - 1)
      if (grid.rows[cellRow + 1].cells[cellCol].getAttribute("data-obstacle") == "true")
        obstacleCount++;
    // Oeste
    if (cellCol != 0)
      if (grid.rows[cellRow].cells[cellCol - 1].getAttribute("data-obstacle") == "true")
        obstacleCount++;
    // Este
    if (cellCol != column_size - 1)
      if (grid.rows[cellRow].cells[cellCol + 1].getAttribute("data-obstacle") == "true")
        obstacleCount++;

    // CONTANDO CON DIAGONALES
    // for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
    //   for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
    //     if (grid.rows[i].cells[j].getAttribute("data-obstacle") == "true") obstacleCount++;
    //   }
    // }

    cell.innerHTML = obstacleCount;
  }
}