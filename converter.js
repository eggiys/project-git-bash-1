/**
 * Class/Objek berisi logika matematis konversi suhu.
 */
const TemperatureConverter = {
    // Konversi utama dari Celsius ke unit lain
    fromCelsius(val, to) {
        switch (to) {
            case 'F': return (val * 9/5) + 32;
            case 'K': return val + 273.15;
            case 'R': return val * 4/5;
            default: return val;
        }
    },

    // Ubah unit asal terlebih dahulu ke Celsius
    toCelsius(val, from) {
        switch (from) {
            case 'F': return (val - 32) * 5/9;
            case 'K': return val - 273.15;
            case 'R': return val * 5/4;
            default: return val;
        }
    },

    // Fungsi konversi serbaguna
    convert(value, fromUnit, toUnit) {
        if (fromUnit === toUnit) return value;
        const celsiusTemp = this.toCelsius(value, fromUnit);
        return this.fromCelsius(celsiusTemp, toUnit);
    },

    // Teks rumus penjelasan
    getFormula(fromUnit, toUnit) {
        const formulas = {
            'C-F': '°F = (°C × 9/5) + 32',
            'C-K': 'K = °C + 273.15',
            'C-R': '°R = °C × 4/5',
            'F-C': '°C = (°F - 32) × 5/9',
            'F-K': 'K = ((°F - 32) × 5/9) + 273.15',
            'F-R': '°R = (°F - 32) × 4/9',
            'K-C': '°C = K - 273.15',
            'K-F': '°F = ((K - 273.15) × 9/5) + 32',
            'K-R': '°R = (K - 273.15) × 4/5',
            'R-C': '°C = °R × 5/4',
            'R-F': '°F = (°R × 9/4) + 32',
            'R-K': 'K = (°R × 5/4) + 273.15'
        };
        const key = `${fromUnit}-${toUnit}`;
        return formulas[key] || 'Unit sama (Tanpa perubahan)';
    }
};
