import React, {useEffect} from "react";

import axios from "axios";

import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import App from "./App.js";
import {fetchData} from "./utils";

// Need to mock modules
jest.mock("axios");
jest.mock("./utils.js");

describe("<App/>", () => {
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

  beforeEach(() =>{
    fetchData.mockImplementation(() => {})
  })

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

  it("calls the fetch function", () => {
    const wrapper = mount(<App />);
    expect(fetchData).toHaveBeenCalled();
  });

  it("creates a book list", () => {
    axios.get.mockResolvedValue(resp);
    fetchData.mockImplementation(function(query, userList, setData){
      setData(resp)
    })

    const wrapper = mount(<App />);
    expect(wrapper.find("li")).toHaveLength(1);
    expect(wrapper.find("li").first().find("span").first().text()).toEqual('1984')
  });
});
