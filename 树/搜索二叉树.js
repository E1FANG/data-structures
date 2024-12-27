class TreeNode {
  val
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}
// 特性： 二分，左节点 < 根节点 < 右节点
class SearchBinaryTree {
  root
  constructor() {
    this.root = null
  }
  search(val) {
    let cur = this.root
    while (cur.val !== val) {
      if (val > cur.val) cur = cur.right
      if (val < cur.val) cur = cur.left
    }
    return cur
  }

  // 二分，根据搜索二叉树的结构特性找到 null 的地方插入。
  insert(val) {
    const newNode = new TreeNode(val)
    if (!this.root) {
      this.root = newNode
      return
    }
    let cur = this.root
    let parent
    while (cur) {
      if (val === cur.val) {
        console.log('已有相同值:', val)
        return
      }
      parent = cur
      if (val < cur.val) {
        cur = cur.left
        if (!cur) {
          parent.left = newNode
        }
      } else if (val > cur.val) {
        cur = cur.right
        if (!cur) {
          parent.right = newNode
        }
      }
    }
  }
  // 删除，要根据被删除节点的度来分情况处理
  // 度 = 0，直接删除节点
  // 度 = 1，删除节点后，接上被删节点的剩余节点(度=1，接上左节点或右节点即可)
  // 度 = 2
  // 被删节点左右节点都有值，由于搜索二叉树的特殊结构，不能随便拼接子节点。
  // 需要将被删节点的右子树的最小左节点，拼接到被删节点上(右节点>被删节点，右子树最小左子节点最接近被删节点的值)
  // 递归删除右子树的最小左节点, 最小左节点必然是没有左节点的，但他可能有右节点。
  // 最小左节点被移动到被删节点处，最小左节点也相当于被删除了，所以他的右子树的最小左子节点也要被移上来，以此循环，就是递归。
  // 度=2时，操作的只是值，不是整个节点(如果操作整个节点，节点的节点也被引用过去了)

  remove(val) {
    if (!this.root) return
    // 找到节点
    let cur = this.root
    let pre
    while (cur.val) {
      if (cur.val === val) {
        break
      }
      pre = cur
      if (cur.val > val) cur = cur.left
      if (cur.val < val) cur = cur.right
    }
    // 判断节点度数
    // 0 || 1
    // 操作的是节点
    if (!cur.left || !cur.right) {
      const child = cur.left === null ? cur.right : cur.left
      if (cur === this.root) {
        console.log('root')
        this.root = child
        return
      }
      if (pre.left === cur) {
        pre.left = child
      } else {
        pre.right = child
      }
    }
    // 2
    // 操作的是值
    if (cur.left && cur.right) {
      // 找到右树中的最小左节点
      const tmp = findMin(cur.right)
      console.log({ tmp })
      // 先递归 在赋值，先赋值就一直在第一次找到值的时候循环了
      this.remove(tmp.val)
      cur.val = tmp.val
    }
  }
}

const findMin = (node) => {
  let _node = node
  while (_node.left) {
    _node = _node.left
  }
  return _node
}

const sbt = new SearchBinaryTree()
sbt.insert(20)
sbt.insert(10)
sbt.insert(30)
sbt.insert(25)
sbt.insert(27)
sbt.insert(26)
// sbt.insert(5)
// sbt.insert(6)

//    20
//  10 30
//    25
//     27
//    26

// console.log(sbt)

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

const levelRes = levelOrder(sbt.root)

console.log('层序', levelRes)

sbt.remove(20)

const levelRes2 = levelOrder(sbt.root)

console.log('层序', levelRes2)

const node26 = sbt.search(26)
console.log({ node26 })