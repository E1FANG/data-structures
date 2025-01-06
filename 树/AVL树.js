class TreeNode {
  value
  left = null
  right = null
  height
  constructor(val, height) {
    this.value = val
    this.height = height || 0
  }
}
class AVLTree {
  root = null
  constructor(value) {
    this.root = value ? new TreeNode(value) : null
  }

  #updateHeight(node) {
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1
  }

  getHeight(node) {
    // 叶节点高度为0，节点不存在即 -1
    return node === null ? -1 : node.height
  }

  insert(value) {
    this.root = this.#insert(this.root, value)
  }
  // 在 AVL 树中插入节点后，从该节点到根节点的路径上可能会出现一系列失衡节点。
  // 因此，我们需要从这个节点开始，自底向上执行旋转操作，使所有失衡节点恢复平衡
  #insert(node, value) {
    if (node === null) {
      return new TreeNode(value)
    }
    if (value < node.value) {
      node.left = this.#insert(node.left, value)
    }
    if (value > node.value) {
      node.right = this.#insert(node.right, value)
    }

    this.#updateHeight(node)
    return this.#checkBalance(node)
  }

  #getBalance(node) {
    if (node === null) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right)
  }

  #checkBalance(node) {
    const balanceFactor = this.#getBalance(node)
    console.log(balanceFactor)
    if (balanceFactor > 1) {
      console.log('右旋')
      console.log(node)
      console.log('-------------')
      return this.rightRotate(node)
    }
    return node
  }

  rightRotate(node) {
    // 父变子右，子右(变)父左
    const child = node.left
    const childRight = child.right
    child.right = node
    node.left = childRight

    this.#updateHeight(child)
    this.#updateHeight(node)

    return child
  }
}
const avlTree = new AVLTree(30)
avlTree.insert(20);

// avlTree.insert(15);
avlTree.insert(10); // 插入导致根节点失衡，触发右旋转
console.log(avlTree)