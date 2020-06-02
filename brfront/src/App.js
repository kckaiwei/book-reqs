import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({ books: [] });

  useEffect(async () => {
    // Can't return an async function, but can call one in an effect
    const fetchData = async () => {
      const result = await axios("/recommendations/?count=1");
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
