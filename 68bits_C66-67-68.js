import CoinKey from 'coinkey';
import secp256k1 from 'secp256k1';

const prefix = "00000000000000000000000000000000000000000000000";
const characters = '0123456789abcdef';

const wallets = new Set([
    '18ZMbwUFLMHoZBbfpCjUJQTCMCbktshgpe',  // Carteiras de 68 bits , nao encontradas
    '13zb1hQbWVsc2S7ZTZnP2G4undNNpdh5so',
    '1BY8GQbnueYofwSuFAT3USAhGjPrkxDdW9',
    '1MVDYgVaSN6iKKEsbzRUAYFrYJadLYZvvZ',
]);

let chaves_analisadas = 0;
let rodadas = 0;
const Resultado = new Set();

function gerador_chaves(){
    let carcters_unicos = []
    for(let i = 0; i< 17 ; i++){
        const randomIndex = Math.floor(Math.random()*characters.length);
        carcters_unicos.push(characters[randomIndex]);
    }
    let chave_gerada = prefix + carcters_unicos.join("");
    //console.log(chave_gerada)
    return chave_gerada
}

// 31 red , 32 verde ,33 amarelo , 34 azul, 35 rosa , 30 cinza ,36 zul ciano 
let atual = 'verde';
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
        Ivnc(privateKey);
        return null;
    }
}

function Iaavnc(texto) {
    for(let i=0; i <5;i++){
        console.log('\x1b[3'+i+'m%s\x1b[0m', texto);
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const inicioTempo = Date.now();
while (Resultado.size < 1) {
    const chaves_geradas = new Set();
    for (let i = 0; i < 75000; i++) {
        chaves_geradas.add(gerador_chaves());
    }
    chaves_geradas.forEach((converter_key) => {
        generatePublic(converter_key);
    });
    Ivnc('~~ CHina Finder ~~');
    Ivnc('      '+chaves_analisadas);
    rodadas++;
    await delay(500); // Delay de 1 segundo
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
Ivnc(`${Array.from(Resultado).join('\n')}`);
console.log('|________________________________________________________________________|');