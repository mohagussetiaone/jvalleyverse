import ReactPaginate from "react-paginate";

const Pagination = ({ totalPages, handlePageClick }) => {
  return (
    <ReactPaginate
      previousLabel={<span className="text-black dark:text-neutral-200">Prev</span>}
      nextLabel={<span className="text-black dark:text-neutral-200">Next</span>}
      breakLabel={<span className="mx-2 text-black dark:text-neutral-200">...</span>}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      onPageChange={handlePageClick}
      containerClassName="flex justify-center items-center space-x-2 mt-4"
      pageClassName="inline-block"
      pageLinkClassName="p-4 rounded-md text-black dark:text-neutral-200 hover:text-brand-500 transition duration-200"
      previousClassName="inline-block"
      previousLinkClassName="p-4 rounded-md text-black dark:text-neutral-200 hover:bg-btext-brand-500nsition duration-200"
      nextClassName="inline-block"
      nextLinkClassName="p-4 rounded-md text-black dark:text-neutral-200 hover:text-brand-500 transition duration-200"
      activeClassName="bg-brand-600 rounded-md text-white border border-brand-500 shadow-lg"
    />
  );
};

export default Pagination;
