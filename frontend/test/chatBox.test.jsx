import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ChatBox from "../src/components/ChatBox";
import socket from "../src/socket"; // Import the socket module
import usePut from "../src/hooks/usePut"; // Import the usePut hook

jest.mock("../src/socket", () => ({
  on: jest.fn(),
  off: jest.fn(),
  emit: jest.fn(),
}));

jest.mock("../src/hooks/usePut", () => jest.fn()); // Mock the usePut hook

describe("ChatBox", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render a chat box component", () => {
    render(<ChatBox />);
    const inputElement = screen.getByPlaceholderText("Enter message");
    expect(inputElement).toBeInTheDocument();
  });

  it("should update input value when typing", () => {
    const { getByPlaceholderText } = render(<ChatBox />);
    const inputElement = getByPlaceholderText("Enter message");

    fireEvent.change(inputElement, { target: { value: "Hello" } });
    expect(inputElement.value).toBe("Hello");
  });

  it("should emit a new message on form submission", () => {
    const { getByPlaceholderText, getByText } = render(
      <ChatBox userName="John" roomInfo="ABC123" />
    );
    const inputElement = getByPlaceholderText("Enter message");
    const sendButton = getByText("Send");
  
    fireEvent.change(inputElement, { target: { value: "Hello" } });
    fireEvent.click(sendButton);
  
    expect(inputElement.value).toBe("");
    expect(socket.emit).toHaveBeenCalledWith("newMessage", {
      message: "John: Hello",
      roomCode: "ABC123",
    });
    expect(usePut).toHaveBeenCalledWith(
      expect.stringContaining("/api/room/message/"),
      { message: "John: Hello" }
    );
  });
  
});
