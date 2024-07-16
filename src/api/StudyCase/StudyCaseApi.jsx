import supabase from "@/config/supabaseConfig";

// GET ALL STUDI KASUS
export const handleGetStudyCase = async () => {
  try {
    const { data, error } = await supabase
      .schema("belajar")
      .from("studi_kasus")
      .select(
        `
        id,
        category_project (
          id,
          category_name
        ),
        name,
        img_url,
        youtube_url,
        tags,
        description,
        is_published,
        created_at
        `
      );
    if (error) throw new Error(error);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

// GET STUDI KASUS BY ID
export const handleGetStudyCaseDetail = async (id) => {
  try {
    const { data, error } = await supabase.schema("belajar").from("studi_kasus").select().eq("id", id);
    if (error) throw new Error(error);
    return data[0];
  } catch (error) {
    throw new Error(error);
  }
};
