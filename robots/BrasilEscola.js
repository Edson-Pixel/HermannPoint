var request = require("request")
var cheerio = require("cheerio")
async function robot(allLinks) {
    var content = {}
    function BrasilEscola() {
        return new Promise((resolve, reject) => {
            try {
                request(allLinks[0], function (error, response, body) {
                    clearContent(body)
                    resolve()
                })
            } catch (error) {
                console.log(error)
                reject()
            }
        })
    }
    function clearContent(bodyContent) {
        var crt = {}
        var topics =[]
        var round = false
        var $ = cheerio.load(bodyContent);
        var $html = cheerio.html($('.conteudo-materia'))
        var $load = cheerio.load($html)
        var divcrt = cheerio.html($load('span'));
        var $2 = cheerio.load(divcrt)
        var links = $2('strong');
        var titlecrt = ""
        if (links == "") {
          links = $load
        }
        $(links).each((i, link) => {
          titlecrt = $(link).text().toUpperCase()
          if (titlecrt == '**') {
            titlecrt = 'Pontos Importantes:'
          }
          var home = cheerio.html($('.conteudo-materia'));
          var homeLoad = cheerio.load(home)
          var itensHtml = cheerio.html(homeLoad('ul'));
          var itensload = cheerio.load(itensHtml)
          var liListoffReplace = ""
          if (itensHtml == "") { 
            itensHtml = home
          }
          homeLoad(itensHtml).each((i, el2) => {
            var ulList = $(el2)
            if (itensHtml == home) {
              ulList = ""
            }
            var liList = ""
            itensload(ulList).each((i, el) => {
              liList ='-- '+ $(el).text().replace(/\s\s+/g, "").replace(/;/g, ".\n-- ")
              liListoffReplace = $(el).text().replace(/\s\s+/g, "")
            })
            var contentAll = $('.conteudo-materia').text().replace(/\s\s+/g, "")
              .replace(liListoffReplace, ". ")
              .replace("PUBLICIDADE", " ")
              .replace("Não pare agora... Tem mais depois da publicidade ;)"," ")
            if (round === false) {
              topics.push(liList)
              crt = { title: titlecrt, topicos: topics, content: contentAll }
      
              content = {
                title: $('.titulo-definicao').text().toUpperCase(),
                subtitle: $('.definicao').text(),
                sentences: [],
                crt: crt,
              }
              round = true
            }
          })
      
        });
      }
    await BrasilEscola()
    return content;
}
module.exports = robot