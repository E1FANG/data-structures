// AVL树： 平衡搜索二叉树
// 即：满足搜索二叉树的特性，同时满足平衡二叉树的特性

// 由于是平衡二叉树,且有节点平衡因子这个概念,所以需要频繁的获取节点的高度。
// “节点高度”是指从该节点到它的最远叶节点的距离，即所经过的“边”的数量

class TreeNode {
  val
  left = null
  right = null
  height
  constructor(val, height) {
    this.val = val
    this.height = height || 0
  }
}

class AVLTree {
  root
  constructor(val) {
    this.root = new TreeNode(val)
  }

  insert(value) {
    this.root = this.#insert(this.root, value)
  }

  #insert(node, value) {
    if (node === null) {
      return new TreeNode(value)
    }
    if (value < node.val) {
      node.left = this.#insert(node.left, value)
    } else if (value > node.val) {
      node.right = this.#insert(node.right, value)
    }

    this.#updateHeight(node)
    // 返回新的根节点
    return this.checkBalance(node)
  }
  getHeight(node) {
    return node === null ? -1 : node.height
  }

  #updateHeight(node) {
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1
  }


  // 节点平衡因子：balance factor
  // 定义为： 节点的左子树的高 - 节点的右子树的高 ； 空节点的节点平衡因子为 0 
  // 设 平衡因子 为 f， 则一颗AVL树的任意节点的平衡因子皆满足：-1 <= f <= 1
  getBalanceFactor(node) {
    if (node === null) return 0
    return this.getHeight(node.left) - this.getHeight(node.right)
  }

  checkBalance(node) {
    const balanceFactor = this.getBalanceFactor(node)
    if (balanceFactor > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rightRotate(node);
    }
    return node
  }
  rightRotate(node) {
    const child = node.left
    const childRight = child.right

    child.right = node
    node.left = childRight
    this.#updateHeight(node)
    this.#updateHeight(child)
    // 返回新的根节点
    return child
  }
}
const avlTree = new AVLTree(30);
avlTree.insert(20);
avlTree.insert(10); // 插入导致根节点失衡，触发右旋转
console.log({ avlTree })

// 中序 左-根-右
const inRes = []
const inOrder = (root) => {
  if (root === null) return
  inOrder(root.left)
  inRes.push(root.val)
  inOrder(root.right)
}
inOrder(avlTree.root)
console.log('中序', inRes)