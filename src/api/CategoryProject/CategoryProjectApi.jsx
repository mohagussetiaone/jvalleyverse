import supabase from "@/config/supabaseConfig";

// GET ALL CATEGORY PROJECT
export const handleGetCategoryProject = async () => {
  try {
    const { data, error } = await supabase.schema("belajar").from("category_project").select(`*`);
    if (error) throw new Error(error);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
