import { act, render } from "@testing-library/react";
import { UndoObj } from "../../Undo/Undo";
import useUndoState, { UndoState } from "../../Undo/UndoState";

//* Mocks
export const mockService = (name: string) =>
  jest.fn(() => console.log(`service ${name} fired`));

export const mockUndoObj = (name: string): UndoObj => {
  mockService(name);
  return {
    undo: () => Promise.resolve(mockUndoObj(`redo action: ${name} executed`)),
    undoDescription: "undo action: " + name,
    redo: () => Promise.resolve(mockUndoObj(`redo action: ${name} executed`)),
    redoDescription: "redo action: " + name,
  };
};

const MockComp = ({ state }: { state: {} }) => {
  const _state = useUndoState();
  Object.assign(state, _state);
  return <></>;
};

describe("UndoState tests", () => {
  test("function tests", () => {
    //* Setup
    const state = {} as UndoState;
    render(<MockComp state={state} />);

    //* Adding undos
    act(() => state.add(mockUndoObj("first")));
    expect(state.index === 0);
    expect(state.length === 1);
    expect(state.undoDisabled === true);
    expect(state.redoDisabled === false);
    act(() => state.add(mockUndoObj("second")));
    expect(state.index === 0);
    expect(state.length === 2);
    act(() => state.add(mockUndoObj("third")));
    expect(state.index === 0);
    expect(state.length === 3);
    expect(state.undoDisabled === true);
    expect(state.redoDisabled === false);

    //* Exec undos
    expect(state.undoDiscription === "undo action: third");
    expect(state.redoDiscription === undefined);
    act(() => state.undo());
    expect(state.index === 1);
    expect(state.undoDiscription === "undo action: second");
    expect(state.redoDiscription === "redo action: third");
    expect(state.undoDisabled === false);
    expect(state.redoDisabled === false);
    act(() => state.undo());
    expect(state.index === 2);
    expect(state.undoDiscription === "undo action: first");
    expect(state.redoDiscription === "redo action: second");
    expect(state.undoDisabled === false);
    expect(state.redoDisabled === false);
    act(() => state.undo());
    //end state
    expect(state.index === 3);
    expect(state.undoDiscription === undefined);
    expect(state.redoDiscription === "redo action: first");
    expect(state.undoDisabled === true);
    expect(state.redoDisabled === false);

    //* Exec redos
    act(() => state.redo());
    expect(state.index === 2);
    expect(state.undoDiscription === "undo action: first");
    expect(state.redoDiscription === "redo action: second");
    expect(state.undoDisabled === false);
    expect(state.redoDisabled === false);
    act(() => state.redo());
    expect(state.index === 1);
    expect(state.undoDiscription === "undo action: second");
    expect(state.redoDiscription === "redo action: third");
    expect(state.undoDisabled === false);
    expect(state.redoDisabled === false);
    act(() => state.redo());
    //end state
    expect(state.index === 0);
    expect(state.undoDiscription === "undo action: third");
    expect(state.redoDiscription === undefined);
    expect(state.undoDisabled === false);
    expect(state.redoDisabled === true);

    //* Over Writing
    act(() => state.setIndex(0));
    act(() => state.add(mockUndoObj("overRide")));
    expect(state.index === 0);
    expect(state.length === 1);
    expect(state.undoDisabled === false);
    expect(state.redoDisabled === true);
  });
});
