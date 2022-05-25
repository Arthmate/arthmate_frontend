/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import "../loan/loan.css";
const Pagination = (props) => {
  const [pageSize, setPageSize] = useState();
  const [totalCount, setTotalCount] = useState("");
  const [pageNumber, setPageNumber] = useState();

  useEffect(() => {
    if (props.pagination) {
      const { totalCount, pageNumber, pageSize } = props.pagination;
      setTotalCount(totalCount);
      setPageNumber(pageNumber);
      setPageSize(pageSize);
    }
  }, [props.pagination]);

  useEffect(() => {
    if (
      pageNumber &&
      pageSize &&
      (props.pagination.pageNumber !== pageNumber ||
        props.pagination.pageSize !== pageSize)
    )
      props.onChangePage({ pageSize, pageNumber });
  }, [pageSize, pageNumber]);

  const handlePageSize = (event) => {
    setPageNumber(1);
    setPageSize(event.target.value);
  };

  const handlePageNumber = (val) => {
    switch (val) {
      case "next":
        setPageNumber(parseInt(pageNumber) + 1);
        break;
      case "prev":
        setPageNumber(parseInt(pageNumber) - 1);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <nav className="flex flex-wrap  h-101 p-8 items-center">
        <div className="flex  flex-row px-5 w-full items-center">
          <div className="mg_top">
            <span className="text-sm mr-5 entry">show</span>
            <select
              className="border border-gray-400 rounded px-2 mr-5 cursor-pointer entry"
              value={pageSize}
              onChange={(e) => handlePageSize(e)}
            >
              <>
                <option>10</option>
                <option>20</option>
              </>
            </select>
            <span className="text-sm text-black mr-5 entry">entries</span>
            <span className="text-sm text-gray-400 mr-5 entry">
              showing{" "}
              {totalCount > pageNumber * pageSize
                ? `${(pageNumber - 1) * pageSize + 1 || "0"}-${
                    pageNumber * pageSize || "0"
                  }`
                : `${(pageNumber - 1) * pageSize + 1 || "0"}-${
                    totalCount || "0"
                  }`}{" "}
              of {totalCount || "0"} entries
            </span>

            <div className="submit">
              <Button
                variant="outlined"
                type="button"
                className="flex flex-row items-center mr-5 text-blue-400 submit entry"
                onClick={() => handlePageNumber("prev")}
                disabled={!pageNumber || pageNumber <= 1}
              >
                <span className="text-sm font-bold">prev</span>
              </Button>
              <Button variant="outlined" disabled={true}>
                <span className="flex flex-row items-center text-gray-900 ">
                  {pageNumber || 0}
                </span>
              </Button>

              <Button
                variant="outlined"
                type="button"
                className="flex flex-row items-center text-blue-400 ml-5 submit"
                onClick={() => handlePageNumber("next")}
                disabled={!totalCount || totalCount <= pageNumber * pageSize}
              >
                <span className="text-sm font-bold">next</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Pagination;
