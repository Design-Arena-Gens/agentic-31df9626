function initializeCalculator(windowElement) {
    const display = windowElement.querySelector('.display');
    const buttons = windowElement.querySelector('.buttons');

    let currentInput = '';
    let operator = '';
    let previousInput = '';

    buttons.addEventListener('click', (e) => {
        const button = e.target;
        const value = button.textContent;

        if (!isNaN(value) || value === '.') {
            currentInput += value;
            display.textContent = currentInput;
        } else if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = '';
            display.textContent = '0';
        } else if (value === '±') {
            currentInput = (parseFloat(currentInput) * -1).toString();
            display.textContent = currentInput;
        } else if (value === '%') {
            currentInput = (parseFloat(currentInput) / 100).toString();
            display.textContent = currentInput;
        } else if (value === '=') {
            if (operator && previousInput) {
                currentInput = calculate(previousInput, currentInput, operator);
                display.textContent = currentInput;
                previousInput = '';
                operator = '';
            }
        } else {
            operator = value;
            previousInput = currentInput;
            currentInput = '';
        }
    });

    function calculate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case '+': return (a + b).toString();
            case '-': return (a - b).toString();
            case '×': return (a * b).toString();
            case '÷': return (a / b).toString();
            default: return b;
        }
    }
}
