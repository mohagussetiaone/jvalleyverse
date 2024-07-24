import supabase from "@/config/supabaseConfig";

// GET ALL DISCUSSION
export const handleGetDiscussion = async () => {
  try {
    const { data: discussionData, error: discussionError } = await supabase
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
      );
    if (discussionError) throw new Error(discussionError);

    // Fetch user data separately
    const userIds = discussionData.map((discussion) => discussion.user_id);
    const { data: usersData, error: usersError } = await supabase.schema("user").from("users").select("id, name, profile_image_url").in("id", userIds);

    if (usersError) throw new Error(usersError);

    // Fetch reply_discussion data separately
    const discussionIds = discussionData.map((discussion) => discussion.id);
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

    if (repliesError) throw new Error(repliesError);

    // Merge user data with discussions
    const discussionsWithUser = discussionData.map((discussion) => {
      const user = usersData.find((user) => user.id === discussion.user_id);
      const replies = repliesData
        .filter((reply) => reply.discussion_id === discussion.id)
        .map((reply) => {
          const replyUser = usersData.find((user) => user.id === reply.user_id);
          return {
            ...reply,
            user: replyUser ? { id: replyUser.id, name: replyUser.name, profile_image_url: replyUser.profile_image_url } : null,
          };
        });

      return {
        ...discussion,
        user: user ? { id: user.id, name: user.name, profile_image_url: user.profile_image_url } : null,
        replies,
      };
    });
    return discussionsWithUser;
  } catch (error) {
    throw new Error(error);
  }
};

// GET DISCUSSION BY ID
export const handleGetDiscussionById = async (id) => {
  try {
    const { data: discussionData, error: discussionError } = await supabase
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
      .eq("id", id)
      .single(); // single() digunakan karena kita mengharapkan hanya satu diskusi berdasarkan id
    if (discussionError) throw new Error(discussionError.message);

    // Fetch user data for the discussion author
    const { data: userData, error: userError } = await supabase.schema("user").from("users").select("id, name, profile_image_url").eq("id", discussionData.user_id).single();
    if (userError) throw new Error(userError.message);

    // Fetch reply_discussion data
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
      .eq("discussion_id", id);

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

    // Combine the discussion data with user and replies
    const discussionWithUserAndReplies = {
      ...discussionData,
      user: userData ? { id: userData.id, name: userData.name, profile_image_url: userData.profile_image_url } : null,
      replies: repliesWithUser,
    };

    return discussionWithUserAndReplies;
  } catch (error) {
    throw new Error(error.message);
  }
};
