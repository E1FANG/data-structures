class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // 添加节点到链表末尾
  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  // 在指定索引插入节点
  insert(value, index) {
    if (index < 0 || index > this.size) {
      return; // 无效索引
    }
    const newNode = new Node(value);
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current.next;
      }
      newNode.next = current.next;
      current.next = newNode;
    }
    this.size++;
  }

  // 删除指定值的节点
  remove(value) {
    if (!this.head) return;

    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;
      return;
    }

    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
      this.size--;
    }
  }

  // 查找节点
  find(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }
    return null; // 未找到
  }

  // 打印链表
  print() {
    let current = this.head;
    let result = '';
    while (current) {
      result += current.value + (current.next ? ' -> ' : '');
      current = current.next;
    }
    console.log(result);
  }
}


const linkedList = new LinkedList()

for (let i = 0; i < 3; i++) {
  linkedList.append(new Node(i * 5))
}

linkedList.print()