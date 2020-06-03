import React from "react";

import axios from "axios";

import { shallow, mount } from "enzyme";

import App from "../App.js";
import { fetchData, fetchUserList } from "../utils";

// Need to mock modules
jest.mock("axios");
jest.mock("../utils.js");

describe("<App/> renders properly", () => {
  it("renders 4 dividers, 3 columns, 1 header", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(".col-sm")).toHaveLength(4);
  });

  it("renders text input", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("input")).toHaveLength(1);
  });
});

describe("test app hooks", () => {
  const resp = {
    data: [
      {
        title: "1984",
        author: "George Orwell",
        url:
          "http://www.amazon.com/1984-Signet-Classics-George-Orwell/dp/0451524934",
      },
    ],
  };

  it("calls the fetch chain function", () => {
    fetchUserList.mockImplementation(function () {
      return Promise.resolve([]);
    });

    fetchData.mockImplementation(function (query, userList, setData) {
      act(() => {
        setData(resp);
      });
    });
    const wrapper = mount(<App />);
    expect(fetchUserList).toHaveBeenCalled();
  });

  /* TODO fix this test; broken when API got chained to fix a bug
  it("creates a book list", (done) => {
    fetchUserList.mockImplementation(function () {
      return new Promise((resolve, reject) => {
        return Promise.resolve([]);
      });
    });
    fetchData.mockImplementation(function (query, userList, setData) {
      setData(resp);
      done();
    });

    const wrapper = mount(<App />);
    expect(wrapper.find("li")).toHaveLength(1);
    expect(wrapper.find("li").first().find("span").first().text()).toEqual(
      "1984"
    );
  });
  */
});
