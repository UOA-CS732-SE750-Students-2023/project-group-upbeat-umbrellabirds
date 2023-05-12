import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ImageSlider from "../src/components/ImageSlider";
import "@testing-library/jest-dom/extend-expect";

test("should change image on arrow click", () => {
  const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg"
  ];
  const onImageChange = jest.fn();

  const { getByAltText, getByTestId } = render(
    <ImageSlider images={images} onImageChange={onImageChange} />
  );

  const imageElement = getByAltText("Image 1");
  const leftArrow = getByTestId("arrow-left");
  const rightArrow = getByTestId("arrow-right");

  fireEvent.click(rightArrow);
  expect(onImageChange).toHaveBeenCalledWith(1);
  expect(imageElement.src).toContain("image2.jpg");

  fireEvent.click(leftArrow);
  expect(onImageChange).toHaveBeenCalledWith(0);
  expect(imageElement.src).toContain("image1.jpg");
});
