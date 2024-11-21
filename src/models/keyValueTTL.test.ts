import KeyValueTTL from './keyValueTTL.js';

describe('KeyValue Model', () => {
	let keyValueTTL: KeyValueTTL;

	beforeEach(() => {
		keyValueTTL = new KeyValueTTL();
	});

	test('should set and get a key without TTL', () => {
		keyValueTTL.set('name', 'John');
		expect(keyValueTTL.get('name')).toBe('John');
	});

	test('should return null for non-existent key', () => {
		expect(keyValueTTL.get('age')).toBeNull();
	});

	test('should delete a key', () => {
		keyValueTTL.set('name', 'John');
		keyValueTTL.delete('name');
		expect(keyValueTTL.get('name')).toBeNull();
	});

	test('should set and get a key with TTL', (done) => {
		keyValueTTL.set('temp', 'data', 1000);
		expect(keyValueTTL.get('temp')).toBe('data');

		setTimeout(() => {
			expect(keyValueTTL.get('temp')).toBeNull();
			done();
		}, 1100);
	});

	test('should not expire key before TTL', (done) => {
		keyValueTTL.set('temp', 'data', 2000);
		setTimeout(() => {
			expect(keyValueTTL.get('temp')).toBe('data');
			done();
		}, 1000);
	});

	test('should remove value after TTL expires', (done) => {
		keyValueTTL.set('session', 'active', 500);
		setTimeout(() => {
			expect(keyValueTTL.get('session')).toBeNull();
			done();
		}, 600);
	});

	test('should handle multiple keys with different TTLs', (done) => {
		keyValueTTL.set('key1', 'value1', 500);
		keyValueTTL.set('key2', 'value2', 1000);
		keyValueTTL.set('key3', 'value3', 2000);

		setTimeout(() => {
			expect(keyValueTTL.get('key1')).toBeNull();
			expect(keyValueTTL.get('key2')).toBe('value2');
			expect(keyValueTTL.get('key3')).toBe('value3');
		}, 750);

		setTimeout(() => {
			expect(keyValueTTL.get('key2')).toBeNull();
			expect(keyValueTTL.get('key3')).toBe('value3');
			done();
		}, 1500);
	});
});
