// Funcion que cambia de un modo manual a un modo aleatorio
// y muestra al usuario en qué modo se encuentra
function toggleMode() {
  let x = document.getElementById("man");
  let y = document.getElementById("random");
  if (x.style.display === "none") {
    x.style.display = "inline";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "inline";
  }
}