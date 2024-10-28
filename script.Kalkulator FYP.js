document.addEventListener('DOMContentLoaded', function() {
    let input1;
    let input2;
    let operasiSelected = null;

    // Fungsi helper untuk memperbarui tampilan
    function updateDisplay(elementId, value) {
        document.getElementById(elementId).textContent = value;
    }

    // Event listener untuk tombol angka
    document.querySelectorAll('.tombol-angka').forEach(button => {
        button.addEventListener('click', function() {
            let angka = this.textContent.trim();
            
            if (operasiSelected === null) {
                let angkaSebelumnya = document.getElementById('input1').textContent;
                if (angkaSebelumnya === '...') angkaSebelumnya = '';
                input1 = angkaSebelumnya + angka;
                updateDisplay('input1', input1);
            } else {
                let angkaSebelumnya = document.getElementById('input2').textContent;
                if (angkaSebelumnya === '...') angkaSebelumnya = '';
                input2 = angkaSebelumnya + angka;
                updateDisplay('input2', input2);
            }
        });
    });

    // Event listener untuk tombol operasi
    document.querySelectorAll('.tombol-operasi').forEach(button => {
        button.addEventListener('click', function() {
            let operasiSebelumnya = document.getElementById('operasi-selected').textContent;
            let newOperasi = this.textContent.trim();
            if (operasiSebelumnya === '...') {
                operasiSelected = newOperasi;
                updateDisplay('operasi-selected', operasiSelected);
            }
        });
    });

    // Event listener untuk tombol clear
    document.querySelector('.tombol-clear').addEventListener('click', function() {
        input1 = '';
        input2 = '';
        operasiSelected = null;
        updateDisplay('input1', '...');
        updateDisplay('input2', '...');
        updateDisplay('operasi-selected', '...');
        updateDisplay('hasil', 'hasil');
    });

    // Event listener untuk tombol hitung (=)
    document.getElementById('btn-hitung').addEventListener('click', function() {
        if (input1 && input2 && operasiSelected) {
            let hasil;
            input1 = parseFloat(input1);
            input2 = parseFloat(input2);

            switch (operasiSelected) {
                case '+':
                    hasil = input1 + input2;
                    break;
                case '-':
                    hasil = input1 - input2;
                    break;
                case 'x':
                    hasil = input1 * input2;
                    break;
                case '/':
                    hasil = input1 / input2;
                    break;
                case '^':
                    hasil = Math.pow(input1, input2);
                    break;
                case '%':
                    hasil = input1 % input2;
                    break;
            }

            updateDisplay('hasil', hasil);
            
            // Tidak mereset input dan operasi, hanya update nilai input1
            input1 = hasil;
            // Tetap tampilkan semua nilai
            updateDisplay('input1', hitungan1);
            input2 = '';
            updateDisplay('input2', hitungan2);
            operasiSelected = null;
            updateDisplay('operasi-selected', operasiSelected);
        }
    });

    // Event listener untuk toggle negatif/positif
    document.querySelector('.toggle-negatif').addEventListener('click', function() {
        if (operasiSelected === null && input1) {
            input1 = -parseFloat(input1);
            updateDisplay('input1', input1);
        } else if (operasiSelected && input2) {
            input2 = -parseFloat(input2);
            updateDisplay('input2', input2);
        }
    });

    // Event listener untuk faktorial
    document.querySelector('.tombol-faktorial').addEventListener('click', function() {
        if (input1) {
            let num = parseInt(input1);
            if (num >= 0) {
                let hasilFaktorial = 1;
                for (let i = 2; i <= num; i++) {
                    hasilFaktorial *= i;
                }
                // Tampilkan hasil di bagian hasil
                updateDisplay('hasil', hasilFaktorial);
                // Tampilkan tanda faktorial
                operasiSelected = '!';
                updateDisplay('operasi-selected', '!');
            }
        }
    });

    // Event listener untuk decimal point
    document.querySelector('.decimal').addEventListener('click', function() {
        if (operasiSelected === null) {
            if (input1 && !input1.includes('.')) {
                input1 += '.';
                updateDisplay('input1', input1);
            } else if (!input1) {
                input1 = '0.';
                updateDisplay('input1', input1);
            }
        } else {
            if (input2 && !input2.includes('.')) {
                input2 += '.';
                updateDisplay('input2', input2);
            } else if (!input2) {
                input2 = '0.';
                updateDisplay('input2', input2);
            }
        }
    });
});