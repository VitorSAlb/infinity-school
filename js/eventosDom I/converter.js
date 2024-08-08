function convert() {
    const meters = parseFloat(document.getElementById('inputValue').value);
    const unit = document.getElementById('unitSelect').value;
    let result = 0;

    if (isNaN(meters)) {
        document.getElementById('result').innerText = "Por favor, insira um valor válido.";
        return;
    }

    switch (unit) {
        case 'yard':
            result = meters * 1.094;
            break;
        case 'foot':
            result = meters * 3.281;
            break;
        case 'inch':
            result = meters * 39.37;
            break;
        case 'mile':
            result = meters * 0.000621;
            break;
        default:
            result = 0;
    }

    document.getElementById('result').innerText = `Resultado: ${result.toFixed(4)} ${unit}(s)`;
}
