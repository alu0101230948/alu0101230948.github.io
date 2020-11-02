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

  _addNode(value, parent_node) {
    const new_node = {
      value,
      children: []
    };

    if (this._root === null) {
      this._root = new_node;
      return;
    }

    parent_node.children.push(new_node);
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
  constructor(value, children) {
    this.value = value;
    this.children = [];
  }
}