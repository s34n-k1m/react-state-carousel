import React from "react";
import {render} from "@testing-library/react";
import Card from "./Card";
import image1 from "./image1.jpg";

it("renders without crashing", function () {
  render (<Card caption="Test Caption" src={image1} currNum="1" totalNum="3" />);
});

it("matches snapshot", function () {
  const {container} = render(<Card caption="Test Caption" src={image1} currNum="1" totalNum="3" />);
  expect(container).toMatchSnapshot();
});