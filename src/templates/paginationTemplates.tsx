import { IPaginationData } from "@searchstax-inc/searchstudio-ux-js";

export function paginationTemplate(
    paginationData: IPaginationData | null,
    nextPage: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
    previousPage: (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => void
  ) {

    function getLastPageNumber(totalResults: number, resultsPerPage: number): number {
      return Math.ceil(totalResults / resultsPerPage);
    }

    function isLastPage(num: number): boolean {
      return num !== getLastPageNumber(paginationData?.totalResults || 0, paginationData?.resultsPerPage || 10);
    }

    function getPageNumbersToShow({currentPage, totalResults, resultsPerPage}: IPaginationData): number[] {
      const pageNums: number[] = [];
      const firstPageNum = 1;
      const lastPageNum = getLastPageNumber(totalResults, resultsPerPage);
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(currentPage + 2, lastPageNum);

      if (start > firstPageNum) {
        pageNums.push(1);
      }

      if (start - firstPageNum > 1) {
        pageNums.push(Math.floor((start + firstPageNum) / 2))
      }

      for (let i = start; i <= end; i++) {
        pageNums.push(i);
      }

      if (lastPageNum - end > 1) {
        pageNums.push(Math.floor((end + lastPageNum) / 2))
      }

      if (end !== lastPageNum) {
        pageNums.push(lastPageNum);
      }

      return pageNums;
    }

    return (
      <>
        {paginationData && paginationData?.totalResults !== 0 && (
          <div className="searchstax-pagination-container">
            <div className="searchstax-pagination-content">
              <a
                className="searchstax-pagination-previous"
                tabIndex={0}
                style={
                  paginationData?.isFirstPage ? { pointerEvents: "none" } : {}
                }
                onClick={(e) => {
                  localStorage.setItem("nextOrPreviousClicked", "true");
                  localStorage.setItem("page", String(Number(localStorage.getItem("page")) - 1));
                  previousPage(e);
                }}
                onKeyDown={(e) => {
                  if(e.key === 'Enter' || e.key === ' ') {
                    previousPage(e as any);
                  }
                }}
                id="searchstax-pagination-previous"
              >
                {" "}
                &lt; Previous{" "}
              </a>
              {getPageNumbersToShow(paginationData).map((num, i) => <a key={i} className={!isLastPage(num) ? "searchstax-pagination-next" : "searchstax-pagination-previous"}
                tabIndex={0}
                style={
                  num === Number(localStorage.getItem("page")) ? { fontWeight: "bold", textDecoration: "underline" } : {}
                }
                onClick={(e: any) => {
                  localStorage.setItem("nextOrPreviousClicked", "false");
                  localStorage.setItem("page", e.target.innerHTML);
                  if (paginationData?.isLastPage) {
                    previousPage(e);
                  } else {
                    nextPage(e);
                  }
              }}>{num}</a>)}
              <a
                className="searchstax-pagination-next"
                tabIndex={0}
                style={
                  paginationData?.isLastPage ? { pointerEvents: "none" } : {}
                }
                onClick={(e) => {
                  localStorage.setItem("nextOrPreviousClicked", "true");
                  localStorage.setItem("page", String(Number(localStorage.getItem("page")) + 1));
                  nextPage(e);
                }}
                onKeyDown={(e) => {
                  if(e.key === 'Enter' || e.key === ' ') {
                    nextPage(e as any);
                  }
                }}
                id="searchstax-pagination-next"
              >
                Next &gt;
              </a>
            </div>
          </div>
        )}
      </>
    );
  }

  export function infiniteScrollTemplate(
    paginationData: IPaginationData | null,
    nextPage: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  ) {
    return (
      <>
        {paginationData &&
          paginationData.isInfiniteScroll &&
          paginationData?.totalResults !== 0 &&
          !paginationData?.isLastPage && (
            <div className="searchstax-pagination-container">
              <a
                className="searchstax-pagination-load-more"
                tabIndex={0}
                onClick={(e) => {
                  nextPage(e);
                }}
                onKeyDown={(e) => {
                  if(e.key === 'Enter' || e.key === ' ') {
                    nextPage(e as any);
                  }
                }}
              >
                Show More &gt;
              </a>
            </div>
          )}
      </>
    );
  }