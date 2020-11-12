/* Autor: Viren Sajju Dhanwani Dhanwani

*/

// Función que cambia de un modo manual a un modo aleatorio
// y muestra al usuario en qué modo se encuentra
function toggleMode() {
  let x = document.getElementById("man");
  let y = document.getElementById("random");
  let z = document.getElementById("obs_t");
  if (x.style.display === "none") {
    x.style.display = "inline";
    y.style.display = "none";
    z.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "inline";
    z.style.display = "inline";
  }
}

// Muestra un tutorial de cómo usar la página web
function showHelp() {
  alert("En el modo aleatorio, al hacer un primer click en cualquier casilla, se coloca el coche. El segundo click coloca la meta, y al darle al botón de EMPEZAR se mostrará el camino del coche a la meta.");
  alert("En el modo manual, se hace lo mismo pero tras colocar la meta, se pueden ir colocando los obstáculos en la casilla que se desee.");
}