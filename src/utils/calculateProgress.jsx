// Fungsi untuk menghitung progress
export function calculateChapterProgress(chapters) {
  let totalDetails = 0;
  let completedDetails = 0;

  chapters.forEach((chapter) => {
    chapter.chapter_detail.forEach((detail) => {
      totalDetails++;
      if (detail.progress) {
        completedDetails++;
      }
    });
  });

  // Mengembalikan nilai progress sebagai persentase
  return totalDetails > 0 ? Math.floor((completedDetails / totalDetails) * 100) : 0;
}

export function calculateEnrollmentProgress(chapters) {
  if (!Array.isArray(chapters)) return 0; // Pastikan enrollment adalah array
  let totalDetails = 0;
  let completedDetails = 0;
  chapters.forEach((chapter) => {
    if (Array.isArray(chapter.chapter_details)) {
      // Pastikan chapter_details adalah array
      chapter.chapter_details.forEach((detail) => {
        totalDetails++;
        if (detail.progress) {
          completedDetails++;
        }
      });
    }
  });

  // Mengembalikan nilai progress sebagai persentase
  return totalDetails > 0 ? Math.floor((completedDetails / totalDetails) * 100) : 0;
}
