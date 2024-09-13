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
        project_published,
        is_enrollment,
        review_user (
          id,
          user_id,
          message,
          rating
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

// GET PROJECT BY ID
export const handleGetProjectDetail = async (id) => {
  try {
    // Fetch project details
    const { data: projectDetail, error: errorProjectDetail } = await supabase
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
      .eq("id", id)
      .single();

    if (errorProjectDetail) throw new Error(errorProjectDetail);

    // Fetch chapters for the project
    const { data: chapterProjects, error: errorChapterProjects } = await supabase
      .schema("belajar")
      .from("chapter_project")
      .select(
        `
        id,
        project_id,
        chapter_name,
        created_at,
        updated_at
      `
      )
      .eq("project_id", projectDetail.id);

    if (errorChapterProjects) throw new Error(errorChapterProjects);

    // Fetch chapter details for each chapter
    for (const chapter of chapterProjects) {
      const { data: chapterDetails, error: errorChapterDetails } = await supabase
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
        .eq("chapter_id", chapter.id);

      if (errorChapterDetails) throw new Error(errorChapterDetails);

      chapter.chapter_details = chapterDetails;
    }

    // Combine project detail with chapters and their respective details
    projectDetail.chapter_projects = chapterProjects;

    return projectDetail;
  } catch (error) {
    throw new Error(error.message);
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
