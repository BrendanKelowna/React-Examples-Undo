import { useState } from "react";
import { UndoObj } from "./Undo";

//* Types
export type UndoState = ReturnType<typeof useUndoState>;

export type useUndoStateProps = {};

//* Definitions

//* Styling

//* Helpers

//* Main
export default function useUndoState({}: useUndoStateProps = {}) {
  //* Context

  //* State
  const [undoList, setUndoList] = useState<UndoObj[]>([]);
  const [index, setIndex] = useState(0);

  //const nextUndoIndex = index - 1;
  //const nextRedoIndex = index;

  const undoDiscription = undoList[index - 1]?.undoDescription;
  const redoDiscription = undoList[index]?.redoDescription;

  /*
  [
    0: {undo redo}
    1: {undo redo}
    2: {undo redo}
    3: index
  ]
  */

  //* Effects

  //* Handlers
  // might need a useReducer for the following as state might be stale
  function add(item: UndoObj) {
    setUndoList((list) => [...list.slice(0, index), item]);
    setIndex((state) => state + 1);
  }

  function undo() {
    const undoIndex = index - 1;
    if (undoIndex < 0) throw new Error("No more undos");
    if (undoList.length < 1) throw new Error("No undo history");
    undoList[undoIndex].undo();
    setIndex(undoIndex);
  }

  function redo() {
    if (index >= undoList.length) throw new Error("No more redos");
    if (undoList.length < 1) throw new Error("No undo history");
    const redo = undoList[index].redo();
    setIndex(index + 1);
  }

  //* Renders
  return {
    undoList,
    index: index,
    setIndex,
    setUndoList,
    add,
    undo,
    redo,
    length: undoList.length,
    undoDiscription,
    redoDiscription,
    undoDisabled: index <= 0,
    redoDisabled: index >= undoList.length,
  };
}
