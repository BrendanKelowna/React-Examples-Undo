import { describe, expect, test } from "@jest/globals";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ListItem from "../ListItem";

//* Mocks
const mockListItem = { name: "mock item" };

describe("ListItem tests", () => {
  test("renders ListItem", () => {
    //* Setup
    const mockDeleteFunc = jest.fn();
    render(<ListItem item={mockListItem} handleDelete={mockDeleteFunc} />);

    //* Html Elements
    const deleteButten = screen.getByRole("button", { name: "Delete" });
    const label = screen.getByText("mock item");
  });

  test("delete button connected", () => {
    //* Setup
    const mockDeleteFunc = jest.fn();
    render(<ListItem item={mockListItem} handleDelete={mockDeleteFunc} />);

    //* Html Elements
    const deleteButten = screen.getByRole("button", { name: "Delete" });
    const label = screen.getByText("mock item");

    //* Test
    fireEvent.click(deleteButten);
    expect(mockDeleteFunc).toBeCalled();
  });
});
