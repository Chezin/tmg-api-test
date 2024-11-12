class KeyValueTTL {
	private keyValue: Record<string, { value: string; ttl?: number }> = {};

	set(key: string, value: string, ttl?: number) {
		let expirationTime;
		if (ttl) expirationTime = Date.now() + ttl;
		this.keyValue[key] = { value, ttl: expirationTime };
	}

	get(key: string): string | null {
		const entry = this.keyValue[key];
		if (!entry) {
			return null;
		}

		if (entry.ttl && Date.now() > entry.ttl) {
			delete this.keyValue[key];
			return null;
		}

		return entry.value;
	}

	delete(key: string) {
		delete this.keyValue[key];
	}

	has(key: string): boolean {
		const entry = this.keyValue[key];

		if (entry.ttl) {
			return Date.now() <= entry.ttl;
		}
		if (entry) {
			return true;
		}
		return false;
	}
}

export default KeyValueTTL;
