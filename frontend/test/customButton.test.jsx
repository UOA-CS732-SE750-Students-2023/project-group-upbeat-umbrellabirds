import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CustomButton from "../src/components/CustomButton";
import "@testing-library/jest-dom/extend-expect";

describe("CustomButton", () => {
  it("should render the button text correctly", () => {
    const buttonText = "Click me";
    const { getByText } = render(<CustomButton text={buttonText} />);
    const buttonElement = getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
  });

  it("should call the onClick handler when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(<CustomButton text="Click me" onClick={handleClick} />);
    const buttonElement = getByText("Click me");
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
