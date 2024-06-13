import CoinKey from 'coinkey';

function generatePublic(privateKey) {
    // Converte a string hexadecimal para um Buffer
    let buffer = Buffer.from(privateKey, 'hex');
    
    // Cria um novo CoinKey com o buffer
    let _key = new CoinKey(buffer);
    
    // Define a compressão da chave pública
    _key.compressed = true;
    
    // Retorna o endereço público gerado
    return _key.publicAddress;
}

// Lista de chaves privadas em formato hexadecimal
const keys = [
    'C0DE0000000000000000000000000000000000000000000032245cf3f53afa20',
];

// Itera sobre cada chave privada, gerando e imprimindo o endereço público correspondente
keys.forEach((keyHex, index) => {
    console.log(`Chave privada ${index + 1} (hex): ${keyHex}`);
    console.log(`Endereço público ${index + 1}: ${generatePublic(keyHex)}`);
});
// NESSE CODIGO EU GEREI AS KEYS QUE PODEM SER DA CARTEIRA DO CANAL TRANSFORMANDO ELAS EM CARTEIRA  desafio cartera