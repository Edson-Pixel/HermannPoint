var request = require("request")
var cheerio = require("cheerio")
async function robot(Term, allSite, indexSite) {
    var allLinks = []
    function googleSearch() {
        return new Promise((resolve, reject) => {
            try {
                var site = allSite[indexSite]
                request('https://www.google.com/search?q=' + Term + " site:" + site + '&oq=' + Term + '&aqs=chrome..69i57j35i39j0i395i433j0i395l7.1311j1j7&sourceid=chrome&ie=UTF-8', function (error, response, body) {
                    cleanLinks(body)
                    resolve()
                })
            } catch (error) {
                console.log(error)
                reject()
            }
        })
    }
    function cleanLinks(bodyGlobal) {
        var $ = cheerio.load(bodyGlobal);
        var divLinks = cheerio.html($('.kCrYT'));
        var $2 = cheerio.load(divLinks)
        var links = $2('a');
        $(links).each(function (i, link) {
          var dirtyhref = $(link).attr('href')
          var href = dirtyhref.replace("/url?q=", "")
            .replace(/htm.*/, "htm")
          allLinks.push(href)
        });
      }
    await googleSearch()
    return allLinks;
}
module.exports = robot