import supabase from "@/config/supabaseConfig";

export const useSignIn = (payload) => {
  try {
    const { data, error } = supabase.auth.admin.createUser({
      email: payload.email,
      password: payload.password,
      user_metadata: { name: "Yoda" },
    });
    if (error) {
      throw new Error(error);
    }
    return data;
  } catch (error) {
    return new Error(error);
  }
};
