//#############CONVERSOR#CONVERSOR#CONVERSOR#CONVERSOR#CONVERSOR#CONVERSOR#CONVERSOR#CONVERSOR#CONVERSOR#CONVERSOR
import CoinKey from 'coinkey';

let Chave_Privada = 'C0DE0000000000000000000000000000000000000000000013c96a3742f64906';

function generatePublic(privateKey){
    let buffer = Buffer.from(privateKey, 'hex');
    let _key = new CoinKey(buffer);
    _key.compressed = true;
    console.log(_key.publicAddress)
}

generatePublic(Chave_Privada);
//#######CONVERSOR#CONVERSOR#CONVERSOR#CONVERSOR#CONVERSOR#CONVERSOR#CONVERSOR#CONVERSOR#CONVERSOR#CONVERSOR#CONVERSOR