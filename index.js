// Для сообщения могут использоваться:
// 1.любые буквы русского алфавита;
// 2.пробел - ' ';
// 3.перевод текста на новую строку - (-);
// 4. точки, запятые, тире и прочие символы ставить нельзя;

// Исходное сообщение от М.Ю. Лермонтова
const phrase = 'в природе противоположные причины часто производят одинаковые действия(-)лошадь равно падает на ноги от застоя и от излишней езды(-)человек равно портится от вседозволенности и от чрезмерного контроля';

const boxItemAndFrequencies = {};

let str = '';

// Ключи на два частных случая: пробел между словами в сообщении и перенос текста на новую строчку
const keyNewLine = '*newLine*';
const keySpace = '*space*';

// Генерируем мапу с частотой вхождений символов
for (let m = 0; m < phrase.length; m++) {
	const item = phrase[m];

	if (item === '(' || item === '-' || item === ')') {
		str = str + item;

		if (item === ')') {
			if (str === '(-)') {
				if (boxItemAndFrequencies[keyNewLine]) {
					boxItemAndFrequencies[keyNewLine] = boxItemAndFrequencies[keyNewLine] + 1;

				} else {
					boxItemAndFrequencies[keyNewLine] = 1;
				}
			}

			str = '';
		}

		continue;
	}

	if (item === ' ') {
		if (boxItemAndFrequencies[keySpace]) {
			boxItemAndFrequencies[keySpace] = boxItemAndFrequencies[keySpace] + 1;

		} else {
			boxItemAndFrequencies[keySpace] = 1;
		}

		continue;
	}

	if (boxItemAndFrequencies[item]) {
		boxItemAndFrequencies[item] = boxItemAndFrequencies[item] + 1;

	} else {
		boxItemAndFrequencies[item] = 1;
	}
}

const arrKeys = Object.keys(boxItemAndFrequencies);

const priorityQueue = new PriorityQueue();

// Наполняем приоритетную очередь узлами, чтобы в последующем выстроить дерево Хаффмана
for (let v = 0; v < arrKeys.length; v++) {
	const key = arrKeys[v];
	const freq = boxItemAndFrequencies[key];

	const treeNode = new TreeNode(new PayloadNodeHuffman(key, freq));

	priorityQueue.insertMoreLess(treeNode, freq);
}

// Собираем дерево Хаффмана
while(priorityQueue.getSize() > 1) {
	const node1 = priorityQueue.remove();
	const node2 = priorityQueue.remove();

	const freq = node1.value.frequency + node2.value.frequency;

	const parentNode = new TreeNode(new PayloadNodeHuffman('', freq));

	parentNode.rightChild = node1;
	parentNode.leftChild = node2;

	priorityQueue.insertMoreLess(parentNode, freq);
}

// Дерево
const treeHuff = new Tree();
treeHuff.setRoot(priorityQueue.remove());

// Заводим алфавит с индексами
const mapAlphabet = {};

let i = 0;

for (let m = 1072; m <= 1103; m++) {
	const char = String.fromCodePoint(m);

	mapAlphabet[char] = i;

	i++;

	if (m === 1077) {
		mapAlphabet['ё'] = i;

		i++;
	}
}

mapAlphabet[keyNewLine] = 33;
mapAlphabet[keySpace] = 34;

// Имея дерево Хаффмана, имея алфавит с индексами в массиве, мы можем на каждый индекс массива (для каждого символа) составить код-Хаффмана, по которому закодируется сообщение
const boxWithCodes = treeHuff.generateCodeHuff(mapAlphabet);

// Кодируем исходное сообщение
let codedMessage = '';

let auxStr = '';

for (let n = 0; n < phrase.length; n++) {
	const char = phrase[n];

	if (char === ' ') {
		codedMessage += boxWithCodes[mapAlphabet[keySpace]];

		continue;
	}

	if (char === '(' || char === '-' || char === ')') {
		auxStr = auxStr + char;

		if (char === ')') {
			if (auxStr === '(-)') {
				codedMessage += boxWithCodes[mapAlphabet[keyNewLine]];
			}

			auxStr = '';
		}

		continue;
	}

	codedMessage += boxWithCodes[mapAlphabet[char]];
}

console.log('Вывод закодированной строки ===============================================');
console.log(codedMessage);

const decodedMessage = treeHuff.decodingMessage(codedMessage);

console.log('Вывод декодированной строки ===============================================');
console.log(decodedMessage);
