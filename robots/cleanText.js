var sbd = require('sbd')
function robot(content) {
    function cleanText() { 
        breakSentences(content)
        limitSentences(content)
        function breakSentences() {
            content.sentences = []
            const sentences = sbd.sentences(content.crt.content)
            sentences.forEach((sentence) => {
                if (sentence != ".") {
                    content.sentences.push({
                        text: sentence,
                        keywords: [],
                        images: []
                    })   
                }
            })
            
        }
        function limitSentences() {
            content.sentences = content.sentences.slice(0, 10)
        }
    }
    cleanText()
    return content;
}
module.exports = robot