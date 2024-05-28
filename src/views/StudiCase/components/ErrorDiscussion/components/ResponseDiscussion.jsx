const ResponseDiscussion = () => {
  return (
    <div className="bg-white rounded-md">
      <div>
        <div className="bg-brand-200/70 rounded-t-lg p-2">
          <p className="text-base text-black">Pertanyaan yang anda ajukan</p>
        </div>
        <div className="bg-brand-100/20 p-2">
          <div className="p-2 text-black flex text-start justify-start">
            <ol className="text-sm">
              <li>Kesulitan dalam men debug aplikasi</li>
              <li>Bagaimana cara state bekerja pada aplikasi</li>
              <li>Backend error pada aplikasi</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseDiscussion;
