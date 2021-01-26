var download = require("image-downloader")
async function robot(content) {
    function Download(options) { 
        return new Promise(async(resolve, reject) => {
            await download.image(options)
            resolve()
        })
    }
    function allDownload() {
        return new Promise(async(resolve, reject) => {
            for (let index = 0; index <= 10; index++) {
                try {
                    const options = {
                        url: content.sentences[index].images[0],
                        dest: './robots/temp/img' + index + '.jpg',
                    }
                    await Download(options)
                } catch (err) {
                    console.log(err);
                }
            }
            resolve()
        })
    }
    await allDownload()
}
module.exports = robot