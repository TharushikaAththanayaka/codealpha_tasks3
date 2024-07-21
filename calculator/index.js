document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('cal');
    const buttons = document.querySelectorAll('button');

    let currentInput = '';
    let operator = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.innerText;

            if (value >= '0' && value <= '9' || value === '.') {
                currentInput += value;
                display.value = currentInput;
            } else if (value === 'AC') {
                currentInput = '';
                previousInput = '';
                operator = '';
                display.value = '';
            } else if (value === 'DEL') {
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput;
            } else if (value === '+/-') {
                currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
                display.value = currentInput;
            
            } else if (value === '=') {
                if (previousInput && operator && currentInput) {
                    currentInput = calculate(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
                    display.value = currentInput;
                    previousInput = '';
                    operator = '';
                }
            } else {
                if (previousInput && operator && currentInput) {
                    currentInput = calculate(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
                }
                operator = value;
                previousInput = currentInput;
                currentInput = '';
            }
        });
    });

    function calculate(a, b, operator) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case 'x':
                return a * b;
            case '/':
                return a / b;
            case '%':
                return a % b;
            default:
                return b;
        }
    }
});