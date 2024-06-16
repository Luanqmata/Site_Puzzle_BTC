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

let keysArray = [];
let pausa_loop = false;
let chaves_analisadas = 0;
let rodadas = 0;
const Resultado = []

function gerador_chaves(num) {
    for (let j = 0; j < num; j++) {
        let randomHex = '';
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomHex += characters[randomIndex];
        }
        const newKey = prefix + randomHex;
        keysArray.push(newKey);
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
            return null;
        }
    }

    if (wallets.has(_key.publicAddress)) {
        pausa_loop = true
        Resultado.push('| Pkey = '+privateKey + '|\n| Wallet: '+_key.publicAddress)
        console.log('|                                        ----------------------ATENÇÃO-PRIVATE-KEY-----------------------\n|                                           '+ privateKey);
        return _key.publicAddress + '       <<<<---------- Carteira de 32 bits  ----------';
    } else {
        chaves_analisadas += 1;
        return _key.publicAddress;
    }
}

const inicioTempo = Date.now();

while (!pausa_loop) {
    gerador_chaves(50);
    keysArray.forEach((keyHex) => {
        console.log(`|  ${generatePublic(keyHex)}   |\n|                                      |`);
    });
    //console.log(keysArray)
    keysArray = []; //apagar lista
    rodadas++;
}
const fimTempo = Date.now();
const tempoTotal = (fimTempo - inicioTempo) / 1000;

console.log(`\n\nO loop rodou por ${tempoTotal} segundos.`);
console.log('\n                              ______\n                             |      | \n                             |OOPS! |\n                             |WALLET|\n                             |FOUND!|\n                             |______|');
console.log('|-----------------------------------------------------by-Luan-BSC---|');
console.log('|   -----------------------B-T-C-LOOP-MENU------------------------- |');
console.log('|    -----Rodada-' + rodadas + '-----------------------------------------------\n|                                                                   |');
console.log('|              Você está buscando por 4 carteiras                   |\n|                                                                   |');
console.log('|   >>Chaves_Analisadas>> :' + chaves_analisadas + '\n|                                                                   |\n|___________________________________________________________________|____');
console.log(Resultado+'                             |\n|________________________________________________________________________|')