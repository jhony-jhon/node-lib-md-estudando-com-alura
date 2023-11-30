import fs from "fs";
import chalk from "chalk";


function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
    return resultados.length !== 0 ? resultados : 'não há links no arquivo.';
}

function trataErro(erro) {
    throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório'));
}

// async/await
async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile
        (caminhoDoArquivo, encoding)
        return extraiLinks(texto);
    } catch (erro) {
        trataErro(erro)
    // } finally {
    //     console.log(chalk.yellow('operação concluída'));
    // } testando o uso do finally
    }
}

export default pegaArquivo;
//setInterval(() => pegaArquivo('./arquivos/'), 5000);


// usando regex: \[[^[\]]*?\] - Expressões regulares.
// \(https?:\/\/[^\s?#.].[^\s]*\)

// separando por grupos o regex usando os parênteses...
// ... antes do acento circunflexo ^ e depois da interrogação (grupo 1)...
// ... antes de https e depois do asterisco (grupo 2).
// \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)

/* Cada linguagem de programação tem suas maneiras de lidar com as expressões 
   regulares, são os chamados flavours (sabores). Nem sempre eles serão iguais. */


// usando promises com then().
// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.promises
//         .readFile(caminhoDoArquivo, encoding)
//         .then((texto) => console.log(chalk.green(texto)))
//         .catch(trataErro)
// }


// função síncrona abaixo, comentada.
// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//         if (erro) {
//             trataErro(erro);
//         }
//         console.log(chalk.green(texto));
//     })
// }


// Como a função pegaArquivo() trabalha com promessas (ou seja, de forma assíncrona), ao executarmos a mesma função duas vezes, uma em seguida da outra, existe a possibilidade de que os retornos não ocorram na mesma ordem de chamada. Por exemplo, a função que recebe o parâmetro correto poderia "demorar" um pouco mais para retornar o texto do que o tempo que a função que recebe o parâmetro errado levaria retornar o erro (ou, como estamos usando throw, "lançar" o erro).

// Um dos pontos aqui é justamente o throw. Como este recurso interrompe a execução do programa, se a função "incorreta" executar antes, o throw encerra o programa antes que a função "correta" retorne o texto, e por isso somente o erro é exibido no terminal.
// Outro teste que podemos fazer é colocar a segunda chamada da função dentro de uma função setInterval(), que vai "aguardar" 5 segundos antes de executar
// Com essa pausa, damos um tempinho para que a função "correta" retorne o texto no terminal antes da execução da função "incorreta". - Juliana Amoasei, instrutora da Alura no Fórum da comunidade. 

