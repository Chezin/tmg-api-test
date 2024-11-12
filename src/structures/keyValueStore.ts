class KeyValueStore {
	private store: Record<string, { value: string; ttl?: number }> = {};

	set(key: string, value: string, ttl?: number) {
		let expirationTime;
		if (ttl) expirationTime = Date.now() + ttl;
		this.store[key] = { value, ttl: expirationTime };
	}

	get(key: string): string | null {
		const entry = this.store[key];
		if (!entry) {
			return null;
		}

		if (entry.ttl && Date.now() > entry.ttl) {
			delete this.store[key];
			return null;
		}

		return entry.value;
	}

	delete(key: string) {
		delete this.store[key];
	}

	has(key: string): boolean {
		const entry = this.store[key];
		if (!entry || !entry.ttl) return false;

		return Date.now() <= entry.ttl;
	}
}

export default KeyValueStore;
