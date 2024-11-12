class Stack<T> {
	private stack: T[];

	constructor() {
		this.stack = [];
	}

	push(element: T): void {
		this.stack.push(element);
	}

	pop(): T | undefined {
		if (this.isEmpty()) {
			throw new Error('Stack is empty');
		}
		return this.stack.pop();
	}

	peek(): T | undefined {
		if (this.isEmpty()) {
			throw new Error('Stack is empty');
		}
		return this.stack[this.stack.length - 1];
	}

	isEmpty(): boolean {
		return this.stack.length === 0;
	}
}

export default Stack;
