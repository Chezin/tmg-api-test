class Stack {
	private stack: string[];

	constructor() {
		this.stack = [];
	}

	/**
	 * Adds element to the top of the stack
	 * @param element string that will be added to the stack
	 */
	push(element: string): void {
		this.stack.push(element);
	}

	/**
	 * Removes and returns the element on top of the stack
	 * @returns element on top of the stack
	 */
	pop(): string | undefined {
		return this.stack.pop();
	}

	isEmpty(): boolean {
		return this.stack.length === 0;
	}
}

export default Stack;
