// Array de números
const arrayNumeros = [218,250,151,110,250,16,45,217,151,82,35,74,188,47,30,66,87,177,247,68];

// Função para converter número para string hexadecimal com dois dígitos
function byteToHex(byte) {
    return ('0' + byte.toString(16)).slice(-2); // Garante que terá sempre dois dígitos hexadecimais
}

// Converter cada número do array para hexadecimal e concatenar
const hexString = arrayNumeros.map(byteToHex).join('');

// Exibir o resultado
console.log('Número hexadecimal resultante:', hexString);
//CONVERSÃO DO DECIMAL PRA ETHERIUM  desafio cartera
 