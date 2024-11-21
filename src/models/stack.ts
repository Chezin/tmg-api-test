class Stack {
	private stack: string[];

	constructor() {
		this.stack = [];
	}

	push(element: string): void {
		this.stack.push(element);
	}

	pop(): string | undefined {
		if (this.stack.length === 0) {
			throw new Error('Stack is empty');
		}
		return this.stack.pop();
	}

	peek(): string | undefined {
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
