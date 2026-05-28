import PDFDocument from 'pdfkit';
import { summarizeTranscript } from './academic.js';

const drawCell = (doc, text, x, y, width, height, options = {}) => {
  doc.rect(x, y, width, height).stroke('#d1d5db');
  doc.font(options.bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(options.size || 8).fillColor(options.color || '#111827');
  doc.text(String(text ?? ''), x + 4, y + 5, { width: width - 8, height: height - 8 });
};

export const buildTranscriptPdf = (student, program) => {
  const doc = new PDFDocument({ size: 'A4', margin: 36, bufferPages: true });
  const chunks = [];
  const summary = summarizeTranscript(student.results);
  const fullName = `${student.firstName} ${student.lastName}`;
  const isFrench = program?.language === 'fr' || program?.cycle === 'BTS';
  const labels = isFrench
    ? {
        title: 'RELEVE DE NOTES',
        info: 'Informations sur l etudiant',
        results: 'Resultats academiques',
        name: 'Nom',
        matricule: 'Matricule',
        program: 'Filiere',
        year: 'Annee academique',
        level: 'Niveau',
        status: 'Statut',
        course: 'Intitule UE',
        average: 'Moyenne',
        credits: 'Credits valides',
        resits: 'UE a reprendre',
        note: 'Ce releve est genere a partir des donnees validees du systeme Dunamis.',
      }
    : {
        title: 'OFFICIAL TRANSCRIPT',
        info: 'Student Information',
        results: 'Academic Results',
        name: 'Name',
        matricule: 'Matricule',
        program: 'Program',
        year: 'Academic Year',
        level: 'Level',
        status: 'Status',
        course: 'Course Title',
        average: 'GPA',
        credits: 'Credits Passed',
        resits: 'Courses to Resit',
        note: 'This transcript is generated from validated Dunamis University System records.',
      };

  doc.on('data', (chunk) => chunks.push(chunk));

  doc.rect(36, 32, 523, 86).stroke('#111827');
  doc.font('Helvetica-Bold').fontSize(20).fillColor('#111827').text('DUNAMIS UNIVERSITY', 52, 48);
  doc.font('Helvetica-Bold').fontSize(9).fillColor('#79b927').text('THE ENTREPRENEURIAL UNIVERSITY', 52, 74);
  doc.font('Helvetica').fontSize(8).fillColor('#4b5563').text('Official academic transcript - provisional institutional template', 52, 94);
  doc.font('Helvetica-Bold').fontSize(14).fillColor('#f58220').text(labels.title, 370, 56, { width: 160, align: 'right' });

  const metaY = 136;
  doc.font('Helvetica-Bold').fontSize(10).fillColor('#111827').text(labels.info, 36, metaY);
  const meta = [
    [labels.name, fullName],
    [labels.matricule, student.matricule],
    [labels.program, student.programCode],
    [labels.year, student.academicYear],
    [labels.level, isFrench ? `Annee ${student.level}` : `Year ${student.level}`],
    [labels.status, student.status],
  ];
  let y = metaY + 18;
  for (let i = 0; i < meta.length; i += 2) {
    drawCell(doc, meta[i][0], 36, y, 90, 24, { bold: true });
    drawCell(doc, meta[i][1], 126, y, 170, 24);
    drawCell(doc, meta[i + 1][0], 296, y, 90, 24, { bold: true });
    drawCell(doc, meta[i + 1][1], 386, y, 173, 24);
    y += 24;
  }

  y += 28;
  doc.font('Helvetica-Bold').fontSize(10).fillColor('#111827').text(labels.results, 36, y);
  y += 18;
  const columns = [
    ['Year', 34],
    ['Sem', 34],
    ['Code', 58],
    [labels.course, 210],
    ['Cr', 28],
    ['Mark', 38],
    ['Grade', 42],
    ['Status', 78],
  ];
  let x = 36;
  for (const [label, width] of columns) {
    drawCell(doc, label, x, y, width, 22, { bold: true, size: 7, color: '#111827' });
    x += width;
  }
  y += 22;

  const sorted = [...student.results].sort((a, b) => a.year - b.year || a.semester - b.semester || a.courseCode.localeCompare(b.courseCode));
  for (const result of sorted) {
    if (y > 760) {
      doc.addPage();
      y = 42;
    }
    x = 36;
    const row = [result.year, result.semester, result.courseCode, result.courseTitle, result.credits, result.finalMark, result.grade || '', result.status];
    columns.forEach(([, width], index) => {
      drawCell(doc, row[index], x, y, width, 24, { size: 7 });
      x += width;
    });
    y += 24;
  }

  y += 22;
  if (y > 720) {
    doc.addPage();
    y = 42;
  }
  doc.rect(36, y, 523, 62).fillAndStroke('#f8fafc', '#d1d5db');
  const primaryAverage = isFrench ? `${summary.average20}/20 (${summary.mention})` : summary.gpa;
  doc.fillColor('#111827').font('Helvetica-Bold').fontSize(10).text(`${labels.average}: ${primaryAverage}`, 52, y + 14);
  doc.text(`${labels.credits}: ${summary.creditsPassed}/${summary.creditsAttempted}`, 210, y + 14);
  doc.text(`${labels.resits}: ${summary.resitCount}`, 410, y + 14);
  doc.font('Helvetica').fontSize(8).fillColor('#4b5563').text(labels.note, 52, y + 40);

  doc.end();

  return new Promise((resolve) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)));
  });
};
