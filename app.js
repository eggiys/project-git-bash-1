document.addEventListener('DOMContentLoaded', () => {
    // Ambil elemen DOM
    const tempInput = document.getElementById('temp-input');
    const fromUnitSelect = document.getElementById('from-unit');
    const toUnitSelect = document.getElementById('to-unit');
    const convertBtn = document.getElementById('convert-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultText = document.getElementById('result-text');
    const formulaText = document.getElementById('formula-text');

    // Fungsi utama eksekusi konversi
    function executeConversion() {
        const rawValue = tempInput.value;

        // Validasi input
        if (rawValue === '' || isNaN(rawValue)) {
            resultText.innerText = '⚠️ Invalid';
            formulaText.innerText = 'Harap masukkan angka yang valid!';
            return;
        }

        const value = parseFloat(rawValue);
        const from = fromUnitSelect.value;
        const to = toUnitSelect.value;

        // Panggil logika dari converter.js
        const result = TemperatureConverter.convert(value, from, to);
        const formula = TemperatureConverter.getFormula(from, to);

        // Tampilkan hasil (dibulatkan 2 desimal)
        resultText.innerText = `${result.toFixed(2)} °${to}`;
        formulaText.innerText = `Rumus: ${formula}`;
    }

    // Event Listener untuk Tombol Konversi
    convertBtn.addEventListener('click', executeConversion);

    // Event Listener untuk Auto-Convert saat mengetik
    tempInput.addEventListener('input', () => {
        if (tempInput.value !== '') executeConversion();
    });

    // Event Listener untuk Tombol Reset
    resetBtn.addEventListener('click', () => {
        tempInput.value = '';
        fromUnitSelect.value = 'C';
        toUnitSelect.value = 'F';
        resultText.innerText = '--';
        formulaText.innerText = 'Pilih unit dan masukkan nilai';
    });
});
