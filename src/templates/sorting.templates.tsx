import { ISearchstaxSearchSortingData } from "@searchstax-inc/searchstudio-ux-js";

export function searchSortingTemplate(
    sortingData: null | ISearchstaxSearchSortingData,
    orderChange: (value: string) => void,
    selectedSorting: string
  ) {
    return (
      <>
        {sortingData &&
          sortingData?.searchExecuted &&
          sortingData?.hasResultsOrExternalPromotions && (
            <div className="searchstax-sorting-container">
              <label className="searchstax-sorting-label" htmlFor="searchstax-search-order-select">
                Sort By
              </label>
              <select
                id="searchstax-search-order-select"
                className="searchstax-search-order-select"
                value={selectedSorting}
                onChange={(e) => {
                  orderChange(e.target.value);
                }}
              >
                <option value=""> Relevance </option>
                <option value="content_type asc"> Content Type A-Z </option>
                <option value="content_type desc"> Content Type Z-A </option>
              </select>
            </div>
          )}
      </>
    );
  }