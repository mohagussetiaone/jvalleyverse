import CertificateCard from "./CertificateCard";

const CertificateList = () => {
  return (
    <>
      <div className="mt-4 md:mt-6">
        <div className="px-4 md:px-10">
          <h2 className="text-2xl text-left text-black dark:text-neutral-200 font-bold mb-4">Sertifikat Saya</h2>
        </div>
        <CertificateCard />
      </div>
    </>
  );
};

export default CertificateList;
