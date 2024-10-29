class PriorityQueue {
	constructor(maxSize) {
		this.data = [];
		this.length = 0;
		this.maxSize = maxSize ? maxSize : Math.pow(2, 32) - 1;
	};

	getSize() {
		return this.length;
	};

	isEmpty() {
		return this.length === 0;
	};

	isFull() {
		return this.length === this.maxSize;
	};

	insert(dataValue) {
		if (this.isFull()) {
			throw new Error('PriorityQueue is full! Operation insert() is not supported in full priority queue...');
		}

		const i = this.length;

		this.data[i] = dataValue;

		this.length = this.length + 1;

		return i;
	};

	insertMoreLess(dataValue, key) {
		if (this.isFull()) {
			throw new Error('PriorityQueue is full!!! Operation insertMoreLess() is not supported in full priority queue...');
		}

		let m = this.length;

		for (; m > 0; m--) {
			if (this.data[m - 1].value.frequency < key) {
				this.data[m] = this.data[m - 1];

				continue;
			}

			break;
		}

		this.data[m] = dataValue;

		this.length = this.length + 1;

		return m;
	};

	remove() {
		if (this.isEmpty()) {
			throw new Error('PriorityQueue is empty!!! Operation remove() is not supported in empty priority queue...');
		}

		this.length = this.length - 1;

		const node = this.data[this.length];

		return node;
	};

	display() {
		for (let m = 0; m < this.length; m++) {
			const node = this.data[m];

			node.display();
		}
	};
};
