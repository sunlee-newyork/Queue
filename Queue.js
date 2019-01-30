class Node {
	constructor(value) {
		this.value = value
		this.left = null
		this.right = null
	}

	getValue() {
		return this.value
	}

	getLeft() {
		return this.left
	}

	getRight() {
		return this.right
	}

	setLeft(node) {
		this.left = node
	}

	setRight(node) {
		this.right = node
	}
}

class DoublyLinkedList {
	constructor() {
		this.head = null
		this.last = null
		this.length = 0
	}

	_setHead(value) {
		this.head = new Node(value)
		this.last = this.head
	}

	_increase() {
		this.length++
	}

	_decrease() {
		if (this.length > 0) this.length--
	}

	addLast(value) {
		if (!this.head) this._setHead(value)
		else {
			const node = new Node(value)

			this.last.setRight(node)
			node.setLeft(this.last)
			this.last = node
		}

		this._increase()

		return this
	}

	addFirst(value) {
		if (!this.head) this._setHead(value)
		else {
			const node = new Node(value)

			this.head.setLeft(node)
			node.setRight(this.head)
			this.head = node
		}

		this._increase()

		return this
	}

	_removeHead() {
		let prevHead = this.head

		this.head = null
		this.last = null

		return prevHead
	}

	removeLast() {
		if (this.isEmpty()) return new Error("List is empty");

		if (!this.head.getRight()) {
			let head = this._removeHead()
			this._decrease()
			return head
		}

		let prevLast = new Node(this.last.getValue())

		let newLast = this.last.left
		this.last = newLast
		this.last.setRight(null)

		this._decrease()

		return this
	}

	removeFirst() {
		if (this.isEmpty()) return new Error("List is empty");
		
		if (!this.head.getRight()) {
			let head = this._removeHead()
			this._decrease()
			return head
		}

		let prevHead = new Node(this.head.getValue())

		let newHead = this.head.getRight()
		newHead.setLeft(null)
		this.head = newHead

		this._decrease()

		return prevHead
	}

	getFirst() {
		return this.head
	}

	getLast() {
		return this.last
	}

	size() {
		return this.length
	}

	isEmpty() {
		return this.length === 0
	}
}

class Queue {
	constructor() {
		this.queue = new DoublyLinkedList()
	}

	push(arg) {
		if (!Array.isArray(arg)) arg = [arg]

		for (let i=0; i < arg.length; i++) {
			this.queue.addLast(arg[i])
		}

		return this.queue
	}

	shift() {
		return this.queue.removeFirst()
	}

	first() {
		return this.queue.getFirst()
	}

	last() {
		return this.queue.getLast()
	}

	indexOf(index) {
		if (index < 0) return new Error("Index cannot be less than zero")
		if (index + 1 > this.queue.size()) return new Error("Index is out of bounds")

		let counter = 0;
		let node = this.first();

		while (counter !== index) {
			node = node.getRight()
			counter++
		}

		return node
	}

	size() {
		return this.queue.size()
	}

	print() {
		let node = this.first()

		while (node) {
			console.log(node)
			node = node.getRight()
		}
	}
}

/*****************/
/* SAMPLE RUNNER */
/*****************/

let queue = new Queue()

queue.size() // 0

queue.push(1)
queue.size() // 1

queue.push([2,3,4])
queue.size() // 4

queue.shift() // first item
queue.size() // 3

queue.first() // Node with value 2
queue.last() // Node with value 4

queue.print() // List of nodes from values 2 to 4

queue.indexOf(2) // Node with value 4
queue.indexOf(3) // Error - Out of bounds