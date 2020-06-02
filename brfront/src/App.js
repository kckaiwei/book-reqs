import "@babel/polyfill";
import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import "./App.css";

function App() {
  const [books, setData] = useState({ data: [] });
  const [userList, setList] = useState([]);
  const [query, setQuery] = useState("George Orwell");

  const Title = styled.h1`
    font-size: 3em;
    text-align: center;
    color: white;
    font-family: quasimoda;
  `;

  const InputHelper = styled.label`
    font-size: 0.65em;
    text-align: left;
    color: white;
    font-family: quasimoda;
  `;

  const LeftPane = styled.div`
    font-size: 1rem;
    text-align: left;
  `;
  const CenterPane = styled.div`
    font-size: 1rem;
    text-align: center;
  `;
  const RightPane = styled.div`
    font-size: 1rem;
    text-align: right;
  `;

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
        console.log("why aren't we here");
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
        <Title>Ask Pythia</Title>
        <div className="row">
          <LeftPane className={"col-sm"}>
            <Fragment>
              <ul>
                {books.data.map((item) => (
                  <li key={item.title}>
                    <input type={"checkbox"}></input>
                    <span>
                      <a href={item.url}>{item.title}</a>
                    </span>
                    <br />
                    <span>{item.author}</span>
                  </li>
                ))}
              </ul>
            </Fragment>
          </LeftPane>
          <CenterPane className={"col-sm"}>
            <InputHelper className={"input-label"}>WHO/HOW MANY?</InputHelper>
            <br />
            <input
              className={""}
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            ></input>
          </CenterPane>
          <RightPane className={"col-sm"}></RightPane>
        </div>
      </header>
    </div>
  );
}

export default App;
