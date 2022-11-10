import { useState } from "react";
import "./App.css";
import List from "./components/List";
import { ListItemObj } from "./components/List/ListItem";
import useListState, { ListState } from "./components/List/ListState";
import Undo, { UndoObj } from "./components/Undo";
import useUndoState from "./components/Undo/UndoState";
import UndoInfo from "./components/UndoInfo";

const addService = (item: ListItemObj, listState: ListState) =>
  listState.add(item);
const addServiceWithUndo = (
  item: ListItemObj,
  listState: ListState
): UndoObj => {
  addService(item, listState);
  return {
    undo: () => Promise.resolve(deleteServiceWithUndo(item, listState)),
    redo: () => Promise.resolve(addServiceWithUndo(item, listState)),
  };
};

const deleteService = (name: string, listState: ListState) =>
  listState.delete(name);
const deleteServiceWithUndo = (
  item: ListItemObj,
  listState: ListState
): UndoObj => {
  deleteService(item.name, listState);
  return {
    undo: () => Promise.resolve(addServiceWithUndo(item, listState)),
    redo: () => Promise.resolve(deleteServiceWithUndo(item, listState)),
  };
};

function App() {
  const undoState = useUndoState();
  const listState = useListState();
  const [name, setName] = useState("");

  const addHandler = () => {
    const newItem = { name };
    setName("");
    undoState.add(addServiceWithUndo(newItem, listState));
  };

  const deleteHandler = (item: ListItemObj) => {
    const oldItem = item;
    undoState.add(deleteServiceWithUndo(oldItem, listState));
  };

  return (
    <main className="body">
      <div>
        <h4>React - Undo Example</h4>
      </div>
      <div>
        <UndoInfo undoState={undoState} />
      </div>
      <div></div>
      <div>
        <Undo undoState={undoState} />
      </div>
      <form onClick={(e) => e.preventDefault()}>
        <input
          value={name}
          onChange={(event) => {
            setName(event.currentTarget.value);
          }}
        />
        <button onClick={addHandler} disabled={!name}>
          Add
        </button>
      </form>
      <div>
        <List listState={listState} deleteHandler={deleteHandler} />
      </div>
    </main>
  );
}

export default App;
