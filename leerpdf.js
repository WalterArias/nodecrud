let fs = require('fs'),
PDFParser = require("pdf2json");

let pdfParser = new PDFParser();



pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFile("texto.json", JSON.stringify(pdfData), (response) => {
        console.log(response);
    });
});


pdfParser.loadPDF("./imagen.pdf");