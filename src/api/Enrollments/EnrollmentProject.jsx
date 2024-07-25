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

export const handleGetEnrollments = async (user_id) => {
  try {
    const { data, error } = await supabase.schema("belajar").from("enrollments").select(`*, projects(*)`).eq("user_id", user_id).single();
    if (error) throw new Error(error);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
