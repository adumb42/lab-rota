import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jsPDF';

class exportPDF extends React.Component {

    printDocument() {
        const input = document.getElementById('divtoPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save("download.pdf");
            });
    }
}

export default exportPDF;