import CoinKey from 'coinkey';
import secp256k1 from 'secp256k1';

const prefix = "00000000000000000000000000000000000000000000000000000000000";
const characters = '0123456789abcdef';
const wallets = new Set([
    '1HduPEXZRdG26SUT5Yk83mLkPyjnZuJ7Bm',
    '1GnNTmTVLZiqQfLbAdp9DVdicEnB5GoERE',
    '1NWmZRpHH4XSPwsW6dsS3nrNWfL1yrJj4w',
    '1HsMJxNiV7TLxmoF6uJNkydxPFDog4NQum'
]);

function gerador_de_key(num){
    let chave_gerada = ''
    let prefixos = new Set()
    for(let i = 0; i <  num; i++){
        for (let j = 0; j < 3; j++) { 
            const randomIndex = Math.floor(Math.random() * characters.length);
            prefixos.add(characters[randomIndex]);
        }
    }
    prefixos.forEach(caracters => {
        chave_gerada += caracters
    })
    console.log(prefix + chave_gerada)
}
gerador_de_key(3)