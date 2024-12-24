class TreeNode {
  val;
  left;
  right;
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

const n1 = new TreeNode(1)
const n2 = new TreeNode(2)
const n3 = new TreeNode(3)
const n4 = new TreeNode(4)
const n5 = new TreeNode(5)

n1.left = n2
n1.right = n3
n2.left = n4
n2.right = n5


console.log(n1)

