import supabase from "@/config/supabaseConfig";

// Handle Add Question
export const handleAddQuestion = async (payload) => {
  try {
    const { data, error } = await supabase.schema("belajar").from("discussion").insert(payload);
    if (error) throw new Error(error);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
