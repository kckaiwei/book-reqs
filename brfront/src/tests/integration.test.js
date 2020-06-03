import React from "react";

import { fetchData } from "../utils";
import { mount } from "enzyme/build/index";

import App from "../App.js";

// Need to mock modules
jest.mock("../utils.js");

describe("test multiple book list", () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    fetchData.mockImplementation(function (query, userList, setData) {
      // Do a deep copy, so we don't change countResp
      let deepResp = function () {
        return {
          data: [
            {
              title:
                "The Blind Watchmaker: Why the Evidence of Evolution Reveals a Universe without Design",
              author: "Richard Dawkins",
              selected: false,
            },
            {
              title: "The Really Hard Problem: Meaning in a Material World",
              author: "Owen Flanagan",
              selected: false,
            },
            {
              title: "The Character of Physical Law",
              author: "Richard Feynman",
              selected: false,
            },
            {
              title: "The Demon-Haunted World: Science as a Candle in the Dark",
              author: "Carl Sagan",
              selected: false,
            },
            {
              title: "The Singularity is Near: When Humans Transcend Biology",
              author: "Ray Kurzweil",
              selected: false,
            },
            { title: "Tao Te Ching", author: "Lao Tzu", selected: false },
            {
              title: "Thinking, Fast and Slow",
              author: "Daniel Kahneman",
              selected: false,
            },
            {
              title: "The History of the Decline and Fall of the Roman Empire",
              author: "Edward Gibbon",
              selected: false,
            },
            {
              title: "Why Evolution Is True",
              author: "Jerry Coyne",
              selected: false,
            },
          ],
        };
      };
      setData(deepResp());
    });
  });

  it("creates an count list", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find("li")).toHaveLength(9);
    expect(wrapper.find("li").first().find("span").first().text()).toEqual(
      "The Blind Watchmaker: Why the Evidence of Evolution Reveals a Universe without Design"
    );
  });

  it("clicking selection marks active and toggles", () => {
    const wrapper = mount(<App />);
    wrapper.find("li").first().simulate("click");
    expect(wrapper.find("li").first().hasClass("active")).toBe(true);
    wrapper.find("li").first().simulate("click");
    expect(wrapper.find("li").first().hasClass("active")).toBe(false);
  });

  it("clicking remove moves to other side", () => {
    const wrapper = mount(<App />);

    wrapper.find("li").first().simulate("click");
    expect(wrapper.find("li.active")).toHaveLength(1);
    wrapper.find("button").first().simulate("click");
    wrapper.update();
    expect(wrapper.find("li")).toHaveLength(9);
    expect(wrapper.find("li.active")).toHaveLength(0);
    expect(wrapper.find(".left-pane").find("li")).toHaveLength(8);
    expect(wrapper.find(".right-pane").find("li")).toHaveLength(1);

    wrapper.find("li").last().simulate("click");
    wrapper.find("button").last().simulate("click");
    wrapper.update();
    expect(wrapper.find("li")).toHaveLength(9);
    expect(wrapper.find(".left-pane").find("li")).toHaveLength(9);
    expect(wrapper.find(".right-pane").find("li")).toHaveLength(0);
  });
});
