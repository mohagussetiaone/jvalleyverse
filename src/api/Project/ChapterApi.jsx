import supabase from "@/config/supabaseConfig";
export const updateChapterProgress = async (projectId, chapterId) => {
  try {
    const { data, error } = await supabase
      .schema("belajar")
      .from("chapter_detail") // Replace with your table name
      .update({ progress: true })
      .match({ id: chapterId, project_id: projectId });
    console.log("update chapter progress", data);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
