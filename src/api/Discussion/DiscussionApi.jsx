import supabase from "@/config/supabaseConfig";

// Handle Add Question to Discussion
export const handleAddQuestion = async (payload) => {
  try {
    const { data, error } = await supabase.schema("belajar").from("discussion").insert(payload);
    if (error) throw new Error(error);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

// GET Discussion by User Id
export const handleGetDiscussionByUserId = async (userId) => {
  console.log("userId", userId);
  try {
    const { data: discussions, error: discussionError } = await supabase
      .schema("belajar")
      .from("discussion")
      .select(
        `
        id,
        project (
          id,
          project_name
        ),
        question,
        content,
        tags,
        created_at,
        user_id
        `
      )
      .eq("user_id", userId);

    if (discussionError) throw new Error(discussionError.message);

    console.log("discussions", discussions);

    // Fetch user data for the discussion author
    const userIds = discussions.map((discussion) => discussion.user_id);
    const { data: userData, error: userError } = await supabase.schema("user").from("users").select("id, name, profile_image_url").in("id", userIds);

    if (userError) throw new Error(userError.message);

    console.log("userData", userData);

    // Fetch reply_discussion data
    const discussionIds = discussions.map((discussion) => discussion.id);
    const { data: repliesData, error: repliesError } = await supabase
      .schema("belajar")
      .from("reply_discussion")
      .select(
        `
        id,
        discussion_id,
        content,
        created_at,
        user_id
        `
      )
      .in("discussion_id", discussionIds);

    if (repliesError) throw new Error(repliesError.message);

    // Ensure replyUserIds does not contain undefined values
    const replyUserIds = repliesData.map((reply) => reply.user_id).filter((userId) => userId !== undefined);

    if (replyUserIds.length === 0) {
      console.warn("No user IDs found in replies");
    }

    // Fetch user data for all users who replied
    const { data: replyUsersData, error: replyUsersError } = await supabase.schema("user").from("users").select("id, name, profile_image_url").in("id", replyUserIds);

    if (replyUsersError) throw new Error(replyUsersError.message);

    // Merge user data with replies
    const repliesWithUser = repliesData.map((reply) => {
      const replyUser = replyUsersData.find((user) => user.id === reply.user_id);
      return {
        ...reply,
        user: replyUser ? { id: replyUser.id, name: replyUser.name, profile_image_url: replyUser.profile_image_url } : null,
      };
    });

    // Combine the discussions data with user and replies
    const discussionsWithUserAndReplies = discussions.map((discussion) => {
      const discussionUser = userData.find((user) => user.id === discussion.user_id);
      const discussionReplies = repliesWithUser.filter((reply) => reply.discussion_id === discussion.id);

      return {
        ...discussion,
        user: discussionUser ? { id: discussionUser.id, name: discussionUser.name, profile_image_url: discussionUser.profile_image_url } : null,
        replies: discussionReplies,
      };
    });

    return discussionsWithUserAndReplies;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete Discussion
export const handleDeleteDiscussion = async (id) => {
  try {
    const { data, error } = await supabase.schema("belajar").from("discussion").delete().eq("id", id);
    if (error) throw new Error(error);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
