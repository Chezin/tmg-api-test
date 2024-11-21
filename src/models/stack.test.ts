import Stack from './stack.js';

describe('Stack Model', () => {
	let stack: Stack;

	beforeEach(() => {
		stack = new Stack();
	});

	test('should push an element onto the stack', () => {
		stack.push('Hello');
		expect(stack.pop()).toBe('Hello');
	});

	test('should pop the top element from the stack', () => {
		stack.push('Hello');
		stack.push('World');
		expect(stack.pop()).toBe('World');
		expect(stack.pop()).toBe('Hello');
	});

	test('should return undefined when popping from an empty stack', () => {
		expect(stack.pop()).toBeUndefined();
	});

	test('should handle multiple push and pop operations correctly', () => {
		stack.push('A');
		stack.push('B');
		stack.push('C');

		expect(stack.pop()).toBe('C');
		expect(stack.pop()).toBe('B');
		expect(stack.pop()).toBe('A');
		expect(stack.isEmpty()).toBe(true);
	});

	test('should return true for isEmpty() when stack is empty', () => {
		expect(stack.isEmpty()).toBe(true);
	});

	test('should return false for isEmpty() when stack has elements', () => {
		stack.push('A');
		expect(stack.isEmpty()).toBe(false);
	});
});
