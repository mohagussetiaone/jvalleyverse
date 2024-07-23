import supabase from "@/config/supabaseConfig";

// GET ALL SHOWCASE
export const handleGetShowCaseCategory = async () => {
  try {
    const { data, error } = await supabase.schema("user").from("category_show_case").select(`id, category_name`);
    if (error) throw new Error(error);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleGetShowCaseCategoryById = async (id) => {
  try {
    const { data, error } = await supabase.schema("user").from("category_show_case").select(`id, category_name`).eq("id", id).single();
    if (error) throw new Error(error);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
