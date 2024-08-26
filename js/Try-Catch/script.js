let balance = 1000;
const balanceDisplay = document.getElementById('balance-display');
const amountInput = document.getElementById('amount');
amountInput.style.display = 'none';

document.getElementById('operation').addEventListener('change', function() {
    const operation = this.value;
    if (operation === 'balance') {
        amountInput.style.display = 'none';
    } else {
        amountInput.style.display = 'block'; 
    }
});

document.getElementById('execute').addEventListener('click', function() {
    const operation = document.getElementById('operation').value;
    const amount = parseFloat(amountInput.value);
    const resultElement = document.getElementById('result');

    try {
        if (operation !== 'balance' && (isNaN(amount) || amount <= 0)) {
            throw new Error('Por favor, insira um valor válido.');
        }

        switch (operation) {
            case 'balance':
                balanceDisplay.textContent = `R$ ${balance.toFixed(2)}`;
                resultElement.textContent = `Seu saldo foi atualizado.`;
                break;
            case 'withdraw':
                if (amount > balance) {
                    throw new Error('Saldo insuficiente para realizar o saque.');
                } else {
                    balance -= amount;
                    resultElement.textContent = `Saque de R$ ${amount.toFixed(2)}, realizado com sucesso.`;
                    balanceDisplay.textContent = `---`;
                }
                break;
            case 'deposit':
                balance += amount;
                resultElement.textContent = `Depósito de R$ ${amount.toFixed(2)}, realizado com sucesso.`;
                balanceDisplay.textContent = `---`;
                break;
            default:
                throw new Error('Operação inválida.');
        }

        resultElement.style.color = 'black'; 
    } catch (error) {
        resultElement.textContent = error.message;
        resultElement.style.color = 'red';
    } finally {
        amountInput.value = '';
    }
});
