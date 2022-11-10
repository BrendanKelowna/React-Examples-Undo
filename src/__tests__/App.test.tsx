import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

//* Mocks

describe("App tests", () => {
  test("renders app", () => {
    //* Setup
    render(<App />);

    //* Html Elements
    const heading = screen.getByRole("heading", {
      name: "React - Undo Example",
    });
    const info = screen.getByText("Undos: 0/0");
    const undoButton = screen.getByRole("button", { name: "Undo" });
    const redoButton = screen.getByRole("button", { name: "Redo" });
    const input = screen.getByRole("textbox");
    const addButton = screen.getByRole("button", { name: "Add" });
  });

  test("test app functions", () => {
    //* Setup
    render(<App />);

    //* Html Elements
    const info = screen.getByText("Undos: 0/0");
    const undoButton = screen.getByRole("button", {
      name: "Undo",
    }) as HTMLButtonElement;
    const redoButton = screen.getByRole("button", {
      name: "Redo",
    }) as HTMLButtonElement;
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const addButton = screen.getByRole("button", {
      name: "Add",
    }) as HTMLButtonElement;

    //* Test Add
    fireEvent.change(input, { target: { value: "test item 1" } });
    fireEvent.click(addButton);
    expect(input.value).toBe("");

    //* New Html Elements
    let deleteButton = screen.getByRole("button", { name: "Delete" });
    let itemLable = screen.getByText(/test item [0-9]/);

    //* Undo Add
    fireEvent.click(undoButton);
    expect(itemLable).not.toBeVisible();

    //* Redo Add
    fireEvent.click(redoButton);

    //* New Html Elements
    deleteButton = screen.getByRole("button", { name: "Delete" });
    itemLable = screen.getByText(/test item [0-9]/);

    //* Delete Elements
    fireEvent.click(deleteButton);
    expect(deleteButton).not.toBeVisible();

    //* Undo Deletes
    fireEvent.click(undoButton);

    //* New Html Elements
    deleteButton = screen.getByRole("button", { name: "Delete" });
    itemLable = screen.getByText(/test item [0-9]/);

    //* Redo Deletes
    fireEvent.click(undoButton);
    expect(deleteButton).not.toBeVisible();
  });
});
