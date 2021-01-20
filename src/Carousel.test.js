import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import image1 from "./image1.jpg";
import image2 from "./image2.jpg";
import image3 from "./image3.jpg";

const cardData = [
  {
    src: image1,
    caption: "Photo by Richard Pasquarella on Unsplash"
  },
  {
    src: image2,
    caption: "Photo by Pratik Patel on Unsplash"
  },
  {
    src: image3,
    caption: "Photo by Josh Post on Unsplash"
  }
];

it("renders without crashing", function () {
  render(<Carousel cardData={cardData} title="Test Title" />);
});

it("matches snapshot", function () {
  const {container} = render(<Carousel cardData={cardData} title="Test Title" />);
  expect(container).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
 
  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow");
  const leftArrow = queryByTestId("left-arrow");

  // move forward in the carousel
  fireEvent.click(rightArrow);
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();

  // move backward in the carousel
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

});

it("should hide left arrow on first image", function () {
  const { queryByTestId, debug } = render(<Carousel />);
  debug();
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");
  
  expect(leftArrow.getAttribute("style")).toEqual("visibility: hidden;");
  expect(rightArrow.getAttribute("style")).toEqual("visibility: visible;");
});

it("should hide right arrow on last image", function () {
  const { queryByTestId, debug } = render(<Carousel />);
  debug();
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");
  
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  expect(rightArrow.getAttribute("style")).toEqual("visibility: hidden;");
  expect(leftArrow.getAttribute("style")).toEqual("visibility: visible;");
});
