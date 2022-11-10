import { act, render, screen } from "@testing-library/react";
import useUndoState, { UndoState } from "../../Undo/UndoState";
import { mockUndoObj } from "../../Undo/__tests__/UndoState.test";
import UndoInfo from "../UndoInfo";

//* Mocks
const MockUndoInfo = ({ state }: { state: {} }) => {
  const _state = useUndoState();
  Object.assign(state, _state);
  return <UndoInfo undoState={_state} />;
};

describe("UndoInfo tests", () => {
  test("render tests", () => {
    //* Setup
    const state = {} as UndoState;
    render(<MockUndoInfo state={state} />);

    //* Quering
    const label = screen.getByText(/Undos/i);

    //* Expect renders
    expect(label.innerText === "Undos: 0/0");
  });

  test("function tests", () => {
    //* Setup
    const state = {} as UndoState;
    render(<MockUndoInfo state={state} />);

    //* Quering
    const label = screen.getByText(/Undos/i);

    //* Adding undos
    act(() => state.add(mockUndoObj("first")));
    expect(label.innerText === "Undos: 0/1");
    act(() => state.add(mockUndoObj("second")));
    expect(label.innerText === "Undos: 0/2");
    act(() => state.add(mockUndoObj("third")));
    expect(label.innerText === "Undos: 0/3");

    //* Exec undos
    act(() => state.undo());
    expect(label.innerText === "Undos: 1/3");
    act(() => state.undo());
    expect(label.innerText === "Undos: 2/3");
    act(() => state.undo());
    expect(label.innerText === "Undos: 3/3");

    //* Exec redos
    act(() => state.redo());
    expect(label.innerText === "Undos: 2/3");
    act(() => state.redo());
    expect(label.innerText === "Undos: 1/3");
    act(() => state.redo());
    expect(label.innerText === "Undos: 0/3");
  });
});
