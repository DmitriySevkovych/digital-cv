import '../sass/index.sass';

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF();

// TEST plain jspdf
// const printableContent = document.querySelector('.body__printable');
// doc.html(printableContent);

// TEST jspdf + html2canvas
html2canvas(document.querySelector('.body__printable'))
    .then(printableContent => doc.html(printableContent));

const printButton = document.querySelector('.footer__print');
printButton.addEventListener('click', () => doc.save('a4.pdf'));
