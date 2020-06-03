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

  const CenterHeader = styled.div`
    text-align: center;
  `;

  const ButtonContainer = styled.div`
    margin-top: 4rem;
    background-color: white;
    border-radius: 0.4rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  `;

  const LeftPane = styled.div`
    font-size: 1rem;
    text-align: left;
    margin-left: 1rem;
  `;
  const CenterPane = styled.div`
    font-size: 1rem;
    text-align: center;
  `;
  const RightPane = styled.div`
    font-size: 1rem;
    text-align: right;
    margin-right: 1rem;
  `;

  useEffect(() => {
    // Can't return an async function, but can call one in an effect
    const fetchData = async () => {
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

    fetchData();
    //Pass query so we can call again on changes
  }, [query]);

  return (
    <div className="App">
      <header className="App-header">
        <Title>Ask Pythia</Title>
        <CenterHeader className="row">
          <div className={"col-sm"}>
            <InputHelper className={"input-label"}>WHO/HOW MANY?</InputHelper>
            <br />
            <input
              className={"query-input"}
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            ></input>
          </div>
        </CenterHeader>
        <div className="row">
          <LeftPane className={"col-sm"}>
            <Fragment>
              <ul className={"list-group"}>
                {books.data.map((item) => (
                  <li
                    key={item.title}
                    className={
                      "list-group-item " +
                      (item.selected == true ? "active" : "")
                    }
                    onClick={function () {
                      setData({
                        data: books.data.map(function (book) {
                          if (book.title == item.title) {
                            book.selected =
                              item.selected == true ? false : true;
                          }
                          return {
                            title: book.title,
                            author: book.author,
                            url: book.url,
                            selected: book.selected,
                          };
                        }),
                      });
                    }}
                  >
                    <div>
                      <span>
                        <a href={item.url}>{item.title}</a>
                      </span>
                      <br />
                      <span>{item.author}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Fragment>
          </LeftPane>
          <CenterPane className={"col-sm"}>
            <ButtonContainer>
              <button
                className={"btn btn-outline-primary"}
                onClick={function () {
                  setList(
                    userList.concat(
                        // Reduce to filter + map at the same time
                      books.data.reduce(function (result, book) {
                        if (book.selected == true) {
                          result.push({
                            title: book.title,
                            author: book.author,
                            url: book.url,
                            selected: false,
                          });
                        }
                        return result;
                      }, [])
                    )
                  );
                  setData({
                    data: books.data.filter(function (book) {
                      if (book.selected != true) {
                        return {
                            title: book.title,
                            author: book.author,
                            url: book.url,
                            selected: false,
                          };
                      }
                    }),
                  });
                }}
              >
                Add to list {"->"}
              </button>
              <br />
              <button className={"btn btn-outline-secondary"} onClick={function () {
                  setData({data:
                    books.data.concat(
                      userList.reduce(function (result, book) {
                        console.log(book)
                        console.log(book.selected)
                        if (book.selected == true) {
                          result.push({
                            title: book.title,
                            author: book.author,
                            url: book.url,
                            selected: false,
                          });
                        }
                        return result
                      }, [])
                    )
              }
                  );
                  setList(
                    userList.filter(function (book) {
                      if (book.selected != true) {
                        return {
                            title: book.title,
                            author: book.author,
                            url: book.url,
                            selected: false,
                          };
                      }
                    }),
                  );
                }}>
                Remove from list {"<-"}
              </button>
            </ButtonContainer>
          </CenterPane>
          <RightPane className={"col-sm"}>
            <Fragment>
              <ul className={"list-group"}>
                {userList.map((item) => (
                  <li
                    key={item.title}
                    className={
                      "list-group-item " +
                      (item.selected == true ? "active" : "")
                    }
                    onClick={function () {
                      setList(
                        userList.map(function (book) {
                          if (book.title == item.title) {
                            book.selected =
                              item.selected == true ? false : true;
                          }
                          return {
                            title: book.title,
                            author: book.author,
                            url: book.url,
                            selected: book.selected,
                          };
                        })
                      );
                    }}
                  >
                    <div>
                      <span>
                        <a href={item.url}>{item.title}</a>
                      </span>
                      <br />
                      <span>{item.author}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Fragment>
          </RightPane>
        </div>
      </header>
    </div>
  );
}

function addSelectedKey(result, userList, stateFunction) {
  let response = result.data;
  // Add a new condition of selected or not
  response.data = response.data.map(function(book) {
    return {"title": book.title, "author": book.author, "url": book.url, "selected": false}
  });

  // Build out a list to compare against, use title:author as uuid
  let compareList = userList.map(function(item){
      return `${item.title}:${item.author}`
  });
  // Account for already saved items to not show again
  let filteredData = response.data.filter(function (book) {
    if (compareList.includes(`${book.title}:${book.author}`)
    ) {
      return null
    }
    return book
  });
  stateFunction({data: filteredData});
}

export default App;
