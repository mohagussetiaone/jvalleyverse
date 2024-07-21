import supabase from "@/config/supabaseConfig";

// GET ALL SHOWCASE
export const handleGetShowCase = async () => {
  try {
    const { data, error } = await supabase
      .schema("user")
      .from("show_case")
      .select(
        `
        id,
        name,
        description,
        show_case_img_url,
        tech,
        url_preview,
        url_github,
        users (
          id,
          name,
          profile_image_url
        ),
        created_at
        `
      );
    if (error) throw new Error(error);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleGetShowCaseById = async (id) => {
  try {
    const { data, error } = await supabase
      .schema("user")
      .from("show_case")
      .select(
        `
        id,
        name,
        description,
        show_case_img_url,
        tech,
        url_preview,
        url_github,
        users (
          id,
          name,
          profile_image_url
        ),
        created_at
        `
      )
      .eq("id", id)
      .single();
    if (error) throw new Error(error);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
