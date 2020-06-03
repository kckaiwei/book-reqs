import "@babel/polyfill";
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios/index";
import { fetchData, fetchUserList, getCookie } from "./utils";
import styled from "styled-components";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

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

function App() {
  const [books, setData] = useState({ data: [] });
  const [userList, setList] = useState([]);
  const [query, setQuery] = useState("George Orwell");
  const [isSaving, setSaving] = useState(false);

  let firstRendered = false;

  useEffect(() => {
    // Can't return an async function, but can call one in an effect
    if (firstRendered == false) {
      // Must chain so we can keep order for initial state
      fetchUserList(setList).then(function (resp_list) {
        console.log("thened");
        fetchData(query, resp_list, setData);
      });
      firstRendered = true;
    } else {
      fetchData(query, userList, setData);
    }

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
          <LeftPane className={"col-sm left-pane"}>
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
          <CenterPane className={"col-sm center-pane"}>
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
              <br />
              <button
                className={"btn btn-outline-secondary"}
                onClick={function () {
                  setData({
                    data: books.data.concat(
                      userList.reduce(function (result, book) {
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
                    ),
                  });
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
                    })
                  );
                }}
              >
                Remove from list {"<-"}
              </button>
              <br />
              <br />
              <button
                className={"btn btn-primary"}
                onClick={function () {
                  let csrf = getCookie("csrftoken");
                  setSaving(true);
                  axios
                    .post(
                      `http://127.0.0.1:8000/save/`,
                      { data: userList },
                      {
                        headers: {
                          "X-CSRFToken": csrf,
                        },
                      }
                    )
                    .then((response) => {
                      setSaving(false);
                    });
                }}
              >
                {isSaving ? "Saving..." : "Save list!"}
              </button>
            </ButtonContainer>
          </CenterPane>
          <RightPane className={"col-sm right-pane"}>
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

export default App;
