import { UndoState } from "./UndoState";

//* Types
export type UndoProps = {
  undoState: UndoState;
};
export type UndoObj = {
  undoDescription?: string;
  redoDescription?: string;
  undo: () => Promise<UndoObj>;
  redo: () => Promise<UndoObj>;
};

//* Definitions

//* Styling

//* Helpers

//* Main
export default function Undo({ undoState, ...props }: UndoProps) {
  //* Context

  //* State
  const {
    undoList,
    index,
    undo,
    redo,
    undoDiscription,
    redoDiscription,
    length,
    undoDisabled,
    redoDisabled,
  } = undoState;

  //* Effects

  //* Handlers

  //* Renders
  return (
    <div>
      <span>
        <button
          title={undoDiscription ? undoDiscription : "Undo"}
          onClick={undo}
          disabled={undoDisabled}
          {...props}
        >
          Undo
        </button>
      </span>
      <span>
        <button
          title={redoDiscription ? redoDiscription : "Redo"}
          onClick={redo}
          disabled={redoDisabled}
          {...props}
        >
          Redo
        </button>
      </span>
    </div>
  );
}
