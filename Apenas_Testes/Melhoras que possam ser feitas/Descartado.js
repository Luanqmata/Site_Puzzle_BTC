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
let keysSet = new Set(); // Utilizado para armazenar chaves geradas
let rodadas = 0;
const Resultado = [];

function gerador_chaves(num) {
    for (let j = 0; j < num; j++) {
        let randomHex = '';
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomHex += characters[randomIndex];
        }
        const newKey = prefix + randomHex;
        if (!keysSet.has(newKey)) {
            keysSet.add(newKey); // Adiciona a chave ao Set de chaves geradas
        }
    }
}

function generatePublic(privateKey) {
    let buffer = Buffer.from(privateKey, 'hex');
    let _key = new CoinKey(buffer);
    _key.compressed = true;

    if (!_key._publicKey) {
        try {
            _key._publicKey = secp256k1.publicKeyCreate(_key.privateKey, _key.compressed);
        } catch (error) {
            console.log(`|             Erro Ao criar CHAVE. ${error.message}          |`);
            return null;
        }
    }

    if (wallets.has(_key.publicAddress)) {
        Resultado.push('| Pkey = '+privateKey + '|\n| Wallet: ' + _key.publicAddress+'                             |');
        console.log(`\n\n|----------------------ATENÇÃO-PRIVATE-KEY-----------------------|\n|${privateKey}|`);
        return _key.publicAddress;
    } else {
        chaves_analisadas += 1;
        return _key.publicAddress;
    }
}

const inicioTempo = Date.now();

while (Resultado.length < 4) {
    gerador_chaves(100);
    let novasChaves = Array.from(keysSet); 
    for (let keyHex of novasChaves) {
        if (!Resultado.includes(keyHex)) {
            generatePublic(keyHex);
        }
    }
    keysSet.clear();
    rodadas++;
}

const fimTempo = Date.now();
const tempoTotal = (fimTempo - inicioTempo) / 1000;

console.log(`\n\nO loop rodou por ${tempoTotal} segundos.`);
console.log('\n                              ______\n                             |      | \n                             |OOPS! |\n                             |WALLET|\n                             |FOUND!|\n                             |______|');
console.log('|-----------------------------------------------------by-Luan-BSC---|');
console.log('|   -----------------------China-LOOP-MENU------------------------- |');
console.log(`|    -----Rodada-${rodadas}-----------------------------------------------\n|                                                                   |`);
console.log('|              Você está buscando por 4 carteiras                   |\n|                                                                   |\n|                                                                   |');
console.log(`|   >>Chaves_Analisadas>> :${chaves_analisadas}\n|                                                                   |\n|___________________________________________________________________|____`);
console.log(`${Resultado.join('\n')}                             \n|________________________________________________________________________|`);
