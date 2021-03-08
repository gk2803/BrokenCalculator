const display = document.querySelector('.calculator__display');
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const praxeis = document.querySelector('.praxeis');
result = "";
let hide = true;
let counter = 0;




const calculate = (n1, operator, n2) => {
	counter++;
	if(counter>12){
		counter =0;
		result=""
	}
	console.log(counter);
	const firstNum = parseFloat(n1)
	const secondNum = parseFloat(n2)

		if (operator === 'add') {
			result += `${firstNum.toString()} + ${secondNum.toString()}=${firstNum+secondNum}\n`

			praxeis.innerText = result
			return firstNum + secondNum;
		}


		if (operator === 'subtract') {
			result += `${firstNum.toString()} - ${secondNum.toString()}=${firstNum-secondNum} \n`

			praxeis.innerText = result

			return firstNum - secondNum;
		}
		if (operator === 'multiply') {
			result += `${firstNum.toString()} x ${secondNum.toString()}=${firstNum*secondNum} \n`

			praxeis.innerText = result

			return firstNum * secondNum;
		}
		if (operator === 'divide') {
			result += `${firstNum.toString()} / ${secondNum.toString()}=${firstNum/secondNum} \n`

			praxeis.innerText = result

			return firstNum / secondNum;
		}

	}




keys.addEventListener('click', e => {
	if (e.target.matches('button')) {
		const key = e.target;
		const action = key.dataset.action;
		const keyContent = key.textContent;
		const displayedNum = display.textContent;
		// Remove .is-depressed class from all keys
		Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
		if (action === 'hide') {
			hide = (!hide)
			hide ? key.textContent = 'hide' : key.textContent = 'show';
			previousKeyType = 'hide'
			console.log(previousKeyType)

		}
		if (!action) {
			if (hide && key.className != 'orangeBox') {
				const previousKeyType = calculator.dataset.previousKeyType;
				if (displayedNum === '0' ||
					previousKeyType === 'operator' ||
					previousKeyType === 'calculate') {
					display.textContent = keyContent;
				} else {
					display.textContent = displayedNum + keyContent;
				}
				calculator.dataset.previousKeyType = 'number';
			} else {

				key.classList.add('orangeBox')

			}
		}
		if (action ==='reset'&&hide===true){
			Array.from(key.parentNode.children).forEach(k => k.classList.remove('orangeBox'));

		}
		if (action === 'decimal') {
			if (!displayedNum.includes('.')) {
				display.textContent = displayedNum + '.';
			} else if (
				previousKeyType === 'operator' ||
				previousKeyType === 'calculate'
			) {
				display.textContent = '0.';
			}
			calculator.dataset.previousKeyType = 'decimal'
		}

		if (
			action === 'add' ||
			action === 'subtract' ||
			action === 'multiply' ||
			action === 'divide'
		) {
			if (hide && key.className != 'orangeBox') {
				const firstValue = calculator.dataset.firstValue;
				const operator = calculator.dataset.operator;
				const secondValue = displayedNum;
				const previousKeyType = calculator.dataset.previousKeyType;
				if (
					firstValue &&
					operator &&
					previousKeyType !== 'operator' &&
					previousKeyType !== 'calculate') {
					const calcValue = calculate(firstValue, operator, secondValue);
					display.textContent = calcValue;
					// Update calculated value as firstValue
					calculator.dataset.firstValue = calcValue;
				} else {
					// If there are no calculations, set displayedNum as the firstValue
					calculator.dataset.firstValue = displayedNum;
				}

				key.classList.add('is-depressed');
				// Add custom attribute
				calculator.dataset.previousKeyType = 'operator';
				calculator.dataset.operator = action;
			} else {

				key.classList.remove('key--operator')
				calculator.dataset.previousKeyType = 'hide'

				key.classList.add('orangeBox')
			}
		}

		if (action === 'decimal') {
			if (!displayedNum.includes('.')) {
				display.textContent = displayedNum + '.';
			}
			if (calculator.dataset.previousKeyType === 'operator') {
				display.textContent = '0.';
			}
			calculator.dataset.previousKeyType = 'decimal';
		}

		if (action === 'clear') {

			calculator.dataset.firstValue = '';
			calculator.dataset.modValue = '';
			calculator.dataset.operator = '';
			display.textContent = 0;
			calculator.dataset.previousKeyType = 'clear';
		}
		if (action !== 'clear') {
			const clearButton = calculator.querySelector('[data-action=clear]')
			clearButton.textContent = 'CE';
		}

		if (action === 'calculate') {
			let firstValue = calculator.dataset.firstValue;
			const operator = calculator.dataset.operator;
			let secondValue = displayedNum;
			const previousKeyType = calculator.dataset.previousKeyType;
			if (firstValue) {
				if (previousKeyType === 'calculate') {
					firstValue = displayedNum;
					secondValue = calculator.dataset.modValue;
				}
				display.textContent = calculate(firstValue, operator, secondValue);
			}
			// Set modValue attribute
			calculator.dataset.modValue = secondValue;
			calculator.dataset.previousKeyType = 'calculate';
		}
	}
})
