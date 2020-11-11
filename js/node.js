// Clase nodo que guarda 5 atributos:
// value: valor del nodo, que también se puede usar como identificador
// i: en el caso de las casillas, fila en la que se encuentra la casilla
// j: columna donde se encuentra la casilla
// depth: profundidad del nodo, siendo en el caso del vehículo el coste para llegar a la casilla actual
// parent: el nodo padre, lo cual nos servirá para saber cómo hemos llegado hasta el nodo actual
class Node {
  constructor(value, i, j, depth, parent) {
    this.value = value;
    this.i = i;
    this.j = j;
    this.depth = depth;
    this.parent = parent;
  }

  _addNode(value, i, j) {
    return new Node(value, i, j, this.depth + 1, this);
  }
}