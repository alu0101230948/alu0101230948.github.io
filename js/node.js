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