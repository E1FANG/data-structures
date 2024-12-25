import n1 from "./二叉树.mjs";

const levelOrder = (root) => {
  const queue = [root]
  const list = []

  while (queue.length) {
    const node = queue.shift()
    list.push(node.val)
    node.left && queue.push(node.left)
    node.right && queue.push(node.right)
  }

  return list
}

const levelRes = levelOrder(n1)

console.log('层序', levelRes)

// 以根节点在输出顺序的位置命名 的 深度优先递归算法

// 前序 根-左-右
const preRes = []
const preOrder = (root) => {
  if (root === null) return
  preRes.push(root.val)
  preOrder(root.left)
  preOrder(root.right)
}
preOrder(n1)
console.log('前序', preRes)

// 中序 左-根-右
const inRes = []
const inOrder = (root) => {
  if (root === null) return
  inOrder(root.left)
  inRes.push(root.val)
  inOrder(root.right)
}
inOrder(n1)
console.log('中序', inRes)


// 后序 左-右-根
const postRes = []
const postOrder = (root) => {
  if (root === null) return
  postOrder(root.left)
  postOrder(root.right)
  postRes.push(root.val)
}
postOrder(n1)
console.log('后序', postRes)