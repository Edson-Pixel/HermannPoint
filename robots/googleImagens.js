var request = require("request")
var cheerio = require("cheerio")
async function robot(content, Term, allSite, indexSite) {
    function googleImagens() { 
        return new Promise((resolve, reject) => {
            try {
                request('https://www.google.com/search?hl=pt-BR&tbm=isch&sxsrf=ALeKk01ANF58wMiw3Dv9rLLgnwzcsoNQ2g%3A1609962685221&source=hp&biw=1304&bih=697&ei=vRT2X-j8CoHO5OUPs6u-0AI&q=' + Term + ' site:' + allSite[indexSite] + '&oq=' + Term + ' site:' + allSite[indexSite] + '&gs_lcp=CgNpbWcQAzIECCMQJzIECCMQJzIFCAAQsQMyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAOggIABCxAxCDAVCrPViKRGC5SGgAcAB4AIABxAGIAdYGkgEDMC41mAEAoAEBqgELZ3dzLXdpei1pbWc&sclient=img&ved=0ahUKEwioz86viojuAhUBJ7kGHbOVDyoQ4dUDCAc&uact=5', function (error, response, body) {
                    var $ = cheerio.load(body);
                    var divLinks = cheerio.html($('.t0fcAb'));
                    $(divLinks).each(function (i, el) {
                        if (content.sentences[i] == undefined) {
                            content.sentences.push({
                                text: "",
                                keywords: [],
                                images: []
                            })
                        }
                        var href = $(el).attr('src')
                        content.sentences[i].images.push(href)
                    });
                    resolve()
                })
            } catch (error) {
                console.log(error)
                reject()
            }
        })
    }
    await googleImagens()
    return content;
}
module.exports = robot