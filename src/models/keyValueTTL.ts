class KeyValueTTL {
	private keyValue: Map<string, { value: string | null; ttl?: number }> =
		new Map();
	private expirationQueue: Array<{ key: string; expirationTime: number }> = [];

	/**
	 * Adds a key-value pair to the store with an optional TTL (in milliseconds).
	 * If TTL is provided, the key's value will expire after the specified time.
	 */
	set(key: string, value: string, ttl?: number): void {
		this.cleanupExpiredKeys();

		const expirationTime = ttl ? Date.now() + ttl : undefined;
		this.keyValue.set(key, { value, ttl: expirationTime });

		if (expirationTime) {
			this.expirationQueue.push({ key, expirationTime });
			this.expirationQueue.sort((a, b) => a.expirationTime - b.expirationTime);
		}
	}

	/**
	 * Retrieves the value for a given key.
	 * If the key exists but its value has expired, returns `null`.
	 */
	get(key: string): string | null {
		this.cleanupExpiredKeys();

		const entry = this.keyValue.get(key);
		if (!entry) return null;

		return entry.value;
	}

	/**
	 * Deletes a key-value pair from the store.
	 * Throws an error if the key does not exist.
	 */
	delete(key: string): void {
		if (!this.keyValue.has(key)) {
			throw new Error(`Key "${key}" does not exist.`);
		}
		this.removeFromExpirationQueue(key);
		this.keyValue.set(key, { value: null, ttl: undefined });
	}

	/**
	 * Checks if a key exists in the store (ignores expired values).
	 */
	has(key: string): boolean {
		this.cleanupExpiredKeys();
		return this.keyValue.has(key);
	}

	/**
	 * Removes expired keys from the expiration queue
	 * and set their value to `null` without deleting the keys.
	 */
	private cleanupExpiredKeys(): void {
		const now = Date.now();

		while (
			this.expirationQueue.length > 0 &&
			this.expirationQueue[0].expirationTime <= now
		) {
			const { key } = this.expirationQueue.shift()!;

			const entry = this.keyValue.get(key);
			if (entry) {
				this.keyValue.set(key, { value: null, ttl: undefined });
			}
		}
	}

	/**
	 * Removes a key from the expiration queue.
	 */
	private removeFromExpirationQueue(key: string): void {
		const index = this.expirationQueue.findIndex((item) => item.key === key);
		if (index !== -1) {
			this.expirationQueue.splice(index, 1);
		}
	}
}

export default KeyValueTTL;
