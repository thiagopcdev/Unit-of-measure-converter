import readline from 'readline-sync';

function makeError(unity:string) {
  throw new Error(`A unidade ${unity} não é uma unidade válida.`);
}

function convert(units:string[], value:number, toUnity:string, forUnity:string):number {
  if(!units.includes(toUnity)) makeError(toUnity);
  if(!units.includes(forUnity)) makeError(forUnity);
  
  const toIndex = units.indexOf(toUnity);
  const forIndex = units.indexOf(forUnity);
  const exponent = (toIndex - forIndex);

  return value * Math.pow(10, exponent);
}

function exec(units: string[]) {
  // pegamos o valor a ser convertido digitado pela pessoa usuária
  const value = readline.questionFloat("Digite o valor a ser convertido: \n");

  // pedimos que a pessoa usuária escolha a unidade base
  // com { cancel: "SAIR" }, nós customizamos nossa mensagem padrão para sair da escolha, por padrão é "CANCEL"
  const forUnityChoice = readline.keyInSelect(units, "Escolha um número para a unidade base:", { cancel: "SAIR" });

  // caso a pessoa escolha sair a função keyInSelect retornará -1
  // finalizamos o script e escrevemos saindo no terminal
  if (forUnityChoice === -1) return console.log("Saindo!");

  // pedimos que a pessoa usuária escolha a unidade para conversão
  const toUnityChoice = readline.keyInSelect(units, "Escolha um número para a conversão:", { cancel: "SAIR" });

  // caso a pessoa escolha sair finalizamos o script e escrevemos saindo no terminal
  if (toUnityChoice === -1) return console.log("Saindo!");

  // chamamos a função convert do utils.ts passando as escolhas da pessoa usuária
  const toUnity = units[toUnityChoice];
  const forUnity = units[forUnityChoice];
  const result = convert(units, value, toUnity, forUnity);

  // montamos a mensagem de saída
  const message = `${value}${units[forUnityChoice]} é igual a ${result}${units[toUnityChoice]}`

  // printamos a mensagem de saída no terminal
  console.log(message);
}

export default {
  convert,
  exec
}