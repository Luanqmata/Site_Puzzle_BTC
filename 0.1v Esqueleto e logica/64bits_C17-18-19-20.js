import CoinKey from 'coinkey';
import secp256k1 from 'secp256k1';

const prefix = "00000000000000000000000000000000000000000000000000000000000";
const characters = '0123456789abcdef';

var keysArray = [];
var pausa_loop = [];

function gerador_chaves(num) {
    for (let j = 0; j < num; j++) {
        let randomHex = '';
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomHex += characters[randomIndex];
        }
        const newKey = prefix + randomHex;
        keysArray.push(newKey);
    }
}

let chaves_analisadas = 0;

function generatePublic(privateKey) {
    let buffer = Buffer.from(privateKey, 'hex');
    let _key = new CoinKey(buffer);
    _key.compressed = true;

    if (!secp256k1.privateKeyVerify(buffer)) {
        console.log(`Chave privada inválida: ${privateKey}`);
        return null; 
    }

    if (!_key._publicKey) {
        try {
            _key._publicKey = secp256k1.publicKeyCreate(_key.privateKey, _key.compressed);
        } catch (error) {
            console.log(`Erro ao gerar chave pública para ${privateKey}: ${error.message}`);
            return null;
        }
    }

    if (_key.publicAddress === '1HduPEXZRdG26SUT5Yk83mLkPyjnZuJ7Bm' ||
        _key.publicAddress === '1GnNTmTVLZiqQfLbAdp9DVdicEnB5GoERE' || 
        _key.publicAddress === '1NWmZRpHH4XSPwsW6dsS3nrNWfL1yrJj4w' || 
        _key.publicAddress === '1HsMJxNiV7TLxmoF6uJNkydxPFDog4NQum') {
        pausa_loop.push(privateKey);
        console.log('|                                                                   ----------------------ATENÇÃO-PRIVATE-KEY-----------------------\n|                                                                   '+ privateKey);
        return _key.publicAddress + '     <<<<---------- Carteira de 24 bits Encontrada  ----------';
    } else {
        chaves_analisadas += 1;
        return _key.publicAddress;
    }
}

function verificarPausaLoop() {
    return pausa_loop.length !== 0;
}

let rodadas = 0;
const inicioTempo = Date.now();

while (!verificarPausaLoop()) {
    gerador_chaves(90);
    console.log('\n\n|-----------------------------------------------------by-CchyNnAa---|');
    console.log('|   -------------------BEM-VINDO-LOOP-MENU------------------------- |');
    console.log('|    -----Rodada-' + rodadas + '-----------------------------------------------\n|                                                                   |');
    console.log('|   A CARTEIRA DESEJADA É -->> 1HsMJxNiV7TLxmoF6uJNkydxPFDog4NQum   |\n|                                                                   |\n|                                                                   |');
    console.log('|   >>Chaves_Analisadas>> :' + chaves_analisadas + '\n|                                                                   |');
    keysArray.forEach((keyHex, index) => {
        console.log(`|   Possibilidade Carteira ${index + 1}: ${generatePublic(keyHex)}    |\n|                                                                   |`);
    });
    //console.log(keysArray);
    keysArray.length = 0;

    rodadas++;
}
const fimTempo = Date.now();
const tempoTotal = (fimTempo - inicioTempo) / 1000; 
console.log(`\n\nO loop rodou por ${tempoTotal} segundos.`);

if (verificarPausaLoop()) {
    console.log('\n !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!CARTEIRA ENCONTRADA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! \n ______\n|      | \n|OOPS! |\n|WALLET|\n|FOUND!|\n|______|');
}
