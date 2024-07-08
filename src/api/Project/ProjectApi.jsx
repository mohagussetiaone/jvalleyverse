import supabase from "@/config/supabaseConfig";

// GET ALL PROJECT
export const handleGetProject = async () => {
  try {
    const { data, error } = await supabase
      .schema("belajar")
      .from("project")
      .select(
        `
        id,
        category_project (
          id,
          category_name
        ),
        chapter_detail!chapter_detail_project_id_fkey (
          id,
          project_id
        ),
        project_img_url,
        project_name,
        project_description,
        project_github,
        project_youtube_playlist,
        project_youtube_embed,
        tags,
        created_at
        `
      );
    if (error) throw new Error(error);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

// GET PROJECT BY ID
export const handleGetProjectDetail = async (id) => {
  try {
    const { data, error } = await supabase
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
      .eq("id", id);
    if (error) throw new Error(error);
    return data[0];
  } catch (error) {
    throw new Error(error);
  }
};

export const handleGetChapter = async () => {
  try {
    const { data } = await supabase.schema("belajar").from("chapter_project").select(`
        id,
        chapter_path,
        chapter_name,
        project (
          id,
          project_name
        ),
        created_at
        `);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleGetChapterDetail = async () => {
  try {
    const { data } = await supabase.schema("belajar").from("chapter_detail").select(`
        id,
        chapter_detail_name,
        youtube_url,
        tags,
        progress,
        project!fk_chapter_project(
          id,
          project_name,
          project_youtube_embed,
          project_youtube_playlist
        ),
        chapter_project (
          id,
          chapter_name
        )
        created_at,
        updated_at
        `);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleGetChapterDetailById = async (id) => {
  try {
    const { data } = await supabase
      .schema("belajar")
      .from("chapter_detail")
      .select(
        `
        id,
        chapter_detail_name,
        youtube_url,
        tags,
        progress,
        project!fk_chapter_project(
          id,
          project_name,
          project_youtube_embed,
          project_youtube_playlist
        ),
        chapter_project (
          id,
          chapter_name
        )
        created_at,
        updated_at
        `
      )
      .eq("id", id);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleGetChapterByProjectId = async (id) => {
  try {
    const { data } = await supabase
      .schema("belajar")
      .from("chapter_project")
      .select(
        `
        *,
        chapter_detail!project_chapter_id_fkey (
          id,
          chapter_detail_name,
          youtube_url,
          progress
        )
        `
      )
      .eq("project_id", id);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleGetChapterById = async (id) => {
  try {
    const { data } = await supabase
      .schema("belajar")
      .from("chapter_detail")
      .select(
        `
        id,
        chapter_detail_name,
        youtube_url,
        progress,
        created_at,
        updated_at
        `
      )
      .eq("id", id);
    return data[0];
  } catch (error) {
    throw new Error(error);
  }
};
