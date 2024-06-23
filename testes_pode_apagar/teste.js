const prefix = "00000000000000000000000000000000000000000000000";
const characters = '0123456789abcdef';

function gerador_chaves(){
    let carcters_unicos = []
    for(let i = 0; i< 17 ; i++){
        const randomIndex = Math.floor(Math.random()*characters.length);
        carcters_unicos.push(characters[randomIndex]);
    }
    let chave_gerada = prefix + carcters_unicos.join("");
    //console.log(chave_gerada)
    console.log(carcters_unicos)
    return console.log(chave_gerada)
}
for(let i =0 ; i<10 ;i++){
    gerador_chaves()
}


