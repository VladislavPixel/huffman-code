class PayloadNodeHuffman {
	constructor(value, frequency) {
		this.value = value;
		this.frequency = frequency;
	};
};

class TreeNode {
	constructor(value) {
		this.value = value;
		this.leftChild = null;
		this.rightChild = null;
	};

	display() {
		console.log(`Node| Value: ${this.value.value}; Freq: ${this.value.frequency};`);
	};
};

class Tree {
	constructor() {
		this.root = null;
	};

	setRoot(node) {
		this.root = node;
	};

	getRoot() {
		return this.root;
	};

	forwardTraversal() {
		let current = this.root;

		const stack = [];

		let result = '';

		while(current || stack.length) {
			if (current) {
				stack.push(current);

				result = result + ' V: ' + current.value.value + '; Freq: ' + current.value.frequency + ';';

				current = current.leftChild;

			} else {
				const node = stack.pop();

				if (node) {
					current = node.rightChild;
				}
			}
		}

		console.log('Forward: ', result);
	};

	widthTraversal() {
		let current = this.root;

		const stack = [current];

		let result = '';

		while(stack.length !== 0) {
			const node = stack.shift();

			result = result + ` value: ${node.value.value}; Freq: ${node.value.frequency};`;

			if (node.leftChild) {
				stack.push(node.leftChild);
			}

			if (node.rightChild) {
				stack.push(node.rightChild);
			}
		}

		console.log('Width Traversal', result);
	};

	generateCodeHuff(alphabet) {
		const result = new Array(Object.keys(alphabet).length);

		function recForwardTraversal(node, codeStr) {
			if (!node) {
				return;
			}

			const val = node.value.value;

			if (val) {
				result[alphabet[val]] = codeStr;
			}

			recForwardTraversal(node.leftChild, codeStr + '0');
			recForwardTraversal(node.rightChild, codeStr + '1');
		};

		recForwardTraversal(this.root, '');

		return result;
	};

	decodingMessage(code) {
		let message = '';

		let current = this.root;

		for (let m = 0; m <= code.length; m++) {
			if (current && current.value.value !== '') {
				const x = current.value.value;

				if (x === '*space*') {
					message += ' ';

				} else if (x === '*newLine*') {
					message += '\n';

				} else {
					message += x;
				}

				current = this.root;
			}

			const char = code[m];

			if (char === '0') {
				current = current.leftChild;

			} else {
				current = current.rightChild;
			}
		}

		return message;
	};
};
