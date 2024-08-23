import supabase from "@/config/supabaseConfig";

// Get Review users
export const handleGetReview = async () => {
  try {
    const { data, error } = await supabase
      .schema("belajar")
      .from("review_user")
      .select(
        `
        id,
        user_id,
        course_id,
        rating,
        message,
        created_at,
        updated_at
        `
      );
    if (error) throw new Error(error);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleCheckReview = async (user_id, course_id) => {
  try {
    const { data, error } = await supabase.schema("belajar").from("review_user").select(`user_id, course_id`).eq("user_id", user_id).eq("course_id", course_id).limit(1);
    if (error) throw new Error(error);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const handleCreateReviews = async (payload) => {
  try {
    // checking data reviews
    const { data: existingReviews, error: fetchError } = await supabase.schema("belajar").from("review_user").select(`user_id, course_id`).eq("user_id", payload.user_id).eq("course_id", payload.course_id).limit(1);

    console.log("existingReviews", existingReviews);
    if (fetchError) throw new Error(fetchError.message);

    // jika sudah tersedia data reviews berdasarkan user id dan course id
    if (existingReviews?.length !== 0) {
      // return saja tidak melanjutkan proses selanjutnya
      return existingReviews;
    } else {
      console.log("lanjut");

      // jika belum ditemukan datanya maka akan melanjutkan create reviewnya
      const { data: reviews, error: reviewsError } = await supabase.schema("belajar").from("review_user").insert(payload);
      console.log("data review", reviews);

      if (reviewsError) throw new Error(reviewsError.message);
      return reviews;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
