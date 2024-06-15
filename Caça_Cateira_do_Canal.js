import CoinKey from 'coinkey'; // importando biblioteca key coins 

const prefix = "C0DE0000000000000000000000000000000000000000000032"; //PRIVATE KEYY
const characters = '0123456789abcdef'; // posibilidades de prefixos que a carteira possue 

var keysArray = []; // armazenar todas as PRIVATES KEYS 
var pausa_loop = []; // armazena A carteira do canal se for encontrada 
//PRIVATE KEYY
function gerador_chaves(num) { 
    for (let j = 0; j < num; j++) {              // criar a quantidade de chaves que vão aparecer na tela de acordo com o escolhido
        let randomHex = '';                 //armazenas os prefixos prontos (PRIVATE KEY)
        for (let i = 0; i < 14; i++) {          //Controla o numero de caracters que vai aparecer depois do 32 , 14 porque é uma chave de 16bits
            const randomIndex = Math.floor(Math.random() * characters.length); // contante de sorteio , ela gera um numero aleatorio e multiplica pelo tamanho dos caracters(da const characters) arredonda esse numero, e é armazenada na random index
            randomHex += characters[randomIndex]; // adiciona na let randon Hex , e faz o sorteio dentro dos Caracters
        }
        const newKey = prefix + randomHex; // e soma o prefixo com essas letras e numeros gerados
        keysArray.push(newKey); //adiciona a PRIVATE KEY PRONTA dentro da variavel keys Array
    }
}
function generatePublic(privateKey) {  // função que recebe a PRIVATE KEY gerada
    let buffer = Buffer.from(privateKey, 'hex'); // cria uma variavel de armazenamento e transforma noo obj Buffer para ficar melhor o manuzeio pro node.js e armazena a PRIVATEKEY , e delcara o formato (hexadecimal)
    let _key = new CoinKey(buffer); // Criando um objeto CoinKey que recebe o buffer da chave privada
    _key.compressed = true;  //passa o obj _key e compressa ele para ficar mais rapido de analisar e o codigo rodar mais liso , True como compressado
    if (_key.publicAddress === '18bHfcm8kGoAhBaQXzzVcG5534mdpWK981') { //Verifica se o endereço gerado foi igual ao da CARTEIRA DO CANAL
        pausa_loop.push(privateKey); // Adiciona a lista de PRIVATE KEY para vc comparar, e parar o loop do codigo
        console.log('                                                                          ----------------------ATENÇÃO-----------------------\n  ')
        return _key.publicAddress + '     <<<<---------- Alguma Dessas é a Carteira_do_canal ----------\n' ;//Retorna a carteira encontrada
    } else {
        return _key.publicAddress ; //se não for só mostra a chave e continua
    }
}
function verificarPausaLoop() { 
    return pausa_loop.length !== 0; //se houver itens dentro da lista esta função retorna TRUE se não houver retorna FALSE
}

//let iteracoes = 0; // PARA TESTES
//const limiteIteracoes = 50; // PARA TESTES
                // && iteracoes < limiteIteracoes (para estabelecer um limite coloca isso dentro do while)
while (!verificarPausaLoop()) { // cria um looping , !verificarPausaLoop() {Se o pausa loop estiver vazio [retornando False]} ,, && é para obedecer o a contagem estabelecida quando estou testando o programa
    gerador_chaves(15); //pede para gerar A QNT D chaves
    console.log('\n\n|-----------------------------------------------------by-CchyNnAa---|') //estilo
    console.log('|   -------------------BEM-VINDO-LOOP-MENU------------------------- |')
    console.log('|    ------------------------------------------------------------   |\n|                                                                   |')
    console.log('|   A CARTEIRA DESEJADA É -->> 18bHfcm8kGoAhBaQXzzVcG5534mdpWK981   |\n|                                                                   |\n|                                                                   |')

    keysArray.forEach((keyHex, index) => {     // forEach chama todos os itens que existe na aray (keys array) , (keyHex, index) => cria a keyhex (nome obj para cada item da array), o index (indece do item na array) é uma função de call back q vai retornar oq vc quser dentro das { }
        console.log(`|   Possibilidade Carteira ${index + 1}: ${generatePublic(keyHex)}    |\n|                                                                   |`); // pega o indice e soma +1 e para percorrer a array , e chama a função de converter a PRIVATE KEY HEXADECIMAL para a carteira 
    });
    console.log(keysArray); //imprime na Tela As PRIVATEKEYS
    keysArray.length = 0; // cada vez que esse looping estiver chegando no final ele vai fazer a limpeza da array keys para o codigo não ficar retornando uma lista gigantesca
    
    //iteracoes++; // PARA TESTES
}

if (verificarPausaLoop()) {
    console.log('\n !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!CARTEIRA ENCONTRADA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! \n ______\n|      | \n|OOPS! |\n|WALLET|\n|FOUND!|\n|______|');

} //else {                      //PARA TESTES
//    console.log(`Loop interrompido após ${limiteIteracoes} iterações.`); //PARA TESTES
//}                 //PARA TESTES
