import axios from "axios/index";

export async function fetchData(query, userList, setData) {
      if (isNaN(query) == true) {
        // Normally wouldn't hard code this; and use env vars
        const result = await axios(
          `http://127.0.0.1:8000/recommendations/?author=${query}`
        );
        addSelectedKey(result, userList, setData);
      } else {
        const result = await axios(
          `http://127.0.0.1:8000/recommendations/?count=${query}`
        );
        addSelectedKey(result, userList, setData);
      }
    };

export function addSelectedKey(result, userList, stateFunction) {
  let response = result.data;
  // Add a new condition of selected or not
  response.data = response.data.map(function (book) {
    return {
      title: book.title,
      author: book.author,
      url: book.url,
      selected: false,
    };
  });

  // Build out a list to compare against, use title:author as uuid
  let compareList = userList.map(function (item) {
    return `${item.title}:${item.author}`;
  });
  // Account for already saved items to not show again
  let filteredData = response.data.filter(function (book) {
    if (compareList.includes(`${book.title}:${book.author}`)) {
      return null;
    }
    return book;
  });
  stateFunction({ data: filteredData });
}