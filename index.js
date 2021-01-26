var readline = require("readline")
var Term = ""
var indexSite = ""
var allSite = ["brasilescola.uol.com.br", "www.todamateria.com.br", "www.educamaisbrasil.com.br"]
var leitor = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var robots = {
  googleSearch: require('./robots/googleSearch.js'),
  googleImagens: require('./robots/googleImagens.js'),
  BrasilEscola: require('./robots/BrasilEscola.js'),
  cleanText: require('./robots/cleanText.js'),
  downloadImages: require('./robots/downloadImages'),
  powerPoint: require('./robots/PowerPoint.js')
}


async function readInput() {
  return new Promise((resolve, reject) => {
    leitor.question("Qual o tema voce vai procurar?  ", function (answer) {
      Term = answer;
      console.log("\nOk, iremos buscar por => " + Term);
      console.log(" [0] Brasil Escola\n [1] Toda Materia\n [2] Educa Brasil")
      leitor.question("Escolha uma opcao, Digite apenas o numero:  ", function (answer2) {
        indexSite = answer2;
        console.log("\nOK, iremos buscar no site => " + allSite[indexSite]);
        leitor.close();
        resolve()
      });
    })
  })
}


async function start() {
  await readInput()
  var allLinks = await robots.googleSearch(Term, allSite, indexSite)
  var content = await robots.BrasilEscola(allLinks)
  content = robots.cleanText(content)
  content = await robots.googleImagens(content, Term, allSite, indexSite)
  await robots.downloadImages(content) 
  await robots.powerPoint(content)    
  console.log("\n\n FINALIZADO \n\n")
}
start()