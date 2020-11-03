class Tree {
  constructor(root) {
    this._root = root || null;
  }

  _traverse(callback) {
    const self = this;
    function goThrough(node) {
      callback(node);
      node.children.forEach((child) => {
        goThrough(child);
      });
    }
    goThrough(this._root, dash);
  }

  _addNode(value, i, j, parent_node) {
    const new_node = {
      value,
      i,
      j,
      children: []
    };

    if (this._root === null) {
      this._root = new_node;
      return;
    }

    parent_node.children.push(new_node);
    return new_node;
  }

  _removeNode(node) {
    node.children.forEach((child_node, index) => {
      if (child_node.value === value) {
        node.children.splice(index, 1);
      }
    });

  }
}

class Node {
  constructor(value, i, j, children) {
    this.value = value;
    this.i = i;
    this.j = j;    
    this.children = [];
  }

  _isLeaf() {
    if (this.children.length == 0) return true;
    return false;
  }
}