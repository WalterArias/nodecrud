const { jsPDF } = require("jspdf"); // will automatically load the node version

const doc = new jsPDF();
doc.text("Hello world!", 30, 70);
doc.save("a4.pdf"); // will save the file in the current working directory