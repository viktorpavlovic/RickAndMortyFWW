import React from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import "./rick-pagination.scss";
import { Button } from "antd";

interface RickPaginationProps {
  freshData: boolean;
}

const RickPagination: React.FC<RickPaginationProps> = ({ freshData }) => {
  const userContext = useContext(UserContext);
  const nextPage = userContext?.nextPage;
  const prevPage = userContext?.prevPage;
  const goToPage = userContext?.goToPage;
  let url = userContext.currentPageUrl;
  const pages = userContext?.pages || 0;
  const curPage = url.match(/page=(\d+)/)?.[1] || "1";
  const displayRange = 5;
  const startPage = Math.max(
    1,
    parseInt(curPage) - Math.floor(displayRange / 2)
  );
  const endPage = Math.min(pages, startPage + displayRange - 1);
  let pageButtons = [];
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <Button
        key={i}
        onClick={() => goToPage(i)}
        className={i.toString() === curPage ? "current-page-button" : ""}
      >
        {i}
      </Button>
    );
  }
  useEffect(() => {
    localStorage.setItem("currentPage", curPage);
  }, [curPage]);
  return (
    <div className="rick-pagination-div ">
      {prevPage && (
        <Button className="prev-next" onClick={prevPage}>
          Previous
        </Button>
      )}
      {pageButtons}
      {nextPage && (
        <Button className="prev-next" onClick={nextPage}>
          Next
        </Button>
      )}
    </div>
  );
};

export default RickPagination;
