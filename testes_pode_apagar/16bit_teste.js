import CoinKey from 'coinkey';
import secp256k1 from 'secp256k1'

const prefix = "00000000000000000000000000000000000000000000000000000000000"; // ###
const characters = '0123456789abcdef';

const wallets = new Set([
<<<<<<< HEAD:testes_pode_apagar/16bit_teste.js
    '1BDyrQ6WoF8VN3g9SAS1iKZcPzFfnDVieY',
    '1QCbW9HWnwQWiQqVo5exhAnmfqKRrCRsvW',
    '1ErZWg5cFCe4Vw5BzgfzB74VNLaXEiEkhk',
    '1Pie8JkxBT6MGPz9Nvi3fsPkr2D8q3GBc1',
=======
    '1GnNTmTVLZiqQfLbAdp9DVdicEnB5GoERE',  //CARTEIRAS DE 20BITS
    '1NWmZRpHH4XSPwsW6dsS3nrNWfL1yrJj4w',
    '1HsMJxNiV7TLxmoF6uJNkydxPFDog4NQum',
    '1HduPEXZRdG26SUT5Yk83mLkPyjnZuJ7Bm',
>>>>>>> be4ce0c01c1ea1206a7149fa5e5745fd339dcf24:Wallet-found!.js
]);

let chaves_analisadas = 0;
let rodadas = 0;
const Resultado = new Set()

function gerador_chaves() {
    const characters_unicos = new Set();
    for (let i = 0; characters_unicos.size < 5; i++) {//####
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
// 31 red , 32 verde ,33 amarelo , 34 azul, 35 rosa , 30 cinza ,36 zul ciano 
let atual = 'verde'
function Ivnc(text) {
    if (atual === 'verde') {
        console.log('\x1b[32m%s\x1b[0m', text); 
        atual = 'amarelo'; 
    } else if (atual === 'amarelo') {
        console.log('\x1b[33m%s\x1b[0m', text); 
        atual = 'verde'; 
    } 
}
function generatePublic(privateKey) {
    let buffer = Buffer.from(privateKey, 'hex');
    let _key = new CoinKey(buffer);
    _key.compressed = true;
    try {
        _key._publicKey = secp256k1.publicKeyCreate(_key.privateKey, _key.compressed);
    } catch (error) {
        Ivnc(`|             Erro Ao criar CHAVE. ${error.message}        |`);
        return null;
    }
    if (wallets.has(_key.publicAddress)) {
        Resultado.add(`| Pkey = ${privateKey}|\n| Wallet: ${_key.publicAddress}                             |`);
        Ivnc(`\n|--------------`+_key.publicAddress+ `----------------|\n|----------------------ATENÇÃO-PRIVATE-KEY-----------------------|\n|${privateKey}|`);
        return _key.publicAddress;
    } else {
        chaves_analisadas += 1;
<<<<<<< HEAD:testes_pode_apagar/16bit_teste.js
        Ivnc(privateKey);
=======
        //intc(privateKey); //imprimir todas wallets na tela
>>>>>>> be4ce0c01c1ea1206a7149fa5e5745fd339dcf24:Wallet-found!.js
        return null;
    }
}
function Iaavnc(texto) {
<<<<<<< HEAD:testes_pode_apagar/16bit_teste.js
    for(let i=0; i <5;i++){
        console.log('\x1b[3'+i+'m%s\x1b[0m', texto);
    }
}
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const inicioTempo = Date.now();
while (Resultado.size < 1) {
    const chaves_geradas = new Set()
    for (let i = 0; i < 5000; i++) {
=======
    for(let i=0; i <7;i++){
        console.log('\x1b[3'+i+'m%s\x1b[0m', texto);
    }
}
const inicioTempo = Date.now();
while (Resultado.size < 1) {
    const chaves_geradas = new Set()
    for (let i = 0; i < 50000; i++) { //numero de keys geradas
>>>>>>> be4ce0c01c1ea1206a7149fa5e5745fd339dcf24:Wallet-found!.js
        chaves_geradas.add(gerador_chaves())
    }
    chaves_geradas.forEach((converter_key) => {
        generatePublic(converter_key)
    });
    Ivnc('~~ CHina Finder ~~');
    Ivnc('      '+chaves_analisadas);
    rodadas ++;
<<<<<<< HEAD:testes_pode_apagar/16bit_teste.js
    await delay(500);
=======
>>>>>>> be4ce0c01c1ea1206a7149fa5e5745fd339dcf24:Wallet-found!.js
}

const fimTempo = Date.now();
const tempoTotal = (fimTempo - inicioTempo) / 1000;
console.log(`\n\nO loop rodou por ${tempoTotal} segundos.`);
console.log('\n                              ______\n                             |      | \n                             |OOPS! |\n                             |WALLET|\n                             |FOUND!|\n                             |______|');
console.log('|-----------------------------------------------------by-Luan-BSC---|');
Iaavnc('|   -----------------------China-LOOP-MENU------------------------- |');
console.log(`|    -----Rodadas-${rodadas}----------------------------------------------\n|                                                                   |`);
console.log('|              Você está buscando por 4 carteiras                   |\n|                                                                   |\n|                                                                   |');
console.log(`|   >>Chaves_Analisadas>> :${chaves_analisadas}\n|                                                                   |\n|___________________________________________________________________|____`);
<<<<<<< HEAD:testes_pode_apagar/16bit_teste.js
Ivnc(`${Array.from(Resultado).join('\n')}`);
console.log('|________________________________________________________________________|')
=======
console.log(`${Array.from(Resultado).join('\n')}|`);
console.log('|________________________________________________________________________|')
//console.log(chaves_analisadas);
>>>>>>> be4ce0c01c1ea1206a7149fa5e5745fd339dcf24:Wallet-found!.js
