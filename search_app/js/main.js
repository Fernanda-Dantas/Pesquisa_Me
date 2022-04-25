import { 
  setSearchFocus, 
  showClearTextButton, 
  clearSearchText,
  clearPushListener
} from "./searchBar.js";

import { 
  deleteSearchResults, 
  buildSearchResults, 
  clearStatsLine, 
  setStatsLine
} from "./searchResults.js";

import { getSearchTerm, retrieveSearchResults } from "./dataFunction.js";


document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  setSearchFocus();

  // 3 event listeners
  const search = document.getElementById("search");
  search.addEventListener("input", showClearTextButton);
  
  const clear = document.getElementById("clear");
  clear.addEventListener("click", clearSearchText);
  clear.addEventListener("keydown", clearPushListener);


  const form = document.getElementById("searchBar");
  form.addEventListener("submit", submitTheSearch);
};

// Workflow Procedural
const submitTheSearch = (event) => {
  event.preventDefault();
  deleteSearchResults();
  processTheSearch();
  setSearchFocus();
};

// Procedural
const processTheSearch = async () => {
  clearStatsLine();
  const searchTerm = getSearchTerm();
  if (searchTerm === "") return; 
  const resultArray = await retrieveSearchResults(searchTerm);
  if(resultArray.length) buildSearchResults(resultArray);
  setStatsLine(resultArray.length);
};
