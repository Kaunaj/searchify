# Searchify

This web application is created to implement the site search functionality using the Searchstax UI toolkit.

### Overview

The app is made with Vite + React as the framework of choice, with Typescript as the language and SCSS is used for styling.

#### The following set of features have been implemented:

1. Integration of Searchstax UI widgets enriched with out-of-the-box functionality such as `SearchstaxInputWidget` to render the search input, `SearchstaxResultWidget` for search results, `SearchstaxFacetsWidget` to view and control faceted filters, and `SearchstaxPaginationWidget` for pagination
2. Custom pagination with the ability to select specific page numbers, leading to significantly reducing the number of clicks (and consequently, API calls) needed to get to a certain page
3. Custom sort options to enable users to arrange the search results in ascending or descending order of content type, in addition to the default sort option based on relevance score
4. Custom component `ScrollToTop` for smoothly scrolling back to the top of the page
5. Custom icons for the search results, rendered dynamically depending on their content type, supported with a tooltip text highlighting the type on hovering if there's any ambiguity
6. Rendering the date information on the search result cards, if available
7. Default thumbnail for the result cards which don't have an image, to make the design consistent

#### A few design decisions made during the app implementation are as follows:

1. Local Storage is used as a store for sharing state between components due to its ease of use and fast setup, given the time constraint. A util file `utils/store.ts` has been created to abstract the storage functionality, so that replacing with some other tool (eg. Redux) in the future is easy.
2. Custom component ScrollToTop has been created in a separate location `components/ScrollToTop.tsx` to distinguish it from the existing templates.
3. Custom styling is done in `App.scss` after importing the default styles and overriding them, eg., the `$actionColor` value has been changed to `#2424C2`.

### Steps to run

Open up a terminal and type in the following commands.

```bash
git clone https://github.com/Kaunaj/searchify.git
cd searchify
npm install
npm run dev
```

The app should now be ready to run. It will start on http://localhost:5173
