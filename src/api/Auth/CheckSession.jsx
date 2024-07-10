import supabase from "@/config/supabaseConfig";

export const useCheckSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const useCheckSessionAdmin = async () => {
  try {
    const { data, error } = await supabase.auth.admin();
    if (error) {
      throw new Error(error);
    }
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
