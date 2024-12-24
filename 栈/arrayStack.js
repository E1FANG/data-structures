class stack {
  constructor() {
    this.items = []
  }
  // 把数组末尾当作栈顶
  push(item) {
    this.items.push(item)
  }
  pop() {
    if (isEmpty) {
      return null
    } else {
      this.items.pop()
    }
  }
  peek() {
    if (isEmpty) {
      return null
    }
    return this.items[this.items.length - 1]
  }
  size() {
    return this.items.length
  }
  isEmpty() {
    return this.items.length === 0
  }
  print() {
    console.log(this.items)
  }
}