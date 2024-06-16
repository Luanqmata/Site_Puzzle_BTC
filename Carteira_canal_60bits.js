import CoinKey from 'coinkey';
import secp256k1 from 'secp256k1'

const prefix = "C0DE0000000000000000000000000000000000000000000032";
const characters = '0123456789abcdef';

const wallets = new Set([
    '18bHfcm8kGoAhBaQXzzVcG5534mdpWK981', // C_canal
    '19WBGaCZ86wAJz6qQ2kw8vZy7foL4CmoAF',   //testes
    '1CPLCPs4LaejofvvmjfbbqvnFeN3CEEq9a',   //testes
    '1JdmY4eiFGK5cFkjzuk5kzBYxXzcfFbe3',    //testes
    '1P6RqyB6vWx1czPk5kjTwFyK3WBRypGNtM',    //testes
]);

let chaves_analisadas = 0;
let rodadas = 0;
const Resultado = new Set()

function gerador_chaves() {
    const characters_unicos = new Set();
    for (let i = 0; characters_unicos.size < 14; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        characters_unicos.add(characters[randomIndex]);
    }
    let randomHex = '';
    characters_unicos.forEach(elementos_unicos => {
        randomHex += elementos_unicos;
    });
    let chave_gerada = prefix + randomHex
    return chave_gerada
    }

function generatePublic(privateKey) {
    let buffer = Buffer.from(privateKey, 'hex');
    let _key = new CoinKey(buffer);
    _key.compressed = true;
    try {
        _key._publicKey = secp256k1.publicKeyCreate(_key.privateKey, _key.compressed);
    } catch (error) {
        console.log(`|             Erro Ao criar CHAVE. ${error.message}        |`);
        return null;
    }
    if (wallets.has(_key.publicAddress)) {
        Resultado.add(`| Pkey = ${privateKey}|\n| Wallet: ${_key.publicAddress}                             |`);
        console.log(`\n|--------------`+_key.publicAddress+ `----------------|\n|----------------------ATENÇÃO-PRIVATE-KEY-----------------------|\n|${privateKey}|`);
        return _key.publicAddress;
    } else {
        chaves_analisadas += 1;
        return null;
    }
}
function Ivnc(text) {
    console.log('\x1b[32m%s\x1b[0m', text);
}

let Atual = 'zero'
function Iaavnc(texto) {
    if (Atual === 'zero') {
        console.log('\x1b[33m%s\x1b[0m', texto); 
        Atual = 'um'; 
    } else if (Atual === 'um') {
        console.log('\x1b[34m%s\x1b[0m', texto); 
        Atual = 'dois'; 
    } else {
        console.log('\x1b[31m%s\x1b[0m', texto); 
        Atual = 'zero'; 
    }
}

const inicioTempo = Date.now();
while (Resultado.size < 1) {
    const chaves_geradas = new Set()
    for (let i = 0; i < 5000; i++) {
        chaves_geradas.add(gerador_chaves())
    }
    chaves_geradas.forEach((converter_key) => {
        generatePublic(converter_key)
    });
    Ivnc('~~ CHina Finder ~~');
    Iaavnc('      '+chaves_analisadas);
}
const fimTempo = Date.now();
const tempoTotal = (fimTempo - inicioTempo) / 1000;
console.log(`\n\nO loop rodou por ${tempoTotal} segundos.`);
console.log('\n                              ______\n                             |      | \n                             |OOPS! |\n                             |WALLET|\n                             |FOUND!|\n                             |______|');
console.log('|-----------------------------------------------------by-Luan-BSC---|');
console.log('|   -----------------------China-LOOP-MENU------------------------- |');
console.log(`|    -----Rodadas-${rodadas}----------------------------------------------\n|                                                                   |`);
console.log('|              Você está buscando por 4 carteiras                   |\n|                                                                   |\n|                                                                   |');
console.log(`|   >>Chaves_Analisadas>> :${chaves_analisadas}\n|                                                                   |\n|___________________________________________________________________|____`);
console.log(`${Array.from(Resultado).join('\n')}|\n|________________________________________________________________________|`);

//console.log(chaves_analisadas);

