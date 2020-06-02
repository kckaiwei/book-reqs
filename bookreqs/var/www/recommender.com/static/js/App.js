import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({ books: [] });
  const [query, setQuery] = useState('George Orwell');

  useEffect(async () => {
    // Can't return an async function, but can call one in an effect
    const fetchData = async () => {
      const result = await axios("127.0.0.1:8000/recommendations/?count=1");
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Fragment>
            <input type="text" value={query} onChange={event => setQuery(event.target.value)}>

            </input>
        <ul>
          {data.books.map((item) => (
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
