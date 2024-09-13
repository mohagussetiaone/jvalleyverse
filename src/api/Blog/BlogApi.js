import supabase from "@/config/supabaseConfig";

export const handleGetBlogs = async () => {
  try {
    // Step 1: Fetch review data based on course_id
    const { data: blogs, error: blogsError } = await supabase.from("blogs").select(
      `
        id,
        title,
        description,
        content,
        author_id,
        tags,
        cover_img_url,
        status,
        category_blog,
        created_at,
        updated_at
        `
    );

    if (blogsError) throw new Error(blogsError);

    // Extract user_ids from reviews
    const userIds = [...new Set(blogs.map((blog) => blog.author_id))];

    // Step 2: Fetch user data
    const { data: users, error: userError } = await supabase
      .schema("user")
      .from("users") // Assume your user table is named 'users'
      .select(
        `
        id,
        name,
        profile_image_url,
        email
        `
      )
      .in("id", userIds);

    if (userError) throw new Error(userError);

    // Create a map of user_id to user data
    const userMap = users.reduce((map, user) => {
      map[user.id] = user;
      return map;
    }, {});

    // Step 3: Combine blogs data with user data
    const blogsWithUsers = blogs.map((blog) => ({
      ...blog,
      authors: userMap[blog.author_id] || null,
    }));

    return blogsWithUsers;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const handleGetBlogById = async (id) => {
  try {
    // Step 1: Fetch blog data based on id
    const { data: blog, error: blogError } = await supabase
      .from("blogs")
      .select(
        `
        id,
        title,
        description,
        content,
        author_id,
        tags,
        cover_img_url,
        status,
        category_blog,
        created_at,
        updated_at
        `
      )
      .eq("id", id)
      .single();

    console.log("blog", blog);

    if (blogError) throw new Error(blogError.message);

    // Step 2: Fetch user data based on author_id
    const { data: user, error: userError } = await supabase
      .schema("user")
      .from("users") // Pastikan nama tabel user adalah 'users'
      .select(
        `
        id,
        name,
        profile_image_url,
        email
        `
      )
      .eq("id", blog.author_id)
      .single();

    console.log("user", user);

    if (userError) throw new Error(userError.message);

    // Step 3: Combine blog data with user data
    const blogWithUser = {
      ...blog,
      author: user || null, // Attach the user data or null if not found
    };

    return blogWithUser;
  } catch (error) {
    throw new Error(error.message);
  }
};
