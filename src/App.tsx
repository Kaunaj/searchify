import { useState } from "react";
import "./App.scss"
import {
  SearchstaxWrapper,
  SearchstaxInputWidget,
  SearchstaxResultWidget,
  SearchstaxPaginationWidget,
  SearchstaxOverviewWidget,
  SearchstaxSortingWidget,
  SearchstaxFacetsWidget,
  //@ts-ignore
} from "@searchstax-inc/searchstudio-ux-react";
// @ts-ignore
import SearchifyPaginationWidget from "./components/SearchifyPaginationWidget.tsx";

import type {
  ISearchObject,
  ISearchstaxParsedResult,
  ISearchstaxSuggestProps,
  ISearchstaxSuggestResponse,
} from "@searchstax-inc/searchstudio-ux-js";
import { Searchstax } from "@searchstax-inc/searchstudio-ux-js";
//@ts-ignore
import { config, renderConfig } from "./config.js";
import { noResultTemplate, resultsTemplate } from "./templates/resultsTemplates.js";
import { infiniteScrollTemplate, paginationTemplate } from "./templates/paginationTemplates.js";
import { facetsTemplateDesktop, facetsTemplateMobile } from "./templates/facetTemplates.js";
import { searchSortingTemplate } from "./templates/sorting.templates.js";
import { searchOverviewTemplate } from "./templates/searchOverviewTemplates.js";
import { InputTemplate } from "./templates/inputTemplates.js";

// Custom Components
import ScrollToTop from "./components/ScrollToTop.tsx";

function App() {
  //* Initializations *//
  //@ts-ignore
  const [searchstaxInstance, setSearchstaxInstance] = useState(// eslint-disable-line
    null as null | Searchstax
  );
  const sessionId = makeId(25);

  console.log('init in App', localStorage.getItem("init"));
  if (!localStorage.getItem("init")) {
    localStorage.setItem("page", "1");
    localStorage.setItem("init", "true");
  }

  //* Helper functions *//
  function makeId(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function beforeSearch(props: ISearchObject) {
    const currentPage = localStorage?.getItem("nextOrPreviousClicked") === "true" ? props.page : Number(localStorage?.getItem("page"));
    console.log('beforeSearch called', props);
    localStorage.removeItem("iife_called");

    if (props.query !== localStorage.getItem("query")) {
      console.log("Received new query:", props.query);
      localStorage.removeItem("author_facet_added");
      localStorage.removeItem("author_name_facet");
      localStorage.setItem("query", props.query);
    }
    // localStorage.removeItem("author_facet_added");

    // props.facets = [
    //   // {
    //   //   name: "url",
    //   //   type: "and",
    //   //   value: "https://www.searchstax.com/events/drupalcon-lille/"
    //   // }
    //   {
    //     name: "author_name",
    //     type: "and",
    //     value: "Admin"
    //   }
    // ];
    const propsCopy = { ...props, page: currentPage };
    return propsCopy;
  }

  function afterSearch(results: ISearchstaxParsedResult[]) {
    console.log('afterSearch called', results);
    const copy = [...results];
    // console.log('docs:', copy.);
    return copy;
  }

  function initialized(searchstax: Searchstax) {
    setSearchstaxInstance(searchstax);
  }

  function afterAutosuggest(result: ISearchstaxSuggestResponse) {
    const copy = { ...result };
    return copy;
  }
  function beforeAutosuggest(props: ISearchstaxSuggestProps) {
    // gets suggestProps, if passed along further autosuggest will execute, if null then event gets canceled
    // props can be modified and passed along
    const propsCopy = { ...props };
    return propsCopy;
  }

  function afterLinkClick(result: ISearchstaxParsedResult) {
    // gets result that was clicked, if passed along further functions will execute, if null then event gets canceled
    console.log('result in afterLinkClicked', result);
    const resultCopy = { ...result };

    if (result.url) window.open(result.url, "_self");

    return resultCopy;
  }

  return (
    <>
      <div className="main">
        <div className="scroller"></div>
        <SearchstaxWrapper
          searchURL={config.searchURL}
          suggesterURL={config.suggesterURL}
          trackApiKey={config.trackApiKey}
          searchAuth={config.searchAuth}
          initialized={initialized}
          beforeSearch={beforeSearch}
          afterSearch={afterSearch}
          authType={config.authType}
          sessionId={sessionId}
          // analyticsBaseUrl={config.analyticsBaseUrl}
          router={{ enabled: true }}
          language={config.language}
        >
          <div className="searchstax-page-layout-container">
            <SearchstaxInputWidget
              inputTemplate={InputTemplate}
              suggestAfterMinChars={renderConfig.inputWidget.suggestAfterMinChars}
              afterAutosuggest={afterAutosuggest}
              beforeAutosuggest={beforeAutosuggest}
            ></SearchstaxInputWidget>

            <div className="search-details-container">
              <SearchstaxOverviewWidget
                searchOverviewTemplate={searchOverviewTemplate}
              ></SearchstaxOverviewWidget>
              <SearchstaxSortingWidget
                searchSortingTemplate={searchSortingTemplate}
              ></SearchstaxSortingWidget>
            </div>

            <div className="searchstax-page-layout-facet-result-container">
              <div className="searchstax-page-layout-facet-container">
                <SearchstaxFacetsWidget
                  facetingType={renderConfig.facetsWidget.facetingType}
                  itemsPerPageDesktop={renderConfig.facetsWidget.itemsPerPageDesktop}
                  itemsPerPageMobile={renderConfig.facetsWidget.itemsPerPageMobile}
                  specificFacets={undefined}
                  facetsTemplateDesktop={facetsTemplateDesktop}
                  facetsTemplateMobile={facetsTemplateMobile}
                ></SearchstaxFacetsWidget>
              </div>

              <div className="searchstax-page-layout-result-container">
                <SearchstaxResultWidget
                  afterLinkClick={afterLinkClick}
                  resultsPerPage={renderConfig.resultsWidget.itemsPerPage}
                  renderMethod={renderConfig.resultsWidget.renderMethod}
                  noResultTemplate={noResultTemplate}
                  resultsTemplate={resultsTemplate}
                ></SearchstaxResultWidget>
                <SearchstaxPaginationWidget
                  infiniteScrollTemplate={infiniteScrollTemplate}
                  paginationTemplate={paginationTemplate}
                ></SearchstaxPaginationWidget>
              </div>
            </div>
          </div>
        </SearchstaxWrapper>
        <ScrollToTop></ScrollToTop>
      </div>
    </>
  );
}

export default App;
