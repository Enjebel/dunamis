export const gradeFromMark = (mark) => {
  if (mark >= 16) return 'A';
  if (mark >= 14) return 'B';
  if (mark >= 12) return 'C';
  if (mark >= 10) return 'D';
  return 'F';
};

export const gradePointFromMark = (mark) => {
  if (mark >= 16) return 4;
  if (mark >= 14) return 3.5;
  if (mark >= 12) return 3;
  if (mark >= 10) return 2;
  return 0;
};

export const statusFromMark = (mark) => (mark >= 10 ? 'Passed' : 'Resit');

export const calculateGpa = (results = []) => {
  const attempted = results.reduce((sum, result) => sum + Number(result.credits || 0), 0);
  if (!attempted) return 0;

  const weighted = results.reduce((sum, result) => {
    return sum + gradePointFromMark(Number(result.finalMark || 0)) * Number(result.credits || 0);
  }, 0);

  return Number((weighted / attempted).toFixed(2));
};

export const calculateWeightedAverage20 = (results = []) => {
  const attempted = results.reduce((sum, result) => sum + Number(result.credits || 0), 0);
  if (!attempted) return 0;

  const weighted = results.reduce((sum, result) => {
    return sum + Number(result.finalMark || 0) * Number(result.credits || 0);
  }, 0);

  return Number((weighted / attempted).toFixed(2));
};

export const mentionFromAverage20 = (average) => {
  if (average >= 16) return 'Tres Bien';
  if (average >= 14) return 'Bien';
  if (average >= 12) return 'Assez Bien';
  if (average >= 10) return 'Passable';
  return 'Insuffisant';
};

export const groupResults = (results = []) => {
  return results.reduce((acc, result) => {
    const yearKey = `year${result.year}`;
    const semesterKey = `semester${result.semester}`;
    acc[yearKey] = acc[yearKey] || {};
    acc[yearKey][semesterKey] = acc[yearKey][semesterKey] || [];
    acc[yearKey][semesterKey].push(result);
    return acc;
  }, {});
};

export const summarizeTranscript = (results = []) => {
  const failedCourses = results.filter((result) => result.status === 'Failed' || result.status === 'Resit');
  const creditsAttempted = results.reduce((sum, result) => sum + Number(result.credits || 0), 0);
  const creditsPassed = results
    .filter((result) => result.status === 'Passed')
    .reduce((sum, result) => sum + Number(result.credits || 0), 0);

  return {
    yearlyResults: groupResults(results),
    failedCourses,
    resitCount: failedCourses.length,
    creditsAttempted,
    creditsPassed,
    gpa: calculateGpa(results),
    average20: calculateWeightedAverage20(results),
    mention: mentionFromAverage20(calculateWeightedAverage20(results)),
  };
};

export const normalizeResult = (result) => {
  const finalMark = Number(result.finalMark ?? Number(result.caMark || 0) * 0.3 + Number(result.examMark || 0) * 0.7);
  return {
    ...result,
    finalMark,
    grade: result.grade || gradeFromMark(finalMark),
    status: result.status || statusFromMark(finalMark),
  };
};
