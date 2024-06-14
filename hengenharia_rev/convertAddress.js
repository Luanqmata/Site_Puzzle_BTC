import bs58check from 'bs58check';

// Endereço Bitcoin base58check
const bitcoinAddress = '16VAE6Dt8psXxasCjHD97D4LA564TKdGKo';     

try {
    // Decodificar o endereço base58check para um Buffer
    const decoded = bs58check.decode(bitcoinAddress);

    // O primeiro byte é o tipo de rede (geralmente 0x00 para mainnet Bitcoin)
    const networkByte = decoded[0];

    // Os próximos 20 bytes são o hash160 do endereço
    const hash160 = decoded.slice(1);

    // Converter para formato hexadecimal
    const hexAddress = hash160.toString('hex');

    console.log('Endereço Bitcoin em formato hexadecimal:', hexAddress);
} catch (error) {
    console.error('Erro ao decodificar o endereço Bitcoin:', error.message);
}
//DEPOIS EU PEGO A CARTEIRA PREENCHO E ELE VAI ME DA UM DECIMALQUE É O DECIMAL DE ACESSO , POREM ELE TA ME DANDO EM ETHERIUM desafio cartera