import React from "react";
import {App} from "./App.js";
import TestRenderer from "react-test-renderer";

it('renders correctly', () => {
  const tree = TestRenderer.create(App).toJSON();

  expect(tree).toMatchSnapshot();
})