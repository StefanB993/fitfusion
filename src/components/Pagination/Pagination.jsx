import { useSearchParams } from "react-router-dom";
import { EXERCISES_PER_PAGE } from "../../config";
import styles from "./Pagination.module.scss";
import { useState } from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

const PAGE_GROUP = 6; // Pomeraj za 6 stranica

function Pagination({
  count,
  itemsPerPage = EXERCISES_PER_PAGE,
  small = false,
}) {
  const totalPages = Math.ceil(count / itemsPerPage);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +searchParams.get("Page") || 1;

  const [pageRangeStart, setPageRangeStart] = useState(1);

  if (count === 0 || !count) return null;

  function changePage(page) {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    searchParams.set("Page", page);
    setSearchParams(searchParams);
  }

  function shiftPageRange(forward) {
    const newStart = forward
      ? Math.min(pageRangeStart + PAGE_GROUP, totalPages)
      : Math.max(1, pageRangeStart - PAGE_GROUP);
    setPageRangeStart(newStart);
    changePage(newStart);
  }

  const pageRangeEnd = Math.min(pageRangeStart + PAGE_GROUP - 1, totalPages);
  const visiblePages = Array.from(
    { length: pageRangeEnd - pageRangeStart + 1 },
    (_, i) => pageRangeStart + i
  );

  if (totalPages <= 1) return null;

  return (
    <div
      className={`${styles.pagination} ${
        small ? styles["pagination--small"] : ""
      }`}
    >
      <button
        disabled={pageRangeStart === 1}
        onClick={() => shiftPageRange(false)}
      >
        <FaAnglesLeft />
      </button>

      {visiblePages.map((pageNumber) => (
        <button
          className={`${styles.pagination__button} ${
            currentPage === pageNumber ? styles.active : ""
          }`}
          key={pageNumber}
          disabled={currentPage === pageNumber}
          onClick={() => changePage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        disabled={pageRangeEnd === totalPages}
        onClick={() => shiftPageRange(true)}
      >
        <FaAnglesRight />
      </button>
    </div>
  );
}

export default Pagination;
