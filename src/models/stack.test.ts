import Stack from './stack.js';

describe('Stack Data Structure', () => {
	let stack: Stack;

	beforeEach(() => {
		stack = new Stack();
	});

	test('should push an element onto the stack', () => {
		stack.push('Hello');
		expect(stack.peek()).toBe('Hello');
	});

	test('should pop the top element from the stack', () => {
		stack.push('Hello');
		stack.push('World');
		expect(stack.pop()).toBe('World');
		expect(stack.peek()).toBe('Hello');
	});

	test('should throw an error when popping from an empty stack', () => {
		expect(() => stack.pop()).toThrow('Stack is empty');
	});

	test('should peek the top element without removing it', () => {
		stack.push('Hello');
		expect(stack.peek()).toBe('Hello');
		expect(stack.peek()).toBe('Hello');
	});

	test('should throw an error when peeking an empty stack', () => {
		expect(() => stack.peek()).toThrow('Stack is empty');
	});

	test('should check if the stack is empty', () => {
		expect(stack.isEmpty()).toBe(true);
		stack.push('Hello');
		expect(stack.isEmpty()).toBe(false);
	});
});
