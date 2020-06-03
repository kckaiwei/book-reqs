import React from "react";

import axios from "axios";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import App from "./App.js";

jest.mock("axios");

describe("<App/>", () => {
  it("renders 4 dividers, 3 columns, 1 header", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(".col-sm")).toHaveLength(4);
  });

  it("renders text input", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("input")).toHaveLength(1);
  });

  it("fetches books", () => {
    const resp = {
    "data": [
        {
            "title": "1984",
            "author": "George Orwell",
            "url": "http://www.amazon.com/1984-Signet-Classics-George-Orwell/dp/0451524934"
        }
    ]
}
    axios.get.mockResolvedValue(resp);
    const wrapper = shallow(<App />);
  })
});
