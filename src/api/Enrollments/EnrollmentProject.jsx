import supabase from "@/config/supabaseConfig";

export const handleAddEnrollments = async (payload) => {
  try {
    // 1. Periksa apakah pendaftaran sudah ada
    const { data: existingEnrollment } = await supabase.schema("belajar").from("enrollments").select("*").eq("user_id", payload.user_id).eq("project_id", payload.project_id).single(); // Gunakan single() jika hanya mengharapkan satu hasil
    if (existingEnrollment !== null) {
      // Jika pendaftaran sudah ada, tidak perlu menambahkan lagi
      return;
    } else if (existingEnrollment === null) {
      // Jika pendaftaran belum ada, tambahkan pendaftaran baru
      // 2. Jika belum ada, tambahkan pendaftaran baru
      const { data: newEnrollment, error: insertError } = await supabase.schema("belajar").from("enrollments").insert({
        user_id: payload.user_id,
        project_id: payload.project_id,
      });
      if (insertError) {
        throw insertError;
      }
      return newEnrollment;
    }
  } catch (error) {
    throw new Error(error);
  }
};

// export const handleGetEnrollments = async (user_id) => {
//   try {
//     const { data, error } = await supabase.schema("belajar").from("enrollments").select(`*`).eq("user_id", user_id);
//     if (error) throw new Error(error);
//     return data;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export const handleGetEnrollments = async (user_id) => {
  try {
    // Fetch enrollments
    const { data: enrollments, error: enrollmentsError } = await supabase.schema("belajar").from("enrollments").select("*").eq("user_id", user_id);

    if (enrollmentsError) throw new Error(enrollmentsError.message);

    const enrollmentDetails = await Promise.all(
      enrollments.map(async (enrollment) => {
        // Fetch project details
        const { data: project, error: projectError } = await supabase
          .schema("belajar")
          .from("project")
          .select(
            `
            id,
            category_project (
              id,
              category_name
            ),
            project_img_url,
            project_name,
            project_description,
            project_github,
            project_youtube_playlist,
            project_youtube_embed,
            created_at
            `
          )
          .eq("id", enrollment.project_id)
          .single();

        if (projectError) throw new Error(projectError.message);

        // Fetch chapters details
        const { data: chapters, error: chaptersError } = await supabase
          .schema("belajar")
          .from("chapter_project")
          .select(
            `
            id,
            chapter_name,
            created_at
            `
          )
          .eq("project_id", project.id);

        if (chaptersError) throw new Error(chaptersError.message);

        // Fetch chapter details for each chapter
        const chaptersWithDetails = await Promise.all(
          chapters.map(async (chapter) => {
            const { data: chapterDetails, error: chapterDetailsError } = await supabase
              .schema("belajar")
              .from("chapter_detail")
              .select(
                `
                id,
                chapter_id,
                chapter_detail_name,
                youtube_url,
                progress
                `
              )
              .eq("chapter_id", chapter.id);

            if (chapterDetailsError) throw new Error(chapterDetailsError.message);

            return {
              ...chapter,
              chapter_details: chapterDetails,
            };
          })
        );

        return {
          ...enrollment,
          project: {
            ...project,
            chapters: chaptersWithDetails,
          },
        };
      })
    );
    return enrollmentDetails;
  } catch (error) {
    throw new Error(error.message);
  }
};
