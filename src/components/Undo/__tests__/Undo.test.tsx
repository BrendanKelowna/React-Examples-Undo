import { describe, expect, test } from "@jest/globals";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Undo, { UndoProps } from "../Undo";
import useUndoState from "../UndoState";

//* Mocks
const MockUndo = ({ ...props }: Partial<UndoProps>) => {
  const state = useUndoState();
  return <Undo undoState={state} {...props} />;
};

describe("Undo tests", () => {
  test("renders Undo", () => {
    //* Setup
    render(<MockUndo />);
    //* Html Elements
    const undoBtn = screen.getByRole("button", {
      name: "Undo",
    }) as HTMLButtonElement;
    const redoBtn = screen.getByRole("button", {
      name: "Redo",
    }) as HTMLButtonElement;
    expect(undoBtn.disabled);
    expect(redoBtn.disabled);
  });
});
