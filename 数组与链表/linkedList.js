class Node {
  constructor(value) {
    this.next = null
    this.value = value
  }
}

class LinkedList {
  constructor() {
    this.size = 0;
    this.head = null
  }
  append(value) {
    const newNode = new Node(value)
    if (!this.head) {
      this.head = newNode
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = newNode
    }
    this.size++
  }
  insert(value, index) {
    if (index < 0 || index > this.size) {
      console.error('无效索引')
      return
    }
    const newNode = new Node(value)
    if (index === 0) {
      newNode.next = this.head
      this.head = newNode
    } else {
      let current = this.head
      for (let i = 0; i < index - 1; i++) {
        current = current.next
      }
      newNode.next = current.next
      current.next = newNode
    }
    this.size++
  }
  removeByIndex(index) {
    if (index < 0 || index > this.size) {
      console.error('无效索引')
      return
    }
    let current = this.head
    let pre
    for (let i = 0; i < index; i++) {
      pre = current
      current = current.next
    }
    pre.next = current.next
    this.size--
  }
  removeByValue(value) {
    if (this.head.value === value) {
      this.head = this.head.next
      this.size--
      return
    }
    let current = this.head
    // 这样可以不记录目标前一项(记录前一项可以直接用前一项连接目标后一项，达到删除的目的)
    // 现在就可以把 current 当成前一项了。 current.next 是要删除的，用 current 连接 current.next.next 完成删除
    while (current.next && current.next.value !== value) {
      current = current.next
    }
    // 当跳出上面的循环了，说明 current.next就是要删除的节点
    if (current.next) {
      current.next = current.next.next
      this.size--
    }
  }
  find(value) {
    let current = this.head
    while (current) {
      if (current.value === value) {
        return current
      }
      current = current.next
    }
    return null
  }
  print() {
    let current = this.head
    const result = []
    while (current) {
      result.push(current.value)
      current = current.next
    }
    console.log('size', this.size)
    console.log(result)
  }
}

const linkedList = new LinkedList()

console.log('append', '-------');

for (let i = 0; i < 5; i++) {
  linkedList.append(i * 5)
}
linkedList.print()

console.log('insert', '-------');
linkedList.insert(8, 2)
linkedList.print()

console.log('removeByIndex', '-------');
linkedList.removeByIndex(2)
linkedList.print()
console.log('removeByValue', '-------');
linkedList.removeByValue(10)
linkedList.print()
console.log('find 20', '-------');
linkedList.find(20)
linkedList.print()