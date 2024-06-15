import CoinKey from 'coinkey';
import secp256k1 from 'secp256k1';

const prefix = "000000000000000000000000000000000000000000000000000000000000";
const characters = '0123456789abcdef';

const wallets = new Set([
    '1Pie8JkxBT6MGPz9Nvi3fsPkr2D8q3GBc1',
    '1ErZWg5cFCe4Vw5BzgfzB74VNLaXEiEkhk',
    '1QCbW9HWnwQWiQqVo5exhAnmfqKRrCRsvW',
    '1BDyrQ6WoF8VN3g9SAS1iKZcPzFfnDVieY'
]);
        
let chaves_analisadas = 0;
let rodadas = 0;
const Resultado = new Set();


function gerarChaveUnica() {
    const novoHex = new Set(); 
    for (let i = 0; novoHex.size < 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        novoHex.add(characters[randomIndex]);
    }
    let randomHex = '';
    novoHex.forEach(elemento => {
        randomHex += elemento;
    });
    return prefix + randomHex;
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

const inicioTempo = Date.now();
while (Resultado.size < 1) {
    const novasChaves = new Set(); 
    for (let i = 0; i < 100; i++) {  
        novasChaves.add(gerarChaveUnica());
    }
    novasChaves.forEach(novaChave => {
        generatePublic(novaChave);
    });

    rodadas++;
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
