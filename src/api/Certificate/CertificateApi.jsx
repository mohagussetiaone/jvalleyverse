import supabase from "@/config/supabaseConfig";

// GET CERTIFICATES BASED ON USER_ID
export const handleGetCertificate = async (user_id) => {
  try {
    // Fetch certificates from 'user' schema based on user_id
    const { data: certificates, error: certificateError } = await supabase
      .schema("user")
      .from("certificate")
      .select(
        `
        id,
        certificate_name,
        certificate_valid,
        project_id,
        created_at,
        users (
          id,
          name
        )
        `
      )
      .eq("user_id", user_id); // Filter by user_id

    if (certificateError) throw new Error(certificateError.message);

    // Fetch projects from 'belajar' schema
    const { data: projects, error: projectError } = await supabase
      .schema("belajar")
      .from("project")
      .select(
        `
        id,
        project_name
        `
      );

    if (projectError) throw new Error(projectError.message);

    // Combine data if necessary
    const combinedData = certificates.map((certificate) => {
      return {
        ...certificate,
        projects: projects.filter((project) => project.id === certificate.project_id),
      };
    });

    return combinedData;
  } catch (error) {
    throw new Error(error.message);
  }
};

// GET CERTIFICATE BY ID
export const handleGetCertificateById = async (certificateId) => {
  try {
    // Fetch the specific certificate from 'user' schema
    const { data: certificate, error: certificateError } = await supabase
      .schema("user")
      .from("certificate")
      .select(
        `
        id,
        certificate_name,
        certificate_valid,
        project_id,
        created_at,
        users (
          id,
          name
        )
        `
      )
      .eq("id", certificateId)
      .single(); // Use .single() to fetch a single row

    if (certificateError) throw new Error(certificateError.message);

    // Fetch the project associated with the certificate from 'belajar' schema
    const { data: project, error: projectError } = await supabase
      .schema("belajar")
      .from("project")
      .select(
        `
        id,
        project_name
        `
      )
      .eq("id", certificate.project_id)
      .single(); // Use .single() to fetch a single row

    if (projectError) throw new Error(projectError.message);

    // Combine data
    const combinedData = {
      ...certificate,
      project,
    };

    return combinedData;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const handleCreateCertificate = async (payload) => {
  try {
    // Fetch certificates from 'user' schema based on the 'name' in payload
    const { data: existingCertificates, error: fetchError } = await supabase.schema("user").from("certificate").select("*").eq("certificate_name", payload.certificate_name);
    console.log("existingCertificates", existingCertificates);

    if (fetchError) throw new Error(fetchError);

    if (existingCertificates.length > 0) {
      throw new Error(fetchError);
    }

    console.log("lanjut");

    // Fetch certificates from 'user' schema based on user_id
    const { data: certificates, error: certificateError } = await supabase.schema("user").from("certificate").insert(payload);

    if (certificateError) throw new Error(certificateError.message);

    return certificates;
  } catch (error) {
    throw new Error(error);
  }
};
