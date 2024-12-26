class TreeNode {
  val;
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class SearchBinaryTree {
  root;
  constructor() {
    this.root = null;
  }
  insert(val) {
    const newNode = new TreeNode(val);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let cur = this.root;
    let parent;
    while (cur) {
      parent = cur;
      if (val < cur.val) {
        cur = cur.left;
        if (!cur) {
          parent.left = newNode;
        }
      } else if (val > cur.val) {
        cur = cur.right;
        if (!cur) {
          parent.right = newNode;
        }
      }
    }
  }
  visualizeTree() {
    if (!this.root) {
      return 'Empty tree';
    }
    function visualize(node) {
      if (!node) {
        return { lines: [], width: 0, height: 0 };
      }
      const left = visualize(node.left);
      const right = visualize(node.right);
      const valString = node.val.toString();
      const middle = Math.max(left.width, right.width) + 1;
      const leftPad = Math.floor((middle - left.width) / 2);
      const rightPad = middle - leftPad - left.width;
      const topLine = ' '.repeat(leftPad) + left.lines[0] + ' '.repeat(rightPad);
      const midLine = ' '.repeat(left.width + leftPad) + valString + ' '.repeat(right.width + rightPad);
      const bottomLine = ' '.repeat(leftPad) + right.lines[0] + ' '.repeat(rightPad);
      const lines = [topLine, midLine, bottomLine];
      for (let i = 1; i < Math.max(left.height, right.height); i++) {
        const leftPart = i < left.height ? left.lines[i] : ' '.repeat(left.width);
        const rightPart = i < right.height ? right.lines[i] : ' '.repeat(right.width);
        lines.push(' '.repeat(leftPad) + leftPart + ' '.repeat(rightPad + right.width - left.width));
      }
      return { lines, width: left.width + right.width + leftPad + rightPad, height: Math.max(left.height, right.height) + 3 };
    }
    const result = visualize(this.root);
    return result.lines.join('\n');
  }
}

const sbt = new SearchBinaryTree();
sbt.insert(5);
sbt.insert(4);
sbt.insert(3);
sbt.insert(2);
sbt.insert(8);
sbt.insert(7);
sbt.insert(6);

console.log(sbt.visualizeTree());