class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1; // 节点的高度
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  // 插入节点
  insert(value) {
    this.root = this._insert(this.root, value);
  }

  _insert(node, value) {
    // 1. 执行常规的 BST 插入
    if (node === null) {
      return new TreeNode(value);
    }
    if (value < node.value) {
      node.left = this._insert(node.left, value);
    } else {
      node.right = this._insert(node.right, value);
    }

    // 2. 更新节点的高度
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    // 3. 检查失衡并进行旋转
    return this.balance(node);
  }

  // 获取节点高度
  getHeight(node) {
    if (node === null) return 0;
    return node.height;
  }

  // 获取平衡因子
  getBalance(node) {
    if (node === null) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  // 右旋转
  rightRotate(y) {
    console.log('右旋', { y })
    let x = y.left;
    let T2 = x.right;

    // 执行旋转
    x.right = y;
    y.left = T2;

    // 更新高度
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));

    // 返回新的根节点
    return x;
  }

  // 左旋转
  leftRotate(x) {
    let y = x.right;
    let T2 = y.left;

    // 执行旋转
    y.left = x;
    x.right = T2;

    // 更新高度
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));

    // 返回新的根节点
    return y;
  }

  // 检查并平衡节点
  balance(node) {
    let balanceFactor = this.getBalance(node);

    // 左左情况
    if (balanceFactor > 1 && this.getBalance(node.left) >= 0) {
      return this.rightRotate(node);
    }

    // 右右情况
    if (balanceFactor < -1 && this.getBalance(node.right) <= 0) {
      return this.leftRotate(node);
    }

    // 左右情况
    if (balanceFactor > 1 && this.getBalance(node.left) < 0) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    // 右左情况
    if (balanceFactor < -1 && this.getBalance(node.right) > 0) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node; // 如果没有失衡，返回节点
  }

  // 打印树（中序遍历）
  inOrder(node) {
    if (node != null) {
      this.inOrder(node.left);
      console.log(node.value);
      this.inOrder(node.right);
    }
  }
}

// 示例：创建一棵失衡的 AVL 树并进行右旋转
const avlTree = new AVLTree();
avlTree.insert(30);
avlTree.insert(20);
avlTree.insert(10); // 插入导致根节点失衡，触发右旋转

console.log(avlTree)
console.log("中序遍历结果：");
avlTree.inOrder(avlTree.root);