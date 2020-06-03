import React from "react";

import axios from "axios";

import { configure, shallow, mount } from "enzyme";
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
});

describe("test app hooks", () => {
  let props;
  let wrapper;
  let useEffect;

  const data = "George Orwell";

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };


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

  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");

    props = {
      setData: jest.fn().mockResolvedValue(resp)
    }

    mockUseEffect();
    mockUseEffect();
    wrapper = shallow(<App {...props}/>);
  });

  describe("on start", () => {
    it ("loads the books", () => {
      expect(props.setData).toHaveBeenCalled();
    })
  })

});
