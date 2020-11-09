class Tree {
  constructor(root) {
    this._root = root || null;
  }

  _addNode(value, i, j, parent_node) {
    const new_node = {
      value,
      i,
      j,
      depth: parent_node.depth + 1,
      parent: parent_node,
      children: []
    };

    if (this._root === null) {
      this._root = new_node;
      return;
    }

    parent_node.children.push(new_node);
    return new_node;
  }
}

class Node {
  constructor(value, i, j, depth, parent) {
    this.value = value;
    this.i = i;
    this.j = j;
    this.depth = depth;
    this.parent = parent;
    this.children = [];
  }
}