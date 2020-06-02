import "@babel/polyfill";
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [books, setData] = useState({ data: [] });
  const [userList, setList] = useState([]);
  const [query, setQuery] = useState("George Orwell");

  useEffect(() => {
    // Can't return an async function, but can call one in an effect
    const fetchData = async () => {
        console.log(isNaN(query));
      if (isNaN(query) == true) {
          const result = await axios(
              `http://127.0.0.1:8000/recommendations/?author=${query}`
          );
          //console.log(result)
          console.log(result.data);
          setData(result.data);
      } else {
          console.log("why aren't we here")
        const result = await axios(
             `http://127.0.0.1:8000/recommendations/?count=${query}`
          );
          //console.log(result)
          console.log(result.data);
          setData(result.data);
      }
    };

    fetchData();
    //Pass query so we can call again on changes
  }, [query]);

  return (
    <div className="App">
      <header className="App-header">
        <Fragment>
          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
            }}
          ></input>
          <ul>
            {books.data.map((item) => (
              <li key={item.title}>
                <div>
                  <a href={item.url}>{item.title}</a>
                </div>
                <div>{item.author}</div>
              </li>
            ))}
          </ul>
        </Fragment>
      </header>
    </div>
  );
}

export default App;
