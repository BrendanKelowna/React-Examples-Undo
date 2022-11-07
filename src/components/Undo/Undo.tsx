import { UndoState } from "./UndoState";

//* Types
export type UndoProps = {
  undoState: UndoState;
};
export type UndoObj = {
  message: string;
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
  const { undoList, index, undo, redo, undoDiscription, redoDiscription } =
    undoState;

  //* Effects

  //* Handlers

  //* Renders
  return (
    <div>
      <span>
        <button
          title={undoDiscription ? undoDiscription : "Undo"}
          onClick={undo}
          disabled={index <= 0}
          {...props}
        >
          Undo
        </button>
      </span>
      <span>
        <button
          title={redoDiscription ? redoDiscription : "Redo"}
          onClick={redo}
          disabled={index >= undoList.length}
          {...props}
        >
          Redo
        </button>
      </span>
    </div>
  );
}
