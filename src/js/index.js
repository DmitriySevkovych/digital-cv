import '../sass/index.sass';

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const A4_WIDTH_MM = 297;
const A4_HEIGHT_MM = 210;

const printCV = () => {
    html2canvas(
        document.querySelector('body'),
        {
            windowWidth: 1000,
            // windowHeight: 2000 * A4_WIDTH_MM / A4_HEIGHT_MM
        }
    ).then(canvas => {
        //TODO: unclear if necessary
        canvas.getContext('2d');
        const imgData = canvas.toDataURL('image/jpeg', 1.0);

        // Default export is a4 paper, portrait, using millimeters for units
        const doc = new jsPDF();

        // Properties
        doc.setProperties({
            title: 'CV - Dmitriy Sevkovych',
            subject: 'This is the subject',
            author: 'Dmitriy Sevkovych',
            keywords: 'freelancer, software, mathematics',
            creator: 'Dmitriy Sevkovych'
        });

        doc.addImage(imgData, 'JPG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);

        doc.save('CV.pdf');
    });
}

const printButton = document.querySelector('.footer__print');
printButton.addEventListener('click', printCV);
