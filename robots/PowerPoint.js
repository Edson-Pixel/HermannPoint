var PptxGenJS = require('pptxgenjs')
async function robot(content) {
    function powerPoint() {
        return new Promise((resolve, reject) => {
            let pres = new PptxGenJS();
            let slide0 = pres.addSlide("Apresentação");
            let slide1 = pres.addSlide("Primeira parte");
            let slide2 = pres.addSlide("Segunda parte");
            let slide3 = pres.addSlide("Terceira parte");
            
            let i_img = 1
            slide0.background = { path: "./robots/layout/layou2title.png" };
            slide0.addText(content.title, { color:'C1CCCD',x: '20%', y: '50%', w: 6, align: 'center', fontSize: 40, fontFace: 'Arial Black' });
            let i_text = 0
            slide1.background = { path: "./robots/layout/layout1crt.png" };
            slide1.addText(content.sentences[i_text].text, {color:'C1CCCD', x: 0.1, y: '45%', w: 6.0, align: 'left', fontSize: 14,fontFace:'Abadi' });
            slide1.addText(content.sentences[i_text + 1].text, {color:'C1CCCD', x: 0.1, y: '60%', w: 6.0, align: 'left', fontSize: 14,fontFace:'Abadi'});
            slide1.addImage({ path: "./robots/temp/img" + i_img + ".jpg", w: 2.5, h: 2.5,x:7.0, y: 1.5, align: 'left'});            i_text += 2
            i_img += 1
            slide2.background = { path: "./robots/layout/layout1crt.png" };
            slide2.addText(content.sentences[i_text].text, {color:'C1CCCD', x: 0.1, y: '45%', w: 6.0, align: 'left', fontSize: 14,fontFace:'Abadi' });
            slide2.addText(content.sentences[i_text + 1].text, {color:'C1CCCD', x: 0.1, y: '60%', w: 6.0, align: 'left', fontSize: 14,fontFace:'Abadi'});
            slide2.addImage({ path: "./robots/temp/img" + i_img + ".jpg", w: 2.5, h: 2.5,x:7.0, y: 1.5, align: 'left'});
            i_text += 2
            i_img += 1
            slide3.background = { path: "./robots/layout/layout1crt.png" };
            slide3.addText(content.sentences[i_text].text, {color:'C1CCCD', x: 0.1, y: '45%', w: 6.0, align: 'left', fontSize: 14,fontFace:'Abadi' });
            slide3.addText(content.sentences[i_text + 1].text, {color:'C1CCCD', x: 0.1, y: '60%', w: 6.0, align: 'left', fontSize: 14,fontFace:'Abadi'});
            slide3.addImage({ path: "./robots/temp/img" + i_img + ".jpg", w: 2.5, h: 2.5,x:7.0, y: 1.5, align: 'left'});
            i_text += 2
            i_img += 1
            if (content.crt.topicos[0] != undefined && content.crt.topicos[0] != '') {
                let slide4 = pres.addSlide("Quarta parte");
                slide4.background = { path: "./robots/layout/layout1crt.png" };
                slide4.addText(content.crt.title, { color:'C1CCCD', x: 0.1, y: 0.1, w:6, h: 1.0, align: 'center', fontSize: 20,fontFace:'Arial Black' });
                slide4.addText(content.crt.topicos[0], { color:'C1CCCD', x: 0.1, y: 0.6, w: 9.5, h: 5, align: 'left', fontSize: 17,fontFace:'Abadi' });  
                i_text += 2
                i_img += 1
            }
            else {
                let slide4 = pres.addSlide("Quarta parte");
                slide4.background = { path: "./robots/layout/layout1crt.png" };
                slide4.addText(content.sentences[i_text].text, {color:'C1CCCD', x: 0.1, y: '45%', w: 6.0, align: 'left', fontSize: 14,fontFace:'Abadi' });
                slide4.addText(content.sentences[i_text + 1].text, {color:'C1CCCD', x: 0.1, y: '60%', w: 6.0, align: 'left', fontSize: 14,fontFace:'Abadi'});
                slide4.addImage({ path: "./robots/temp/img" + i_img + ".jpg", w: 2.5, h: 2.5,x:7.0, y: 1.5, align: 'left'});    
            }
            pres.writeFile("conteudo.pptx");
            resolve()
        })
    }
    await powerPoint()
}
module.exports = robot